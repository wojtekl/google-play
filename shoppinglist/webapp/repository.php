<?php

require "./_global.php";

class Repository {
  private $sql;
  
  public function __construct($SQL_HOST, $SQL_DATABASE, $SQL_USER, $SQL_PASSWORD) {
    $this -> sql = new PDO("mysql:host=$SQL_HOST;dbname=$SQL_DATABASE", $SQL_USER, $SQL_PASSWORD);
    
    $this -> sql -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  
  public function __destruct() {
    $this -> sql = null;
  }
  
  private function execute($dml) {
    try {
      $query = $this -> sql -> prepare($dml);
      $query -> execute();
      return $query -> fetchAll();
    }
    catch(PDOException $exception) {
      return $exception -> getMessage();
    }
  }
  
  public function insertCena($produkt, $sklep, $cena, $kraj, $identyfikator) {
    return $this -> execute("INSERT INTO `CENA` VALUES (0, '$produkt', '$sklep', '$cena', '$kraj', '$identyfikator', CURRENT_TIMESTAMP);");
  }
  
  public function getCeny($produkt) {
    return $this -> execute("SELECT `SKLEP`, `CENA`, `DODANO` FROM `CENA` WHERE `PRODUKT` = '$produkt' ORDER BY `CENA`, `DODANO` DESC, `SKLEP` LIMIT 10;");
  }
  
  public function getCenyAll($kraj) {
    return $this -> execute("SELECT `q2`.`PRODUKT` AS `PRODUKT`, COALESCE(`q1`.`SKLEP`, `q2`.`SKLEP`) AS `SKLEP`, COALESCE(CONVERT(`q1`.`CENA`, CHAR), CONVERT(`q2`.`CENA`, CHAR)) AS `CENA`, COALESCE(`q1`.`DODANO`, `q2`.`DODANO`) AS `DODANO` FROM (SELECT `PRODUKT`, `SKLEP`, `CENA`, `DODANO` FROM `CENA` `c1` WHERE `ID` = (SELECT `ID` FROM `CENA` WHERE `PRODUKT` = `c1`.`PRODUKT` AND `KRAJ` LIKE '%$kraj%' AND `DODANO` >= CURRENT_TIMESTAMP - INTERVAL 7 DAY ORDER BY `CENA` LIMIT 1)) `q1` RIGHT JOIN (SELECT `PRODUKT`, `SKLEP`, `CENA`, `DODANO` FROM `CENA` `c2` WHERE `ID` = (SELECT `ID` FROM `CENA` WHERE `PRODUKT` = `c2`.`PRODUKT` AND `KRAJ` LIKE '%$kraj%' ORDER BY `DODANO` DESC LIMIT 1)) `q2` ON `q2`.`PRODUKT` = `q1`.`PRODUKT` ORDER BY `DODANO` DESC;");
  }

  public function getUpdate($timestamp, $kraj) {
    return $this -> execute("SELECT `PRODUKT`, `SKLEP`, `CENA`, UNIX_TIMESTAMP(`DODANO`) * 1000 AS `DODANO` FROM `CENA` WHERE `KRAJ` = '$kraj' AND `DODANO` >= FROM_UNIXTIME('$timestamp' / 1000);");
  }
}

$repository = new Repository($SQL_HOST, $SQL_DATABASE, $SQL_USER, $SQL_PASSWORD);

?>
