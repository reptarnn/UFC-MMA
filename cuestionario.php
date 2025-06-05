<?php
$conexion = new mysqli("localhost", "root", "", "cuestionarios");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$satisfaccion = $_POST['satisfaccion'];
$peleadorFavorito = $_POST['peleadorFavorito'];
$masFuncionalidades = $_POST['masFuncionalidades'];

$sql = "INSERT INTO cuestionarios (satisfaccion, peleadorFavorito, masFuncionalidades)
        VALUES (?, ?, ?)";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("sss", $satisfaccion, $peleadorFavorito, $masFuncionalidades);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "error", "error" => $stmt->error]);
}

$stmt->close();
$conexion->close();
?>