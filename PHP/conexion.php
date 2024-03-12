<?php
// Configuración de la conexión a la base de datos

// // CLEVER CLOUD
// $host = "ba1kevs6pkfgcauzroh0-mysql.services.clever-cloud.com";
// $user = "upqvy2lkrkj8hapn";
// $password = "r7CLnyBrOJWDHIORrjeF";
// $dataBaseName = "ba1kevs6pkfgcauzroh0";

// railway
session_start();
// $host = "viaduct.proxy.rlwy.net";
// $user = "root";
// $password = "udRoenMYkjdCqGTpgefMexuKbstfICrJ";
// $data_Base_Name = "railway";
// $DB_Port = "x";

// // Crear la conexión
// $conn = new mysqli($host, $user, $password, $data_Base_Name, $DB_Port);


$DB_HOST = $_ENV['DB_HOST'];
$DB_USER = $_ENV['DB_USER'];
$DB_PASSWORD = $_ENV['DB_PASSWORD'];
$DB_NAME = $_ENV['DB_NAME'];
$DB_PORT = $_ENV['DB_PORT'];



// Crear la conexión
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME, $DB_PORT);


// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
