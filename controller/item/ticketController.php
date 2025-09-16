
require_once '../../model/ticketModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';
	if ($action === 'create') {
		$TicketID = $_POST['TicketID'] ?? 0;
		$Type = $_POST['Type'] ?? '';
		$Price = $_POST['Price'] ?? 0;
		$PurchaseDate = $_POST['PurchaseDate'] ?? '';
		$FairID = $_POST['FairID'] ?? 0;
		$VisitorID = $_POST['VisitorID'] ?? 0;
		insertTicket($TicketID, $Type, $Price, $PurchaseDate, $FairID, $VisitorID);
		echo json_encode(['status' => 'success', 'message' => 'Ticket created']);
		exit;
	}
	if ($action === 'update') {
		$TicketID = $_POST['TicketID'] ?? 0;
		$Type = $_POST['Type'] ?? '';
		$Price = $_POST['Price'] ?? 0;
		$PurchaseDate = $_POST['PurchaseDate'] ?? '';
		$FairID = $_POST['FairID'] ?? 0;
		$VisitorID = $_POST['VisitorID'] ?? 0;
		updateTicket($TicketID, $Type, $Price, $PurchaseDate, $FairID, $VisitorID);
		echo json_encode(['status' => 'success', 'message' => 'Ticket updated']);
		exit;
	}
	if ($action === 'delete') {
		$TicketID = $_POST['TicketID'] ?? 0;
		deleteTicket($TicketID);
		echo json_encode(['status' => 'success', 'message' => 'Ticket deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['TicketID'])) {
		$TicketID = $_GET['TicketID'];
		$ticket = getTicketById($TicketID);
		echo json_encode($ticket);
		exit;
	} else {
		$tickets = getAllTickets();
		echo json_encode($tickets);
		exit;
	}
}
