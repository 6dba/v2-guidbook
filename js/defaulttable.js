function load_data() {
    $.ajax({
        url: '../php/ajaxget.php',
        method: 'POST',
        dataType: 'json',
        data: { url: '.../php/get_cash.php' }
    });
    
        let array = response.data;
        let html = ` `;
        array.forEach(item => {
            html += `
                <tr>
                    <td rowspan = "1">${item.ID}</td>
                    <td>${item.TYPE_NAME}</td>
                </tr>
            `;
        });
            $('.table tbody').html(html);
}
