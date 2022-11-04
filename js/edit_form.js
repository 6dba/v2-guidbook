//функция для перехода в режим редактирования или отправки измененных данных в //режим просмотра
function edit() {
    document.getElementById('img_change').onclick = null;
    setTimeout(() => {
        document.getElementById('img_change').onclick = edit;
    }, 1000);
    document.getElementById('img_change').style.visibility = 'visible';
    setTimeout(() =>
        document.getElementById('button_change_view').onclick = changeView, 1000);
    if (document.getElementById('img_change').src.includes('save')) {
        if (document.getElementById('ttl_el').innerHTML.includes('Подразделение')) {
            if (check_null(8, 16)) return;
        } else if (document.getElementById('ttl_el').innerHTML.includes('Предприятие')) {
            if (check_null(1, 7)) return;
        }
        document.getElementById('exit').style.visibility = 'hidden';
        document.getElementById('deleteObject').style.visibility = 'hidden';
        if (document.getElementById('ttl_el').innerHTML.includes('Предприятие')) {
            postEnterprise().then(() => {
                selectItemEnterprise(findID(document.getElementById('ttl_el')));
                reload_cache();
                document.getElementById('img_change').src = '../assets/change.png';
            })
        } else if (document.getElementById('ttl_el').innerHTML.includes('Подразделение')) {
            postDivision().then(() => {
                selectItemDivision(findID(document.getElementById('ttl_el')));
                reload_cache();
                document.getElementById('img_change').src = '../assets/change.png';
            })
        }
    } else {
        document.getElementById('img_change').src = '../assets/save.png';
        document.getElementById('exit').style.visibility = 'visible';
        document.getElementById('deleteObject').style.visibility = 'visible';
        //скрываем форму до полной загрузки
        document.getElementById('loading').classList.remove('loading');
        document.getElementById('edit_Form').classList.add('loading');
        setTimeout(() => {
            //показываем обновленную форму с полностью 
            //загруженными данными
            document.getElementById('edit_Form').classList.remove('loading');
            document.getElementById('loading').classList.add('loading');
            $('.js-selectize').selectize();
            $('.users').selectize({
                maxItems: null,
                plugins: ['remove_button']
            });
            $('.enterprise').change(async function () {
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
        });
        }, 1500);
        editView();
    }
}

//функция генерации полей режима редактирования
function editView() {
    Array.from(document.getElementsByClassName('arg_field')).forEach((name) => {
        let in_tag = name.innerHTML;
        if (name.type == 'checkbox') {
            name.removeAttribute('readonly');
            return;
        }
        if (name.classList.contains('selectlist')) {
            selectList(name);
            return;
        }
        if (name.classList.contains('textarea')) {
            name.outerHTML = "<textarea class='input_tag' id='" + name.id + "' " + ((in_tag == "Не заполнено") ? ">" : (">" + in_tag ));
            return;
        }
        name.outerHTML = "<input class='input_tag' id='" + name.id + "' " + ((in_tag == "Не заполнено") ? ">" : ("value='" + in_tag + "'>"));
    })
}

//Формирование селект листов
function selectList(name) {
    let id = '';
    let list = '';
    if (name.classList.value.includes('holdings')) list = 'holdings';
    else if (name.classList.value.includes('enterpriseTypes')) list = 'enterpriseTypes';
    else if (name.classList.value.includes('users')) {
        list = 'users';
        id = '&enterprise=' + findID(name);
    } else if (name.classList.value.includes('enterprise')) list = 'enterprise';
    else if (name.classList.value.includes('divisionTypes')) list = 'divisionTypes';
    else if (name.classList.value.includes('divisionShift')) list = 'divisionShift';
    else if (name.classList.value.includes('divisionAdjanced')) list = 'divisionAdjanced';
    let url = 'http://81.161.220.59:8100/api/' + list + '/?action=getList' + id + '&request=developer';
    get(url).then(resolve => {
        if (name.classList.contains('slider')) {
            name.outerHTML = '<div id="' + name.id + '" class="slider"><div id="handle" class="ui-slider-handle"></div></div>';
            $('.slider').slider({
                min: 0,
                max: resolve.length - 1,
                create: function (event, ui) {
                    $('#handle').val(resolve[$(this).slider("value")]['ID']);
                    $('#handle').text(resolve[$(this).slider("value")]['NAME']);
                },
                slide: function (event, ui) {
                    $('#handle').val(resolve[ui.value]['ID']);
                    $('#handle').text(resolve[ui.value]['NAME']);
                }
            });
            return;
        }
        str = "<select class='input_tag " + (name.classList.value.includes('users') ? 'users' : name.classList.value.includes('enterprise') ? 'enterprise js-selectize' : 'js-selectize') + "' id='" + name.id + "'><option></option>";
        //получаем массив JSON-объектов для селект листа, //перебираем 
        //каждый элемент и вставляем его имя в селект 
        //лист
        for (let i in resolve) {
            let field = resolve[i][getFieldName(resolve[i])];
            if (field == name.innerHTML)
                str += "<option selected value='" + resolve[i]['ID'] + "'>" + field + "</option>";
            else str += "<option value='" + resolve[i]['ID'] + "'>" + field + "</option>";
        }
        str += "</select>";
        name.outerHTML = str;
    });
}

//Ищем поле, где написано имя для селект листа
function getFieldName(obj) {
    let key;
    Object.keys(obj).forEach(function (a) {
        if (a.includes('NAME'))
            key = a;
    })
    return key;
}


//найти ID объекта name
function findID(name) {
    let id;
    name.classList.forEach(
        function (a) {
            if (/id/.test(a)) {
                id = a.substring(2);
            }
        })
    return id;
}

//Удалить ID из заголовка формы просмотра/редактирования
function removeID() {
    document.getElementById('ttl_el').classList.forEach(
        function (a) {
            if (/id/.test(a)) {
                document.getElementById('ttl_el').classList.remove(a);
            }
        });
}
