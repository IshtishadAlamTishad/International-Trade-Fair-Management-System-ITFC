
header('Content-Type: application/json');
require_once '../../model/productModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$action = $_POST['action'] ?? '';
	if ($action === 'create') {
		$ProductID = $_POST['ProductID'] ?? 0;
		$PName = $_POST['PName'] ?? '';
		$Category = $_POST['Category'] ?? '';
		$Description = $_POST['Description'] ?? '';
		$Price = $_POST['Price'] ?? 0;
		$Stock = $_POST['Stock'] ?? 0;
		$ExhibitorID = $_POST['ExhibitorID'] ?? 0;
		insertProduct($ProductID, $PName, $Category, $Description, $Price, $Stock, $ExhibitorID);
		echo json_encode(['status' => 'success', 'message' => 'Product created']);
		exit;
	}
	if ($action === 'update') {
		$ProductID = $_POST['ProductID'] ?? 0;
		$PName = $_POST['PName'] ?? '';
		$Category = $_POST['Category'] ?? '';
		$Description = $_POST['Description'] ?? '';
		$Price = $_POST['Price'] ?? 0;
		$Stock = $_POST['Stock'] ?? 0;
		$ExhibitorID = $_POST['ExhibitorID'] ?? 0;
		updateProduct($ProductID, $PName, $Category, $Description, $Price, $Stock, $ExhibitorID);
		echo json_encode(['status' => 'success', 'message' => 'Product updated']);
		exit;
	}
	if ($action === 'delete') {
		$ProductID = $_POST['ProductID'] ?? 0;
		deleteProduct($ProductID);
		echo json_encode(['status' => 'success', 'message' => 'Product deleted']);
		exit;
	}
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (isset($_GET['ProductID'])) {
		$ProductID = $_GET['ProductID'];
		$product = getProductById($ProductID);
		echo json_encode($product);
		exit;
	} else {
		$products = getAllProducts();
		echo json_encode($products);
		exit;
	}
}
