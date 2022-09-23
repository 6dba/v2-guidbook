/**
* Обращаемся к файлу, где запрашиваем API
* Объект приходит в форме json, расшифровывать обратно  не надо, поля берем просто по именам data['ID'], data['NAME'] и тд
**/
function selectItem() {
    $.ajax({
        url: '../php/ajaxget.php',
        method: 'POST',
        dataType: 'json',
        data:{ url: 'http://81.161.220.59:8100/api/enterprise/?action=getVariables&id=2&request=developer'},
        success: function (data) {
            document.getElementById('ttl_el').innerHTML = data['ID'];
        },
        error: function(jqxhr, status, errorMsg){ console.log(status+ ' '+errorMsg);}
    });
    
}
