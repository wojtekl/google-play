package com.gmail.lesniakwojciech.listazakupowa

import android.app.AlertDialog
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.transition.Explode
import android.util.Patterns
import androidx.appcompat.app.AppCompatActivity
import androidx.preference.EditTextPreference
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import androidx.preference.SwitchPreferenceCompat
import com.gmail.lesniakwojciech.commons.*
import com.gmail.lesniakwojciech.commons.AsyncTaskRzadanie.Response
import com.google.android.material.snackbar.Snackbar

class ActivityUstawienia : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        if (Ustawienia(this).getSkorkaCiemna(false)) {
            setTheme(R.style.AppThemeNight)
        }
        super.onCreate(savedInstanceState)
        Utils.ustawAnimacje(window, Explode(), Explode(), true)
        setContentView(R.layout.activityustawienia)
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.settings, FragmentUstawienia())
            .commit()
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }

    class FragmentUstawienia : PreferenceFragmentCompat() {
        override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
            setPreferencesFromResource(R.xml.root_preferences, rootKey)

            val context = requireContext()
            val ustawienia = Ustawienia(context)

            findPreference<SwitchPreferenceCompat>(ustawienia.SKORKA_CIEMNA)!!.onPreferenceClickListener =
                Preference.OnPreferenceClickListener {
                    Snackbar.make(
                        requireView(),
                        R.string.uruchom_aplikacje_ponownie,
                        Snackbar.LENGTH_LONG
                    ).show()
                    true
                }

            findPreference<Preference>(ustawienia.PREFERENCJE_WYCZYSC_WSZYSTKO)!!.onPreferenceClickListener =
                Preference.OnPreferenceClickListener {
                    AlertDialog.Builder(
                        activity,
                        if (ustawienia.getSkorkaCiemna(false)) R.style.AppThemeNight_AlertOverlay else R.style.AppTheme_AlertOverlay
                    )
                        .setIcon(android.R.drawable.ic_dialog_alert)
                        .setTitle(R.string.wyczysc_wszystko)
                        .setMessage(R.string.potwierdz_czyszczenie)
                        .setNegativeButton(R.string.nie) { di, i -> }
                        .setPositiveButton(R.string.tak) { di, i -> ustawienia.setListy("[[],[],[]]") }
                        .create()
                        .show()
                    true
                }

            findPreference<Preference>(ustawienia.PREFERENCJE_PRODUKTY_SPOLECZNOSCI)!!.onPreferenceClickListener =
                Preference.OnPreferenceClickListener {
                    if (Permissions.hasInternet(context, requireView())
                    ) {
                        startActivity(Intent(context, ActivitySpolecznosc::class.java))
                    }
                    true
                }

            /*findPreference<Preference>(ustawienia.UDOSTEPNIJ_APLIKACJE)!!.onPreferenceClickListener =
                Preference.OnPreferenceClickListener {
                    Utils.udostepnijAplikacje(
                        context, getString(R.string.udostepnij_tekst)
                                + getString(R.string.ADRES_PLAY_APLIKACJA)
                    )
                    true
                }*/

            /*findPreference<Preference>(ustawienia.INNE_APLIKACJE)!!.onPreferenceClickListener =
                Preference.OnPreferenceClickListener {
                    Utils.inneAplikacje(context)
                    true
                }*/
        }
    }
}
