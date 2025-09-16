
header('Content-Type: application/json');
require_once '../../model/exhibitorModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';
	if ($action === 'create') {
		$ExhibitorID = $_POST['ExhibitorID'] ?? 0;
		$EName = $_POST['EName'] ?? '';
		$Contact = $_POST['Contact'] ?? '';
		$Email = $_POST['Email'] ?? '';
		$Phone = $_POST['Phone'] ?? '';
		$EmailAddress = $_POST['EmailAddress'] ?? '';
		insertExhibitor($ExhibitorID, $EName, $Contact, $Email, $Phone, $EmailAddress);
		echo json_encode(['status' => 'success', 'message' => 'Exhibitor created']);
		exit;
	}
	if ($action === 'update') {
		$ExhibitorID = $_POST['ExhibitorID'] ?? 0;
		$EName = $_POST['EName'] ?? '';
		$Contact = $_POST['Contact'] ?? '';
		$Email = $_POST['Email'] ?? '';
		$Phone = $_POST['Phone'] ?? '';
		$EmailAddress = $_POST['EmailAddress'] ?? '';
		updateExhibitor($ExhibitorID, $EName, $Contact, $Email, $Phone, $EmailAddress);
		echo json_encode(['status' => 'success', 'message' => 'Exhibitor updated']);
		exit;
	}
	if ($action === 'delete') {
		$ExhibitorID = $_POST['ExhibitorID'] ?? 0;
		deleteExhibitor($ExhibitorID);
		echo json_encode(['status' => 'success', 'message' => 'Exhibitor deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['ExhibitorID'])) {
		$ExhibitorID = $_GET['ExhibitorID'];
		$exhibitor = getExhibitorById($ExhibitorID);
		echo json_encode($exhibitor);
		exit;
	} else {
		$exhibitors = getAllExhibitors();
		echo json_encode($exhibitors);
		exit;
	}
}
