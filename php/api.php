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
        CURLOPT_POSTFIELDS => json_encode( $data, JSON_UNESCAPED_UNICODE )
    ) );
    $response = curl_exec( $curl );
    curl_close( $curl );
    return $response;
}

// Вызов API методов посредством AJAX JQuery
if ( isset( $_POST['data'] ) and isset( $_POST['url'] ) ) {
    // Изменяем ресурс
    post( $_POST['url'], $_POST['data'] );
    // Очищаем кэш
    apcu_clear_cache();
    // Запрашиваем новые данные
    $newData = json_decode( get( "http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer" ) );
    // Кэшируем
    cache( $newData );
}

if ( isset( $_POST['url'] ) ) {
    echo get( $_POST['url'] );
}
?>
