
header('Content-Type: application/json');
require_once '../../model/paymentModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';
	if ($action === 'create') {
		$PaymentID = $_POST['PaymentID'] ?? 0;
		$Amount = $_POST['Amount'] ?? 0;
		$PaymentMode = $_POST['PaymentMode'] ?? '';
		$TransactionID = $_POST['TransactionID'] ?? '';
		$Status = $_POST['Status'] ?? '';
		$ExhibitorID = $_POST['ExhibitorID'] ?? 0;
		insertPayment($PaymentID, $Amount, $PaymentMode, $TransactionID, $Status, $ExhibitorID);
		echo json_encode(['status' => 'success', 'message' => 'Payment created']);
		exit;
	}
	if ($action === 'update') {
		$PaymentID = $_POST['PaymentID'] ?? 0;
		$Amount = $_POST['Amount'] ?? 0;
		$PaymentMode = $_POST['PaymentMode'] ?? '';
		$TransactionID = $_POST['TransactionID'] ?? '';
		$Status = $_POST['Status'] ?? '';
		$ExhibitorID = $_POST['ExhibitorID'] ?? 0;
		updatePayment($PaymentID, $Amount, $PaymentMode, $TransactionID, $Status, $ExhibitorID);
		echo json_encode(['status' => 'success', 'message' => 'Payment updated']);
		exit;
	}
	if ($action === 'delete') {
		$PaymentID = $_POST['PaymentID'] ?? 0;
		deletePayment($PaymentID);
		echo json_encode(['status' => 'success', 'message' => 'Payment deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['PaymentID'])) {
		$PaymentID = $_GET['PaymentID'];
		$payment = getPaymentById($PaymentID);
		echo json_encode($payment);
		exit;
	} else {
		$payments = getAllPayments();
		echo json_encode($payments);
		exit;
	}
}
