async function getAll(page) {
    return await cache('table', page).then(all => all).catch(reject => reject);
}

let page = 0;
let end = false;
let first = false;

async function load() {
    page = 0;
    end = false;
    first = false;
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    tbody.id = 'tbody';
    table.id = 'table';

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('view').appendChild(table);
    view.onscroll = checkLastElement;

    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Название";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Наименование";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    thead.appendChild(row_1);
    checkLastElement();
}

async function checkLastElement() {
    if (!end) {
        if (first && tbody.lastChild.getBoundingClientRect().top<850) {
            const response = await getAll(page);
            let array = response;
            array.forEach(item => {
                let rown = document.createElement('tr');
                rown.id = `${item.ID}`;
                rown.onclick = function () {
                    getType(this)
                };
                rown.classList.add(`${item.IDENTIFIER}`);
                if (item.ID && item.TYPE_NAME) {
                    let rown_data_1 = document.createElement('td');
                    rown_data_1.innerHTML = `${item.NAME}`;
                    rown.appendChild(rown_data_1);

                    let rown_data_2 = document.createElement('td');
                    rown_data_2.innerHTML = `${item.TYPE_NAME}`;
                    rown.appendChild(rown_data_2);
                }
                tbody.appendChild(rown);
            });
            if (array.length < 25){
                view.onscroll = '';
                end = true;
            }
            page++;
        } else if (!first) {
            const response = await getAll(page);
            let array = response;
            array.forEach(item => {
                let rown = document.createElement('tr');
                rown.id = `${item.ID}`;
                rown.onclick = function () {
                    getType(this)
                };
                rown.classList.add(`${item.IDENTIFIER}`);
                if (item.ID && item.TYPE_NAME) {
                    let rown_data_1 = document.createElement('td');
                    rown_data_1.innerHTML = `${item.NAME}`;
                    rown.appendChild(rown_data_1);

                    let rown_data_2 = document.createElement('td');
                    rown_data_2.innerHTML = `${item.TYPE_NAME}`;
                    rown.appendChild(rown_data_2);
                }
                tbody.appendChild(rown);
            });
            if (array.length < 25)
                end = true;
            page++;
            first=true;
        }
    }
}
