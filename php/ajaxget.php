<?php
include 'api.php';

$data = get($_POST['url']);
echo json_encode($data);
?>