
<?php
session_start();
header('Content-Type: application/json');
require_once '../../model/db.php';

$data = $_POST;

$firstName = isset($data['firstName']) ? $data['firstName'] : '';
$lastName = isset($data['lastName']) ? $data['lastName'] : '';
$email = isset($data['email']) ? $data['email'] : '';
$phone = isset($data['phone']) ? $data['phone'] : '';
$role = isset($data['role']) ? $data['role'] : '';
$company = isset($data['company']) ? $data['company'] : '';


if (!$firstName || !$lastName || !$email || !$phone || !$role) {
	echo json_encode(['success' => false, 'message' => 'All required fields must be filled.']);
	exit();
}

if ($role === 'admin') {
	echo json_encode(['success' => false, 'message' => 'Admin signup is not allowed.']);
	exit();
}

$conn = getConnection();
$table = $role === 'visitor' ? 'Visitor' : ($role === 'exhibitor' ? 'Exhibitor' : '');
if (!$table) {
	echo json_encode(['success' => false, 'message' => 'Invalid role.']);
	exit();
}

$checkStmt = oci_parse($conn, "SELECT * FROM $table WHERE EmailAddress = :email");
oci_bind_by_name($checkStmt, ':email', $email);
oci_execute($checkStmt);
if (oci_fetch_assoc($checkStmt)) {
	echo json_encode(['success' => false, 'message' => 'Email already registered.']);
	oci_free_statement($checkStmt);
	oci_close($conn);
	exit();
}
oci_free_statement($checkStmt);


if ($role === 'visitor') {
	$insert = oci_parse($conn, "INSERT INTO Visitor (VisitorID, FirstName, LastName, Contact, Phone, EmailAddress, Interests) VALUES (visitor_seq.NEXTVAL, :firstName, :lastName, :contact, :phone, :email, :interests)");
	$contact = '';
	$interests = '';
	oci_bind_by_name($insert, ':firstName', $firstName);
	oci_bind_by_name($insert, ':lastName', $lastName);
	oci_bind_by_name($insert, ':contact', $contact);
	oci_bind_by_name($insert, ':phone', $phone);
	oci_bind_by_name($insert, ':email', $email);
	oci_bind_by_name($insert, ':interests', $interests);
	$success = oci_execute($insert);
	oci_free_statement($insert);
} else if ($role === 'exhibitor') {
	$insert = oci_parse($conn, "INSERT INTO Exhibitor (ExhibitorID, EName, Contact, Email, Phone, EmailAddress) VALUES (exhibitor_seq.NEXTVAL, :ename, :contact, :email, :phone, :emailaddress)");
	$ename = $company ?: $firstName . ' ' . $lastName;
	$contact = '';
	$emailaddress = $email;
	oci_bind_by_name($insert, ':ename', $ename);
	oci_bind_by_name($insert, ':contact', $contact);
	oci_bind_by_name($insert, ':email', $email);
	oci_bind_by_name($insert, ':phone', $phone);
	oci_bind_by_name($insert, ':emailaddress', $emailaddress);
	$success = oci_execute($insert);
	oci_free_statement($insert);
}
oci_close($conn);

if ($success) {
	echo json_encode(['success' => true, 'message' => 'Signup successful.']);
} else {
	echo json_encode(['success' => false, 'message' => 'Signup failed.']);
}
