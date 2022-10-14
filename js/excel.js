function toExcel() {
    TableToExcel.convert($('#table'), {
        name: 'export.xlsx'
    })
}