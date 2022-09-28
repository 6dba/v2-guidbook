function tree() {

   const view = document.getElementById('view');
   const tree = document.createDocumentFragment();
   const url = 'http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer'
   const list = document.createElement('ul');

   get(url)
   .then((response) => {
      let parents = response;
      parents.map((parent) => {
         let li = document.createElement('li');
         let name = document.createElement('a');

         Object.assign(name, {
            id: `${parent.ID}`,
            href: '#'
         })
         name.innerHTML = `${parent.NAME}`;

         li.appendChild(name); list.appendChild(li);
         tree.appendChild(list); view.appendChild(tree);

      })
   })
   .catch((error) => {
      console.log(error);
   });


   "<ul id='tree'> \
     <li id='n1'>Предприятие 1</li> \
     <li id='n2'>Предприятие 2 \
       <ul id='n2.0'> \
         <li id='n2.1'>Подразделение 1</li> \
         <li id='n2.2'>Подразделение 2</li> \
       </ul> \
     </li> \
     <li id='n3'>Предприятие 3</li> \
   </ul>";
}
