async function getAll() {
    return await get('http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer').then(all => all).catch(reject => reject);
}

async function load() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    const response = await getAll();

    let array = response;
    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('view').appendChild(table);

    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Название";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Наименование";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    thead.appendChild(row_1);

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
}
