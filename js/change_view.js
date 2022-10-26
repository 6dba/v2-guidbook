/* Очистка элемента */
function removeChilds(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}

function changeView() {
    if (document.querySelector('.button_clear')) {
        const input = document.querySelector('.input_find')
        input.value = ''; input.parentElement.removeChild(document.querySelector('.button_clear'));
    }

    if (view.classList.contains('tree')) {
        freezeButton();
        removeChilds(document.getElementById('view'));
        document.getElementById('view').classList.remove('tree');
        document.getElementById('view').classList.add('table');
        document.getElementById('btn_filter').style.display = 'block';
        table();
        document.getElementById('img_view').src = '../assets/tree.png';
        localStorage.setItem('view', 'table');
        document.getElementById('excel').style.visibility = 'visible';

    } else if (view.classList.contains('table')) {
        freezeButton();
        removeChilds(document.getElementById('view'));
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById('btn_filter').style.display = 'none';
        document.getElementById('view').onscroll = '';
        document.getElementById('view').classList.remove('table');
        document.getElementById('view').classList.add('tree');
        tree();
        document.getElementById('img_view').src = '../assets/table.png';
        localStorage.setItem('view', 'tree');
        document.getElementById('excel').style.visibility = 'hidden';
    }
}

function freezeButton() {
    document.getElementById('button_change_view').onclick = null;
    setTimeout(function () {
        document.getElementById('button_change_view').onclick = changeView
    }, 1000);
}
