<?php
include '../php/api.php';

$data = get("http://81.161.220.59:8100/api/enterprise/?action=getVariables&id=2&request=developer");
echo json_encode($data);

?>