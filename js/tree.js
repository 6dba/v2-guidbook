const rootUrl = 'http://81.161.220.59:8100/api/structureTest/?action=getData&pid=root&request=developer'
const allUrl = 'http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer'

async function getRoots() {
   return await get(rootUrl).then(roots => roots).catch(reject => reject);
}

async function getChild(root) {
   const childUrl = `http://81.161.220.59:8100/api/structureTest/?action=getData&pid=${root.ID}&request=developer`
   return await get(childUrl).then(resolve => resolve).catch(reject => reject);
}

/*
* Создание элементарного List Item элемент дерева и его необходимого заполнения
*/
function createLi(classItem, item) {
   let li = document.createElement('li');
   let name = document.createElement('a');

   name.innerHTML = `${item.NAME}`;
   name.classList.add(classItem,`${item.IDENTIFIER}`);

   Object.assign(name, {id: item.ID, href: '#'});

   li.appendChild(name);
   return li;
}

/*
 * Создание древовидного отображения подразделений и предприятий компании
*/
async function tree() {

   const view = document.getElementById('view');
   const tree = document.createDocumentFragment();
   const ul = document.createElement('ul');

   const roots = await getRoots();

   roots.forEach(async (root, i) => {
      /* Создание элемента списка, с необходимыми дочерними полями */
      let li = createLi('root', root);
      /* Запрос детей */
      const childs = await getChild(root);

      if (childs) {
         childs.forEach((child) => {
            let childUl = document.createElement('ul');
            let childLi = createLi('child', child);

            childUl.appendChild(childLi);
            li.appendChild(childUl);
         });
      }
      ul.appendChild(li); tree.appendChild(ul); view.appendChild(tree);
       
   });
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
