//закрыть форму просмотра/редактирования
function close_edit() {
    document.getElementById('block_edit').classList.add('edit');
    ttl_el.innerHTML = '';
    if (img_change.src == location.protocol + "//" + location.host + '/assets/save.png')
        img_change.src = '../assets/change.png';
    let id;
    ttl_el.classList.forEach(
        function (a) {
            if (/id/.test(a)) id = a;
        });
    ttl_el.classList.remove(id);
}

//функция для перехода в режим редактирования или обратно в //режим просмотра
function edit() {
    if (img_change.src == location.protocol + "//" + location.host + '/assets/save.png') {
        if (ttl_el.innerHTML.includes('Предприятие')) {
            postEnterprise();
            setTimeout(selectItemEnterprise, 100);
            
        } else{
            postDivision();
            setTimeout(selectItemDivision, 100);
        }
        img_change.src = '../assets/change.png';
    } else {
        img_change.src = '../assets/save.png';
        //скрываем форму до полной загрузки
        loading.classList.remove('loading');
        edit_Form.classList.add('loading');
        if (ttl_el.innerHTML.includes('Подразделение'))             changeView(8, 16);
        else
            changeView(1, 7);
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
        let idName;
        name.classList.forEach(
            function (a) {
                if (/id/.test(a)) idName = a;
            });
        id = '&enterprise=' + idName.substring(2);
    } else if (name.id == 'arg_10') list = 'enterprise';
    else if (name.id == 'arg_11') list = 'divisionTypes';
    else if (name.id == 'arg_12') list = 'divisionShift';
    else if (name.id == 'arg_14') list = 'divisionAdjanced';
    let url = 'http://81.161.220.59:8100/api/' + list + '/?action=getList' + id + '&request=developer';
    get(url).then(resolve => {
        str = "<select class='input_tag' id='"+name.id+"'><option></option>";
        //получаем массив JSON-объектов для селект листа, //перебираем 
        //каждый элемент и вставляем его имя в селект 
        //лист
        for (let i in resolve) {
            let field = resolve[i][getFieldName(resolve[i])];
            if (field == name.innerHTML)
                str += "<option selected value='"+resolve[i]['ID']+"'>" + field + "</option>";    
            else str += "<option value='"+resolve[i]['ID']+"'>" + field + "</option>";
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
    let key;
    Object.keys(obj).forEach(function (a) {
        if (a.includes('NAME'))
            key = a; 
    })
    return key;
}
//функция генерации полей режима редактирования
function changeView(start, end) {
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
        name.outerHTML = "<input class='input_tag' id='"+ name.id + "' " + ((in_tag == "Не заполнено") ? ">" : ("value='" + in_tag + "'>"));
    }
}
