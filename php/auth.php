<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL ^E_NOTICE );
include 'api.php';
if ( isset($_COOKIE['PHPSESSID']) ) {
    setcookie('PHPSESSID', '', time()-1, '/');
    session_destroy();
    apcu_clear_cache();
    header( "Location: /templates" );
} else {
    $response = json_decode( post( $_POST['url_login'], $_POST['data_login'] ) );
    if ( $response->code == 200 ) {
        apcu_clear_cache();
        ini_set("session.gc_maxlifetime", 36000);
        session_start();
        $_SESSION['lastLogin'] = $_POST['data_login']['login'];
        $_SESSION['user'] = array (
            ID => 30175,
            ENTERPRISE_ID => 2,
            DIVISION_ID => 13,
            EMPLOYEE => 'Борисов Николай Сергеевич',
            EMPLOYEE_SHORT => 'Борисов Н. С.',
            POST_NAME => 'Ведущий программист',
            ENTERPRISE_NAME => 'Тест',
            POST_ID => 1,
            utk => 1,
            isBlocked => '',
            diu => 'GAWGu3QTsIwB3PMIIGiLy7cfBfP1d0LZ57be763664ad216c0c76461ksAYsjNc12YDcO85TJf6qghGScATWiPUPuf6y/oIEfgr6Q4rY836A==',
            uid => $_POST['data_login']['login'],
            userId => 16,
            roleId => 1,
            bp => 0
        );
        $_SESSION['settings'] = '';
        setcookie( 'PHPSESSID', session_id(), time()+36000, "/" );
        $data = json_decode( get( "http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer" ) );
        cache( $data );
        echo $response->code;
    } else {
        echo $response->msg;
    }

}

?>