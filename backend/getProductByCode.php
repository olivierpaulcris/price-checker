<?php

header('Access-Control-Allow-Methods: GET');

include('./connection.php');

try {
    $code = isset($_REQUEST['code']) ? $_REQUEST['code'] : '';
    $sql = "SELECT id, code, name, image, price, date FROM products WHERE code = '".$code."' LIMIT 1;";
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
