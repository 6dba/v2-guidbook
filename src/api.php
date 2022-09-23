<?php 

/** 
 * Получение данных по $url
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

    return json_decode($response, true);
}
/**
 * Отправка $parameters по $url
 */
function post($url, $parameters = array()) {

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
        CURLOPT_POSTFIELDS => http_build_query($parameters),
    ));
    $response = curl_exec($curl); curl_close($curl);
    
    return json_decode($response, true);
}
print_r(get("http://81.161.220.59:8100/api/enterprise/?action=getVariables&id=2&request=developer"));

print_r(post("http://81.161.220.59:8100/api/division/?action=setVariables&request=developer", array(
        "id" => "686",
        "name" => "name",
        "fullname" => "fullName",
        "enterprise" => 2,
        "type" => 2,
        "shift" => 1,
        "chief" => 1,
        "adjanced" => 1,
        "isOpo" => "Y",
        "is_order_visible" => "Y"
    )
));
?>
