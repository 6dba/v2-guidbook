<?php
function cache( &$data ) {
    $ind = 0;
    foreach ( $data as $obj ) {
        apcu_add( "$ind", $obj );
        $ind++;
    }
    apcu_add( 'http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer', $data );
    unset( $obj );
}
?>