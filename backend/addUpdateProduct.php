<?php

header('Access-Control-Allow-Methods: POST');

include('./connection.php');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['name'], $data['price'], $data['code'])) {
            $name = $data['name'];
            $price = $data['price'];
            $code = $data['code'];

            $checkStmt = $dbcon->prepare("SELECT id FROM products WHERE code = :code");
            $checkStmt->bindParam(':code', $code);
            $checkStmt->execute();

            if ($checkStmt->rowCount() > 0) {
                // Si existe, actualizamos
                $existingProduct = $checkStmt->fetch(PDO::FETCH_ASSOC);
                $id = $existingProduct['id'];

                $updateStmt = $dbcon->prepare("UPDATE products SET name = :name, price = :price WHERE id = :id");
                $updateStmt->bindParam(':name', $name);
                $updateStmt->bindParam(':price', $price);
                $updateStmt->bindParam(':id', $id);

                if ($updateStmt->execute()) {
                    echo json_encode([
                        'success' => true,
                        'message' => 'Producto actualizado exitosamente',
                        'product' => [
                            'id' => $id,
                            'name' => $name,
                            'price' => $price,
                            'code' => $code
                        ]
                    ]);
                } else {
                    echo json_encode([
                        'success' => false,
                        'message' => 'No se pudo actualizar el producto'
                    ]);
                }
            } else {
                // Si no existe, insertamos
                $insertStmt = $dbcon->prepare("INSERT INTO products (name, price, code) VALUES (:name, :price, :code)");
                $insertStmt->bindParam(':name', $name);
                $insertStmt->bindParam(':price', $price);
                $insertStmt->bindParam(':code', $code);

                if ($insertStmt->execute()) {
                    $insertedId = $dbcon->lastInsertId();

                    echo json_encode([
                        'success' => true,
                        'message' => 'Producto insertado exitosamente',
                        'product' => [
                            'id' => $insertedId,
                            'name' => $name,
                            'price' => $price,
                            'code' => $code
                        ]
                    ]);
                } else {
                    echo json_encode([
                        'success' => false,
                        'message' => 'No se pudo insertar el producto'
                    ]);
                }
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
