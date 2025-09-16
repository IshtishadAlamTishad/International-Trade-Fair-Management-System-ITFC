<?php
function getConnection() {
    static $conn;

    if (!$conn) {
        $username = 'TradeFair';
        $password = 'admin123';
        $sid = 'XE'; 
        $host = 'localhost';

        $conn = oci_connect($username, $password, "$host/$sid");

        if (!$conn) {
            $error = oci_error();
            error_log("Oracle connection failed: " . $error['message']);
            die("Connection failed: " . $error['message']);
        } else {
            error_log("Oracle connection successful");
        }
    }
    return $conn;
}
?>