<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL ^E_NOTICE );
include 'hash.php';
unset( $data );
if ( $_POST['type'] == 'tree' ) {
    foreach ( new APCIterator() as $entry ) {
        if ( mc_decrypt( $entry[value], ENCRYPTION_KEY )->PARENT_ID == $_POST['parentId'] )
        $data[] = mc_decrypt( $entry[value], ENCRYPTION_KEY );
    }
} elseif ( $_POST['type'] == 'table' ) {
    $ind = 0 + $_POST['page'] * 25;
    for ( $i = $_POST['page'] * 25; $i<$_POST['page']*25+25; $i++, $ind++ ) {
        $object = mc_decrypt( apcu_fetch( "$ind" ), ENCRYPTION_KEY );
        if ( $object == false ) break;
        $data[] = $object;
    }
}
echo json_encode( $data );
?>
