<?php 

	require_once 'db.php';

// TradeFair table: FairID, TName, City, StartDate, EndDate, Duration

function getAllTradeFairs() {
    $conn = getConnection();
    $query = "SELECT * FROM TradeFair";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $fairs = [];
    while ($row = oci_fetch_assoc($statement)) {
        $fairs[] = $row;
    }
    oci_free_statement($statement);
    return $fairs;
}

function getTradeFairById($FairID) {
    $conn = getConnection();
    $query = "SELECT * FROM TradeFair WHERE FairID = $FairID";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $fair = [];
    while ($row = oci_fetch_assoc($statement)) {
        $fair[] = $row;
    }
    oci_free_statement($statement);
    return $fair;
}

function insertTradeFair($FairID, $TName, $City, $StartDate, $EndDate, $Duration) {
    $conn = getConnection();
    $query = "INSERT INTO TradeFair (FairID, TName, City, StartDate, EndDate, Duration) VALUES ($FairID, '$TName', '$City', TO_DATE('$StartDate', 'YYYY-MM-DD'), TO_DATE('$EndDate', 'YYYY-MM-DD'), $Duration)";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function updateTradeFair($FairID, $TName, $City, $StartDate, $EndDate, $Duration) {
    $conn = getConnection();
    $query = "UPDATE TradeFair SET TName='$TName', City='$City', StartDate=TO_DATE('$StartDate', 'YYYY-MM-DD'), EndDate=TO_DATE('$EndDate', 'YYYY-MM-DD'), Duration=$Duration WHERE FairID=$FairID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function deleteTradeFair($FairID) {
    $conn = getConnection();
    $query = "DELETE FROM TradeFair WHERE FairID=$FairID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

?>