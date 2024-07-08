const pl = {
  listaZakupow: "Lista zakupów",
  aplikacjaListaZakupow: "Aplikacja Lista zakupów",
  kalendarz: "Kalendarz",
  aplikacjaKalendarz: "Aplikacja Kalendarz",
  launcher: "Launcher",
  launcherDlaAndroida: "Launcher dla Androida",
  puste: "Puste",
  zobacz: "Zobacz",
  powrot: "Powrót",
  wiecej: "Więcej",
  produkt: "Produkt",
  sklep: "Sklep",
  cena: "Cena",
  dodano: "Dodano",
  zainstalujApke: "Zainstaluj Apkę!",
  zobaczWktorym: "Zobacz w którym markecie najtaniej!",
  goOffline: "GoOffline",
  talkieTalkie: "TalkieTalkie"
}

const en = {
  listaZakupow: "Shopping List",
  aplikacjaListaZakupow: "Shopping List app",
  kalendarz: "Calendar",
  aplikacjaKalendarz: "Calendar app",
  launcher: "Launcher",
  launcherDlaAndroida: "Launcher for Android",
  puste: "Empty",
  zobacz: "Go",
  powrot: "Back",
  wiecej: "More",
  produkt: "Item",
  sklep: "Store",
  cena: "Price",
  dodano: "Posted",
  zainstalujApke: "Get the APP!",
  zobaczWktorym: "Check the prices!",
  goOffline: "GoOffline",
  talkieTalkie: "TalkieTalkie"
}

let localise = en;

let lang = new URLSearchParams(new URL(window.location).search).get("lang");
if (null == lang) lang = navigator.language;

if ('pl' === lang || 'pl-PL' === lang) {
  localise = pl;
}
