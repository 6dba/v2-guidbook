const rootUrl = 'http://81.161.220.59:8100/api/structureTest/?action=getData&pid=root&request=developer'
const allUrl = 'http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer'

// http://81.161.220.59:8100/api/structureTest/?action=getData&pid=H1&request=developer child

function tree() {

   const view = document.getElementById('view');
   const tree = document.createDocumentFragment();
   const list = document.createElement('ul');

   get(url)
   .then((response) => {
      let parents = response;
      parents.map((parent) => {
         let li = document.createElement('li');
         let name = document.createElement('a');

         Object.assign(name, {
            id: `${parent.ID}`,
            href: '#',
            class: `${parent.IDENTIFIER}`
         });

         name.innerHTML = `${parent.NAME}`;

         li.appendChild(name); list.appendChild(li);
         tree.appendChild(list); view.appendChild(tree);
      })
   })
   .catch((error) => {
      console.log(error);
   });



}

async function getTree() {

var tree, childs = [];
const roots = await get(rootUrl).then(roots => roots);

for (var i = 0; i < roots.length; i++) {
   await get(`http://81.161.220.59:8100/api/structureTest/?action=getData&pid=${roots[i].ID}&request=developer`)
      .then(resolve => childs.push(resolve))
}

console.log(roots, childs);


}
