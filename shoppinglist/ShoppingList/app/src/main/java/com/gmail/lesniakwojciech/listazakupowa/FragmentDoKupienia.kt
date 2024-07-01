package com.gmail.lesniakwojciech.listazakupowa

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.ActionMode
import android.view.LayoutInflater
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import androidx.core.content.res.ResourcesCompat
import androidx.fragment.app.DialogFragment
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.gmail.lesniakwojciech.commons.ActivityKomunikat
import com.gmail.lesniakwojciech.commons.AsyncTaskRzadanie
import com.gmail.lesniakwojciech.commons.AsyncTaskRzadanie.Response
import com.gmail.lesniakwojciech.commons.OnItemClickListener
import com.gmail.lesniakwojciech.commons.Permissions
import com.gmail.lesniakwojciech.commons.UkrytaWiadomosc
import com.gmail.lesniakwojciech.commons.Wiadomosci
import com.gmail.lesniakwojciech.commons.Zetony
import com.gmail.lesniakwojciech.listazakupowa.DialogFragmentProdukt.DialogListener
import com.google.android.material.floatingactionbutton.FloatingActionButton

class FragmentDoKupienia : Fragment(), DialogListener {
    companion object {
        const val title = R.string.do_kupienia
        const val color = R.color.redA100
        const val icon = R.drawable.ic_list

        private const val CONTEXT_UAKTUALNIJ = "fdcUaktualnij"
    }

    private lateinit var adapterListaZakupow: AdapterListaZakupow

    private val onItemClickListener: OnItemClickListener = object : OnItemClickListener() {
        override fun onItemClick(position: Int) {
            if (null != actionMode) {
                return
            }

            adapterListaZakupow.moveItem(position, RepositoryListaZakupow.Lista.W_KOSZYKU)
            ustawKoszt()
        }

        override fun onItemLongClick(view: View, position: Int) {
            if (null != actionMode) {
                return
            }

            adapterListaZakupow.setSelection(view)
            actionMode = requireActivity().startActionMode(object : ActionMode.Callback {
                override fun onCreateActionMode(mode: ActionMode, menu: Menu): Boolean {
                    mode.menuInflater.inflate(R.menu.fragmentdokupieniacontext, menu)
                    return true
                }

                override fun onPrepareActionMode(mode: ActionMode, menu: Menu): Boolean {
                    return false
                }

                override fun onActionItemClicked(mode: ActionMode, item: MenuItem): Boolean {
                    val model = adapterListaZakupow.getItem(position)
                    val context = requireContext()
                    return when (item.itemId) {
                        R.id.fdcCena -> {
                            if (Permissions.hasInternet(context, view)
                            ) {
                                val ustawienia = Ustawienia(context)
                                WebAPI.pobierzCeny(
                                    ustawienia,
                                    model.nazwa,
                                    object : AsyncTaskRzadanie.Listener {
                                        override fun onPostExecute(response: Response) {
                                            if (response.isOK(false)) {
                                                startActivity(
                                                    Intent(context, ActivityKomunikat::class.java)
                                                        .putExtra(
                                                            ActivityKomunikat.IE_SKORKA,
                                                            if (ustawienia.getSkorkaCiemna(false))
                                                                R.style.AppThemeNight
                                                            else null
                                                        )
                                                        .putExtra(
                                                            ActivityKomunikat.IE_IKONA,
                                                            R.mipmap.ic_launcher_round
                                                        )
                                                        .putExtra(
                                                            ActivityKomunikat.IE_TYTUL,
                                                            getString(R.string.app_name)
                                                        )
                                                        .putExtra(
                                                            ActivityKomunikat.IE_KOMUNIKAT,
                                                            model.nazwa + ":\n"
                                                                    + WebAPI.filtruj(response.message)
                                                        )
                                                )
                                            }
                                        }
                                    }
                                )
                            }
                            mode.finish()
                            true
                        }

                        R.id.fdcUaktualnij -> {
                            DialogFragmentProdukt.newInstance(
                                this@FragmentDoKupienia,
                                position, model, adapterListaZakupow.repository.sklepy()
                            )
                                .show(requireActivity().supportFragmentManager, CONTEXT_UAKTUALNIJ)
                            WebAPI.wlaczInternet(context, view)
                            mode.finish()
                            true
                        }

                        R.id.fdcUsun -> {
                            adapterListaZakupow.moveItem(
                                position,
                                RepositoryListaZakupow.Lista.PRODUKTY
                            )
                            ustawKoszt()
                            mode.finish()
                            true
                        }

                        else -> false
                    }
                }

                override fun onDestroyActionMode(mode: ActionMode) {
                    actionMode = null
                    adapterListaZakupow.clearSelection()
                }
            })
        }
    }

    override fun onCreateView(li: LayoutInflater, vg: ViewGroup?, bundle: Bundle?): View {
        val view = li.inflate(R.layout.fragmentprodukty, vg, false)
        adapterListaZakupow = AdapterListaZakupow(
            (activity as RepositoryListaZakupow.IRepository)
                .getRepository()
        )
        adapterListaZakupow.setOnItemClickListener(onItemClickListener)
        adapterListaZakupow.setSelectedItemColor(
            ResourcesCompat
                .getColor(resources, R.color.colorAccent, null)
        )
        val recyclerView: RecyclerView = view.findViewById(R.id.fpListView)
        recyclerView.setHasFixedSize(true)
        recyclerView.adapter = adapterListaZakupow
        recyclerView.layoutManager = LinearLayoutManager(context)
        val fab: FloatingActionButton = view.findViewById(R.id.fab)
        fab.setImageResource(com.gmail.lesniakwojciech.commons.R.drawable.ic_send)
        fab.setOnClickListener { wyslijListeSMSem() }
        setHasOptionsMenu(true)
        return view
    }

    override fun onResume() {
        super.onResume()

        adapterListaZakupow.get(RepositoryListaZakupow.Lista.DO_KUPIENIA)
        ustawKoszt()
    }

    override fun onPause() {
        onItemClickListener.finish()

        super.onPause()
    }

    override fun onCreateOptionsMenu(menu: Menu, mi: MenuInflater) {
        mi.inflate(R.menu.fragmentdokupieniaoptions, menu)
    }

    override fun onOptionsItemSelected(mi: MenuItem): Boolean {
        return when (mi.itemId) {
            R.id.fdkoWyslijListeSMSem -> {
                wyslijListeSMSem()
                true
            }

            R.id.fdkoWyslijListe -> {
                wyslijListe(context!!)
                true
            }

            R.id.fdkoWyczysc -> {
                adapterListaZakupow.moveAll(RepositoryListaZakupow.Lista.PRODUKTY)
                ustawKoszt()
                true
            }

            else -> super.onOptionsItemSelected(mi)
        }
    }

    private fun wyslijListeSMSem() {
        if (adapterListaZakupow.repository.doWyslania(getString(R.string.do_kupienia))
                .isNotBlank()
        ) {
            val intent = Intent(Intent.ACTION_SENDTO)
                .setData(Uri.parse("smsto:"))
                .putExtra(
                    "sms_body",
                    adapterListaZakupow.repository.doWyslania(getString(R.string.do_kupienia))
                )
            startActivity(intent)
        }
    }

    private fun wyslijListe(context: Context) {
        Wiadomosci.obraz(
            context, UkrytaWiadomosc(context, adapterListaZakupow.getDatasetJSON())
                .przygotuj(R.raw.qr_code, R.string.nazwa_pliku)
        )
    }

    private fun ustawKoszt() {
        requireActivity().title = getString(R.string.app_name) + ": $" + ModelProdukt.formatCena(
            adapterListaZakupow.repository.koszt(RepositoryListaZakupow.Lista.DO_KUPIENIA)
        )
    }

    override fun onDialogNegativeClick(dialog: DialogFragment) {}
    override fun onDialogPositiveClick(dialog: DialogFragment, i: Int, model: ModelProdukt) {
        if (CONTEXT_UAKTUALNIJ == dialog.tag) {
            val context = requireContext()
            val ustawienia = Ustawienia(context)
            val view = requireView()
            if (adapterListaZakupow.updateItem(i, model)
                && ustawienia.getCenyUdostepniaj(false)
                && Permissions.hasInternet(context, view)
            ) {
                WebAPI.udostepnijCeny(ustawienia, model, object : AsyncTaskRzadanie.Listener {
                    override fun onPostExecute(response: Response) {
                    }
                })
            }
            ustawKoszt()
        }
    }
}
