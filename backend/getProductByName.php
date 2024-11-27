<?php

header('Access-Control-Allow-Methods: GET');

include('./connection.php');

try {
    $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
    $sql = "SELECT id, code, name, image, price, date FROM products WHERE name LIKE '%".$name."%' LIMIT 1;";
    $stmt = $dbcon->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json');
    echo json_encode($products);
} catch (PDOException $e) {
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
