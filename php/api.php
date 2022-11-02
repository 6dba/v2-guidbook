<?php
include 'cache.php';
/**
* Получение данных по $url
* Возвращается JSON обьект
*/

function get( $url ) {

    $curl = curl_init();
    
    curl_setopt_array( $curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "cache-control: no-cache"
        ),
    ) );

    $response = curl_exec( $curl );
    curl_close( $curl );

    return $response;
}
/**
* Отправка $parameters по $url
* Возвращается JSON обьект
*/
function post( $url, $data = array() ) {
    $curl = curl_init();
    curl_setopt_array( $curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HEADER => false,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_POSTFIELDS => json_encode( $data, JSON_UNESCAPED_UNICODE ),
        CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT']
    ) );
    $response = curl_exec( $curl );
    curl_close( $curl );
    return $response;
}

// Вызов API методов посредством AJAX JQuery
if ( isset( $_POST['data'] ) and isset( $_POST['url'] ) ) {
    session_start(['read_and_close'  => true]);
    // Изменяем ресурс
    if (isset($_POST['data']['view']))
        $_POST['data']['userId'] = $_SESSION['user']['userId'];
    echo post( $_POST['url'], $_POST['data'] );

} elseif ( isset( $_POST['url'] ) ) {
    echo get( $_POST['url'] );
}
?>
