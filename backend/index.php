<?php
// index.php - Simple router for Item CRUD
require_once __DIR__ . '/controllers/ItemController.php';
$method = $_SERVER['REQUEST_METHOD'];
$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
// Example: /backend/items/1
if (isset($uri[1]) && $uri[1] === 'items') {
    switch ($method) {
        case 'GET':
            if (isset($uri[2])) {
                item_show($uri[2]);
            } else {
                item_index();
            }
            break;
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            item_store($data);
            break;
        case 'PUT':
            if (isset($uri[2])) {
                $data = json_decode(file_get_contents('php://input'), true);
                item_update($uri[2], $data);
            }
            break;
        case 'DELETE':
            if (isset($uri[2])) {
                item_destroy($uri[2]);
            }
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
