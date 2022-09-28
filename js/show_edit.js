/**
 * Обращаемся к файлу, где запрашиваем API
 * Объект приходит в форме json, расшифровывать обратно  не надо, поля берем просто по именам resolve['ID'], resolve['NAME'] и тд
 **/

//функция для отображения предприятия
function selectItemEnterprise() {
    get('http://81.161.220.59:8100/api/enterprise/?action=getVariables&id=2&request=developer')
        .then(resolve => {
            document.getElementById('ttl_el').innerHTML = 'Предприятие ' + resolve['NAME'];          
            document.getElementById('edit_Form').innerHTML =
                "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                "<p id='arg_1' class='arg_field'>" + (resolve['NAME'] ? resolve['NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                "<p id='arg_2' class='arg_field'>" + (resolve['NAME_FULL'] ? resolve['NAME_FULL'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ХОЛДИНГ</p>" +
                "<p id='arg_3' class='selectlist arg_field'>" + (resolve['HOLDING_NAME'] ? resolve['HOLDING_NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ТИП ПРЕДПРИЯТИЯ</p>" +
                "<p id='arg_4' class='selectlist arg_field" + (resolve['ENTERPRISE_TYPE'] ? resolve['ENTERPRISE_TYPE'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПРЕДПРИЯТИЯ</p>" +
                "<p id='arg_5' class='selectlist arg_field id"+resolve['ENTERPRISE_ID']+"'>" + (resolve['DIRECTOR_NAME'] ? resolve['DIRECTOR_NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ПОДРЯДНАЯ ОРГАНИЗАЦИЯ</p>" +
                "<input type='checkbox' id='arg_6' readonly " + (resolve['ISCONTRACTOR'] ? 'checked> ' : '>') +
                "<p class='arg_edit'>СКЛАД</p>" +
                "<p id='arg_7'  class='arg_field'>" + (resolve['SKLAD'] ? resolve['SKLAD'] : 'Не заполнено') + "</p>";
            document.getElementById('block_edit').classList.remove('edit');
        });
}

//функция для отображения предприятия
function selectItemDivison() {
    get('http://81.161.220.59:8100/api/division/?action=getVariables&id=49&request=developer')
        .then(resolve => {
            document.getElementById('ttl_el').innerHTML = 'Подразделение ' + resolve['NAME'];
            document.getElementById('edit_Form').innerHTML =
                "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                "<p id='arg_8' class='arg_field'>" + (resolve['NAME'] ? resolve['NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                "<p id='arg_9' class='arg_field'>" + (resolve['NAME_FULL'] ? resolve['NAME_FULL'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ПРЕДПРИЯТИЕ</p>" +
                "<p id='arg_10' class='selectlist arg_field'>" + (resolve['ENTERPRISE_NAME'] ? resolve['ENTERPRISE_NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ТИП ПОДРАЗДЕЛЕНИЯ</p>" +
                "<p id='arg_11' class='selectlist arg_field'>" + (resolve['TYPE_NAME'] ? resolve['TYPE_NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>КОЛИЧЕСТВО СМЕН</p>" +
                "<p id='arg_12' class='selectlist arg_field'>" + (resolve['SHIFT_NAME'] ? resolve['SHIFT_NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПОДРАЗДЕЛЕНИЯ</p>" + "<p id='arg_13' class='selectlist arg_field id"+resolve['ENTERPRISE_ID']+"'>" + (resolve['CHIEF_NAME'] ? resolve['CHIEF_NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>РОДИТЕЛЬСКОЕ ПОДРАЗДЕЛЕНИЕ</p>" + "<p id='arg_14' class='selectlist arg_field'>" + (resolve['DIVISION_ADJANCED_NAME'] ? resolve['DIVISION_ADJANCED_NAME'] : 'Не заполнено') + "</p>" +
                "<p class='arg_edit'>ОПАСНЫЙ ПРОИЗВОДСТВЕННЫЙ ОБЪЕКТ</p>" +
                "<input type='checkbox' id='arg_15' readonly" + (resolve['IS_OPO'] ? 'checked> ' : '>') +
                "<p class='arg_edit'>ЖУРНАЛ СМЕННЫХ НАРЯДОВ</p>" +
                "<input type='checkbox' id='arg_16' readonly " + (resolve['IS_ORDERS_VISIBLE'] ? 'checked> ' : '>');
            document.getElementById('block_edit').classList.remove('edit');
        });
}
