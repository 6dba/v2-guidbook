<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL ^E_NOTICE );
include 'hash.php';
include 'api.php';
unset( $data );

if ( $_POST['type'] == 'tree' ) {
    // Если записи по данному ключу (url) в кэшэ нет, заносим, отдамем
    if (apcu_fetch($_POST['url']) != false) {
        echo json_encode(mc_decrypt(apcu_fetch($_POST['url']), ENCRYPTION_KEY));
    }
    else {
        $data = json_decode(get($_POST['url']));
        $encrypted = mc_encrypt($data, ENCRYPTION_KEY );
        apcu_add($_POST['url'], $encrypted );
        echo json_encode($data);
    }
} elseif ( $_POST['type'] == 'table' ) {
    $ind = 0 + $_POST['page'] * 25;
    for ( $i = $_POST['page'] * 25; $i<$_POST['page']*25+25; $i++, $ind++ ) {
        $object = mc_decrypt( apcu_fetch( "$ind" ), ENCRYPTION_KEY );
        if ( $object == false ) break;
        $data[] = $object;
    }
    echo json_encode( $data );
}

?>
