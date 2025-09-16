
header('Content-Type: application/json');
require_once '../../model/visitorInterestModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';
	if ($action === 'create') {
		$VisitorID = $_POST['VisitorID'] ?? 0;
		$Interest = $_POST['Interest'] ?? '';
		insertVisitorInterest($VisitorID, $Interest);
		echo json_encode(['status' => 'success', 'message' => 'Visitor interest created']);
		exit;
	}
	if ($action === 'update') {
		$VisitorID = $_POST['VisitorID'] ?? 0;
		$OldInterest = $_POST['OldInterest'] ?? '';
		$NewInterest = $_POST['NewInterest'] ?? '';
		updateVisitorInterest($VisitorID, $OldInterest, $NewInterest);
		echo json_encode(['status' => 'success', 'message' => 'Visitor interest updated']);
		exit;
	}
	if ($action === 'delete') {
		$VisitorID = $_POST['VisitorID'] ?? 0;
		$Interest = $_POST['Interest'] ?? '';
		deleteVisitorInterest($VisitorID, $Interest);
		echo json_encode(['status' => 'success', 'message' => 'Visitor interest deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['VisitorID']) && isset($_GET['Interest'])) {
		$VisitorID = $_GET['VisitorID'];
		$Interest = $_GET['Interest'];
		$interest = getVisitorInterest($VisitorID, $Interest);
		echo json_encode($interest);
		exit;
	} else {
		$interests = getAllVisitorInterests();
		echo json_encode($interests);
		exit;
	}
}
