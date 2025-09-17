<?php
require_once __DIR__ . '/../model/db.php';

$conn = getConnection();
$query = "SELECT * FROM Visitor";
$statement = oci_parse($conn, $query);
oci_execute($statement);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Visitor Data</title>
    <link rel="stylesheet" href="../asset/css/styles.css">
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #f0f0f0; }
    </style>
</head>
<body>
    <h2>Visitor Table Data</h2>
    <table>
        <thead>
            <tr>
                <th>VisitorID</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Contact</th>
                <th>Phone</th>
                <th>EmailAddress</th>
                <th>Interests</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = oci_fetch_assoc($statement)): ?>
            <tr>
                <td><?= htmlspecialchars($row['VISITORID']) ?></td>
                <td><?= htmlspecialchars($row['FIRSTNAME']) ?></td>
                <td><?= htmlspecialchars($row['LASTNAME']) ?></td>
                <td><?= htmlspecialchars($row['CONTACT']) ?></td>
                <td><?= htmlspecialchars($row['PHONE']) ?></td>
                <td><?= htmlspecialchars($row['EMAILADDRESS']) ?></td>
                <td><?= htmlspecialchars($row['INTERESTS']) ?></td>
            </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
    <?php oci_free_statement($statement); oci_close($conn); ?>
</body>
</html>
