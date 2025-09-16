<?php 

	require_once 'db.php';

// Ticket table: TicketID, Type, Price, PurchaseDate, FairID, VisitorID

function getAllTickets() {
    $conn = getConnection();
    $query = "SELECT * FROM Ticket";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $tickets = [];
    while ($row = oci_fetch_assoc($statement)) {
        $tickets[] = $row;
    }
    oci_free_statement($statement);
    return $tickets;
}

function getTicketById($TicketID) {
    $conn = getConnection();
    $query = "SELECT * FROM Ticket WHERE TicketID = $TicketID";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $ticket = [];
    while ($row = oci_fetch_assoc($statement)) {
        $ticket[] = $row;
    }
    oci_free_statement($statement);
    return $ticket;
}

function insertTicket($TicketID, $Type, $Price, $PurchaseDate, $FairID, $VisitorID) {
    $conn = getConnection();
    $query = "INSERT INTO Ticket (TicketID, Type, Price, PurchaseDate, FairID, VisitorID) VALUES ($TicketID, '$Type', $Price, TO_DATE('$PurchaseDate', 'YYYY-MM-DD'), $FairID, $VisitorID)";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function updateTicket($TicketID, $Type, $Price, $PurchaseDate, $FairID, $VisitorID) {
    $conn = getConnection();
    $query = "UPDATE Ticket SET Type='$Type', Price=$Price, PurchaseDate=TO_DATE('$PurchaseDate', 'YYYY-MM-DD'), FairID=$FairID, VisitorID=$VisitorID WHERE TicketID=$TicketID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function deleteTicket($TicketID) {
    $conn = getConnection();
    $query = "DELETE FROM Ticket WHERE TicketID=$TicketID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

?>