
header('Content-Type: application/json');
require_once '../../model/feedbackModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';
	if ($action === 'create') {
		$FeedbackID = $_POST['FeedbackID'] ?? 0;
		$FairID = $_POST['FairID'] ?? 0;
		$VisitorID = $_POST['VisitorID'] ?? 0;
		$Rating = $_POST['Rating'] ?? 0;
		$Comments = $_POST['Comments'] ?? '';
		insertFeedback($FeedbackID, $FairID, $VisitorID, $Rating, $Comments);
		echo json_encode(['status' => 'success', 'message' => 'Feedback created']);
		exit;
	}
	if ($action === 'update') {
		$FeedbackID = $_POST['FeedbackID'] ?? 0;
		$FairID = $_POST['FairID'] ?? 0;
		$VisitorID = $_POST['VisitorID'] ?? 0;
		$Rating = $_POST['Rating'] ?? 0;
		$Comments = $_POST['Comments'] ?? '';
		updateFeedback($FeedbackID, $FairID, $VisitorID, $Rating, $Comments);
		echo json_encode(['status' => 'success', 'message' => 'Feedback updated']);
		exit;
	}
	if ($action === 'delete') {
		$FeedbackID = $_POST['FeedbackID'] ?? 0;
		deleteFeedback($FeedbackID);
		echo json_encode(['status' => 'success', 'message' => 'Feedback deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['FeedbackID'])) {
		$FeedbackID = $_GET['FeedbackID'];
		$feedback = getFeedbackById($FeedbackID);
		echo json_encode($feedback);
		exit;
	} else {
		$feedbacks = getAllFeedbacks();
		echo json_encode($feedbacks);
		exit;
	}
}
