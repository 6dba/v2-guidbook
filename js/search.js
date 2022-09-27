function search(data) {

   get('http://81.161.220.59:8100/api/enterprise/?action=getVariables&id=2&request=developer')
   .then(resolve => console.log(resolve));

   console.log(data);

   document.getElementById('view').innerHTML =
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
