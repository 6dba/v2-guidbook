/**
 * Обращаемся к файлу, где запрашиваем API
 * Объект приходит в форме json, расшифровывать обратно  не надо, поля берем просто по именам data['ID'], data['NAME'] и тд
 **/
function selectItem() {
    document.getElementById('block_edit').classList.remove('edit');
    $.ajax({
        url: '../php/ajaxget.php',
        method: 'POST',
        dataType: 'json',
        data: {
            url: 'http://81.161.220.59:8100/api/enterprise/?action=getVariables&id=2&request=developer'
        },
        success: function (data) {
            document.getElementById('ttl_el').innerHTML = data['NAME'];
            /* генерация форм */
            document.getElementById('edit_Form').innerHTML =
                '<p class=\'arg_edit\'>НАИМЕНОВАНИЕ</p>' +
                '<p>' + (data['NAME'] ? data['NAME'] : 'Не заполнено')+ '</p>' +
                '<p class=\'arg_edit\'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>' +
                '<p>' + (data['NAME_FULL'] ? data['NAME_FULL'] : 'Не заполнено') + '</p>' +
                '<p class=\'arg_edit\'>ХОЛДИНГ</p>' +
                '<p>' + (data['HOLDING_NAME'] ? data['HOLDING_NAME'] : 'Не заполнено') + '</p>' +
                '<p class=\'arg_edit\'>ТИП ПРЕДПРИЯТИЯ</p>' +
                '<p>' + (data['ENTERPRISE_TYPE'] ? data['ENTERPRISE_TYPE'] : 'Не заполнено') + '</p>' +
                '<p class=\'arg_edit\'>РУКОВОДИТЕЛЬ ПРЕДПРИЯТИЯ</p>' +
                '<p>' + (data['DIRECTOR_NAME'] ? data['DIRECTOR_NAME'] : 'Не заполнено') + '</p>' +
                '<p class=\'arg_edit\'>ПОДРЯДНАЯ ОРГАНИЗАЦИЯ</p>'  +
                '<input type="checkbox"' + (data['ISCONTRACTOR'] ? 'checked>' : '>') +
                '<p class=\'arg_edit\'>СКЛАД</p>'  +
                '<p>' + (data['SKLAD'] ? data['SKLAD'] : 'Не заполнено') + '</p>'
        },
        error: function (jqxhr, status, errorMsg) {
            console.log(status + ' ' + errorMsg);
        }
    });

}
function close_edit() { document.getElementById('block_edit').classList.add('edit');
}
