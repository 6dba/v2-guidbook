<?php
include 'api.php';
$data = get(API_URL, "enterprise", "?action=getVariables&id=2&request=developer");
echo json_encode($data);

?>