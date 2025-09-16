
header('Content-Type: application/json');
require_once '../../model/stallModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';
	if ($action === 'create') {
		$StallID = $_POST['StallID'] ?? 0;
		$S_ize = $_POST['S_ize'] ?? '';
		$Price = $_POST['Price'] ?? 0;
		$HallID = $_POST['HallID'] ?? 0;
		insertStall($StallID, $S_ize, $Price, $HallID);
		echo json_encode(['status' => 'success', 'message' => 'Stall created']);
		exit;
	}
	if ($action === 'update') {
		$StallID = $_POST['StallID'] ?? 0;
		$S_ize = $_POST['S_ize'] ?? '';
		$Price = $_POST['Price'] ?? 0;
		$HallID = $_POST['HallID'] ?? 0;
		updateStall($StallID, $S_ize, $Price, $HallID);
		echo json_encode(['status' => 'success', 'message' => 'Stall updated']);
		exit;
	}
	if ($action === 'delete') {
		$StallID = $_POST['StallID'] ?? 0;
		deleteStall($StallID);
		echo json_encode(['status' => 'success', 'message' => 'Stall deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['StallID'])) {
		$StallID = $_GET['StallID'];
		$stall = getStallById($StallID);
		echo json_encode($stall);
		exit;
	} else {
		$stalls = getAllStalls();
		echo json_encode($stalls);
		exit;
	}
}
