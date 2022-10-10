//закрыть форму просмотра/редактирования
function close_edit() {
    document.getElementById('block_edit').classList.add('edit');
    exit.style.visibility = 'hidden';
    deleteObject.style.visibility = 'hidden';
    ttl_el.innerHTML = '';
    if (img_change.src == location.protocol + "//" + location.host + '/assets/save.png')
        img_change.src = '../assets/change.png';
    removeID();
}

//функция отмены редактирования
function undo_edit() {
    exit.style.visibility = 'hidden';
    deleteObject.style.visibility = 'hidden';
    img_change.src = '../assets/change.png';
    if (typeof type !== 'undefined')
        createNewObject();
    else if (ttl_el.innerHTML.includes('Предприятие')) {
        selectItemEnterprise(findID(ttl_el));
    } else if (ttl_el.innerHTML.includes('Подразделение')) {
        selectItemDivision(findID(ttl_el));
    }
}

//функция обновления кэша
function reload_cache() {
    button_change_view.onclick = null;
    loading_view.classList.remove('loading');
    view.classList.add('loading');
    $.ajax({
        url: '../php/reload_cache.php',
        method: 'POST',
        success: function () {
            if (view.classList.contains('tree')) {
                removeChilds(view);
                tree();
            } else if (view.classList.contains('table')) {
                removeChilds(view);
                view.scrollTo(pageXOffset, 0);
                load();
            }
            button_change_view.onclick = changeView;
            view.classList.remove('loading');
            loading_view.classList.add('loading');
        },
        error: function (jqxhr, status, errorMsg) {

        }
    });
}

function delete_object() {
    let type;
    if (ttl_el.innerHTML.includes('Подразделение'))
        type = 'division';
    else if (ttl_el.innerHTML.includes('Предприятие'))
        type = 'enterprise';
    url = 'http://81.161.220.59:8100/api/' + type + '/?action=drop&id=' + findID(ttl_el) + '&request=developer';
    let data = {
        url: url
    }
    $.ajax({
        url: '../php/api.php',
        method: 'POST',
        data: data,
        success: function (response) {
            document.getElementById('block_edit').classList.add('edit');
            deleteObject.style.visibility = 'hidden';
            reload_cache();
        },
        error: function (jqxhr, status, errorMsg) {
        }
    })
}
