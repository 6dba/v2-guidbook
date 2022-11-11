<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL ^E_NOTICE );
include 'api.php';
unset( $data );

if ( $_POST['type'] == 'tree' ) {
    // Если записи по данному ключу ( url ) в кэшэ нет, заносим, отдамем
    if ( apcu_fetch( $_POST['path'] ) != false ) {
        echo json_encode( apcu_fetch( $_POST['path'] ) );
    } else {
        $data = json_decode( get( $_POST['path'] ) );
        apcu_add( $_POST['path'], $data );
        echo json_encode( $data );
    }
} elseif ( $_POST['type'] == 'table' ) {
    if ( $_POST['page'] == 'all' ) {
        $ind = 0;
        while (apcu_exists( "$ind" ) !== false ) {
            $object = apcu_fetch( "$ind" );
            $data[] = $object;
            $ind++;
        }
        echo json_encode( $data );
    } else {
        $ind = 0 + $_POST['page'] * 25;
        for ( $i = $_POST['page'] * 25; $i<$_POST['page']*25+25; $i++, $ind++ ) {
            $object = apcu_fetch( "$ind" );
            if ( $object == false ) break;
            $data[] = $object;
        }
        echo json_encode( $data );
    }
}

?>
