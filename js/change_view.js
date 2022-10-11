/* Очистка элемента */
function removeChilds(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}

function changeView() {

    //let view = document.getElementById('view');
    let icon = document.getElementById('img_view');

    if (view.classList.contains('tree')) {
        freezeButton();
        removeChilds(view);
        view.classList.remove('tree');
        view.classList.add('table');
        /* Отрисовка нового view */
        load();
        /* Подмена классов */
        icon.src = '../assets/tree.png';
        localStorage.setItem('view', 'table');

    } else if (view.classList.contains('table')) {
        freezeButton();
        removeChilds(view);
        view.onscroll = '';
        view.classList.remove('table');
        view.classList.add('tree');
        tree();
        icon.src = '../assets/table.png';
        localStorage.setItem('view', 'tree');
    }
    return;
}

function freezeButton() {
    button_change_view.onclick = null;
    setTimeout(function () {
        button_change_view.onclick = changeView
    }, 1000);
}
