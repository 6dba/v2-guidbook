function add_delete_column() {
    let contextMenu = document.getElementById('context_menu');

    const drop_delete = document.getElementById('drop_delete');
    const sequence = [...Array.prototype.slice.call(document.getElementsByClassName('drag_accept')).map((item) => item.innerHTML)];
    removeChilds(document.getElementById('drop_delete'));

    sequence.forEach((title) => {
        drop_delete.append(createElemWithAttr('li', {
            innerHTML: title,
            onclick: function() {deleteColumn(this.innerHTML)}
        }))
    })

    const drop_add = document.getElementById('drop_add');
    removeChilds(document.getElementById('drop_add'));
    
    deletedTitles.forEach((title) => {
        drop_add.append(createElemWithAttr('li', {
            innerHTML: title,
            onclick: function() {addColumn(this.innerHTML)}
        }))
    })

    document.querySelector('thead').addEventListener('contextmenu', (event) => {
        event.preventDefault();

        const {
            clientX: mouseX,
            clientY: mouseY
        } = event;
        contextMenu.style.top = `${mouseY}px`;
        contextMenu.style.left = `${mouseX}px`;

        drop_add.style.display = 'none';
        drop_delete.style.display = 'none';
        contextMenu.style.display = 'block';
    })
    document.querySelector('body').addEventListener('click', (event) => {
        if (event.target.offsetParent != contextMenu) {
            contextMenu.style.display = 'none';
            drop_delete.style.display = 'none';
            drop_add.style.display = 'none';
        }
    })
    contextMenu.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    })

    let deleteTd = document.getElementById('deleteTd');

    deleteTd.addEventListener('click', (event) => {
        event.preventDefault();

        drop_delete.style.top = deleteTd.getBoundingClientRect().top;
        drop_delete.style.left = deleteTd.getBoundingClientRect().right;
        drop_add.style.display = 'none';
        drop_delete.style.display = 'block';
    })
    
    let addTd = document.getElementById('addTd');

    addTd.addEventListener('click', (event) => {
        event.preventDefault();

        drop_add.style.top = addTd.getBoundingClientRect().top;
        drop_add.style.left = addTd.getBoundingClientRect().right;
        drop_delete.style.display = 'none';
        drop_add.style.display = 'block';
    })
}

function deleteColumn(title) {
    if (document.getElementById('drop_delete').firstChild==document.getElementById('drop_delete').lastChild)
        return;
    titles.splice(titles.indexOf(title), 1);
    deletedTitles.push(title);
    localStorage.setItem('deletedTitles', JSON.stringify(deletedTitles));
    localStorage.setItem('titles', JSON.stringify(titles));
    document.getElementById('button_change_view').onclick = null;
    document.getElementById('reload_cache_button').onclick = null;
    document.getElementById('loading_view').classList.remove('loading');
    document.getElementById('view').classList.add('loading');
    removeChilds(document.getElementById('view'));
    document.getElementById('view').scrollTop = 0;
    localStorage.removeItem('thead');
    table();
    localStorage.setItem('thead', JSON.stringify(thead.outerHTML));
    add_delete_column();
    document.getElementById('button_change_view').onclick = changeView;
    document.getElementById('view').classList.remove('loading');
    document.getElementById('loading_view').classList.add('loading');
}

function addColumn(title)
{
    deletedTitles.splice(deletedTitles.indexOf(title), 1);
    titles.push(title);
    localStorage.setItem('deletedTitles', JSON.stringify(deletedTitles));
    localStorage.setItem('titles', JSON.stringify(titles));
    document.getElementById('button_change_view').onclick = null;
    document.getElementById('reload_cache_button').onclick = null;
    document.getElementById('loading_view').classList.remove('loading');
    document.getElementById('view').classList.add('loading');
    removeChilds(document.getElementById('view'));
    document.getElementById('view').scrollTop = 0;
    localStorage.removeItem('thead');
    table();
    localStorage.setItem('thead', JSON.stringify(thead.outerHTML));
    add_delete_column();
    document.getElementById('button_change_view').onclick = changeView;
    document.getElementById('view').classList.remove('loading');
    document.getElementById('loading_view').classList.add('loading');
}
