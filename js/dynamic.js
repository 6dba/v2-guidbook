let page = 0;
let end = false;
let number = 1;

async function checkLastElement() {
    const view = document.getElementById('view')
    const tbody = document.getElementById('tbody')
    if (!end && tbody) {
        document.getElementById('view').onscroll = '';
        if ($('tbody tr:last').offset().top < $('#view').height() * 2) {
            let array = await getAll(page);
            if (array == null || array.length < 25) {
                end = true;
            }
            createBody(array, tbody, undefined);
        }
        if (!end)
            document.getElementById('view').onscroll = checkLastElement;
    }
}
