async function createMockBody()
{
    let tbody = createElemWithAttr('tbody', {
            id: 'tbody'
        });
    const sequence = ['№', ...Array.prototype.slice.call(document.getElementsByClassName('drag_accept')).map((item) => item.innerHTML)];
    
    let num = 1;
    data = await getAll('all');
    data.forEach((item) => {
            if (!isAllow(item)) return;
            const row = tbody.appendChild(createElemWithAttr('tr', {
            }))
            sequence.forEach((title) => {
                row.insertCell().innerHTML = title === '№' ? num :
                    title === 'Название' ? item.NAME :
                    title === 'Тип подразделения' ? item.DIVISION_TYPE_NAME :
                    title === 'Наименование' ? item.TYPE_NAME : '';
            })
            num++})
    return tbody;
}
                 
async function toExcel() {
    if (!document.getElementById('table')) return;
    
    if (view.classList.contains('search')) {
        TableToExcel.convert(document.getElementById('table'), {
            name: `${document.getElementById('title').innerHTML}.xlsx`,
            sheet: {
                name: `${document.getElementById('title').innerHTML}`
            }
        });
        return;
    }
    page = 0; end = false;
    
    const table = document.createElement('table');
    $(table).append(createHead()); $(table).append(await createMockBody());

    TableToExcel.convert(table, {
        name: `${document.getElementById('title').innerHTML}.xlsx`,
        sheet: {
            name: `${document.getElementById('title').innerHTML}`
        }
    });
}