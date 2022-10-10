async function getData(url) {
	return await cache('tree', 0, url).then(resolve => resolve).catch(reject => reject);
}

function createElemWithAttr(item, attributes) {
	return Object.assign(document.createElement(item), attributes);
}

/* Грузятся все родители, выводятся, кэшируются. При нажатии на родителя,
 * запрашиваются его дети, грузятся, выводятся */
async function openChilds(element, button) {
	const li = element.parentElement;
	if (li.classList.contains('open')) {
		li.removeChild(li.lastChild);
		li.classList.remove('open');
		button.querySelector('img').src = '../assets/rootClose.png';
		return;
	}

	const childUrl = `http://81.161.220.59:8100/api/structureTest/?action=getData&pid=${element.id}&request=developer`
	const childs = await getData(childUrl);

	if (typeof childs === 'undefined' && childs.length <= 0) return;

	button.querySelector('img').src = '../assets/rootOpen.png';
	li.classList.add('open');
	li.appendChild(createUl('child', childs))
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

	// TODO: Проработать выделение паттерна несоответсвующего регистру исходной строки
	const replace = (string, search, replace) => {
		return string.split(search).join(replace);
	}

	let a = createElemWithAttr('a', {
		className: item.IDENTIFIER,
		id: item.ID,
		style: 'text-decoration: none; color: black; margin-left: 25px;',
		onclick: function() {getType(this)},
		innerHTML:
			searchPattern
			? replace(item.NAME, searchPattern, `<span style="background-color:#ff9447">${searchPattern}</span>`)
			: item.NAME
	});

	const childUrl = `http://81.161.220.59:8100/api/structureTest/?action=getData&pid=${item.ID}&request=developer`
	const childs = await getData(childUrl);

	if (typeof childs !== 'undefined' && childs.length > 0) {
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
	li.appendChild(div);

	return li;
}

/* Создание списка Ul */
function createUl(classItem, arr, searchPattern) {
	const ul = document.createElement('ul');
	ul.style = 'list-style-type: none; padding-left: 0; margin-left: 0;';

	arr.forEach(async (item) => {
		ul.appendChild(await createLi(classItem, item, searchPattern));
	});
	return ul;
}

function createView(className, arr, searchPattern) {
	const view = document.getElementById('view');
	const tree = document.createDocumentFragment();

	const ul = createUl(className, arr, searchPattern);

	tree.appendChild(ul);
	view.appendChild(tree);
}

/* Создание древовидного отображения подразделений и предприятий компании */
async function tree() {
	const rootUrl = 'http://81.161.220.59:8100/api/structureTest/?action=getData&pid=root&request=developer'
	createView('root', await getData(rootUrl));
}
