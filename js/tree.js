async function getRoots() {
    return await cache('tree').then(roots => roots).catch(reject => reject);
}

async function getChilds(parentId) {
    return await cache('tree', 0, `${parentId}`).then(resolve => resolve).catch(reject => reject);
}

function createElemWithAttr(item, attributes) {
    return Object.assign(document.createElement(item), attributes);
}

/*
 * Грузятся все родители, выводятся, кэшируются. При нажатии на родителя,
 * запрашиваются его дети, грузятся, выводятся.
 */
async function openChilds(element, button) {
    const childs = await getChilds(element.id);
    if (!childs) return;

    const li = element.parentElement;
    if (li.classList.contains('open')) {
        li.removeChild(li.lastChild);
        li.classList.remove('open');
        button.querySelector('img').src = '../assets/rootClose.png';
        return;
    }
    button.querySelector('img').src = '../assets/rootOpen.png';
    li.classList.add('open');
    li.appendChild(createUl('child', childs))
}

/*
 * Создание элементарного List Item элемента дерева и его необходимого заполнения
 */
async function createLi(classItem, item) {
    let li;
    if (classItem == 'root')
        li = createElemWithAttr('li', {
            className: classItem,
            style: 'padding-top: 10px;'
        });
    else
        li = createElemWithAttr('li', {
            className: classItem,
            style: 'margin-left: 15px;'
        });
    let div = document.createElement('div');
    let a = createElemWithAttr('a', {
        className: item.IDENTIFIER,
        id: item.ID,
        style: 'text-decoration: none; color: black;'
    });

    if (await getChilds(item.ID)) {
        let button = createElemWithAttr('button', {
            style: 'height: 20px; width: 20px; margin-right: 5px;',
            type: 'image',
            className: 'img_add'
        });
        button.innerHTML = "<img src=../assets/rootClose.png alt='' id='img_root'/>";
        button.onclick = function () {
            openChilds(a, this);
        }

        div.append(button);
    } else {
        a.style = 'text-decoration: none; color: black; margin-left: 25px;'
    }

    a.onclick = function () {
        getType(this)
    };
    a.innerHTML = `${item.NAME}`;

    div.append(a);
    li.appendChild(div);

    return li;
}

/*
 * Создание списка Ul
 */
function createUl(classItem, arr) {
    const ul = document.createElement('ul');
    ul.style = 'list-style-type: none; padding-left: 0; margin-left: 0;';
    arr.forEach(async (item) => {
        ul.appendChild(await createLi(classItem, item));
    });
    return ul;
}

/*
 * Создание древовидного отображения подразделений и предприятий компании
 */
async function tree() {

    const view = document.getElementById('view');
    const tree = document.createDocumentFragment();

    const roots = await getRoots();

    const ul = createUl('root', roots);
    tree.appendChild(ul);
    view.appendChild(tree);

}