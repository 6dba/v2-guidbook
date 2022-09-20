<?php 
const API_URL = "http://81.161.220.59:8100/api/";

/** 
 * Получение указанного $resource по $url с указанным $request
 *
 * http://81.161.220.59:8100/api/structureTest/?action=getData&pid=E2
 * |            $url            |  $resource  |       $request      | 
 *
 */
function get($url, $resource = "", $request = "") {

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => $url . "/" . $resource . "/" . $request,
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

function post($url, $resource = "", $request = "", $parameters = array()) {

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => $url . "/" . $resource . "/" . $request,
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

print_r(get(API_URL, "structureTest", "?action=getData&pid=E2"));

print_r(post(API_URL, "division", "?action=setVariables", array(
        "id" => 1,
        "name" => "name",
        "fullname" => "fullName",
        "enterprise" => 2,
        "type" => 2,
        "shift" => 2,
        "chief" => 2,
        "adjanced" => 2,
        "isOpo" => "Y",
        "is_order_visible" => "Y"
    )
))

?>
