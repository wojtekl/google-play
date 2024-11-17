<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require "repository.php";

$kraj = "pl";
$httpAcceptLanguage = explode(",", $_SERVER["HTTP_ACCEPT_LANGUAGE"]);
if (isset($httpAcceptLanguage[0])) {
  $kraj = strtolower(substr(trim($httpAcceptLanguage[0]), 3));
}

if(isset($_GET["lang"])) {
  $kraj = strtolower(trim($_GET["lang"]));
}

$identyfikator = strtolower(trim($_GET["identyfikator"]));

$timestamp= trim($_GET["timestamp"]);

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
  $result = $repository -> getCenyAll($kraj);
  $list = "[";
  foreach ($result as $row) {
    $list .= "[\"${row["PRODUKT"]}\", \"${row["SKLEP"]}\", \"${row["CENA"]}\", 0],";
  }
  $list .= "]";
  echo str_replace(",]", "]", $list);
}

function post() {
  global $kraj, $identyfikator, $timestamp, $repository;
  $result = $timestamp != "" ? $repository -> getUpdate($timestamp, $kraj) : $repository -> getCenyAll($kraj);
  $list = "[";
  foreach ($result as $row) {
    $list .= "{\"produkt\": \"${row["PRODUKT"]}\", \"sklep\": \"${row["SKLEP"]}\", \"cena\": \"${row["CENA"]}\", \"dodano\": \"${row["DODANO"]}\"},";
  }
  $list .= "]";
  echo str_replace(",]", "]", $list);
}

function put() {
  global $kraj, $identyfikator, $repository;
}

function delete() {
  global $kraj, $identyfikator, $repository;
}

?>
