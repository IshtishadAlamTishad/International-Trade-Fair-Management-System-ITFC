
header('Content-Type: application/json');
require_once '../../model/visitorModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';
	if ($action === 'create') {
		$VisitorID = $_POST['VisitorID'] ?? 0;
		$FirstName = $_POST['FirstName'] ?? '';
		$LastName = $_POST['LastName'] ?? '';
		$Contact = $_POST['Contact'] ?? '';
		$Phone = $_POST['Phone'] ?? '';
		$EmailAddress = $_POST['EmailAddress'] ?? '';
		$Interests = $_POST['Interests'] ?? '';
		insertVisitor($VisitorID, $FirstName, $LastName, $Contact, $Phone, $EmailAddress, $Interests);
		echo json_encode(['status' => 'success', 'message' => 'Visitor created']);
		exit;
	}
	if ($action === 'update') {
		$VisitorID = $_POST['VisitorID'] ?? 0;
		$FirstName = $_POST['FirstName'] ?? '';
		$LastName = $_POST['LastName'] ?? '';
		$Contact = $_POST['Contact'] ?? '';
		$Phone = $_POST['Phone'] ?? '';
		$EmailAddress = $_POST['EmailAddress'] ?? '';
		$Interests = $_POST['Interests'] ?? '';
		updateVisitor($VisitorID, $FirstName, $LastName, $Contact, $Phone, $EmailAddress, $Interests);
		echo json_encode(['status' => 'success', 'message' => 'Visitor updated']);
		exit;
	}
	if ($action === 'delete') {
		$VisitorID = $_POST['VisitorID'] ?? 0;
		deleteVisitor($VisitorID);
		echo json_encode(['status' => 'success', 'message' => 'Visitor deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['VisitorID'])) {
		$VisitorID = $_GET['VisitorID'];
		$visitor = getVisitorById($VisitorID);
		echo json_encode($visitor);
		exit;
	} else {
		$visitors = getAllVisitors();
		echo json_encode($visitors);
		exit;
	}
}
