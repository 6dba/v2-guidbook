//закрыть форму просмотра/редактирования
function close_edit() {
    document.getElementById('block_edit').classList.add('edit');
    if (img_change.src == location.protocol + "//" + location.host + '/assets/save.png')
        img_change.src = '../assets/change.png';
}

//функция для перехода в режим редактирования или обратно в //режим просмотра
function edit() {
    if (img_change.src == location.protocol + "//" + location.host + '/assets/save.png') {
        if (ttl_el.innerHTML.includes('Предприятие')) {
            post('http://81.161.220.59:8100/api/enterprise/?action=setVariables&request=developer', {
   "id": "2",
   "name": "mytest",
   "fullname": "posttest",
   "holding": "1",
   "type": "2",
   "director": "",
   "isContractor": "Y",
   "sklad": ""
}
);
            selectItemEnterprise();
        } else
            selectItemDivison();
        img_change.src = '../assets/change.png';
    } else {
        img_change.src = '../assets/save.png';
        //скрываем форму до полной загрузки
        loading.classList.remove('loading');
        edit_Form.classList.add('loading');
        if (ttl_el.innerHTML.includes('Подразделение')) {
            for (var i = 8; i <= 16; i++) {
                var name = eval("arg_" + i);
                var in_tag = name.innerHTML;
                if (name.type == 'checkbox') {
                    name.removeAttribute('readonly');
                    continue;
                }
                if (name.classList.contains('selectlist')) {
                    selectList(name);
                    continue;
                }
                name.outerHTML = "<input class='input_tag'" + ((in_tag == "Не заполнено") ? ">" : ("value='" + in_tag + "'>"));
            }
        } else {
            for (var i = 1; i <= 7; i++) {
                var name = eval("arg_" + i);
                var in_tag = name.innerHTML;
                if (name.type == 'checkbox') {
                    name.removeAttribute('readonly');
                    continue;
                }
                if (name.classList.contains('selectlist')) {
                    selectList(name);
                    continue;
                }
                name.outerHTML = "<input class='input_tag'" + ((in_tag == "Не заполнено") ? ">" : ("value='" + in_tag + "'>"));
            }
        }
    }
}

//Формирование селект листов
function selectList(name) {
    var id = '';
    var list = '';
    if (name.id == 'arg_3') list = 'holdings';
    else if (name.id == 'arg_4') list = 'enterpriseTypes';
    else if (name.id == 'arg_5' || name.id == 'arg_13') {
        list = 'users';
        id = '&enterprise=' + name.classList[2].substring(2);
    } else if (name.id == 'arg_10') list = 'enterprise';
    else if (name.id == 'arg_11') list = 'divisionTypes';
    else if (name.id == 'arg_12') list = 'divisionShift';
    else if (name.id == 'arg_14') list = 'divisionAdjanced';
    var url = 'http://81.161.220.59:8100/api/' + list + '/?action=getList' + id + '&request=developer';
    get(url).then(resolve => {
        str = "<select class='input_tag'><option></option>";
        //получаем массив JSON-объектов, перебираем 
        //каждый элемент и вставляем его имя в селект 
        //лист
        for (var i in resolve) {
            if (resolve[i][getFieldName(resolve[i])] == name.innerHTML)
                str += "<option selected>" + resolve[i][getFieldName(resolve[i])] + "</option>";
            else str += "<option>" + resolve[i][getFieldName(resolve[i])] + "</option>";
        }
        str += "</select>";
        name.outerHTML = str;
        //показываем обновленную форму с полностью 
        //загруженными данными
        edit_Form.classList.remove('loading');
        loading.classList.add('loading');
    });
}

//Ищем поле, где написано имя для селект листа
function getFieldName(obj) {
    var key = "";
    Object.keys(obj).forEach(function (a) {
        if (a.includes('NAME')) key = a;
    })
    return key;
}
