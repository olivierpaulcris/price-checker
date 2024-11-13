<?php

header('Access-Control-Allow-Methods: POST');

include('./connection.php');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['id'], $data['name'], $data['price'], $data['code'])) {
            $id = $data['id'];
            $name = $data['name'];
            $price = $data['price'];
            $code = $data['code'];

            $stmt = $dbcon->prepare("UPDATE products SET name = :name, price = :price, code = :code WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':code', $code);

            if ($stmt->execute()) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Producto actualizado exitosamente',
                    'product' => $updatedProduct
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'No se pudo actualizar el producto'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Datos incompletos'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Método no permitido'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error de base de datos: ' . $e->getMessage()
    ]);
}
?>
