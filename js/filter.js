function update_rows() {
    var toShow = [];
    $('div.tags input[type=checkbox]:checked').each(function() {
        var box = $(this);
        toShow.push('.' + box.attr('id'));
    });
    toShow = toShow.join(', ');
    
    $('table > tbody > tr').each(function() {
        var row = $(this);
        row.toggle(row.is(toShow));
    });
};