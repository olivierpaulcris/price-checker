<?php
$host = 'localhost';
$dbname = 'price-checker';
$username = 'root';
$password = '';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

try{

    $dbcon = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}catch(PDOException $ex){

    die($ex->getMessage());

}
?>