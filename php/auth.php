<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL ^E_NOTICE );
include 'api.php';
if ( $_COOKIE['user'] == '1' ) {
    setcookie( 'user', '1', time()-1, "/" );
    apcu_clear_cache();
} else {
    setcookie( 'user', '1', time()+3600, "/" );
    $data = json_decode(get( "http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer" ));
    cache($data);
}
header( "Location: /templates" );
?>
