<?php 

	require_once 'db.php';


	function getAllVisitors() {
        $conn = getConnection();
        $query = "SELECT * FROM Visitor";
        $statement = oci_parse($conn, $query);
        oci_execute($statement);
        $visitors = [];
        while ($row = oci_fetch_assoc($statement)) {
            $visitors[] = $row;
        }
        oci_free_statement($statement);
        return $visitors;
    }

    function getVisitorById($VisitorID) {
        $conn = getConnection();
        $query = "SELECT * FROM Visitor WHERE VisitorID = $VisitorID";
        $statement = oci_parse($conn, $query);
        oci_execute($statement);
        $visitor = [];
        while ($row = oci_fetch_assoc($statement)) {
            $visitor[] = $row;
        }
        oci_free_statement($statement);
        return $visitor;
    }

    function insertVisitor($VisitorID, $FirstName, $LastName, $Contact, $Phone, $EmailAddress, $Interests) {
        $conn = getConnection();
        $query = "INSERT INTO Visitor (VisitorID, FirstName, LastName, Contact, Phone, EmailAddress, Interests) 
                VALUES ($VisitorID, '$FirstName', '$LastName', '$Contact', '$Phone', '$EmailAddress', '$Interests')";
        $statement = oci_parse($conn, $query);
        $result = oci_execute($statement);
        oci_free_statement($statement);
        return $result;
    }

    function updateVisitor($VisitorID, $FirstName, $LastName, $Contact, $Phone, $EmailAddress, $Interests) {
        $conn = getConnection();
        $query = "UPDATE Visitor
                SET FirstName='$FirstName', LastName='$LastName', Contact='$Contact', Phone='$Phone', EmailAddress='$EmailAddress', Interests='$Interests'
                WHERE VisitorID=$VisitorID";
        $statement = oci_parse($conn, $query);
        $result = oci_execute($statement);
        oci_free_statement($statement);
        return $result;
    }

    function deleteVisitor($VisitorID) {
        $conn = getConnection();
        $query = "DELETE FROM Visitor WHERE VisitorID=$VisitorID";
        $statement = oci_parse($conn, $query);
        $result = oci_execute($statement);
        oci_free_statement($statement);
        return $result;
    }


?>