<?php
// check-session.php - Returns current user session info
session_start();
header('Content-Type: application/json');
if (isset($_SESSION['user_id']) && isset($_SESSION['username']) && isset($_SESSION['role'])) {
    echo json_encode([
        'user' => [
            'id' => $_SESSION['user_id'],
            'username' => $_SESSION['username'],
            'role' => $_SESSION['role'],
            'firstName' => $_SESSION['firstName'] ?? '',
            'lastName' => $_SESSION['lastName'] ?? '',
            'company' => $_SESSION['company'] ?? '',
            'email' => $_SESSION['email'] ?? ''
        ]
    ]);
} else {
    echo json_encode(['user' => null]);
}
