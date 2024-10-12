const pl = {
  loading: "Wczytuję...",
  produkt: "Produkt",
  sklep: "Sklep",
  cena: "Cena",
  dodano: "Dodano",
  pricey: "Pricey",
  getTheApp: "Zainstaluj Apkę!",
  newProduct: "Nowy produkt",
  updatePrice: "Aktualizuj cenę",
  back: "Powrót",
  name: "Nazwa",
  store: "Sklep",
  price: "Cena",
  more: "Więcej",
  cancel: "Zaniechaj",
  save: "Zachowaj",
}

const en = {
  loading: "Loading...",
  produkt: "Item",
  sklep: "Store",
  cena: "Price",
  dodano: "Posted",
  pricey: "Pricey",
  getTheApp: "Get the APP!",
  newProduct: "New Product",
  updatePrice: "Update Price",
  back: "Back",
  name: "Name",
  store: "Store",
  price: "Price",
  more: "More",
  cancel: "Cancel",
  save: "Save",
}

let localise = en;

let lang = new URLSearchParams(new URL(window.location).search).get("lang");
if (null == lang) lang = navigator.language.substring(3).toLocaleLowerCase();

if ('pl' === lang) {
  localise = pl;
}
