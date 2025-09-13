<?php
// item_view.php - Example view (not used in API, but for reference)
function renderItem($item) {
    echo '<h2>' . htmlspecialchars($item['NAME']) . '</h2>';
    echo '<p>' . htmlspecialchars($item['DESCRIPTION']) . '</p>';
}
?>