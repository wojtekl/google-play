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
  search: "Szukaj",
  back: "Powrót",
  name: "Nazwa",
  store: "Sklep",
  price: "Cena",
  coupon: "Z kartą",
  bulk: "Kilka",
  more: "Historia",
  cancel: "Zaniechaj",
  save: "Zachowaj",
  support: "Wesprzyj :)",
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
  search: "Search",
  back: "Back",
  name: "Name",
  store: "Store",
  price: "Price",
  coupon: "Coupon",
  bulk: "Bulk",
  more: "Details",
  cancel: "Cancel",
  save: "Save",
  support: "Donate :)",
}

let localise = en;

let lang = new URLSearchParams(new URL(window.location).search).get("lang");
if (null == lang) lang = navigator.language.substring(3).toLocaleLowerCase();

if ('pl' === lang) {
  localise = pl;
}
