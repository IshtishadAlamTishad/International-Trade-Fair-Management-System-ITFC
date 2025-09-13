<?php
// Database.php - Handles Oracle DB connection
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
