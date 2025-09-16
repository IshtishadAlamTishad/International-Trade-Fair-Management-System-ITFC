
header('Content-Type: application/json');
require_once '../../model/hallModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';

	if ($action === 'create') {
		$HName = $_POST['HName'] ?? '';
		$Location = $_POST['Location'] ?? '';
		$BuildingName = $_POST['BuildingName'] ?? '';
		$Floor = $_POST['Floor'] ?? 0;
		$AptNo = $_POST['AptNo'] ?? '';
		$FairID = $_POST['FairID'] ?? 0;
		// HallID is usually auto-increment, but if needed:
		$HallID = $_POST['HallID'] ?? 0;
		insertHall($HallID, $HName, $Location, $BuildingName, $Floor, $AptNo, $FairID);
		echo json_encode(['status' => 'success', 'message' => 'Hall created']);
		exit;
	}
	if ($action === 'update') {
		$HallID = $_POST['HallID'] ?? 0;
		$HName = $_POST['HName'] ?? '';
		$Location = $_POST['Location'] ?? '';
		$BuildingName = $_POST['BuildingName'] ?? '';
		$Floor = $_POST['Floor'] ?? 0;
		$AptNo = $_POST['AptNo'] ?? '';
		$FairID = $_POST['FairID'] ?? 0;
		updateHall($HallID, $HName, $Location, $BuildingName, $Floor, $AptNo, $FairID);
		echo json_encode(['status' => 'success', 'message' => 'Hall updated']);
		exit;
	}
	if ($action === 'delete') {
		$HallID = $_POST['HallID'] ?? 0;
		deleteHall($HallID);
		echo json_encode(['status' => 'success', 'message' => 'Hall deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['HallID'])) {
		$HallID = $_GET['HallID'];
		$hall = getHallById($HallID);
		echo json_encode($hall);
		exit;
	} else {
		$halls = getAllHalls();
		echo json_encode($halls);
		exit;
	}
}
