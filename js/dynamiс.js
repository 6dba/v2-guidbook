async function getAll(page) {
    return await cache('table', page).then(all => all).catch(reject => reject);
}

let page = 1;
let end = false;
let number = 1;

async function checkLastElement() {
    const view = document.getElementById('view')
    const tbody = document.getElementById('tbody')
    if (!end) {
        view.onscroll = '';
        setTimeout(() => view.onscroll = checkLastElement, 20);
        if ($('tbody tr:last').offset().top < $('#view').height() * 2 ) {
            let array = await getAll(page);
            if (array == null || array.length < 25) {
                view.onscroll = ''; end = true;
                return;
            }
            createBody(array, tbody, undefined)
            page++;
        }
    }
}

function find_header(header) {
    let id = 0;
    for (let name of thead.firstChild.childNodes) {
        if (name.innerHTML == header) {
            break;
        }
        id++;
    }
    return id;
}
