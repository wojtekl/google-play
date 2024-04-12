package gmail.lesniakwojciech.gooffline.receiver

import android.Manifest
import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.provider.Settings.Global
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import gmail.lesniakwojciech.gooffline.R
import gmail.lesniakwojciech.gooffline.model.DayProgram
import gmail.lesniakwojciech.gooffline.ui.AlarmActivity
import java.util.Calendar

class AlarmReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        // This method is called when the BroadcastReceiver is receiving an Intent broadcast.

        val airplaneModeOn = intent.getBooleanExtra(AlarmActivity.AIRPLANE_MODE_ON, false)
        if ((Global.getInt(
                context.contentResolver, Global.AIRPLANE_MODE_ON
            ) != 0) != airplaneModeOn
        ) {
            with(NotificationManagerCompat.from(context)) {
                if (ActivityCompat.checkSelfPermission(
                        context,
                        Manifest.permission.POST_NOTIFICATIONS
                    ) != PackageManager.PERMISSION_GRANTED
                ) {
                    return@with
                }

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    val channel = NotificationChannel(
                        CHANNEL_ID,
                        context.getString(R.string.app_name),
                        NotificationManager.IMPORTANCE_DEFAULT
                    )
                    createNotificationChannel(channel)
                }

                val fullscreenIntent = Intent(context, AlarmActivity::class.java)
                fullscreenIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
                fullscreenIntent.putExtra(AlarmActivity.AIRPLANE_MODE_ON, airplaneModeOn)
                val pendingIntent = PendingIntent.getActivity(
                    context,
                    System.currentTimeMillis().toInt(),
                    fullscreenIntent,
                    PendingIntent.FLAG_IMMUTABLE
                )

                val builder = NotificationCompat.Builder(context, CHANNEL_ID)
                    .setSmallIcon(R.drawable.outline_no_cell_24)
                    .setContentTitle(context.getString(R.string.title_activity_fullscreen))
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                    .setCategory(NotificationCompat.CATEGORY_REMINDER)
                    .setContentIntent(pendingIntent)
                    .setAutoCancel(true)

                notify(System.currentTimeMillis().toInt(), builder.build())
            }
        }
    }

    companion object {
        fun scheduleAlarm(
            context: Context,
            dayName: String,
            program: DayProgram,
            startTime: Boolean
        ) {
            val daysOfWeek = context.resources.getStringArray(R.array.day_names)

            val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            val alarmIntent = Intent(context, AlarmReceiver::class.java).let { intent ->
                intent.putExtra(AlarmActivity.AIRPLANE_MODE_ON, startTime)
                PendingIntent.getBroadcast(
                    context,
                    daysOfWeek.indexOf(dayName) * 10 + (if (startTime) 1 else 0),
                    intent,
                    PendingIntent.FLAG_IMMUTABLE
                )
            }
            alarmManager.cancel(alarmIntent)

            if (false == program.enabled) {
                return
            }

            val calendar = Calendar.getInstance().apply {
                val weekMapping = mapOf(
                    daysOfWeek[0] to Calendar.MONDAY,
                    daysOfWeek[1] to Calendar.TUESDAY,
                    daysOfWeek[2] to Calendar.WEDNESDAY,
                    daysOfWeek[3] to Calendar.THURSDAY,
                    daysOfWeek[4] to Calendar.FRIDAY,
                    daysOfWeek[5] to Calendar.SATURDAY,
                    daysOfWeek[6] to Calendar.SUNDAY
                )
                timeInMillis = System.currentTimeMillis()
                var day = get(Calendar.DAY_OF_WEEK)
                while (day != weekMapping[dayName]) {
                    add(Calendar.DAY_OF_YEAR, 1)
                    day = get(Calendar.DAY_OF_WEEK)
                }
                if (startTime) {
                    set(Calendar.HOUR_OF_DAY, program.startHour)
                    set(Calendar.MINUTE, program.startMinute)
                } else {
                    set(Calendar.HOUR_OF_DAY, program.endHour)
                    set(Calendar.MINUTE, program.endMinute)
                }
                if (System.currentTimeMillis() + 1000 > timeInMillis) {
                    add(Calendar.DAY_OF_YEAR, 7)
                }
            }
            alarmManager.setRepeating(
                AlarmManager.RTC_WAKEUP,
                calendar.timeInMillis,
                AlarmManager.INTERVAL_DAY * 7,
                alarmIntent
            )
        }

        const val CHANNEL_ID = "GOOFFLINE"
    }
}