async function getAll(page) {
    return await cache('table', page).then(all => all).catch(reject => reject);
}

let page = 0;
let end = false;
let first = false;
let number = 1;

async function load() {
    page = 0;
    end = false;
    first = false;
    number = 1;
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    tbody.id = 'tbody';
    table.id = 'table';
    thead.id = 'thead';


    table.appendChild(tbody);

    document.getElementById('view').appendChild(table);
    view.onscroll = checkLastElement;

    if (localStorage.getItem('thead')) {
        $('#table').append(JSON.parse(localStorage.getItem('thead')));
    } else {
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "№";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Название";
        heading_2.classList.add("drag_accept");
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Тип подразделения";
        heading_3.classList.add("drag_accept");
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Наименование";
        heading_4.classList.add("drag_accept");


        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);

        thead.appendChild(row_1);
        table.appendChild(thead);
    }
    $('#table').dragtable({
        axis: null,
        dragaccept: '.drag_accept',
        containment: 'parent',
        maxMovingRows: 15
    });
    checkLastElement();

}

async function checkLastElement() {
    if (!end) {
        view.onscroll = '';
        setTimeout(() => view.onscroll = checkLastElement, 20);
        if (first && tbody.lastChild.getBoundingClientRect().top < 850) {
            array = await getAll(page);
            if (array == null || array.length < 25) {
                view.onscroll = '';
                end = true;
            }
            array.forEach(item => {
                let rown = document.createElement('tr');
                rown.id = `${item.ID}`;
                rown.onclick = function () {
                    getType(this)
                };
                let data = new Array(4);
                rown.classList.add(`${item.IDENTIFIER}`);
                if (item.ID) {
                    let rown_data_1 = document.createElement('td');
                    let rown_data_2 = document.createElement('td');
                    let rown_data_3 = document.createElement('td');
                    let rown_data_4 = document.createElement('td');
                    rown.appendChild(rown_data_1);
                    rown.appendChild(rown_data_2);
                    rown.appendChild(rown_data_3);
                    rown.appendChild(rown_data_4);

                    rown.firstChild.innerHTML = number;
                    rown.children[find_header('Название')].innerHTML = `${item.NAME}`;
                    rown.children[find_header('Тип подразделения')].innerHTML = `${item.DIVISION_TYPE_NAME}`;
                    rown.children[find_header('Наименование')].innerHTML = `${item.TYPE_NAME}`;

                    tbody.appendChild(rown);
                    number++;
                }
            })
            page++;
        } else if (!first) {
            array = await getAll(page);
            array.forEach(item => {
                let rown = document.createElement('tr');
                rown.id = `${item.ID}`;
                rown.onclick = function () {
                    getType(this)
                };
                rown.classList.add(`${item.IDENTIFIER}`);
                let data = new Array(4);
                if (item.ID) {
                    let rown_data_1 = document.createElement('td');
                    let rown_data_2 = document.createElement('td');
                    let rown_data_3 = document.createElement('td');
                    let rown_data_4 = document.createElement('td');
                    rown.appendChild(rown_data_1);
                    rown.appendChild(rown_data_2);
                    rown.appendChild(rown_data_3);
                    rown.appendChild(rown_data_4);

                    rown.firstChild.innerHTML = number;
                    rown.children[find_header('Название')].innerHTML = `${item.NAME}`;
                    rown.children[find_header('Тип подразделения')].innerHTML = `${item.DIVISION_TYPE_NAME}`;
                    rown.children[find_header('Наименование')].innerHTML = `${item.TYPE_NAME}`;

                    tbody.appendChild(rown);
                    number++;
                }
            });
            if (array.length < 25) {
                end = true;
                view.onscroll = '';
            }
            page++;
            first = true;
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
