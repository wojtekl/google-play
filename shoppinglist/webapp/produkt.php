<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require "repository.php";

$kraj = "pl";
$httpAcceptLanguage = explode(",", $_SERVER["HTTP_ACCEPT_LANGUAGE"]);
if (isset($httpAcceptLanguage[0])) {
  $kraj = strtolower(substr($httpAcceptLanguage[0], 3));
}

if(isset($_GET["lang"])) {
  $kraj = $_GET["lang"];
}

$identyfikator = $_POST["identyfikator"];

switch ($_SERVER["REQUEST_METHOD"]) {
  case "POST":
    post();
    break;
  case "PUT":
    put();
    break;
  case "DELETE":
    delete();
    break;
  default:
    get();
}

function get() {
  header("Content-Type: application/json");
  global $kraj, $identyfikator, $repository;
  $result = $repository -> getCeny($_GET["nazwa"]);
  $list = "[";
  foreach ($result as $row) {
    $list .= "{\"sklep\": \"${row["SKLEP"]}\", \"cena\": \"${row["CENA"]}\", \"dodano\": \"${row["DODANO"]}\"},";
  }
  $list .= "]";
  echo str_replace(",]", "]", $list);
}

function post() {
  header("Content-Type: application/json");
  global $kraj, $identyfikator, $repository;
  $produkt = $_POST["nazwa"];
  $sklep = $_POST["sklep"];
  $cena = $_POST["cena"];
  if (isset($identyfikator) && isset($produkt) && isset($sklep) && isset($cena))
    $repository -> insertCena($produkt, $sklep, $cena, $kraj, $identyfikator);
}

function put() {
  header("Content-Type: application/json");
  global $kraj, $identyfikator, $repository;
}

function delete() {
  header("Content-Type: application/json");
  global $kraj, $identyfikator, $repository;
}

?>
