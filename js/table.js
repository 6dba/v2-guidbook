/* Интерфейс реализации метода сравнения checkbox и значений аттрибутов элемента */
function _() {

}

/* Проверка содержимого элемента на соответствие фильтра */
function isAllow(item) {
    const divTypeName = [...$('.check-division-type-name:checked')].map((item) => item.value);
    const typeName = [...$('.check-type-name:checked')].map((item) => item.value);
    if (!typeName.length && !divTypeName.length) return true;

    if (typeName.length && divTypeName.length) {
        return (typeName.includes(item.TYPE_NAME) && divTypeName.includes(item.DIVISION_TYPE_NAME))
    }

    return typeName.includes(item.TYPE_NAME) ? true : divTypeName.includes(item.DIVISION_TYPE_NAME);
}

/* Создание <thead> таблицы */
function createHead() {
    if (localStorage.getItem('thead'))
        return JSON.parse(localStorage.getItem('thead'));

    const titles = ['№', 'Название', 'Тип подразделения', 'Наименование'];
    const thead = createElemWithAttr('thead', {id: 'thead'});
    const theadRow = thead.appendChild(document.createElement('tr'));

    titles.forEach((item) => {
        theadRow.appendChild(createElemWithAttr('th', {
            className: item !== '№' ? 'drag_accept' : '',
            innerHTML: item
        }));
    })
    return thead;
}

/* Создание <tbody> таблицы, заполняя данными */
function createBody(data, tbody, backlightPattern) {
    if (!tbody) {
        tbody = createElemWithAttr('tbody', {id: 'tbody'});
    }
    const sequence = ['№', ...Array.prototype.slice.call(document.getElementsByClassName('drag_accept')).map((item) => item.innerHTML)]

    data.forEach((item) => {
        if (!isAllow(item)) return;
        const row = tbody.appendChild(createElemWithAttr('tr', {
            id: item.ID,
            onclick: function () {getType(this)},
            className: item.IDENTIFIER
        }));
        sequence.forEach((title) => {
            row.insertCell().innerHTML = title === '№' ? number
                : title === 'Название' ? backlightPattern ? searchBackLight(item.NAME, backlightPattern) : item.NAME
                : title === 'Тип подразделения' ? item.DIVISION_TYPE_NAME
                : title === 'Наименование' ? item.TYPE_NAME : '';
        })
        number++
    })
    return tbody;
}

async function table(data, backlightPattern) {
    const view = document.getElementById('view');
    view.onscroll = '';

    if (!data || !data.length) {
        data = await getAll(0);
        view.onscroll = checkLastElement;
    }
    page = 1; end = false; number = 1;

    const table = createElemWithAttr('table', {id: 'table'});
    view.appendChild(table);

    $(table).append(createHead()); $(table).append(createBody(data, undefined, backlightPattern));

    $(table).dragtable({
        axis: null,
        dragaccept: '.drag_accept',
        containment: 'parent',
        maxMovingRows: 17
    });
}