function cache(type, page, url) {
    if(!url) url="";
    data = {type: type,
           page: page};
    if(type == 'tree')
        data["url"] = url;
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: '../php/get_cache.php',
        method: 'POST',
        dataType: 'json',
        data: data,
        success: function(response) {
            return resolve(response);
        },
        error: function (jqxhr, status, errorMsg) {
            return reject(errorMsg, status);
        }
     });
  });
}
