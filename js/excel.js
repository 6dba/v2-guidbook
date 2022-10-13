function toExcel() {
    TableToExcel.convert(document.getElementById('table'), {
        name: 'export.xlsx'
    })
}