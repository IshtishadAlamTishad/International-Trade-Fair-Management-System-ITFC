<?php 

	require_once 'db.php';

// Stall table: StallID, S_ize, Price, HallID

function getAllStalls() {
    $conn = getConnection();
    $query = "SELECT * FROM Stall";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $stalls = [];
    while ($row = oci_fetch_assoc($statement)) {
        $stalls[] = $row;
    }
    oci_free_statement($statement);
    return $stalls;
}

function getStallById($StallID) {
    $conn = getConnection();
    $query = "SELECT * FROM Stall WHERE StallID = $StallID";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $stall = [];
    while ($row = oci_fetch_assoc($statement)) {
        $stall[] = $row;
    }
    oci_free_statement($statement);
    return $stall;
}

function insertStall($StallID, $S_ize, $Price, $HallID) {
    $conn = getConnection();
    $query = "INSERT INTO Stall (StallID, S_ize, Price, HallID) VALUES ($StallID, '$S_ize', $Price, $HallID)";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function updateStall($StallID, $S_ize, $Price, $HallID) {
    $conn = getConnection();
    $query = "UPDATE Stall SET S_ize='$S_ize', Price=$Price, HallID=$HallID WHERE StallID=$StallID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function deleteStall($StallID) {
    $conn = getConnection();
    $query = "DELETE FROM Stall WHERE StallID=$StallID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

?>