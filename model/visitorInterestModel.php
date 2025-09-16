<?php 

	require_once 'db.php';

// VisitorInterest table: VisitorID, Interest

function getAllVisitorInterests() {
    $conn = getConnection();
    $query = "SELECT * FROM VisitorInterest";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $interests = [];
    while ($row = oci_fetch_assoc($statement)) {
        $interests[] = $row;
    }
    oci_free_statement($statement);
    return $interests;
}

function getVisitorInterest($VisitorID, $Interest) {
    $conn = getConnection();
    $query = "SELECT * FROM VisitorInterest WHERE VisitorID = $VisitorID AND Interest = '$Interest'";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $interest = [];
    while ($row = oci_fetch_assoc($statement)) {
        $interest[] = $row;
    }
    oci_free_statement($statement);
    return $interest;
}

function insertVisitorInterest($VisitorID, $Interest) {
    $conn = getConnection();
    $query = "INSERT INTO VisitorInterest (VisitorID, Interest) VALUES ($VisitorID, '$Interest')";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function updateVisitorInterest($VisitorID, $OldInterest, $NewInterest) {
    $conn = getConnection();
    $query = "UPDATE VisitorInterest SET Interest='$NewInterest' WHERE VisitorID=$VisitorID AND Interest='$OldInterest'";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function deleteVisitorInterest($VisitorID, $Interest) {
    $conn = getConnection();
    $query = "DELETE FROM VisitorInterest WHERE VisitorID=$VisitorID AND Interest='$Interest'";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

?>