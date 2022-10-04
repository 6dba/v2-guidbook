<?php
include 'hash.php';
function cach( &$data ) {
    $ind = 0;
    foreach ( $data as $obj ) {
        $encrypted = mc_encrypt( $obj, ENCRYPTION_KEY );
        apcu_add( "$ind", $encrypted );
        $ind++;
    }

    unset( $obj );
}
?>