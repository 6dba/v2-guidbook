//закрыть форму просмотра/редактирования
function close_edit() {
    document.getElementById('block_edit').classList.add('edit');
    document.getElementById('exit').style.visibility = 'hidden';
    document.getElementById('deleteObject').style.visibility = 'hidden';
    document.getElementById('ttl_el').innerHTML = '';
    if (document.getElementById('img_change').src == location.protocol + "//" + location.host + '/assets/save.png')
        document.getElementById('img_change').src = '../assets/change.png';
    removeID();
}

//функция отмены редактирования
function undo_edit() {
    document.getElementById('exit').style.visibility = 'hidden';
    document.getElementById('deleteObject').style.visibility = 'hidden';
    document.getElementById('img_change').src = '../assets/change.png';
    if (typeof type !== 'undefined')
        createNewObject();
    else if (document.getElementById('ttl_el').innerHTML.includes('Предприятие')) {
        selectItemEnterprise(findID(document.getElementById('ttl_el')));
    } else if (document.getElementById('ttl_el').innerHTML.includes('Подразделение')) {
        selectItemDivision(findID(document.getElementById('ttl_el')));
    }
}

//функция обновления кэша
function reload_cache() {
    document.getElementById('button_change_view').onclick = null;
    document.getElementById('reload_cache_button').onclick = null;
    document.getElementById('loading_view').classList.remove('loading');
    document.getElementById('view').classList.add('loading');
    $.ajax({
        url: '../php/reload_cache.php',
        method: 'POST',
        success: function () {
            if (document.getElementById('view').classList.contains('tree')) {
                removeChilds(document.getElementById('view'));
                tree();
            } else if (document.getElementById('view').classList.contains('table')) {
                removeChilds(document.getElementById('view'));
                document.getElementById('view').scrollTo(pageXOffset, 0);
                table();
            }
            document.getElementById('button_change_view').onclick = changeView;
            document.getElementById('view').classList.remove('loading');
            document.getElementById('loading_view').classList.add('loading');
            setTimeout(()=> {document.getElementById('reload_cache_button').onclick = reload_cache;}, 20000);

        },
        error: function (jqxhr, status, errorMsg) {

        }
    });
}

function delete_object() {
    let type;
    if (document.getElementById('ttl_el').innerHTML.includes('Подразделение'))
        type = 'division';
    else if (document.getElementById('ttl_el').innerHTML.includes('Предприятие'))
        type = 'enterprise';
    url = 'http://81.161.220.59:8100/api/' + type + '/?action=drop&id=' + findID(document.getElementById('ttl_el')) + '&request=developer';
    let data = {
        url: url
    }
    $.ajax({
        url: '../php/api.php',
        method: 'POST',
        data: data,
        success: function (response) {
            document.getElementById('block_edit').classList.add('edit');
            document.getElementById('deleteObject').style.visibility = 'hidden';
            reload_cache();
        },
        error: function (jqxhr, status, errorMsg) {}
    })
}


function accept_filters() {
    document.getElementById('button_Ok').onclick = null;
    setTimeout(()=> {document.getElementById('button_Ok').onclick = accept_filters}, 5000);
    document.getElementById('button_change_view').onclick = null;
    document.getElementById('loading_view').classList.remove('loading');
    document.getElementById('view').classList.add('loading');
    
    let data_sort = {
        sort: $('#name').val() ? $('#name').val() : $('#type_name').val() ? $('#type_name').val() : $('#division_type_name').val() ? $('#division_type_name').val() : '',

        name: $('#name').val() ? 'NAME' : $('#type_name').val() ? 'TYPE_NAME' : $('#division_type_name').val() ? 'DIVISION_TYPE_NAME' : ''
    };
    $.ajax({
        url: '../php/sort_cache.php',
        method: 'POST',
        data: data_sort,
        success: function (response) {
            removeChilds(document.getElementById('view'));
            document.getElementById('view').scrollTo(pageXOffset, 0);
            table();
            document.getElementById('button_change_view').onclick = changeView;
            document.getElementById('view').classList.remove('loading');
            document.getElementById('loading_view').classList.add('loading');
            
        },
        error: function (jqxhr, status, errorMsg) {}
    });
}

function filter_open() {
    document.getElementById('block_edit').classList.add('edit');
    document.getElementById("mySidebar").style.display = "block";
}

function filter_close() {
    
    document.getElementById("mySidebar").style.display = "none";
}
