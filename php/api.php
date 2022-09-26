<?php

/**
 * Получение данных по $url
 * Возвращается JSON обьект
 */
function get($url) {

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache"
        ),
    ));

    $response = curl_exec($curl); curl_close($curl);

    return $response;
}
/**
 * Отправка $parameters по $url
 * Возвращается JSON обьект
 */
function post($url, $data = array()) {

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache"
        ),
        CURLOPT_POSTFIELDS => http_build_query($data),
    ));
    $response = curl_exec($curl); curl_close($curl);

    return $response;
}

// Вызов API методов посредством AJAX JQuery
//if (isset($_POST['data']) and isset($_POST['url'])) {
//   echo post($_POST['url'], json_decode($_POST['data']));
//}
//
//if (isset($_POST['url'])) {
//   echo get($_POST['url']);
//}

?>
