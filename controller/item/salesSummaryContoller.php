
require_once '../../model/salesSummaryModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';
	if ($action === 'create') {
		$SummaryID = $_POST['SummaryID'] ?? 0;
		$FairID = $_POST['FairID'] ?? 0;
		$ExhibitorID = $_POST['ExhibitorID'] ?? 0;
		$NoOfProductsSold = $_POST['NoOfProductsSold'] ?? 0;
		$TotalSales = $_POST['TotalSales'] ?? 0;
		insertSalesSummary($SummaryID, $FairID, $ExhibitorID, $NoOfProductsSold, $TotalSales);
		echo json_encode(['status' => 'success', 'message' => 'Sales summary created']);
		exit;
	}
	if ($action === 'update') {
		$SummaryID = $_POST['SummaryID'] ?? 0;
		$FairID = $_POST['FairID'] ?? 0;
		$ExhibitorID = $_POST['ExhibitorID'] ?? 0;
		$NoOfProductsSold = $_POST['NoOfProductsSold'] ?? 0;
		$TotalSales = $_POST['TotalSales'] ?? 0;
		updateSalesSummary($SummaryID, $FairID, $ExhibitorID, $NoOfProductsSold, $TotalSales);
		echo json_encode(['status' => 'success', 'message' => 'Sales summary updated']);
		exit;
	}
	if ($action === 'delete') {
		$SummaryID = $_POST['SummaryID'] ?? 0;
		deleteSalesSummary($SummaryID);
		echo json_encode(['status' => 'success', 'message' => 'Sales summary deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['SummaryID'])) {
		$SummaryID = $_GET['SummaryID'];
		$summary = getSalesSummaryById($SummaryID);
		echo json_encode($summary);
		exit;
	} else {
		$summaries = getAllSalesSummaries();
		echo json_encode($summaries);
		exit;
	}
}
