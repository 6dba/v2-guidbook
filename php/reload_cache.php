<?php
    include 'api.php';
    apcu_clear_cache();
    $newData = json_decode( get( "http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer" ) );
    cache( $newData );
?>