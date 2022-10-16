//функция для перехода в режим редактирования или отправки измененных данных в //режим просмотра
function edit() {
    document.getElementById('img_change').onclick = null;
    setTimeout(() => {
        document.getElementById('img_change').onclick = edit;
    }, 1000);
    document.getElementById('img_change').style.visibility = 'visible';
    setTimeout(() =>
        document.getElementById('button_change_view').onclick = changeView, 1000);
    if (document.getElementById('img_change').src == location.protocol + "//" + location.host + '/assets/save.png') {
        document.getElementById('exit').style.visibility = 'hidden';
        document.getElementById('deleteObject').style.visibility = 'hidden';
        if (document.getElementById('ttl_el').innerHTML.includes('Предприятие')) {
            postEnterprise();
            setTimeout(() => {
                selectItemEnterprise(findID(document.getElementById('ttl_el')));
                reload_cache();
            }, 300);
            document.getElementById('img_change').src = '../assets/change.png';
        } else if (document.getElementById('ttl_el').innerHTML.includes('Подразделение')) {
            postDivision();
            setTimeout(() => {
                selectItemDivision(findID(document.getElementById('ttl_el')));
                reload_cache();
            }, 300);
            document.getElementById('img_change').src = '../assets/change.png';
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
        }, 1500);
        if (document.getElementById('ttl_el').innerHTML.includes('Подразделение')) editView(8, 16);
        else if (document.getElementById('ttl_el').innerHTML.includes('Предприятие'))
            editView(1, 7);
    }
}
//Формирование селект листов
function selectList(name) {
    let id = '';
    let list = '';
    if (name.id == 'arg_3') list = 'holdings';
    else if (name.id == 'arg_4') list = 'enterpriseTypes';
    else if (name.id == 'arg_5' || name.id == 'arg_13') {
        list = 'users';
        id = '&enterprise=' + findID(name);
    } else if (name.id == 'arg_10') list = 'enterprise';
    else if (name.id == 'arg_11') list = 'divisionTypes';
    else if (name.id == 'arg_12') list = 'divisionShift';
    else if (name.id == 'arg_14') list = 'divisionAdjanced';
    let url = 'http://81.161.220.59:8100/api/' + list + '/?action=getList' + id + '&request=developer';
    get(url).then(resolve => {
        str = "<select class='input_tag' id='" + name.id + "'><option></option>";
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
        $('#arg_10').change(async function () {
            users = await get('http://81.161.220.59:8100/api/users/?action=getList&enterprise=' + $(this).val() + '&request=developer');
            document.getElementById('arg_13').innerHTML = "<option></option>" +
                createSelectList(users);
        });
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

//функция генерации полей режима редактирования
function editView(start, end) {
    for (let i = start; i <= end; i++) {
        let name = eval("arg_" + i);
        let in_tag = name.innerHTML;
        if (name.type == 'checkbox') {
            name.removeAttribute('readonly');
            continue;
        }
        if (name.classList.contains('selectlist')) {
            selectList(name);
            continue;
        }
        name.outerHTML = "<input class='input_tag' id='" + name.id + "' " + ((in_tag == "Не заполнено") ? ">" : ("value='" + in_tag + "'>"));
    }
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
