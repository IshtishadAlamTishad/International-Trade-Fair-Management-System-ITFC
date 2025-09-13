<?php
// logoutController.php - Handles user logout
session_start();
session_unset();
session_destroy();
header('Content-Type: application/json');
echo json_encode(['success' => true]);
