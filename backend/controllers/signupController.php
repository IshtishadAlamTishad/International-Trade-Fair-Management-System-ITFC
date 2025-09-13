<?php
// signupController.php - Handles user signup
require_once __DIR__ . '/../models/userModel.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $password = $data['password'];
    $role = $data['role'] ?? 'visitor';
    $firstName = $data['firstName'] ?? '';
    $lastName = $data['lastName'] ?? '';
    $company = $data['company'] ?? '';
    $email = $data['email'] ?? '';
    $exists = user_get_by_username($username);
    if ($exists) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Username already exists']);
        exit;
    }
    $result = user_create($username, $password, $role, $firstName, $lastName, $company, $email);
    header('Content-Type: application/json');
    echo json_encode(['success' => $result]);
}
