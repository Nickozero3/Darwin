<?php
// Incluir el archivo de conexión
include 'conexion.php';

// Consulta SQL para obtener los datos de la tabla
$sql = "SELECT Numero, Nombre, Dni, Telefono FROM Lista_Darwin";
$result = $conn->query($sql);

// Arreglo para almacenar los datos
$data = array();

// Iterar sobre los resultados de la consulta y agregar los datos al arreglo
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Cerrar la conexión
$conn->close();

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($data);