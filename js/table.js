let titles;

let deletedTitles;

/* Проверка содержимого элемента на соответствие фильтра */
function isAllow(item) {
    if (!typeName.length && !divTypeName.length) return true;

    if (typeName.length && divTypeName.length) {
        return (typeName.includes(item.TYPE_NAME) && divTypeName.includes(item.DIVISION_TYPE_NAME));
    }
    return typeName.includes(item.TYPE_NAME) ? true : divTypeName.includes(item.DIVISION_TYPE_NAME);
}

/* Создание <thead> таблицы */
function createHead() {
    if (localStorage.getItem('thead'))
        return JSON.parse(localStorage.getItem('thead'));
    const thead = createElemWithAttr('thead', {
        id: 'thead'
    });
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
async function createBody(data, tbody, backlightPattern) {
    if (!tbody) {
        tbody = createElemWithAttr('tbody', {
            id: 'tbody'
        });
    }

    const sequence = ['№', ...Array.prototype.slice.call(document.getElementsByClassName('drag_accept')).map((item) => item.innerHTML)]
    
    let nRows = 0;
    do {
        if (!data || !data.length) {
            data = await getAll(page);

            if (!data) return;
            if (data.length < 25) {
                view.onscroll = '';
                end = true;
            }
        }
        data.forEach((item) => {
            if (!isAllow(item)) return;
            const row = tbody.appendChild(createElemWithAttr('tr', {
                id: item.ID,
                onclick: function () {
                    getType(this)
                },
                className: item.IDENTIFIER
            }))
            sequence.forEach((title) => {
                row.insertCell().innerHTML = title === '№' ? number :
                    title === 'Название' ? backlightPattern ? searchBackLight(item.NAME, backlightPattern) : item.NAME :
                    title === 'Тип подразделения' ? item.DIVISION_TYPE_NAME :
                    title === 'Наименование' ? item.TYPE_NAME : '';
            })
            nRows++; number++;
        })
        page++;
        data.length = 0;
    } while (nRows < 25 && !backlightPattern && !end);
    return tbody;
}

async function table(data, backlightPattern) {
    const view = document.getElementById('view');
    view.onscroll = '';

    if (!data || !data.length) {
        view.onscroll = checkLastElement;
    }
    
    page = 0; end = false; number = 1;

    const table = createElemWithAttr('table', {
        id: 'table'
    });
    view.appendChild(table);

    $(table).append(createHead());
    $(table).append(await createBody(data, undefined, backlightPattern));

    $(table).dragtable({
        axis: null,
        dragaccept: '.drag_accept',
        containment: 'parent',
        maxMovingRows: 17
    });
}
