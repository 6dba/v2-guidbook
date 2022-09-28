<?php
include 'hash.php';
function cach( &$data ) {
    $ind = 'a';
    foreach ( $data as $obj ) {
        //$encrypted = mc_encrypt( $obj, ENCRYPTION_KEY );
        apcu_add( $ind, $obj );
        $ind++;
    }

    unset( $obj );
}
?>