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

   element.classList.add('open');

   const div = document.getElementById(element.id).parentElement;

   childs.forEach((child) => {
      div.appendChild((createLi('child', child)));
   });

   element.onclick = function() {closeChilds(div)}
}

function closeChilds(element) {
   while (element.hasChildNodes()) {
      if (element.children.length == 1) {
         element.onclick = function() {openChilds(element.lastChild)}
         return;
      }
      element.removeChild(element.lastChild);
   }
}

/*
 * Создание элементарного List Item элемента дерева и его необходимого заполнения
 */
function createLi(classItem, item) {
   let div = createElemWithAttr('div', {className: classItem});
   let button = createElemWithAttr('button', {
      className: item.IDENTIFIER, id: item.ID
   });
   button.onclick = function() {openChilds(button)}
   button.innerHTML = `${item.NAME}`;
   div.appendChild(button);

   return div;
}

/*
 * Создание древовидного отображения подразделений и предприятий компании
 */
async function tree() {

   const view = document.getElementById('view');
   const tree = document.createDocumentFragment();
   const ul = document.createElement('ul');

   const roots = await getRoots();

   roots.forEach((root, i) => ul.appendChild(createLi('root', root)));
   tree.appendChild(ul); view.appendChild(tree);

}


/* Пример async запросов roots и childs
async function getTree() {

var tree, childs = [];
const roots = await get(rootUrl).then(roots => roots);

for (var i = 0; i < roots.length; i++) {
   await get(`http://81.161.220.59:8100/api/structureTest/?action=getData&pid=${roots[i].ID}&request=developer`)
      .then(resolve => childs.push(resolve))
}

console.log(roots, childs);


}*/
