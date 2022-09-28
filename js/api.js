function request(url, requestData) {

    let data = {
        url: url
    }

    if (requestData !== undefined) {
        data["data"] = requestData;
    }
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: '../php/api.php',
        method: 'POST',
        dataType: 'json',
        data: data,
        success: function(response) {
            return resolve(response);
        },
        error: function (jqxhr, status, errorMsg) {
            return reject(errorMsg);
        }
     });
  });
}



function get(url) {
    return request(url);
}

function post(url, data) {
    return request(url, data);
}
