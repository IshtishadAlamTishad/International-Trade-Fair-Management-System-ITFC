<?php 

	require_once 'db.php';

// Payment table: PaymentID, Amount, PaymentMode, TransactionID, Status, ExhibitorID

function getAllPayments() {
    $conn = getConnection();
    $query = "SELECT * FROM Payment";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $payments = [];
    while ($row = oci_fetch_assoc($statement)) {
        $payments[] = $row;
    }
    oci_free_statement($statement);
    return $payments;
}

function getPaymentById($PaymentID) {
    $conn = getConnection();
    $query = "SELECT * FROM Payment WHERE PaymentID = $PaymentID";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $payment = [];
    while ($row = oci_fetch_assoc($statement)) {
        $payment[] = $row;
    }
    oci_free_statement($statement);
    return $payment;
}

function insertPayment($PaymentID, $Amount, $PaymentMode, $TransactionID, $Status, $ExhibitorID) {
    $conn = getConnection();
    $query = "INSERT INTO Payment (PaymentID, Amount, PaymentMode, TransactionID, Status, ExhibitorID) VALUES ($PaymentID, $Amount, '$PaymentMode', '$TransactionID', '$Status', $ExhibitorID)";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function updatePayment($PaymentID, $Amount, $PaymentMode, $TransactionID, $Status, $ExhibitorID) {
    $conn = getConnection();
    $query = "UPDATE Payment SET Amount=$Amount, PaymentMode='$PaymentMode', TransactionID='$TransactionID', Status='$Status', ExhibitorID=$ExhibitorID WHERE PaymentID=$PaymentID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function deletePayment($PaymentID) {
    $conn = getConnection();
    $query = "DELETE FROM Payment WHERE PaymentID=$PaymentID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

?>