<?php
// routes.php - Simple router for user auth

$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

switch ($uri[1] ?? '') {
    case 'login':
        require __DIR__ . '/controllers/loginController.php';
        break;
    case 'logout':
        require __DIR__ . '/controllers/logoutController.php';
        break;
    case 'signup':
        require __DIR__ . '/controllers/signupController.php';
        break;
    case 'check-session':
        require __DIR__ . '/check-session.php';
        break;
    default:
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Not Found']);
}
