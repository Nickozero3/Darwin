<?php
// Incluir el archivo de conexión
include '/app/conexion.php';

// Obtener los datos del formulario
$number = $_POST['number'];
$name = $_POST['name'];
$dni = $_POST['dni'];
$phone = $_POST['phone'];

// Preparar la consulta SQL
$sql = "INSERT INTO Lista_Darwin(Numero, Nombre, Dni, Telefono) VALUES ('$number', '$name', '$dni', '$phone')";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    $message = "Datos insertados correctamente.";
    header("Location: {$_SERVER['HTTP_REFERER']}");
} else {
    $message = "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar la conexión
$conn->close();
