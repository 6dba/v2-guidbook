<?php 
const API_URL = "https://63120754f5cba498da8ad8d9.mockapi.io/api/v2-mock/";

/** 
 * Получение указанного $resource по API_URL 
 * на текущий момент реализовано mockapi и доступен 
 * ресурс division 
 */
function get($resource) {

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => API_URL . $resource,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache"
        ),
    ));

    $response = curl_exec($curl); curl_close($curl);

    return json_decode($response, true);
}
print_r(get("division"));
