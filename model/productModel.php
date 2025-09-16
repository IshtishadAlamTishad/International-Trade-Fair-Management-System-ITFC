<?php 

	require_once 'db.php';

// Product table: ProductID, PName, Category, Description, Price, Stock, ExhibitorID

function getAllProducts() {
    $conn = getConnection();
    $query = "SELECT * FROM Product";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $products = [];
    while ($row = oci_fetch_assoc($statement)) {
        $products[] = $row;
    }
    oci_free_statement($statement);
    return $products;
}

function getProductById($ProductID) {
    $conn = getConnection();
    $query = "SELECT * FROM Product WHERE ProductID = $ProductID";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $product = [];
    while ($row = oci_fetch_assoc($statement)) {
        $product[] = $row;
    }
    oci_free_statement($statement);
    return $product;
}

function insertProduct($ProductID, $PName, $Category, $Description, $Price, $Stock, $ExhibitorID) {
    $conn = getConnection();
    $query = "INSERT INTO Product (ProductID, PName, Category, Description, Price, Stock, ExhibitorID) VALUES ($ProductID, '$PName', '$Category', '$Description', $Price, $Stock, $ExhibitorID)";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function updateProduct($ProductID, $PName, $Category, $Description, $Price, $Stock, $ExhibitorID) {
    $conn = getConnection();
    $query = "UPDATE Product SET PName='$PName', Category='$Category', Description='$Description', Price=$Price, Stock=$Stock, ExhibitorID=$ExhibitorID WHERE ProductID=$ProductID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function deleteProduct($ProductID) {
    $conn = getConnection();
    $query = "DELETE FROM Product WHERE ProductID=$ProductID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

?>