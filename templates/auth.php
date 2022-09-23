<?php
include 'api.php';
include 'cach.php';
if ( $_COOKIE['user'] == '1' ) {
    setcookie( 'user', '1', time()-1, "" );
    apcu_clear_cache();
} else {
    setcookie( 'user', '1', time()+3600, "" );
    $data = get( API_URL, "structureTest", "?action=getData&request=developer" );
    cach($data);
}
header( "Location: /" );
?>
