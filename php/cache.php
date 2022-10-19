<?php
include 'hash.php';
function cache( &$data ) {
    $ind = 0;
    foreach ( $data as $obj ) {
        $encrypted = mc_encrypt( $obj, ENCRYPTION_KEY );
        apcu_add( "$ind", $encrypted );
        $ind++;
    }
    $encrypted = mc_encrypt( $data, ENCRYPTION_KEY );
    apcu_add( 'http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer', $encrypted );
    unset( $obj );
}
?>