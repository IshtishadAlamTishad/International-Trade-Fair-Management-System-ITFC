<?php
// userModel.php - Procedural user model for Oracle DB
require_once 'Database.php';

function user_get_by_username($username) {
    $db = get_db_connection();
    $query = 'SELECT * FROM users WHERE username = :username';
    $stmt = oci_parse($db, $query);
    oci_bind_by_name($stmt, ':username', $username);
    oci_execute($stmt);
    $row = oci_fetch_assoc($stmt);
    oci_free_statement($stmt);
    return $row;
}

function user_create($username, $password, $role, $firstName = '', $lastName = '', $company = '', $email = '') {
    $db = get_db_connection();
    $query = 'INSERT INTO users (username, password, role, first_name, last_name, company, email) VALUES (:username, :password, :role, :firstName, :lastName, :company, :email)';
    $stmt = oci_parse($db, $query);
    oci_bind_by_name($stmt, ':username', $username);
    oci_bind_by_name($stmt, ':password', password_hash($password, PASSWORD_DEFAULT));
    oci_bind_by_name($stmt, ':role', $role);
    oci_bind_by_name($stmt, ':firstName', $firstName);
    oci_bind_by_name($stmt, ':lastName', $lastName);
    oci_bind_by_name($stmt, ':company', $company);
    oci_bind_by_name($stmt, ':email', $email);
    $result = oci_execute($stmt, OCI_COMMIT_ON_SUCCESS);
    oci_free_statement($stmt);
    return $result;
}
