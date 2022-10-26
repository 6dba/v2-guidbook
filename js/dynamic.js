async function getAll(page) {
    return await cache('table', page).then(all => all).catch(reject => reject);
}

let page = 0;
let end = false;
let number = 1;

async function checkLastElement() {
    const view = document.getElementById('view')
    const tbody = document.getElementById('tbody')
    if (!end && tbody) {
        document.getElementById('view').onscroll = '';
        setTimeout(() => document.getElementById('view').onscroll = checkLastElement, 40);
        if ($('tbody tr:last').offset().top < $('#view').height() * 2 ) {
            let array = await getAll(page);
            if (array == null || array.length < 25) {
                document.getElementById('view').onscroll = ''; end = true;
            }
            await createBody(array, tbody, undefined);
        }
    }
}


