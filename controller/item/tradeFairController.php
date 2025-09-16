
header('Content-Type: application/json');
require_once '../../model/tradeFairModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';
	if ($action === 'create') {
		$FairID = $_POST['FairID'] ?? 0;
		$TName = $_POST['TName'] ?? '';
		$City = $_POST['City'] ?? '';
		$StartDate = $_POST['StartDate'] ?? '';
		$EndDate = $_POST['EndDate'] ?? '';
		$Duration = $_POST['Duration'] ?? 0;
		insertTradeFair($FairID, $TName, $City, $StartDate, $EndDate, $Duration);
		echo json_encode(['status' => 'success', 'message' => 'Trade Fair created']);
		exit;
	}
	if ($action === 'update') {
		$FairID = $_POST['FairID'] ?? 0;
		$TName = $_POST['TName'] ?? '';
		$City = $_POST['City'] ?? '';
		$StartDate = $_POST['StartDate'] ?? '';
		$EndDate = $_POST['EndDate'] ?? '';
		$Duration = $_POST['Duration'] ?? 0;
		updateTradeFair($FairID, $TName, $City, $StartDate, $EndDate, $Duration);
		echo json_encode(['status' => 'success', 'message' => 'Trade Fair updated']);
		exit;
	}
	if ($action === 'delete') {
		$FairID = $_POST['FairID'] ?? 0;
		deleteTradeFair($FairID);
		echo json_encode(['status' => 'success', 'message' => 'Trade Fair deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['FairID'])) {
		$FairID = $_GET['FairID'];
		$fair = getTradeFairById($FairID);
		echo json_encode($fair);
		exit;
	} else {
		$fairs = getAllTradeFairs();
		echo json_encode($fairs);
		exit;
	}
}
