/* Очистка элемента */
function removeChilds(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}

async function changeView() {
    if (document.getElementById('input_find').value) {
        const input = document.getElementById('input_find')
        input.value = '';
        input.style = '';
        input.parentElement.removeChild(document.querySelector('.button_clear'));
    }

    if (view.classList.contains('tree')) {
        document.getElementById('button_change_view').onclick = null;
        removeChilds(document.getElementById('view'));
        document.getElementById('view').classList.remove('tree');
        document.getElementById('view').classList.add('table');
        document.getElementById('btn_filter').style.display = 'block';
        data = {
            view: 'table'
        };
        let head = await post(URLS.userView_get, data);
        titles = head['titles'].length != 0 ? head['titles'] : ['№', 'Название', 'Тип подразделения', 'Наименование'];
        deletedTitles = head['deletedTitles'].length != 0 ? head['deletedTitles'] : [];
        table().then(() => {
            document.getElementById('button_change_view').onclick = changeView
            document.getElementById('img_view').src = '../assets/tree.png';
            document.getElementById('excel').style.visibility = 'visible';
        });

    } else if (view.classList.contains('table')) {
        document.getElementById('button_change_view').onclick = null;
        removeChilds(document.getElementById('view'));
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById('btn_filter').style.display = 'none';
        document.getElementById('view').onscroll = '';
        document.getElementById('view').classList.remove('table');
        document.getElementById('view').classList.add('tree');
        tree().then(() => {
            document.getElementById('button_change_view').onclick = changeView
            document.getElementById('img_view').src = '../assets/table.png';
            document.getElementById('excel').style.visibility = 'hidden';
        });

    }
}

