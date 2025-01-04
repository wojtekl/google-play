<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require "./repository.php";

$country = "pl";
$httpAcceptLanguage = explode(",", $_SERVER["HTTP_ACCEPT_LANGUAGE"]);
if (isset($httpAcceptLanguage[0])) {
  $country = strtolower(substr(trim($httpAcceptLanguage[0]), 3));
}

if(isset($_GET["lang"])) {
  $country = strtolower(trim($_GET["lang"]));
}

$identyfikator = strtolower(trim($_POST["identyfikator"]));

switch (strtolower(trim($_SERVER["REQUEST_METHOD"]))) {
  case "post":
    post();
    break;
  case "put":
    put();
    break;
  case "delete":
    delete();
    break;
  default:
    get();
}

function get() {
  global $country, $identyfikator, $repository;
  $result = $repository -> getItem(trim($_GET["name"]));
  $list = "[";
  foreach ($result as $row) {
    $list .= "{\"store\": \"${row["SKLEP"]}\", \"price\": ${row["CENA"]}, \"posted\": \"${row["DODANO"]}\", \"coupon\": \"${row["COUPON"]}\", \"bulk\": \"${row["BULK"]}\", \"id\": ${row["ID"]}},";
  }
  $list .= "]";
  echo str_replace(",]", "]", $list);
}

function post() {
  global $country, $identyfikator, $repository;
  $item = trim($_POST["name"]);
  $store = strtolower(trim($_POST["store"]));
  $price = trim($_POST["price"]);
  $coupon = trim($_POST["coupon"]);
  $bulk = trim($_POST["bulk"]);
  if (isset($identyfikator) && isset($item) && isset($store) && isset($price) && isset($coupon) && isset($bulk)) {
    $repository -> insertPrice($item, $store, $price, $country, $identyfikator, $coupon ? 1 : 0, $bulk ? 1 : 0);
  }
}

function put() {
  global $country, $identyfikator, $repository;
}

function delete() {
  global $country, $identyfikator, $repository;
}

?>
