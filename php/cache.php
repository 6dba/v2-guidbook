<?php
include '../php/hash.php';
function cach( &$data ) {
    $ind = 'a';
    foreach ( $data as $obj ) {
        $id = $obj['PARENT_ID'];
        $encrypted = mc_encrypt( $obj, ENCRYPTION_KEY );
        apcu_add( $id, $encrypted );
        $ind++;
    }
    unset( $obj );
}
?>