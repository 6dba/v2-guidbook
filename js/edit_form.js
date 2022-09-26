function close_edit() {
    document.getElementById('block_edit').classList.add('edit');
    if (img_change.src == location.protocol + "//" + location.host + '/assets/save.png')
        img_change.src = '../assets/change.png';
}

function edit() {
    if (img_change.src == location.protocol + "//" + location.host + '/assets/save.png') {
        selectItem('http://81.161.220.59:8100/api/enterprise/?action=getVariables&id=2&request=developer');
        img_change.src = '../assets/change.png';
    } else {
        img_change.src = '../assets/save.png';
        loading.classList.remove('loading');
        edit_Form.classList.add('loading');
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

function selectList(name) {
    var id = '';
    var list = '';
    if (name.id == 'arg_3') list = 'holdings';
    else if (name.id == 'arg_4') list = 'enterpriseTypes';
    else if (name.id == 'arg_5') {
        list = 'users';
        id = '&enterprise=2';
    }
    var url = 'http://81.161.220.59:8100/api/' + list + '/?action=getList' + id + '&request=developer';
    $.ajax({
        url: '../php/ajaxget.php',
        method: 'POST',
        dataType: 'json',
        data: {
            url: url
        },
        success: function (data) {
            str = "<select class='input_tag'><option>Не выбран</option>";
            for (var i in data) {
                if (data[i][getFieldName(data[i])] == name.innerHTML)
                    str += "<option selected>" + data[i][getFieldName(data[i])] + "</option>";
                else str += "<option>" + data[i][getFieldName(data[i])] + "</option>";
            }
            str += "</select>";
            name.outerHTML = str;
            edit_Form.classList.remove('loading');
            loading.classList.add('loading');
        },
        error: function (jqxhr, status, errorMsg) {
            console.log(status + ' ' + errorMsg);
        }
    });
}

function getFieldName(obj) {
    var key = "";
    Object.keys(obj).forEach(function (a) {
        if (a.includes('NAME')) key = a;
    })
    return key;
}
