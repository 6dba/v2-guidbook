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
    let selectType = document.createElement('select');
    selectType.id = 'selectType';
    selectType.innerHTML =
        "<option value='types' selected>--Выберите тип--</option> " +
        "<option value='enterprise'>Предприятие</option>" +
        "<option value='division'>Подразделение</option>";

    document.getElementById('ttl_el').append(selectType);
    document.getElementById('img_change').src = '../assets/save.png';
    document.getElementById('edit_Form').classList.remove('loading');
    document.getElementById('loading').classList.add('loading');
    $('#selectType').change(async function () {
        if ($(this).val() == 'enterprise') {
            document.getElementById('exit').style.visibility = 'visible';
            document.getElementById('img_change').style.visibility = 'visible';
            document.getElementById('selectType').disabled = true;
            document.getElementById('loading').classList.remove('loading');
            document.getElementById('edit_Form').classList.add('loading');

            holdings = await get(URLS.holdings);
            enterpriseType = await get(URLS.enterpriseTypes);
            users = await get(URLS.users);

            document.getElementById('edit_Form').innerHTML =
                "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                "<input id='name' class='input_tag data'>" +
                "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                "<textarea id='fullname' class='input_tag data'></textarea>" +
                "<p class='arg_edit'>ХОЛДИНГ</p>" +
                "<select class='input_tag js-selectize data' id='holding'><option></option>" + createSelectList(holdings) +
                "<p class='arg_edit'>ТИП ПРЕДПРИЯТИЯ</p>" +
                "<select class='input_tag js-selectize data' id='type'><option></option>" + createSelectList(enterpriseType) +
                "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПРЕДПРИЯТИЯ</p>" +
                "<select class='input_tag users data' id='director'><option></option>" + createSelectList(users) +
                "<p class='arg_edit'>ПОДРЯДНАЯ ОРГАНИЗАЦИЯ</p>" +
                "<input type='checkbox' id='isContractor' class='data'>" +
                "<p class='arg_edit'>СКЛАД</p>" +
                "<input id='sklad'  class='input_tag data'>";

            $('.js-selectize').selectize();
            $('.users').selectize({
                maxItems: null,
                plugins: ['remove_button']
            });
            document.getElementById('edit_Form').classList.remove('loading');
            document.getElementById('loading').classList.add('loading');
            document.getElementById('selectType').disabled = false;

        } else if ($(this).val() == 'division') {
            document.getElementById('exit').style.visibility = 'visible';
            document.getElementById('img_change').style.visibility = 'visible';
            document.getElementById('selectType').disabled = true;
            document.getElementById('loading').classList.remove('loading');
            document.getElementById('edit_Form').classList.add('loading');

            divisionType = await get(URLS.divisionTypes);
            enterprise = await get(URLS.enterpriseList);
            divisionShift = await get(URLS.divisionShift);
            divisionAdjanced = await get(URLS.divisionAdjanced);
            users = await URLS.users;
            document.getElementById('edit_Form').innerHTML =
                "<p class='arg_edit'>НАИМЕНОВАНИЕ</p>" +
                "<input id='name' class='input_tag data'>" +
                "<p class='arg_edit'>ПОЛНОЕ НАИМЕНОВАНИЕ</p>" +
                "<textarea id='fullname' class='input_tag data'></textarea>" +
                "<p class='arg_edit'>ПРЕДПРИЯТИЕ</p>" +
                "<select class='input_tag js-selectize enterprise data' id='enterprise'><option></option>" + createSelectList(enterprise) +
                "<p class='arg_edit'>ТИП ПОДРАЗДЕЛЕНИЯ</p>" +
                "<select class='input_tag js-selectize data' id='type'><option></option>" + createSelectList(divisionType) +
                "<p class='arg_edit'>КОЛИЧЕСТВО СМЕН</p>" +
                "<div id='slider' class='slider'><div id='shift' class='ui-slider-handle data'></div></div>" +
                "<p class='arg_edit'>РУКОВОДИТЕЛЬ ПОДРАЗДЕЛЕНИЯ</p>" + "<select class='input_tag users data' id='chief'><option></option>" + createSelectList(users) +
                "<p class='arg_edit'>РОДИТЕЛЬСКОЕ ПОДРАЗДЕЛЕНИЕ</p>" + "<select class='input_tag js-selectize data' id='adjanced'><option> </option>" +
                createSelectList(divisionAdjanced) +
                "<p class='arg_edit'>ОПАСНЫЙ ПРОИЗВОДСТВЕННЫЙ ОБЪЕКТ</p>" +
                "<input type='checkbox' id='isOpo' class='data'>" +
                "<p class='arg_edit'>ЖУРНАЛ СМЕННЫХ НАРЯДОВ</p>" +
                "<input type='checkbox' id='is_order_visible' class='data'>";

            $('.slider').slider({
                min: 0,
                max: divisionShift.length - 1,
                create: function (event, ui) {
                    $('#shift').val(divisionShift[$(this).slider("value")]['ID']);
                    $('#shift').text(divisionShift[$(this).slider("value")]['NAME']);
                },
                slide: function (event, ui) {
                    $('#shift').val(divisionShift[ui.value]['ID']);
                    $('#shift').text(divisionShift[ui.value]['NAME']);
                }
            });

            $('.js-selectize').selectize();
            $('.users').selectize({
                maxItems: null,
                plugins: ['remove_button']
            });

            document.getElementById('edit_Form').classList.remove('loading');
            document.getElementById('loading').classList.add('loading');
            document.getElementById('selectType').disabled = false;

            $('.enterprise').change(async function () {
                // TO DO: Change dynamic URL
                users = await get(URLS.usersEnterprise.replace('{id}', $(this).val()));
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
    if (typeof selectType !== 'undefined') {
        if (check_null()) return;
        postObject(selectType.value).then(()=> reload_cache());
    }
    document.getElementById('selectType').remove();
    createNewObject();
}

function check_null() {
    $('#edit_Form span').remove();
    let null_field = false;
    Array.from(document.getElementsByClassName('data')).forEach((name) => {
            if (name.id == 'director' || name.id == 'chief') return;
            if ((name.tagName.toLowerCase() == 'input' || name.tagName.toLowerCase() == 'textarea') && name.value == '') {
                name.style.borderColor = '#ec1b0b';
                null_field = true;
            } else if (name.tagName.toLowerCase() == 'select' && name.options[name.selectedIndex].value == '') {
                name.nextSibling.firstChild.style.borderColor = '#ec1b0b';
                null_field = true;
            }
        })
        if (null_field) {
            span = createElemWithAttr('span', {
                style: 'color:#ec1b0b; font-size:13px;',
                innerHTML: 'Заполните выделенные поля'
            });

            document.getElementById('edit_Form').prepend(span);
        }
    return null_field;
}
