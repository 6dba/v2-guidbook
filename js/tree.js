const rootUrl = 'http://81.161.220.59:8100/api/structureTest/?action=getData&pid=root&request=developer'
const allUrl = 'http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer'

let childs = {}
let allData = JSON.parse(localStorage.getItem('allData'))

function clearTreeData() {
    childs = {}; allData = null;
    localStorage.removeItem('allData');
}

async function getData(url) {
	return await cache('tree', 0, url).then(resolve => resolve).catch(reject => reject);
}

// Созданием DOM обьекта, с заданными attributes
function createElemWithAttr(item, attributes) {
	return Object.assign(document.createElement(item), attributes);
}

// Поиск дочерних элементов
async function hasChilds(id) {
    if (!allData) {
        allData = await getData(allUrl);
        childs = {}
        localStorage.setItem('allData', JSON.stringify(allData));
    }

    if (childs[id]) return true;

    if (allData.find((item) => item.PARENT_ID === id)) {
        childs[id] = true; return true;
    }
    return false;
}

/* Загрузка всех родителкй, вывод, кэширование. При нажатии на родителя,
 * в кэшэ запрашиваются его дети, грузятся, выводятся */
async function openChilds(element, button) {
	const div = element.parentElement;
	if (div.classList.contains('open')) {
        div.removeChild(div.lastChild);
		div.classList.remove('open');
		button.querySelector('img').src = '../assets/rootClose.png';
		return;
	}

	const childUrl = `http://81.161.220.59:8100/api/structureTest/?action=getData&pid=${element.id}&request=developer`

    button.onclick = null
    button.querySelector('img').src = '../assets/tree-loader.gif';
	const childs = await getData(childUrl);

	if (typeof childs === 'undefined' && childs.length <= 0) return;

    button.onclick = function() {openChilds(element, button)}
    button.querySelector('img').src = '../assets/rootOpen.png';
	div.classList.add('open');

    div.append(createUl('child', childs));
}

/* Создание элементарного List Item элемента дерева и его необходимого заполнения
 * classItem - Класс узла дерева (root, child)
 * item - Обьект данных
 * searchPattern - Пользовательская поисковая строка,
 *  используется для подсветки вхождений searchPattern в item.NAME */
async function createLi(classItem, item, searchPattern) {
	let li;

	if (classItem == 'root') {
		li = createElemWithAttr('li', {
			className: classItem,
			style: 'padding-top: 15px;'
		})
	}
	else {
		li = createElemWithAttr('li', {
			className: classItem,
			style: 'margin-left: 15px; padding-top: 5px;'
		})
	}

	let div = createElemWithAttr('div', {
		style: 'margin-left: 5px;'
	});

	let a = createElemWithAttr('a', {
		className: item.IDENTIFIER,
		id: item.ID,
		style: 'text-decoration: none; color: black; margin-left: 25px;',
		onclick: function() {getType(this)},
		innerHTML:
			searchPattern
			? searchBackLight(item.NAME, searchPattern)
			: item.NAME
	});

	if (await hasChilds(item.ID)) {
		let button = createElemWithAttr('button', {
			style: 'height: 20px; width: 20px; margin-right: 5px;',
			type: 'image',
			className: 'img_add',
			onclick: function() {openChilds(a, this)},
			innerHTML: "<img src=../assets/rootClose.png alt='' id='img_root'/>"
		});
		a.style = `text-decoration: none; color: black;`
		div.append(button);
	}

	div.append(a);
	li.append(div);

	return li;
}

// Создание списка Ul
function createUl(classItem, arr, searchPattern) {
    const ul = createElemWithAttr('ul', {
        style: 'list-style-type: none; padding-left: 0; margin-left: 0;'
    })

	arr.forEach(async (item) => {
		ul.append(await createLi(classItem, item, searchPattern));
    });

    return ul;
}

function createView(className, arr, searchPattern) {
    const view = document.getElementById('view');
	const tree = document.createDocumentFragment();

    tree.append(createUl(className, arr, searchPattern));
	view.append(tree);
}

// Создание древовидного отображения подразделений и предприятий компании
async function tree(data, backlightPattern) {
    if (!data || !data.length)
        data = await getData(rootUrl);
	createView('root', data, backlightPattern);

}
