<?php
header("Content-Type: application/json");

try {
  $conn = new PDO("mysql:host=localhost;dbname=database_name", "user_name", "password");
  $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt= $conn -> prepare(file_get_contents("setup.sql"));
  $stmt -> execute();
  $conn = null;
}
catch(PDOException $e) {
  echo $e -> getMessage();
}
?>
