<?php 

	require_once 'db.php';

// Hall table: HallID, HName, Location, BuildingName, Floor, AptNo, FairID

function getAllHalls() {
    $conn = getConnection();
    $query = "SELECT * FROM Hall";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $halls = [];
    while ($row = oci_fetch_assoc($statement)) {
        $halls[] = $row;
    }
    oci_free_statement($statement);
    return $halls;
}

function getHallById($HallID) {
    $conn = getConnection();
    $query = "SELECT * FROM Hall WHERE HallID = $HallID";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $hall = [];
    while ($row = oci_fetch_assoc($statement)) {
        $hall[] = $row;
    }
    oci_free_statement($statement);
    return $hall;
}

function insertHall($HallID, $HName, $Location, $BuildingName, $Floor, $AptNo, $FairID) {
    $conn = getConnection();
    $query = "INSERT INTO Hall (HallID, HName, Location, BuildingName, Floor, AptNo, FairID) VALUES ($HallID, '$HName', '$Location', '$BuildingName', $Floor, '$AptNo', $FairID)";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function updateHall($HallID, $HName, $Location, $BuildingName, $Floor, $AptNo, $FairID) {
    $conn = getConnection();
    $query = "UPDATE Hall SET HName='$HName', Location='$Location', BuildingName='$BuildingName', Floor=$Floor, AptNo='$AptNo', FairID=$FairID WHERE HallID=$HallID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function deleteHall($HallID) {
    $conn = getConnection();
    $query = "DELETE FROM Hall WHERE HallID=$HallID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

?>