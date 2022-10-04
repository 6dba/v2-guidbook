<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL ^E_NOTICE );
include 'hash.php';
unset( $data );
if ( $_POST['type'] == 'tree' ) {
    foreach ( new APCIterator('user') as $entry ) {
        if ( mc_decrypt( $entry[value], ENCRYPTION_KEY )->PARENT_ID == $_POST['parentId'] )
        $data[] = mc_decrypt( $entry[value], ENCRYPTION_KEY );
    }
} elseif ( $_POST['type'] == 'table' ) {
    foreach ( new APCIterator('user') as $entry ) {
        $data[] = mc_decrypt( $entry[value], ENCRYPTION_KEY );
    }
}
echo json_encode( $data );
?>
