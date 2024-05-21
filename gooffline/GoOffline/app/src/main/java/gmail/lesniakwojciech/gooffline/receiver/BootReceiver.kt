package gmail.lesniakwojciech.gooffline.receiver

import android.content.BroadcastReceiver
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Parcel
import gmail.lesniakwojciech.gooffline.MainActivity
import gmail.lesniakwojciech.gooffline.MainActivity.Companion.dataStore
import gmail.lesniakwojciech.gooffline.R
import gmail.lesniakwojciech.gooffline.model.DayProgram
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.runBlocking

class BootReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        // This method is called when the BroadcastReceiver is receiving an Intent broadcast.
        if (intent.action == "android.intent.action.BOOT_COMPLETED") {
            // Set the alarm here.
            val dayNames = context.resources.getStringArray(R.array.day_names)

            runBlocking {
                val schdule_parcel = context.dataStore.data
                    .map { preferences ->
                        // No type safety.
                        preferences[MainActivity.SCHEDULE_MAP] ?: ""
                    }.first()

                var schedule: Map<String, DayProgram>? = null
                if (schdule_parcel.isNotBlank()) {
                    val byteArray = schdule_parcel.toByteArray()
                    val parcel = Parcel.obtain()
                    parcel.unmarshall(byteArray, 0, byteArray.size)
                    parcel.setDataPosition(0)
                    val mutableMap = mutableMapOf<String, DayProgram>()
                    parcel.readMap(mutableMap, DayProgram::class.java.classLoader)
                    parcel.recycle()
                    schedule = dayNames.associateBy({ it }, { mutableMap[it]!! })

                    dayNames.forEach {
                        val program = schedule[it]
                        if (program != null) {
                            AlarmReceiver.scheduleAlarm(context, it, program, true)
                            AlarmReceiver.scheduleAlarm(context, it, program, false)
                        }
                    }
                }

                val enableBoot = schedule?.any { it.value.enabled } ?: false
                val receiver = ComponentName(context, BootReceiver::class.java)
                context.packageManager.setComponentEnabledSetting(
                    receiver,
                    if (enableBoot) PackageManager.COMPONENT_ENABLED_STATE_ENABLED else PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                    PackageManager.DONT_KILL_APP
                )
            }
        }
    }
}