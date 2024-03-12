<?php
// Configuración de la conexión a la base de datos

// CLEVER CLOUD
$host = "ba1kevs6pkfgcauzroh0-mysql.services.clever-cloud.com";
$user = "upqvy2lkrkj8hapn";
$password = "r7CLnyBrOJWDHIORrjeF";
$dataBaseName = "ba1kevs6pkfgcauzroh0";

// // railway
// $host = "viaduct.proxy.rlwy.net";
// $user = "root";
// $password = "GckmGXKHdfHoYOlqUdPEQWOzrpOIOEjT";
// $dataBaseName = "railway";



// Crear la conexión
$conn = new mysqli($host, $user, $password, $dataBaseName);


// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
