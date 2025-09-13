<?php
// ItemController.php - Handles HTTP requests for Item
require_once __DIR__ . '/../models/Item.php';

function item_index() {
    $items = item_get_all();
    header('Content-Type: application/json');
    echo json_encode($items);
}

function item_show($id) {
    $item = item_get_by_id($id);
    header('Content-Type: application/json');
    echo json_encode($item);
}

function item_store($data) {
    $result = item_create($data['name'], $data['description']);
    header('Content-Type: application/json');
    echo json_encode(['success' => $result]);
}

function item_update($id, $data) {
    $result = item_update_db($id, $data['name'], $data['description']);
    header('Content-Type: application/json');
    echo json_encode(['success' => $result]);
}

function item_destroy($id) {
    $result = item_delete($id);
    header('Content-Type: application/json');
    echo json_encode(['success' => $result]);
}
