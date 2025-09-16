<?php
session_start();
if (!isset($_SESSION['auth_id'])) {
    header("Location: home.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exhibitor Dashboard - ITFC Trade Fair</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="exhibitor-styles.css">
</head>
<body class="bg-gray-50">
  <div id="exhibitor-dashboard"></div>
  <script src="../asset/js/exhibitorDashboard.js"></script>
</body>
</html>
