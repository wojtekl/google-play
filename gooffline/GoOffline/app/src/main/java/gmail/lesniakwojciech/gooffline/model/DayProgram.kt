package gmail.lesniakwojciech.gooffline.model

import android.os.Parcel
import android.os.Parcelable

class DayProgram() : Parcelable {
    var enabled: Boolean = false
    var startHour: Int = 0
    var startMinute: Int = 0
    var endHour: Int = 0
    var endMinute: Int = 0

    constructor(parcel: Parcel) : this() {
        enabled = parcel.readByte() != 0.toByte()
        startHour = parcel.readInt()
        startMinute = parcel.readInt()
        endHour = parcel.readInt()
        endMinute = parcel.readInt()
    }

    fun getStart(): String {
        return "${if (startHour > 9) "" else "0"}${startHour}:${if (startMinute > 9) "" else "0"}${startMinute}"
    }

    fun getEnd(): String {
        return "${if (endHour > 9) "" else "0"}${endHour}:${if (endMinute > 9) "" else "0"}${endMinute}"
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeByte(if (enabled) 1 else 0)
        parcel.writeInt(startHour)
        parcel.writeInt(startMinute)
        parcel.writeInt(endHour)
        parcel.writeInt(endMinute)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<DayProgram> {
        override fun createFromParcel(parcel: Parcel): DayProgram {
            return DayProgram(parcel)
        }

        override fun newArray(size: Int): Array<DayProgram?> {
            return arrayOfNulls(size)
        }
    }
}