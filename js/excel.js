const createFile = (function() {
    const uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
        , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; })
        }
        , downloadURI = function(uri, name) {
        const link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.click();
    }

    return function(table, name, fileName) {
        if (!table) return;
        const ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        const resuri = uri + base64(format(template, ctx))
        downloadURI(resuri, fileName);
    }
})();

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
    if (view.classList.contains('search')) {
        createFile(document.getElementById('table'), `${document.getElementById('title').innerHTML}`, `${document.getElementById('title').innerHTML}.xls`);
        return;
    }
    let data = Array();
    if (!divTypeName.length && !typeName.length) {
        data = await cache('table', 'all');
        if (!data.length) return;
    }
    page = 0; end = false;
    
    const table = document.createElement('table');
    $(table).append(createHead()); $(table).append(await createMockBody());
    createFile(table, `${document.getElementById('title').innerHTML}`, `${document.getElementById('title').innerHTML}.xlsx`);
}