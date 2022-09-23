/**
 * Обращаемся к файлу, где запрашиваем API
 * Объект приходит в форме json, расшифровывать обратно  не надо, поля берем просто по именам data['ID'], data['NAME'] и тд
 **/
function selectItem() {
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
                '<p id=\'arg_1\'>' + (data['NAME'] ? data['NAME'] : 'Не заполнено') + '</p>' +
                '<p class=\'arg_edit\'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>' +
                '<p id=\'arg_2\'>' + (data['NAME_FULL'] ? data['NAME_FULL'] : 'Не заполнено') + '</p>' +
                '<p class=\'arg_edit\'>ХОЛДИНГ</p>' +
                '<p id=\'arg_3\'>' + (data['HOLDING_NAME'] ? data['HOLDING_NAME'] : 'Не заполнено') + '</p>' +
                '<p class=\'arg_edit\'>ТИП ПРЕДПРИЯТИЯ</p>' +
                '<p id=\'arg_4\'>' + (data['ENTERPRISE_TYPE'] ? data['ENTERPRISE_TYPE'] : 'Не заполнено') + '</p>' +
                '<p class=\'arg_edit\'>РУКОВОДИТЕЛЬ ПРЕДПРИЯТИЯ</p>' +
                '<p id=\'arg_5\'>' + (data['DIRECTOR_NAME'] ? data['DIRECTOR_NAME'] : 'Не заполнено') + '</p>' +
                '<p class=\'arg_edit\'>ПОДРЯДНАЯ ОРГАНИЗАЦИЯ</p>' +
                '<input type="checkbox" id=\'arg_6\' readonly' + (data['ISCONTRACTOR'] ? 'checked> ' : '>') +
                '<p class=\'arg_edit\'>СКЛАД</p>' +
                '<p id=\'arg_7\'>' + (data['SKLAD'] ? data['SKLAD'] : 'Не заполнено') + '</p>';
            document.getElementById('block_edit').classList.remove('edit');
        },
        error: function (jqxhr, status, errorMsg) {
            console.log(status + ' ' + errorMsg);
        }
    });

}

function close_edit() {
    document.getElementById('block_edit').classList.add('edit');
    if (img_change.src == location.protocol + "//" + location.host + '/assets/save.png')
        img_change.src = '../assets/change.png';
}

function edit() {
    if (img_change.src == location.protocol + "//" + location.host + '/assets/save.png')
        img_change.src = '../assets/change.png';
    else {
        img_change.src = '../assets/save.png';
        for (var i = 1; i <= 7; i++) {
            var name = eval("arg_" + i);
            var in_tag = name.innerHTML;
            if (name.type == 'checkbox') {name.removeAttribute('readonly'); continue;}
            name.outerHTML = "<input class='input_tag'" + ((in_tag == "Не заполнено") ? ">" : ("value='" + in_tag + "'>"));
        }
    }
}
