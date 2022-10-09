//закрыть форму просмотра/редактирования
function close_edit() {
    document.getElementById('block_edit').classList.add('edit');
    exit.style.visibility = 'hidden';
    ttl_el.innerHTML = '';
    if (img_change.src == location.protocol + "//" + location.host + '/assets/save.png')
        img_change.src = '../assets/change.png';
    removeID();
}

//функция отмены редактирования
function undo_edit() {
    exit.style.visibility = 'hidden';
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
    $.ajax({
        url: '../php/reload_cache.php',
        method: 'POST',
        success: function () {
            if (view.classList.contains('tree')) {
                removeChilds(view);
                tree();
            } else if (view.classList.contains('table')) {
                removeChilds(view);
                load();
            }
            button_change_view.onclick = changeView;
        },
        error: function (jqxhr, status, errorMsg) {

        }
    });
}
