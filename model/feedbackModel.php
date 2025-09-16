<?php 

	require_once 'db.php';


/*
CREATE TABLE Feedback (
    FeedbackID,FairID,VisitorID ,Rating,Comments,
    FOREIGN KEY (FairID) REFERENCES TradeFair(FairID),
    FOREIGN KEY (VisitorID) REFERENCES Visitor(VisitorID)
);

*/



	function getAllFeedbacks() {
    $conn = getConnection();
    $query = "SELECT * FROM Feedback";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $feedbacks = [];
    while ($row = oci_fetch_assoc($statement)) {
        $feedbacks[] = $row;
    }
    oci_free_statement($statement);
    return $feedbacks;
}

function getFeedbackById($FeedbackID) {
    $conn = getConnection();
    $query = "SELECT * FROM Feedback WHERE FeedbackID = $FeedbackID";
    $statement = oci_parse($conn, $query);
    oci_execute($statement);
    $feedback = [];
    while ($row = oci_fetch_assoc($statement)) {
        $feedback[] = $row;
    }
    oci_free_statement($statement);
    return $feedback;
}

function insertFeedback($FeedbackID, $FairID, $VisitorID, $Rating, $Comments) {
    $conn = getConnection();
    $query = "INSERT INTO Feedback (FeedbackID, FairID, VisitorID, Rating, Comments) VALUES ($FeedbackID, $FairID, $VisitorID, $Rating, '$Comments')";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function updateFeedback($FeedbackID, $FairID, $VisitorID, $Rating, $Comments) {
    $conn = getConnection();
    $query = "UPDATE Feedback SET FairID=$FairID, VisitorID=$VisitorID, Rating=$Rating, Comments='$Comments' WHERE FeedbackID=$FeedbackID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

function deleteFeedback($FeedbackID) {
    $conn = getConnection();
    $query = "DELETE FROM Feedback WHERE FeedbackID=$FeedbackID";
    $statement = oci_parse($conn, $query);
    $result = oci_execute($statement);
    oci_free_statement($statement);
    return $result;
}

?>