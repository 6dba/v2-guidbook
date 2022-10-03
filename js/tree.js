const rootUrl = 'http://81.161.220.59:8100/api/structureTest/?action=getData&pid=root&request=developer'
const allUrl = 'http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer'

async function getRoots() {
    return await get(rootUrl).then(roots => roots).catch(reject => reject);
}

async function getChilds(parentId) {
    const childUrl = `http://81.161.220.59:8100/api/structureTest/?action=getData&pid=${parentId}&request=developer`
    return await get(childUrl).then(resolve => resolve).catch(reject => reject);
}

function createElemWithAttr(item, attributes) {
    return Object.assign(document.createElement(item), attributes);
}

/*
 * Грузятся все родители, выводятся, кэшируются. При нажатии на родителя,
 * запрашиваются его дети, грузятся, выводятся.
 */
async function openChilds(element) {
    const childs = await getChilds(element.id);
    if (!childs) return;


    const li = element.parentElement;
    if (li.classList.contains('open')) {
        li.removeChild(li.lastChild);
        li.classList.remove('open')
        return;
    }
    li.classList.add('open');
    li.appendChild(createUl('child', childs))
}

/*
 * Создание элементарного List Item элемента дерева и его необходимого заполнения
 */
function createLi(classItem, item) {
    let li;
    if (classItem == 'root')
        li = createElemWithAttr('li', {
            className: classItem,
            style: 'padding-top: 10px;'
        });
    else
        li = createElemWithAttr('li', {
            className: classItem,
            style: 'margin-left: 30px;'
        });
    let div = document.createElement('div');
    let a = createElemWithAttr('a', {
        className: item.IDENTIFIER,
        id: item.ID,
        style: 'text-decoration: none; color: black;'
    });
    let button = createElemWithAttr('button', {
        style: 'height: 20px; width: 20px; margin-right: 10px;',
        type: 'image',
        className: 'img_add'
    });
    button.innerHTML = "<img src=../assets/rootClose.png alt='' id='img_root'/>";
    button.onclick = function () {
        openChilds(a);
        if (a.parentElement.classList.contains('open'))
            this.querySelector('img').src = '../assets/rootClose.png';
        else
            this.querySelector('img').src = '../assets/rootOpen.png';
    }
    a.onclick = function () {
        getType(this)
    };
    a.innerHTML = `${item.NAME}`;
    div.append(button);
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
    arr.forEach((item) => {
        ul.appendChild(createLi(classItem, item))
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
