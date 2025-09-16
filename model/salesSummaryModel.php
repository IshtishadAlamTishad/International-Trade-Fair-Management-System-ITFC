<?php 

	require_once 'db.php';

// SalesSummary table: SummaryID, FairID, ExhibitorID, NoOfProductsSold, TotalSales

function getAllSalesSummaries() {
    $conn = getConnection();
    $query = "SELECT * FROM SalesSummary";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $summaries = [];
    while ($row = oci_fetch_assoc($statement)) {
        $summaries[] = $row;
    }
    oci_free_statement($statement);
    return $summaries;
}

function getSalesSummaryById($SummaryID) {
    $conn = getConnection();
    $query = "SELECT * FROM SalesSummary WHERE SummaryID = $SummaryID";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $summary = [];
    while ($row = oci_fetch_assoc($statement)) {
        $summary[] = $row;
    }
    oci_free_statement($statement);
    return $summary;
}

function insertSalesSummary($SummaryID, $FairID, $ExhibitorID, $NoOfProductsSold, $TotalSales) {
    $conn = getConnection();
    $query = "INSERT INTO SalesSummary (SummaryID, FairID, ExhibitorID, NoOfProductsSold, TotalSales) VALUES ($SummaryID, $FairID, $ExhibitorID, $NoOfProductsSold, $TotalSales)";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function updateSalesSummary($SummaryID, $FairID, $ExhibitorID, $NoOfProductsSold, $TotalSales) {
    $conn = getConnection();
    $query = "UPDATE SalesSummary SET FairID=$FairID, ExhibitorID=$ExhibitorID, NoOfProductsSold=$NoOfProductsSold, TotalSales=$TotalSales WHERE SummaryID=$SummaryID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function deleteSalesSummary($SummaryID) {
    $conn = getConnection();
    $query = "DELETE FROM SalesSummary WHERE SummaryID=$SummaryID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

?>