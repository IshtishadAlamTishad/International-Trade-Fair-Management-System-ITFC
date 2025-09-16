<?php
session_start();
header('Content-Type: application/json');
require_once '../../model/db.php';

$data = $_POST;
// Accepts: email, phone, role
$email = isset($data['email']) ? $data['email'] : '';
$phone = isset($data['phone']) ? $data['phone'] : '';
$role = isset($data['role']) ? strtolower($data['role']) : '';

if (!$email || (!$phone && ($role === 'exhibitor' || $role === 'visitor'))) {
    echo json_encode(['success' => false, 'message' => 'Email and phone required.']);
    exit();
}

$conn = getConnection();
if ($role === 'admin') {
    // Hardcoded admin credentials
    $adminEmail = 'admin@itfc.com';
    $adminPassword = 'admin123';
    if ($email === $adminEmail && $data['password'] === $adminPassword) {
        $_SESSION['user_id'] = 1;
        $_SESSION['role'] = 'admin';
        echo json_encode(['success' => true, 'role' => 'admin']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid admin credentials.']);
    }
    oci_close($conn);
    exit();
} else if ($role === 'exhibitor') {
    $stmt = oci_parse($conn, "SELECT * FROM Exhibitor WHERE EmailAddress = :email AND Phone = :phone");
    oci_bind_by_name($stmt, ':email', $email);
    oci_bind_by_name($stmt, ':phone', $phone);
    oci_execute($stmt);
    $user = oci_fetch_assoc($stmt);
    if ($user) {
        $_SESSION['user_id'] = $user['EXHIBITORID'];
        $_SESSION['role'] = 'exhibitor';
        echo json_encode(['success' => true, 'role' => 'exhibitor']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
    }
    oci_free_statement($stmt);
} else if ($role === 'visitor') {
    $stmt = oci_parse($conn, "SELECT * FROM Visitor WHERE EmailAddress = :email AND Phone = :phone");
    oci_bind_by_name($stmt, ':email', $email);
    oci_bind_by_name($stmt, ':phone', $phone);
    oci_execute($stmt);
    $user = oci_fetch_assoc($stmt);
    if ($user) {
        $_SESSION['user_id'] = $user['VISITORID'];
        $_SESSION['role'] = 'visitor';
        echo json_encode(['success' => true, 'role' => 'visitor']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
    }
    oci_free_statement($stmt);
}
oci_close($conn);