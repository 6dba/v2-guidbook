function request(url, requestData) {

   let data = {
      url: url
   }

   if (requestData !== undefined) {
      data["data"] = requestData
   }

   $.ajax({
      url: '../php/api.php',
      method: 'POST',
      dataType: 'json',
      data: data,
      success: function (data) {
         return data;
      },
      error: function (jqxhr, status, errorMsg) {
           return (status, errorMsg);
      }
   });
}

function get(url) {
   request(url)
}

function post(url, data) {
   request(url, data)
}
