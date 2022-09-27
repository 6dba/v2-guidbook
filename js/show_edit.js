/**
 * Обращаемся к файлу, где запрашиваем API
 * Объект приходит в форме json, расшифровывать обратно  не надо, поля берем просто по именам data['ID'], data['NAME'] и тд
 **/

/*function selectItem(url) {
    $.ajax({
        url: '../php/ajaxget.php',
        method: 'POST',
        dataType: 'json',
        data: {
            url: 'http://81.161.220.59:8100/api/enterprise/?action=getVariables&id=2&request=developer'
        },
        success: function (data) {
            document.getElementById('ttl_el').innerHTML = data['NAME'];
            /* генерация форм
            document.getElementById('edit_Form').innerHTML =
                "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                "<p id='arg_1' class='arg_field'>" + (data['NAME'] ? data['NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                "<p id='arg_2' class='arg_field'>" + (data['NAME_FULL'] ? data['NAME_FULL'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ХОЛДИНГ</p>" +
                "<p id='arg_3' class='selectlist arg_field'>" + (data['HOLDING_NAME'] ? data['HOLDING_NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ТИП ПРЕДПРИЯТИЯ</p>" +
                "<p id='arg_4' class='selectlist arg_field'>" + (data['ENTERPRISE_TYPE'] ? data['ENTERPRISE_TYPE'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПРЕДПРИЯТИЯ</p>" +
                "<p id='arg_5' class='selectlist arg_field'>" + (data['DIRECTOR_NAME'] ? data['DIRECTOR_NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ПОДРЯДНАЯ ОРГАНИЗАЦИЯ</p>" +
                "<input type='checkbox' id='arg_6' readonly" + (data['ISCONTRACTOR'] ? 'checked> ' : '>') +
                "<p class='arg_edit'>СКЛАД</p>" +
                "<p id='arg_7'  class='arg_field'>" + (data['SKLAD'] ? data['SKLAD'] : 'Не заполнено') + "</p>";
            document.getElementById('block_edit').classList.remove('edit');
        },
        error: function (jqxhr, status, errorMsg) {
            console.log(status + ' ' + errorMsg);
        }
    });

}*/

/*'http://81.161.220.59:8100/api/enterprise/?action=getVariables&id=2&request=developer'*/
function show_edit(url)
{
    get('http://81.161.220.59:8100/api/enterprise/?action=getVariables&id=2&request=developer', selectItem);
}

function selectItem(data) {
    document.getElementById('ttl_el').innerHTML = data['NAME'];
    document.getElementById('edit_Form').innerHTML =
        "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
        "<p id='arg_1' class='arg_field'>" + (data['NAME'] ? data['NAME'] : 'Не заполнено') + "</p>" +
        "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
        "<p id='arg_2' class='arg_field'>" + (data['NAME_FULL'] ? data['NAME_FULL'] : 'Не заполнено') + "</p>" +
        "<p class='arg_edit'>ХОЛДИНГ</p>" +
        "<p id='arg_3' class='selectlist arg_field'>" + (data['HOLDING_NAME'] ? data['HOLDING_NAME'] : 'Не заполнено') + "</p>" +
        "<p class='arg_edit'>ТИП ПРЕДПРИЯТИЯ</p>" +
        "<p id='arg_4' class='selectlist arg_field'>" + (data['ENTERPRISE_TYPE'] ? data['ENTERPRISE_TYPE'] : 'Не заполнено') + "</p>" +
        "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПРЕДПРИЯТИЯ</p>" +
        "<p id='arg_5' class='selectlist arg_field'>" + (data['DIRECTOR_NAME'] ? data['DIRECTOR_NAME'] : 'Не заполнено') + "</p>" +
        "<p class='arg_edit'>ПОДРЯДНАЯ ОРГАНИЗАЦИЯ</p>" +
        "<input type='checkbox' id='arg_6' readonly" + (data['ISCONTRACTOR'] ? 'checked> ' : '>') +
        "<p class='arg_edit'>СКЛАД</p>" +
        "<p id='arg_7'  class='arg_field'>" + (data['SKLAD'] ? data['SKLAD'] : 'Не заполнено') + "</p>";
    document.getElementById('block_edit').classList.remove('edit');


}
