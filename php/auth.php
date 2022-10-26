<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL ^E_NOTICE );
include 'api.php';
if ( $_COOKIE['user'] == '1' ) {
    setcookie( 'user', '', time()-1, "/" );
    apcu_clear_cache();
    header( "Location: /templates" );
} else {
    $response = json_decode( post( $_POST['url_login'], $_POST['data_login'] ) );
    if ( $response->code == 200 ) {
        apcu_clear_cache();
        setcookie( 'user', '1', time()+3600*5, "/" );
        $data = json_decode( get( "http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer" ) );
        cache( $data );
        echo $response->code;
    } else {
        echo $response->msg;
    }

}

?>
