function request(url, func, requestData) {

    let data = {
        url: url
    }

    if (requestData !== undefined) {
        data["data"] = requestData
    }

    return $.ajax({
        url: '../php/ajaxget.php',
        method: 'POST',
        dataType: 'json',
        data: data,
        success: function(response){
            func(response);
        }
    });

}
function get(url, func) {
    request(url, func)
}

function post(url, func, data) {
    request(url, func, data)
}
