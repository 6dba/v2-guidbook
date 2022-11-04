/* Очистка элемента */
function removeChilds(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}

async function changeView() {
    if (document.getElementById('input_find').value) {
        clear(document.getElementById('input_find'))
    }

    if (view.classList.contains('tree')) {
        freezeButton();
        removeChilds(document.getElementById('view'));
        document.getElementById('view').classList.remove('tree');
        document.getElementById('view').classList.add('table');
        document.getElementById('btn_filter').style.display = 'block';
        data = {
            view: 'table'
        };
        let head = await post('http://81.161.220.59:8100/api/user_view/?action=get_views', data);
        titles = head['titles'].length !=0 ? head['titles'] : ['№', 'Название', 'Тип подразделения', 'Наименование'];
        deletedTitles = head['deletedTitles'].length !=0 ? head['deletedTitles'] : [];
        table();
        document.getElementById('img_view').src = '../assets/tree.png';
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
        document.getElementById('excel').style.visibility = 'hidden';
    }
}

function freezeButton() {
    document.getElementById('button_change_view').onclick = null;
    setTimeout(function () {
        document.getElementById('button_change_view').onclick = changeView
    }, 1000);
}
