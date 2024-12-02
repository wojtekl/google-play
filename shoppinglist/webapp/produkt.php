<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require "./repository.php";

$kraj = "pl";
$httpAcceptLanguage = explode(",", $_SERVER["HTTP_ACCEPT_LANGUAGE"]);
if (isset($httpAcceptLanguage[0])) {
  $kraj = strtolower(substr(trim($httpAcceptLanguage[0]), 3));
}

if(isset($_GET["lang"])) {
  $kraj = strtolower(trim($_GET["lang"]));
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
  global $kraj, $identyfikator, $repository;
  $result = $repository -> getCeny(trim($_GET["nazwa"]));
  $list = "[";
  foreach ($result as $row) {
    $list .= "{\"sklep\": \"${row["SKLEP"]}\", \"cena\": \"${row["CENA"]}\", \"dodano\": \"${row["DODANO"]}\", \"coupon\": \"${row["COUPON"]}\", \"bulk\": \"${row["BULK"]}\"},";
  }
  $list .= "]";
  echo str_replace(",]", "]", $list);
}

function post() {
  global $kraj, $identyfikator, $repository;
  $produkt = trim($_POST["nazwa"]);
  $sklep = strtolower(trim($_POST["sklep"]));
  $cena = trim($_POST["cena"]);
  $coupon = trim($_POST["coupon"]);
  $bulk = trim($_POST["bulk"]);
  if (isset($identyfikator) && isset($produkt) && isset($sklep) && isset($cena) && isset($coupon) && isset($bulk)) {
    $repository -> insertCena($produkt, $sklep, $cena, $kraj, $identyfikator, $coupon ? 1 : 0, $bulk ? 1 : 0);
  }
}

function put() {
  global $kraj, $identyfikator, $repository;
}

function delete() {
  global $kraj, $identyfikator, $repository;
}

?>
