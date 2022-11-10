let divTypeName = Array();
let typeName = Array();

//закрыть форму просмотра/редактирования
function close_edit() {
    document.getElementById('block_edit').classList.add('edit');
    document.getElementById('exit').style.visibility = 'hidden';
    document.getElementById('deleteObject').style.visibility = 'hidden';
    document.getElementById('ttl_el').innerHTML = '';
    if (document.getElementById('img_change').src == location.protocol + "//" + location.host + '/assets/save.png') {
        document.getElementById('img_change').src = '../assets/change.png';
    }
    removeID();
}

//функция отмены редактирования
function undo_edit() {
    document.getElementById('exit').style.visibility = 'hidden';
    document.getElementById('deleteObject').style.visibility = 'hidden';
    document.getElementById('img_change').src = '../assets/change.png';
    if (typeof selectType !== 'undefined') {
        createNewObject();
    } else if (document.getElementById('ttl_el').innerHTML.includes('Предприятие')) {
        selectItemEnterprise(findID(document.getElementById('ttl_el')));
    } else if (document.getElementById('ttl_el').innerHTML.includes('Подразделение')) {
        selectItemDivision(findID(document.getElementById('ttl_el')));
    }
}

//функция обновления кэша
function reload_cache() {
    clearTreeData();

    if (document.getElementById('input_find').value) {
        clear(document.getElementById('input_find'))
    }

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
                document.getElementById('view').scrollTop = 0;
                table();
            }

        },
        complete: function () {
            document.getElementById('button_change_view').onclick = changeView;
            document.getElementById('reload_cache_button').onclick = reload_cache;

            document.getElementById('view').classList.remove('loading');
            document.getElementById('loading_view').classList.add('loading');
        }
    });
}

function delete_object() {
    let type;
    if (document.getElementById('ttl_el').innerHTML.includes('Подразделение')) {
        type = 'deleteDivision';
    } else if (document.getElementById('ttl_el').innerHTML.includes('Предприятие')) {
        type = 'deleteEnterprise';
    }


    let data = {
        url: URLS[type].replace('{id}', findID(document.getElementById('ttl_el')))
    }

    $.ajax({
        url: '../php/api.php',
        method: 'POST',
        data: data,
        complete: function () {
            document.getElementById('block_edit').classList.add('edit');
            document.getElementById('deleteObject').style.visibility = 'hidden';
            reload_cache();
        }
    })
}


function accept_filters() {
    if (document.querySelector('.button_clear')) {
        clear(document.querySelector('.input_find'))
    }
    divTypeName = [...$('.check-division-type-name:checked')].map((item) => item.value);
    typeName = [...$('.check-type-name:checked')].map((item) => item.value);

    document.getElementById('loading_view').classList.remove('loading');
    document.getElementById('view').classList.add('loading');

    let data_sort = {
        sort: $('#short_name').val() ? $('#short_name').val() : $('#type_name').val() ? $('#type_name').val() : $('#division_type_name').val() ? $('#division_type_name').val() : '',

        name: $('#short_name').val() ? 'NAME' : $('#type_name').val() ? 'TYPE_NAME' : $('#division_type_name').val() ? 'DIVISION_TYPE_NAME' : ''
    };

    $.ajax({
        url: '../php/sort_cache.php',
        method: 'POST',
        data: data_sort,
        complete: function () {
            removeChilds(document.getElementById('view'));
            document.getElementById('view').scrollTop = 0;
            table().then(() => {
                document.getElementById('view').classList.remove('loading');
                document.getElementById('loading_view').classList.add('loading');
            });

        }
    });
}

function filter_open() {
    document.getElementById('block_edit').classList.add('edit');
    document.getElementById("mySidebar").style.display = "block";
    Array.prototype.slice.call(document.getElementsByClassName('check-type-name')).forEach((item) => {
        if (typeName.includes(item.value)) {
            item.checked = 'checked';
        }
    });

    Array.prototype.slice.call(document.getElementsByClassName('check-division-type-name')).forEach((item) => {
        if (divTypeName.includes(item.value)) {
            item.checked = 'checked';
        }
    });

}

function filter_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function drop_filters() {
    if (divTypeName.length || typeName.length) {
        document.getElementById('button_change_view').onclick = null;
        document.getElementById('loading_view').classList.remove('loading');
        document.getElementById('view').classList.add('loading');

        divTypeName.length = 0;
        typeName.length = 0;

        $('.check-division-type-name').prop('checked', false);
        $('.check-type-name').prop('checked', false);

        removeChilds(document.getElementById('view'));
        document.getElementById('view').scrollTop = 0;
        table().then(() => {
            document.getElementById('button_change_view').onclick = changeView;
            document.getElementById('view').classList.remove('loading');
            document.getElementById('loading_view').classList.add('loading');
        });
    }
}
