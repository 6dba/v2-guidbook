/* Очистка элемента */
function removeChilds(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}

function changeView() {

    let view = document.getElementById('view');
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

    } else if (view.classList.contains('table')) {
        freezeButton();
        view.classList.remove('table');
        view.classList.add('tree');
        removeChilds(view);
        tree();
        icon.src = '../assets/table.png';
    }
    return;
}

function freezeButton() {
    button_change_view.onclick = null;
    setTimeout(function () {
        button_change_view.onclick = changeView
    }, 1000);
}
