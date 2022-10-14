async function getAll(page) {
    return await cache('table', page).then(all => all).catch(reject => reject);
}

let page = 1;
let end = false;
let number = 1;

async function checkLastElement() {
    if (!end) {
        view.onscroll = '';
        setTimeout(() => view.onscroll = checkLastElement, 20);
        if (tbody.lastChild.getBoundingClientRect().top < 850) {
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
