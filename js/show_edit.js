//функция для отображения предприятия
function selectItemEnterprise(id) {
    blockSelect(true);
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById('loading').classList.remove('loading');
    document.getElementById('edit_Form').classList.add('loading');
    document.getElementById('block_edit').classList.remove('edit');
    // TO DO: Change dynamic URL
    get(URLS.enterprise.replace('{id}', id))
        .then(resolve => get(URLS.holdings)
            .then(holdings => get(URLS.enterpriseTypes)
                .then(enterpriseType => get(URLS.usersEnterprise.replace('{id}', resolve['ID']))
                    .then(users => {

                        document.getElementById('ttl_el').innerHTML = 'Предприятие ' + resolve['NAME'];
                        document.getElementById('ttl_el').classList.add('id' + resolve['ID']);
                        document.getElementById('edit_Form').innerHTML =
                            "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                            "<p id='name' class='arg_field' style = 'word-wrap: break-word'>" + (resolve['NAME'] ? resolve['NAME'] : 'Не заполнено') + "</p>" +
                            "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                            "<p id='fullname' class='arg_field textarea' style = 'word-wrap: break-word'>" + (resolve['NAME_FULL'] ? resolve['NAME_FULL'] : 'Не заполнено') + "</p>" +
                            "<p class='arg_edit'>ХОЛДИНГ</p>" +
                            "<p id='holding' class='selectlist arg_field holdings'>" + (resolve['HOLDING_ID'] ? findName(resolve['HOLDING_ID'], holdings) : 'Не заполнено') + "</p>" +
                            "<p class='arg_edit'>ТИП ПРЕДПРИЯТИЯ</p>" +
                            "<p id='type' class='selectlist arg_field enterpriseTypes'>" + (resolve['ENTERPRISE_TYPE'] ? findName(resolve['ENTERPRISE_TYPE'], enterpriseType) : 'Не заполнено') + "</p>" +
                            "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПРЕДПРИЯТИЯ</p>" +
                            "<p id='director' class='selectlist arg_field users id" + resolve['ID'] + "'>" + (resolve['DIRECTOR_ID'] ? findName(resolve['DIRECTOR_ID'], users) : 'Не заполнено') + "</p>" +
                            "<p class='arg_edit'>ПОДРЯДНАЯ ОРГАНИЗАЦИЯ</p>" +
                            "<input type='checkbox' id='isContractor' class='arg_field data' readonly " + (resolve['ISCONTRACTOR'] ? 'checked> ' : '>') +
                            "<p class='arg_edit'>СКЛАД</p>" +
                            "<p id='sklad'  class='arg_field'>" + (resolve['SKLAD'] ? resolve['SKLAD'] : 'Не заполнено') + "</p>";


                        document.getElementById('edit_Form').classList.remove('loading');
                        document.getElementById('loading').classList.add('loading');
                        blockSelect(false);
                        document.getElementById('img_change').onclick = edit;
                    }))));
}

//функция для отображения подразделения
function selectItemDivision(id) {
    blockSelect(true);
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById('loading').classList.remove('loading');
    document.getElementById('edit_Form').classList.add('loading');
    document.getElementById('block_edit').classList.remove('edit');
    get(URLS.division.replace('{id}', id))
        .then(resolve => get(URLS.enterpriseList)
            .then(enterprise => get(URLS.divisionShift)
                .then(divisionShift => get(URLS.divisionAdjanced)
                    .then(divisionAdjanced => get(URLS.usersEnterprise.replace('{id}', resolve['ENTERPRISE_ID']))
                        .then(users => {
                            document.getElementById('ttl_el').innerHTML = 'Подразделение ' + resolve['NAME'];
                            document.getElementById('ttl_el').classList.add('id' + resolve['ID']);
                            document.getElementById('edit_Form').innerHTML =
                                "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                                "<p id='name' class='arg_field' style = 'word-wrap: break-word'>" + (resolve['NAME'] ? resolve['NAME'] : 'Не заполнено') + "</p>" +
                                "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                                "<p id='fullname' class='arg_field textarea' style = 'word-wrap: break-word'>" + (resolve['NAME_FULL'] ? resolve['NAME_FULL'] : 'Не заполнено') + "</p>" +
                                "<p class='arg_edit'>ПРЕДПРИЯТИЕ</p>" +
                                "<p id='enterprise' class='selectlist arg_field enterprise'>" + (resolve['ENTERPRISE_ID'] ? findName(resolve['ENTERPRISE_ID'], enterprise) : 'Не заполнено') + "</p>" +
                                "<p class='arg_edit'>ТИП ПОДРАЗДЕЛЕНИЯ</p>" +
                                "<p id='type' class='selectlist arg_field divisionTypes'>" + (resolve['TYPE_NAME'] ? resolve['TYPE_NAME'] : 'Не заполнено') + "</p>" +
                                "<p class='arg_edit'>КОЛИЧЕСТВО СМЕН</p>" +
                                "<p id='shift' class='selectlist arg_field divisionShift slider'>" + (resolve['SHIFT_QT'] ? findName(resolve['SHIFT_QT'], divisionShift) : 'Не заполнено') + "</p>" +
                                "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПОДРАЗДЕЛЕНИЯ</p>" + "<p id='chief' class='selectlist arg_field users id" + resolve['ENTERPRISE_ID'] + "'>" + (resolve['CHIEF_ID'] ? findName(resolve['CHIEF_ID'], users) : 'Не заполнено') + "</p>" +
                                "<p class='arg_edit'>РОДИТЕЛЬСКОЕ ПОДРАЗДЕЛЕНИЕ</p>" + "<p id='adjanced' class='selectlist arg_field divisionAdjanced'>" + (resolve['DIVISION_ADJANCED_ID'] ? findName(resolve['DIVISION_ADJANCED_ID'], divisionAdjanced) : 'Не заполнено') + "</p>" +
                                "<p class='arg_edit'>ОПАСНЫЙ ПРОИЗВОДСТВЕННЫЙ ОБЪЕКТ</p>" +
                                "<input type='checkbox' id='isOpo' class='arg_field data' readonly " + (resolve['IS_OPO'] ? 'checked> ' : '>') +
                                "<p class='arg_edit'>ЖУРНАЛ СМЕННЫХ НАРЯДОВ</p>" +
                                "<input type='checkbox' id='is_order_visible' class='arg_field data' readonly " + (resolve['IS_ORDERS_VISIBLE'] ? 'checked> ' : '>');

                            document.getElementById('edit_Form').classList.remove('loading');
                            document.getElementById('loading').classList.add('loading');
                            blockSelect(false);
                            document.getElementById('img_change').onclick = edit;
                        })))));
}

//Поиск имени для подставления по ID(в селектлистах)
function findName(id, obj) {
    let name = 'Не заполнено';
    obj.forEach(function (a) {
        if (a['ID'] == id) name = a[getFieldName(a)];
    });
    return name;
}

//функции определения типа объекта
function getType(object) {
    if (object.classList.contains("DIVISION")) {
        document.getElementById('exit').style.visibility = 'hidden';
        document.getElementById('deleteObject').style.visibility = 'hidden';
        document.getElementById('ttl_el').innerHTML = '';
        document.getElementById('img_change').style.visibility = 'visible';
        document.getElementById('img_change').src = '../assets/change.png';
        removeID();
        selectItemDivision(object.id.substring(1));
    } else if (object.classList.contains("ENTERPRISE")) {
        document.getElementById('exit').style.visibility = 'hidden';
        document.getElementById('deleteObject').style.visibility = 'hidden';
        document.getElementById('ttl_el').innerHTML = '';
        document.getElementById('img_change').style.visibility = 'visible';
        document.getElementById('img_change').src = '../assets/change.png'
        removeID();
        selectItemEnterprise(object.id.substring(1));
    } else return;
}

function blockSelect(freeze) {
    if (freeze)
        $('body').css('pointer-events', 'none');
    else
        $('body').css('pointer-events', 'auto');
}
