package gmail.lesniakwojciech.gooffline.ui

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import gmail.lesniakwojciech.gooffline.model.DayProgram

class MainViewModel: ViewModel() {
    private val _schedule = MutableLiveData<Map<String, DayProgram>>()

    val schedule: LiveData<Map<String, DayProgram>> = _schedule

    fun setSchedule(schedule: Map<String, DayProgram>) {
        _schedule.value = schedule
    }

    fun updateSchedule(dayName: String, dayProgram: DayProgram) {
        val sched = mutableMapOf<String, DayProgram>()
        _schedule.value?.forEach { p -> if (p.key != dayName) sched[p.key] = p.value }
        sched[dayName] = dayProgram
        _schedule.value = sched
    }
}