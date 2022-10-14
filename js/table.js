/* Создание <thead> таблицы */
function createHead() {
    if (localStorage.getItem('thead'))
        return JSON.parse(localStorage.getItem('thead'));

    const titles = ['№', 'Название', 'Тип подразделения', 'Наименование'];
    const thead = createElemWithAttr('thead', {id: 'thead'});
    const theadRow = thead.appendChild(document.createElement('tr'));

    titles.forEach((item, i) => {
        theadRow.appendChild(createElemWithAttr('th', {
            className: item != '№' ? 'drag_accept' : '',
            innerHTML: item
        }));
    })
    return thead;
}

/* Создание <tbody> таблицы, заполняя данными */
function createBody(data, backlightPattern) {
    const tbody = createElemWithAttr('tbody', {id: 'tbody'});
    const sequence = ['№', ...Array.prototype.slice.call(document.getElementsByClassName('drag_accept')).map((item) => item.innerHTML)]

    data.forEach((item) => {
        const row = tbody.appendChild(createElemWithAttr('tr', {
            id: item.ID,
            onclick: function () {getType(this)},
            className: item.IDENTIFIER
        }));
        sequence.forEach((title) => {
            row.insertCell().innerHTML = title == '№' ? number
                : title == 'Название' ? backlightPattern ? searchBackLight(item.NAME, backlightPattern) : item.NAME
                : title == 'Тип подразделения' ? item.DIVISION_TYPE_NAME
                : title == 'Наименование' ? item.TYPE_NAME : '';
        })
        number++;
    })
    return tbody;
}

async function table(data, backlightPattern) {
    if (!data || !data.length)
        data = await getAll(0);
    
    page = 1;
    end = false;
    number = 1;
    
    view.onscroll = checkLastElement;

    if (backlightPattern)
       view.onscroll = '';

    const table = createElemWithAttr('table', {id: 'table'});
    document.getElementById('view').appendChild(table);

    $('#table').append(createHead()); $('#table').append(createBody(data, backlightPattern));

    $('#table').dragtable({
        axis: null,
        dragaccept: '.drag_accept',
        containment: 'parent',
        maxMovingRows: 17
    });
}