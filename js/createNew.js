function createNewObject() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById('img_change').style.visibility = 'hidden';
    document.getElementById('exit').style.visibility = 'hidden';
    document.getElementById('deleteObject').style.visibility = 'hidden';
    document.getElementById('img_change').onclick = postNew;
    document.getElementById('ttl_el').innerHTML = '';
    document.getElementById('edit_Form').outerHTML = '<div id="edit_Form" class="p-2"></div>';
    removeID();
    document.getElementById('loading').classList.remove('loading');
    document.getElementById('edit_Form').classList.add('loading');
    document.getElementById('block_edit').classList.remove('edit');
    let type = document.createElement('select');
    type.id = 'type';
    type.innerHTML =
        "<option value='types' selected>--Выберите тип--</option> " +
        "<option value='enterprise'>Предприятие</option>" +
        "<option value='division'>Подразделение</option>";

    document.getElementById('ttl_el').append(type);
    document.getElementById('img_change').src = '../assets/save.png';
    document.getElementById('edit_Form').classList.remove('loading');
    document.getElementById('loading').classList.add('loading');
    $('#type').change(async function () {
        if ($(this).val() == 'enterprise') {
            document.getElementById('exit').style.visibility = 'visible';
            document.getElementById('img_change').style.visibility = 'visible';
            document.getElementById('type').disabled = true;
            document.getElementById('loading').classList.remove('loading');
            document.getElementById('edit_Form').classList.add('loading');

            holdings = await get(URLS.holdings);
            enterpriseType = await get(URLS.enterpriseTypes);
            users = await get(URLS.users);

            document.getElementById('edit_Form').innerHTML =
                "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                "<input id='arg_1' class='input_tag'>" +
                "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                "<textarea id='arg_2' class='input_tag'></textarea>" +
                "<p class='arg_edit'>ХОЛДИНГ</p>" +
                "<select class='input_tag js-selectize' id='arg_3'><option></option>" + createSelectList(holdings) +
                "<p class='arg_edit'>ТИП ПРЕДПРИЯТИЯ</p>" +
                "<select class='input_tag js-selectize' id='arg_4'><option></option>" + createSelectList(enterpriseType) +
                "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПРЕДПРИЯТИЯ</p>" +
                "<select class='input_tag users' id='arg_5'><option></option>" + createSelectList(users) +
                "<p class='arg_edit'>ПОДРЯДНАЯ ОРГАНИЗАЦИЯ</p>" +
                "<input type='checkbox' id='arg_6'>" +
                "<p class='arg_edit'>СКЛАД</p>" +
                "<input id='arg_7'  class='input_tag'>";
            $('.js-selectize').selectize();
            $('.users').selectize({
                maxItems: null,
                plugins: ['remove_button']
            });
            document.getElementById('edit_Form').classList.remove('loading');
            document.getElementById('loading').classList.add('loading');
            document.getElementById('type').disabled = false;

        } else if ($(this).val() == 'division') {
            document.getElementById('exit').style.visibility = 'visible';
            document.getElementById('img_change').style.visibility = 'visible';
            document.getElementById('type').disabled = true;
            document.getElementById('loading').classList.remove('loading');
            document.getElementById('edit_Form').classList.add('loading');

            divisionType = await get(URLS.divisionTypes);
            enterprise = await get(URLS.enterpriseList);
            divisionShift = await get(URLS.divisionShift);
            divisionAdjanced = await get(URLS.divisionAdjanced);
            users = '';
            document.getElementById('edit_Form').innerHTML =
                "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                "<input id='arg_8' class='input_tag'>" +
                "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                "<textarea id='arg_9' class='input_tag'></textarea>" +
                "<p class='arg_edit'>ПРЕДПРИЯТИЕ</p>" +
                "<select class='input_tag js-selectize enterprise' id='arg_10'><option></option>" + createSelectList(enterprise) +
                "<p class='arg_edit'>ТИП ПОДРАЗДЕЛЕНИЯ</p>" +
                "<select class='input_tag js-selectize' id='arg_11'><option></option>" + createSelectList(divisionType) +
                "<p class='arg_edit'>КОЛИЧЕСТВО СМЕН</p>" +
                "<div id='arg_12' class='slider'><div id='handle' class='ui-slider-handle'></div></div>" +
                "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПОДРАЗДЕЛЕНИЯ</p>" + "<select class='input_tag users' id='arg_13'><option></option>" + createSelectList(users) +
                "<p class='arg_edit'>РОДИТЕЛЬСКОЕ ПОДРАЗДЕЛЕНИЕ</p>" + "<select class='input_tag js-selectize' id='arg_14'><option> </option>" +
                createSelectList(divisionAdjanced) +
                "<p class='arg_edit'>ОПАСНЫЙ ПРОИЗВОДСТВЕННЫЙ ОБЪЕКТ</p>" +
                "<input type='checkbox' id='arg_15'>" +
                "<p class='arg_edit'>ЖУРНАЛ СМЕННЫХ НАРЯДОВ</p>" +
                "<input type='checkbox' id='arg_16'>";
            
            $('.slider').slider({
                min: 0,
                max: divisionShift.length - 1,
                create: function (event, ui) {
                    $('#handle').val(divisionShift[$(this).slider("value")]['ID']);
                    $('#handle').text(divisionShift[$(this).slider("value")]['NAME']);
                },
                slide: function (event, ui) {
                    $('#handle').val(divisionShift[ui.value]['ID']);
                    $('#handle').text(divisionShift[ui.value]['NAME']);
                }
            });
            
            $('.js-selectize').selectize();
            $('.users').selectize({
                maxItems: null,
                plugins: ['remove_button']
            });

            document.getElementById('edit_Form').classList.remove('loading');
            document.getElementById('loading').classList.add('loading');
            document.getElementById('type').disabled = false;
            $('.enterprise').change(async function () {
                // TO DO: Change dynamic URL
                users = await get('http://81.161.220.59:8100/api/users/?action=getList&enterprise=' + $(this).val() + '&request=developer');
                $('.users')[0].selectize.clearOptions();
                for (let i in users) {
                    let field = users[i][getFieldName(users[i])];
                    $('.users')[0].selectize.addOption({
                        value: users[i]['ID'],
                        text: field
                    })
                }
                $('.users')[0].selectize.refreshOptions('');
                $('.users')[0].selectize.clear();
            })
        } else if ($(this).val() == 'types') {
            document.getElementById('edit_Form').outerHTML = '<div id="edit_Form" class="p-2"></div>';
            document.getElementById('img_change').style.visibility = 'hidden';
            document.getElementById('exit').style.visibility = 'hidden';
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
    if (typeof type !== 'undefined' && type.value == 'division') {
        if (check_null(8, 16)) return;
    } else if (typeof type !== 'undefined' && type.value == 'enterprise') {
        if (check_null(1, 7)) return;
    }

    document.getElementById('exit').style.visibility = 'hidden';
    if (typeof type !== 'undefined' && type.value == 'enterprise') {
        postEnterprise().then(() => {reload_cache()})
    } else if (typeof type !== 'undefined' && type.value == 'division') {
        postDivision().then(() => {reload_cache()})
    }
    document.getElementById('type').remove();
    createNewObject();
}

function check_null(start, end) {
    $('#edit_Form span').remove();
    let null_field = false;
    for (i = start; i <= end; i++) {
        let name = eval("arg_" + i);
        if (name.id == 'arg_5' || name.id == 'arg_13') continue;
        if ((name.tagName.toLowerCase() == 'input' || name.tagName.toLowerCase() == 'textarea') && name.value == '') {
            name.style.borderColor = '#ec1b0b';
            null_field = true;
        } else if (name.tagName.toLowerCase() == 'select' && name.options[name.selectedIndex].value == '') {
            name.nextSibling.firstChild.style.borderColor = '#ec1b0b';
            null_field = true;
        }
    }
    if (null_field) {
        span = createElemWithAttr('span', {
            style: 'color:#ec1b0b; font-size:13px;',
            innerHTML: 'Заполните выделенные поля'
        });

        document.getElementById('edit_Form').prepend(span);
    }
    return null_field;
}
