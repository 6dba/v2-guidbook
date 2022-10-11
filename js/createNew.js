function createNewObject() {
    img_change.style.visibility = 'hidden';
    exit.style.visibility = 'hidden';
    deleteObject.style.visibility = 'hidden';
    img_change.onclick = postNew;
    ttl_el.innerHTML = '';
    edit_Form.outerHTML = '<div id="edit_Form" class="p-2"></div>';
    loading.classList.remove('loading');
    edit_Form.classList.add('loading');
    document.getElementById('block_edit').classList.remove('edit');
    let type = document.createElement('select');
    type.id = 'type';
    type.innerHTML =
        "<option value='types' selected>--Выберите тип--</option>" +
        "<option value='enterprise'>Предприятие</option>" +
        "<option value='division'>Подразделение</option>";

    ttl_el.append(type);
    img_change.src = '../assets/save.png';
    edit_Form.classList.remove('loading');
    loading.classList.add('loading');
    $('#type').change(async function () {
        if ($(this).val() == 'enterprise') {
            exit.style.visibility = 'visible';
            img_change.style.visibility = 'visible';
            type.disabled = true;
            loading.classList.remove('loading');
            edit_Form.classList.add('loading');

            holdings = await get('http://81.161.220.59:8100/api/holdings/?action=getList&request=developer');
            enterpriseType = await get('http://81.161.220.59:8100/api/enterpriseTypes/?action=getList&request=developer');
            users = await get('http://81.161.220.59:8100/api/users/?action=getList&request=developer');

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

        } else if ($(this).val() == 'division') {
            exit.style.visibility = 'visible';
            img_change.style.visibility = 'visible';
            type.disabled = true;
            loading.classList.remove('loading');
            edit_Form.classList.add('loading');

            divisionType = await get('http://81.161.220.59:8100/api/divisionTypes/?action=getList&request=developer');
            enterprise = await get('http://81.161.220.59:8100/api/enterprise/?action=getList&request=developer');
            divisionShift = await get('http://81.161.220.59:8100/api/divisionShift/?action=getList&request=developer');
            divisionAdjanced = await get('http://81.161.220.59:8100/api/divisionAdjanced/?action=getList&request=developer');
            users = '';
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
            $('#arg_10').change(async function () {
                users = await get('http://81.161.220.59:8100/api/users/?action=getList&enterprise=' + $(this).val() + '&request=developer');
                arg_13.innerHTML = "<option></option>" +
                    createSelectList(users);
            });

        } else if ($(this).val() == 'types') {
            edit_Form.outerHTML = '<div id="edit_Form" class="p-2"></div>';
            img_change.style.visibility = 'hidden';
            exit.style.visibility = 'hidden';
        }
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

function postNew() {
    exit.style.visibility = 'hidden';
    if (typeof type !== 'undefined' && type.value == 'enterprise') {
        postEnterprise();
        reload_cache();
    } else if (typeof type !== 'undefined' && type.value == 'division') {
        postDivision();
        reload_cache();
    }
    type.remove();
    createNewObject();
}

