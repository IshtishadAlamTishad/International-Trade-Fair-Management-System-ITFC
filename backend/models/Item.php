<?php
// Item.php - Example Model for CRUD operations
require_once 'Database.php';

function get_db_connection() {
    static $conn = null;
    if ($conn === null) {
        $config = include(__DIR__ . '/../config.php');
        $tns = "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=" . $config['host'] . ")(PORT=" . $config['port'] . "))(CONNECT_DATA=(SERVICE_NAME=" . $config['service'] . ")))";
        $conn = oci_connect($config['username'], $config['password'], $tns);
        if (!$conn) {
            $e = oci_error();
            die('Could not connect to Oracle: ' . $e['message']);
        }
    }
    return $conn;
}

function item_get_all() {
    $db = get_db_connection();
    $query = 'SELECT * FROM items';
    $stmt = oci_parse($db, $query);
    oci_execute($stmt);
    $result = [];
    while ($row = oci_fetch_assoc($stmt)) {
        $result[] = $row;
    }
    oci_free_statement($stmt);
    return $result;
}

function item_get_by_id($id) {
    $db = get_db_connection();
    $query = 'SELECT * FROM items WHERE id = :id';
    $stmt = oci_parse($db, $query);
    oci_bind_by_name($stmt, ':id', $id);
    oci_execute($stmt);
    $row = oci_fetch_assoc($stmt);
    oci_free_statement($stmt);
    return $row;
}

function item_create($name, $description) {
    $db = get_db_connection();
    $query = 'INSERT INTO items (name, description) VALUES (:name, :description)';
    $stmt = oci_parse($db, $query);
    oci_bind_by_name($stmt, ':name', $name);
    oci_bind_by_name($stmt, ':description', $description);
    $result = oci_execute($stmt, OCI_COMMIT_ON_SUCCESS);
    oci_free_statement($stmt);
    return $result;
}

function item_update_db($id, $name, $description) {
    $db = get_db_connection();
    $query = 'UPDATE items SET name = :name, description = :description WHERE id = :id';
    $stmt = oci_parse($db, $query);
    oci_bind_by_name($stmt, ':id', $id);
    oci_bind_by_name($stmt, ':name', $name);
    oci_bind_by_name($stmt, ':description', $description);
    $result = oci_execute($stmt, OCI_COMMIT_ON_SUCCESS);
    oci_free_statement($stmt);
    return $result;
}

function item_delete($id) {
    $db = get_db_connection();
    $query = 'DELETE FROM items WHERE id = :id';
    $stmt = oci_parse($db, $query);
    oci_bind_by_name($stmt, ':id', $id);
    $result = oci_execute($stmt, OCI_COMMIT_ON_SUCCESS);
    oci_free_statement($stmt);
    return $result;
}
