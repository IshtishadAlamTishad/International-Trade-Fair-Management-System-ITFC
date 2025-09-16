<?php
session_start();
header('Content-Type: application/json');
require_once '../../model/db.php';

$data = $_POST;
$email = isset($data['email']) ? $data['email'] : '';
$password = isset($data['password']) ? $data['password'] : '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Email and password required.']);
    exit();
}

$conn = getConnection();
$stmt = oci_parse($conn, "SELECT * FROM users WHERE EmailAddress = :email");
oci_bind_by_name($stmt, ':email', $email);
oci_execute($stmt);
$user = oci_fetch_assoc($stmt);

if ($user && password_verify($password, $user['PASSWORD'])) {
    $_SESSION['user_id'] = $user['USERID'];
    $_SESSION['role'] = $user['ROLE'];
    echo json_encode(['success' => true, 'role' => strtolower($user['ROLE'])]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
}
oci_free_statement($stmt);
oci_close($conn);