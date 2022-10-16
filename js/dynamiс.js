async function getAll(page) {
    return await cache('table', page).then(all => all).catch(reject => reject);
}

let page = 1;
let end = false;
let number = 1;

async function checkLastElement() {
    if (!end) {
        document.getElementById('view').onscroll = '';
        setTimeout(() => view.onscroll = checkLastElement, 20);
        if ($('tbody tr:last').offset().top < $('#view').height() * 2) {
            array = await getAll(page);
            if (array == null || array.length < 25) {
                document.getElementById('view').onscroll = '';
                end = true;
            }
            const sequence = ['№', ...Array.prototype.slice.call(document.getElementsByClassName('drag_accept')).map((item) => item.innerHTML)]

            array.forEach((item) => {
                const row = tbody.appendChild(createElemWithAttr('tr', {
                    id: item.ID,
                    onclick: function () {
                        getType(this)
                    },
                    className: item.IDENTIFIER
                }));
                sequence.forEach((title) => {
                    row.insertCell().innerHTML = title === '№' ? number :
                        title === 'Название' ? item.NAME :
                        title === 'Тип подразделения' ? item.DIVISION_TYPE_NAME :
                        title === 'Наименование' ? item.TYPE_NAME : '';
                })
                number++;
            })
            page++;
        }
    }
}

function find_header(header) {
    let id = 0;
    for (let name of thead.firstChild.childNodes) {
        if (name.innerHTML == header) {
            break;
        }
        id++;
    }
    return id;
}
