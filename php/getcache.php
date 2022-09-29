<?php
include 'hash.php';
print_r(mc_decrypt(apcu_fetch( 'aa' ), ENCRYPTION_KEY));
?>