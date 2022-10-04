function cache(type, page, parentId) {
    if(!parentId) parentId="";
    data = {type: type,
           page: page};
    if(type == 'tree')
        data["parentId"] = parentId;
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
