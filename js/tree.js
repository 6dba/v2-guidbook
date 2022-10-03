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
      li.removeChild(li.lastChild); li.classList.remove('open')
      return;
   }
   li.classList.add('open'); li.appendChild(createUl('child', childs))
}

/*
 * Создание элементарного List Item элемента дерева и его необходимого заполнения
 */
function createLi(classItem, item) {
   let li = createElemWithAttr('li', {className: classItem});

   let a = createElemWithAttr('a', {
      className: item.IDENTIFIER, id: item.ID
   });

   a.onclick = function() {openChilds(a)}
   a.innerHTML = `${item.NAME}`; li.appendChild(a);

   return li;
}

/*
 * Создание списка Ul
 */
function createUl(classItem, arr) {
   const ul = document.createElement('ul');

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
   tree.appendChild(ul); view.appendChild(tree);

}
