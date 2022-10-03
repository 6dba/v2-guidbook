function createNewObject() {
    edit_Form.outerHTML = '<div id="edit_Form" class="p-2"></div>';
    ttl_el.innerHTML = 'Выбрать тип: ';
    loading.classList.remove('loading');
    edit_Form.classList.add('loading');
    document.getElementById('block_edit').classList.remove('edit');
    let type = document.createElement('select');
    type.id = 'type';
    type.innerHTML =
        "<option></option>" +
        "<option value='enterprise'>Предприятие</option>" +
        "<option value='division'>Подразделение</option>";

    ttl_el.append(type);
    img_change.src = '../assets/save.png';
    edit_Form.classList.remove('loading');
    loading.classList.add('loading');
    $('#type').change(function () {
        if ($(this).val() == 'enterprise') {
            type.disabled = true;
            loading.classList.remove('loading');
            edit_Form.classList.add('loading');
            get('http://81.161.220.59:8100/api/holdings/?action=getList&request=developer').then(holdings => get('http://81.161.220.59:8100/api/enterpriseTypes/?action=getList&request=developer').then(enterpriseType => get('http://81.161.220.59:8100/api/users/?action=getList&enterprise=2&request=developer').then(users => {

                document.getElementById('edit_Form').innerHTML =
                    "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                    "<input id='arg_1' class='input_tag'>" +
                    "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                    "<input id='arg_2' class='input_tag'>" +
                    "<p class='arg_edit'>ХОЛДИНГ</p>" +
                    "<select class='input_tag' id='arg_3'><option></option>" + createSelectList(holdings) +
                    "<p class='arg_edit'>ТИП ПРЕДПРИЯТИЯ</p>" +
                    "<select class='input_tag' id='arg_4'><option></option>" + createSelectList(enterpriseType) +
                    "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПРЕДПРИЯТИЯ</p>" +
                    "<select class='input_tag' id='arg_5'><option></option>" + createSelectList(users) +
                    "<p class='arg_edit'>ПОДРЯДНАЯ ОРГАНИЗАЦИЯ</p>" +
                    "<input type='checkbox' id='arg_6'>" +
                    "<p class='arg_edit'>СКЛАД</p>" +
                    "<input id='arg_7'  class='input_tag'>";
                edit_Form.classList.remove('loading');
                loading.classList.add('loading');
                type.disabled = false;

            })))
        } else if ($(this).val() == 'division') {
            type.disabled = true;
            loading.classList.remove('loading');
            edit_Form.classList.add('loading');
            get('http://81.161.220.59:8100/api/divisionTypes/?action=getList&request=developer').then(divisionType =>
            get('http://81.161.220.59:8100/api/enterprise/?action=getList&request=developer').then(enterprise => get('http://81.161.220.59:8100/api/divisionShift/?action=getList&request=developer').then(divisionShift => get('http://81.161.220.59:8100/api/divisionAdjanced/?action=getList&request=developer').then(divisionAdjanced => get('http://81.161.220.59:8100/api/users/?action=getList&enterprise=2&request=developer').then(users => {

                document.getElementById('edit_Form').innerHTML =
                    "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                    "<input id='arg_8' class='input_tag'>" +
                    "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                    "<input id='arg_9' class='input_tag'>" +
                    "<p class='arg_edit'>ПРЕДПРИЯТИЕ</p>" +
                    "<select class='input_tag' id='arg_10'><option></option>" + createSelectList(enterprise) +
                    "<p class='arg_edit'>ТИП ПОДРАЗДЕЛЕНИЯ</p>" +
                    "<select class='input_tag' id='arg_11'><option></option>" + createSelectList(divisionType) +
                    "<p class='arg_edit'>КОЛИЧЕСТВО СМЕН</p>" +
                    "<select class='input_tag' id='arg_12'><option></option>" + createSelectList(divisionShift) +
                    "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПОДРАЗДЕЛЕНИЯ</p>" + "<select class='input_tag' id='arg_13'><option></option>" + createSelectList(users) +
                    "<p class='arg_edit'>РОДИТЕЛЬСКОЕ ПОДРАЗДЕЛЕНИЕ</p>" + "<select class='input_tag' id='arg_14'><option> </option>" +
                    createSelectList(divisionAdjanced) +
                    "<p class='arg_edit'>ОПАСНЫЙ ПРОИЗВОДСТВЕННЫЙ ОБЪЕКТ</p>" +
                    "<input type='checkbox' id='arg_15'>" +
                    "<p class='arg_edit'>ЖУРНАЛ СМЕННЫХ НАРЯДОВ</p>" +
                    "<input type='checkbox' id='arg_16'>";
                edit_Form.classList.remove('loading');
                loading.classList.add('loading');
                type.disabled = false;
            })))));
        } else if ($(this).val() == '')
            edit_Form.outerHTML = '<div id="edit_Form" class="p-2"></div>';
    })
}




function createSelectList(selectlist) {

    let str;

    for (let i in selectlist) {
        let field = selectlist[i][getFieldName(selectlist[i])];
        str += "<option value='" + selectlist[i]['ID'] + "'>" + field + "</option>";
    }
    str += "</select>";
    return str;
}
