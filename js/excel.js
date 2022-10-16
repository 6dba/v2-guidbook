const tableToExcel = (function() {
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

function exportation(table) {
    tableToExcel(table, `${document.getElementById('title').innerHTML}`, `${document.getElementById('title').innerHTML}.xlsx`)
}

async function toExcel() {
    if (view.classList.contains('search')) {
        exportation(document.getElementById('table'));
        return;
    }

    const data = await getData(allUrl);
    if (!data.length) return;
    
    const table = document.createElement('table');
    $(table).append(createHead()); $(table).append(createBody(data));
    exportation(table);
}

