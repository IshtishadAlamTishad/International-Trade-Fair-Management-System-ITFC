<?php 

	require_once 'db.php';


	function getAllExhibitors() {
        $conn = getConnection();

        $query = "SELECT * FROM Exhibitor";
        $statement = oci_parse($conn, $query);
        oci_execute($statement);

        $exhibitor = [];
        while ($row = oci_fetch_assoc($statement)) {
            $exhibitor[] = $row;
        }

        oci_free_statement($statement);
        return $exhibitor;
    }

    function getExhibitorById($ExhibitorID) {
        $conn = getConnection();

        $query = "SELECT * FROM Exhibitor WHERE ExhibitorID = $ExhibitorID";
        $statement = oci_parse($conn, $query);
        oci_execute($statement);

        $exhibitor = []; 
        while ($row = oci_fetch_assoc($statement)) {
            $exhibitor[] = $row;
        }

        oci_free_statement($statement);
        return $exhibitor; 
    }

    
    function insertExhibitor($ExhibitorID, $EName, $Contact, $Email, $Phone, $EmailAddress) {

        $conn = getConnection();

        $query = "INSERT INTO Exhibitor (ExhibitorID, EName, Contact, Email, Phone, EmailAddress) 
                VALUES ($ExhibitorID, $EName, $Contact, $Email, $Phone, $EmailAddress)";
        
        $statement = oci_parse($conn, $query);
        $result = oci_execute($statement);
        oci_free_statement($statement);

        return $result;
    }


    function updateExhibitor($ExhibitorID, $EName, $Contact, $Email, $Phone, $EmailAddress) {

        $conn = getConnection();

        $query = "UPDATE Exhibitor
                SET ExhibitorID='$ExhibitorID', EName=$EName, Contact='$Contact', Email=$Email, 
                    Phone=$Phone, EmailAddress='$EmailAddress'
                WHERE ExhibitorID=$ExhibitorID";
        
        $statement = oci_parse($conn, $query);
        $result = oci_execute($statement);
        oci_free_statement($statement);

        return $result;
    }


    function deleteExhibitor($ExhibitorID) {

        $conn = getConnection();

        $query = "DELETE FROM Exhibitor WHERE ExhibitorID=$ExhibitorID";
        $statement = oci_parse($conn, $query);
        $result = oci_execute($statement);
        oci_free_statement($statement);
        
        return $result;
    }


?>