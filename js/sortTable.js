let currentSort = {
    'Название': 'sortUp',
    'Наименование': 'sortUp',
    'Тип подразделения': 'sortUp'
}

function sort(header) {
    $('thead tr th.sortDown').each((index, el) => {
        if (el.innerHTML == header.innerHTML) return;

        el.classList.toggle('sortUp')
        el.classList.toggle('sortDown')
        currentSort[el.innerHTML] = 'sortUp'
    })
    header.classList.toggle('sortUp')
    header.classList.toggle('sortDown')

    currentSort[header.innerHTML] = currentSort[header.innerHTML] == 'sortUp' ? 'sortDown' : 'sortUp'

    document.getElementById('button_change_view').onclick = null;
    document.getElementById('loading_view').classList.remove('loading');
    document.getElementById('view').classList.add('loading');

    let data_sort = {
        sort: header.classList.contains('sortUp') ? 'a-z' : header.classList.contains('sortDown') ? 'z-a' : '',

        name: header.innerHTML == 'Название' ? 'NAME' : header.innerHTML == 'Наименование' ? 'TYPE_NAME' : header.innerHTML == 'Тип подразделения' ? 'DIVISION_TYPE_NAME' : ''
    };

    $.ajax({
        url: '../php/sort_cache.php',
        method: 'POST',
        data: data_sort,
        success: function () {
            removeChilds(document.getElementById('view'));
            document.getElementById('view').scrollTo(pageXOffset, 0);
            table();
        },
        complete: function () {
            document.getElementById('button_change_view').onclick = changeView;
            document.getElementById('view').classList.remove('loading');
            document.getElementById('loading_view').classList.add('loading');
        }
    });
}
