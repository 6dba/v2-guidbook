function cache(type, parentId) {
    if(!parentId) parentId="";
    if(type == 'tree')
        data = {parentId: parentId,
               type: type};
    else if (type == 'table')
        data = {type: type};
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
