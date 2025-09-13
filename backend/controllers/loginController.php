<?php
// loginController.php - Handles user login
require_once __DIR__ . '/../models/userModel.php';
session_start();

function login($username, $password) {
    $user = user_get_by_username($username);
    if ($user && password_verify($password, $user['PASSWORD'])) {
        $_SESSION['user_id'] = $user['ID'];
        $_SESSION['username'] = $user['USERNAME'];
        $_SESSION['role'] = $user['ROLE'];
        $_SESSION['firstName'] = $user['FIRST_NAME'] ?? '';
        $_SESSION['lastName'] = $user['LAST_NAME'] ?? '';
        $_SESSION['company'] = $user['COMPANY'] ?? '';
        $_SESSION['email'] = $user['EMAIL'] ?? '';
        return [
            'success' => true,
            'role' => $user['ROLE'],
            'firstName' => $user['FIRST_NAME'] ?? '',
            'lastName' => $user['LAST_NAME'] ?? '',
            'company' => $user['COMPANY'] ?? '',
            'email' => $user['EMAIL'] ?? ''
        ];
    }
    return ['success' => false, 'error' => 'Invalid credentials'];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $result = login($data['username'], $data['password']);
    header('Content-Type: application/json');
    echo json_encode($result);
}
