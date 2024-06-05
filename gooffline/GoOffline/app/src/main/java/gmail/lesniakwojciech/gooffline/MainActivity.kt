package gmail.lesniakwojciech.gooffline

import android.app.TimePickerDialog
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.os.Parcel
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.ClickableText
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import androidx.lifecycle.LiveData
import androidx.lifecycle.lifecycleScope
import gmail.lesniakwojciech.gooffline.model.DayProgram
import gmail.lesniakwojciech.gooffline.receiver.AlarmReceiver
import gmail.lesniakwojciech.gooffline.receiver.BootReceiver
import gmail.lesniakwojciech.gooffline.ui.MainViewModel
import gmail.lesniakwojciech.gooffline.ui.PermissionsActivity
import gmail.lesniakwojciech.gooffline.ui.theme.GoOfflineTheme
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch
import org.intellij.lang.annotations.JdkConstants.HorizontalAlignment

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        dayNames = resources.getStringArray(R.array.day_names)

        PermissionsActivity.exactAlarmPermission(this)
        PermissionsActivity.notificationsPermission(this)

        lifecycleScope.launch {
            val saved = dataStore.data
                .map { preferences ->
                    // No type safety.
                    preferences[SCHEDULE_MAP] ?: ""
                }.first()
            val schedule = if (saved.isNotBlank()) {
                val byteArray = saved.toByteArray()
                val parcel = Parcel.obtain()
                parcel.unmarshall(byteArray, 0, byteArray.size)
                parcel.setDataPosition(0)
                val mutableMap = mutableMapOf<String, DayProgram>()
                parcel.readMap(mutableMap, DayProgram::class.java.classLoader)
                parcel.recycle()
                dayNames.associateBy({ it }, { mutableMap[it]!! })
            } else {
                dayNames.associateBy({ it }, { DayProgram() })
            }
            mainViewModel.setSchedule(schedule)
        }

        setContent {
            GoOfflineTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background
                ) {
                    Greeting(getString(R.string.welcome), list = mainViewModel.schedule)
                }
            }
        }
    }

    override fun onPause() {
        super.onPause()

        lifecycleScope.launch {
            dataStore.edit { settings ->
                val parcel = Parcel.obtain()
                parcel.writeMap(mainViewModel.schedule.value)
                settings[SCHEDULE_MAP] = String(parcel.marshall())
                parcel.recycle()
            }
        }

        dayNames.forEach {
            val program = mainViewModel.schedule.value?.get(it)
            if (program != null) {
                AlarmReceiver.scheduleAlarm(this, it, program, true)
                AlarmReceiver.scheduleAlarm(this, it, program, false)
            }
        }

        val enableBoot = mainViewModel.schedule.value?.any { it.value.enabled } ?: false
        val receiver = ComponentName(this, BootReceiver::class.java)
        packageManager.setComponentEnabledSetting(
            receiver,
            if (enableBoot) PackageManager.COMPONENT_ENABLED_STATE_ENABLED else PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
            PackageManager.DONT_KILL_APP
        )
    }

    private fun selectTime(dayName: String, startTime: Boolean) {
        val program = mainViewModel.schedule.value?.get(dayName) ?: DayProgram()
        val currentHour = if (startTime) program.startHour else program.endHour
        val currentMinute = if (startTime) program.startMinute else program.endMinute
        TimePickerDialog(this, { _, hour, minute ->

            run {
                if (startTime) {
                    program.startHour = hour
                    program.startMinute = minute
                } else {
                    program.endHour = hour
                    program.endMinute = minute
                }
                mainViewModel.updateSchedule(dayName, program)
                refresh.value = !refresh.value
            }
        }, currentHour, currentMinute, true).show()
    }

    private fun switchProgram(dayName: String, enable: Boolean) {
        val program = mainViewModel.schedule.value?.get(dayName) ?: DayProgram()
        program.enabled = enable
        mainViewModel.updateSchedule(dayName, program)
        refresh.value = !refresh.value
    }

    /* region Composable */
    @Composable
    fun DisplayRow(dayName: String, program: DayProgram) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .padding(all = 8.dp)
        ) {
            Text(text = dayName, modifier = Modifier.weight(1f))
            Checkbox(checked = program.enabled,
                onCheckedChange = { checked -> switchProgram(dayName, checked) })
            Spacer(modifier = Modifier.width(8.dp))
            Button(onClick = { selectTime(dayName, true) }) {
                Text(text = program.getStart())
            }
            Spacer(modifier = Modifier.width(8.dp))
            Button(onClick = { selectTime(dayName, false) }) {
                Text(text = program.getEnd())
            }
        }
    }

    @Composable
    fun DisplayHeader() {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .padding(all = 8.dp)
        ) {
            Text(text = getString(R.string.day), modifier = Modifier.weight(1f))
            Text(text = getString(R.string.active), modifier = Modifier.weight(1f))
            Spacer(modifier = Modifier.width(8.dp))
            Text(text = getString(R.string.on), modifier = Modifier.weight(1f))
            Spacer(modifier = Modifier.width(8.dp))
            Text(text = getString(R.string.off), modifier = Modifier.weight(1f))
        }
    }

    @Composable
    fun Greeting(
        name: String, modifier: Modifier = Modifier, list: LiveData<Map<String, DayProgram>>
    ) {
        LaunchedEffect(refresh.value) {}

        val schedule by list.observeAsState()
        Column {
            Text(
                text = name, modifier = Modifier
                    .padding(all = 8.dp)
                    .fillMaxWidth()
            )
            Spacer(modifier = Modifier.width(8.dp))
            DisplayHeader()
            LazyColumn {
                items(
                    items = schedule?.toList() ?: ArrayList()
                ) { program ->
                    DisplayRow(program.first, program.second)
                }
            }
            Spacer(modifier = Modifier.width(8.dp))
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.Center, modifier = Modifier.fillMaxWidth()) {
                Link(
                    modifier = Modifier
                        .padding(all = 8.dp),
                    text = getString(R.string.privacy_policy_title),
                    url = getString(R.string.privacy_policy_url)
                )
                Text(
                    text = getString(R.string.see_more),
                    modifier = Modifier.padding(all = 8.dp).clickable {
                        startActivity(
                            Intent(
                                Intent.ACTION_VIEW, Uri.parse(getString(R.string.apps_url))
                            )
                        )
                    },
                    color = MaterialTheme.colorScheme.tertiary,
                    textDecoration = TextDecoration.Underline
                )
            }
        }
    }

    @Preview(showBackground = true)
    @Composable
    fun GreetingPreview() {
        val viewModel = MainViewModel().apply {
            setSchedule(mapOf("Monday" to DayProgram()))
        }

        GoOfflineTheme {
            Greeting("Android", list = viewModel.schedule)
        }
    }

    @Composable
    fun Link(modifier: Modifier, text: String, url: String) {
        val annotatedLinkString = buildAnnotatedString {
            append(text)
            addStyle(
                style = SpanStyle(
                    color = MaterialTheme.colorScheme.tertiary,
                    textDecoration = TextDecoration.Underline
                ), start = 0, end = text.length
            )
            addStringAnnotation("URL", url, 0, text.length)
        }
        val uriHandler = LocalUriHandler.current
        ClickableText(modifier = modifier, text = annotatedLinkString, onClick = {
            annotatedLinkString.getStringAnnotations("URL", it, it).firstOrNull()
                ?.let { stringAnnotation ->
                    uriHandler.openUri(stringAnnotation.item)
                }
        })
    }
    /* endregion */

    companion object {
        val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")

        val SCHEDULE_MAP = stringPreferencesKey("schedule")
    }

    private val mainViewModel: MainViewModel by viewModels()

    private lateinit var dayNames: Array<String>

    private var refresh = mutableStateOf(false)
}