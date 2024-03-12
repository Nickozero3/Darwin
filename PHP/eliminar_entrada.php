<?php
// Incluir el archivo de conexión
include '/app/conexion.php';
// // Verificar si se ha enviado el número a través de POST
// if (isset($_POST['numero'])) {
//     $numero = $_POST['numero'];
//     echo "El número enviado es: " . $numero;
// } else {
//     echo "No se ha enviado ningún número.";
// }


// Obtener el número de la entrada a eliminar
$Numero = $_POST['numero'];


// Preparar la consulta SQL
$sql = "DELETE FROM Lista_Darwin WHERE Numero = '$Numero'";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Entrada eliminada correctamente.";
    header("Location: {$_SERVER['HTTP_REFERER']}");
} else {
    echo "Error al eliminar la entrada: " . $conn->error;
    header("Location: {$_SERVER['HTTP_REFERER']}");
}

// Cerrar la conexión
$conn->close();
