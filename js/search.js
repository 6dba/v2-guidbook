async function search() {
   const input = document.querySelector('.input_find');
   const view = document.getElementById('view');

   if (!input.value) return;
   if (input.value.length < 3) {
       clear(input);
   }

   const value = input.value.replace(/(<([^>]+)>)/ig, '')
    
   const data = await getData(allUrl);

   /* Соотвествует совпадениям по наименованию (предприятия, подразделения)
    * и наименованию типа подразделения */
   const matches = data.filter(
           (item) => (item.NAME.toLowerCase().includes(value.toLowerCase()))
      // || item.DIVISION_TYPE_NAME.toLowerCase().includes(value.toLowerCase()))
      // || item.TYPE_NAME.toLowerCase().includes(value.toLowerCase()))
   )

   if (!matches.length) {
      view.innerHTML =
      `<div class="card">
         <div class="card-body"><h5 class="card-title">Совпадений для <b>${value}</b> не найдено :(</h5></div>
      </div>`
      view.classList.toggle('search');
      return;
   }

   if (view.classList.contains('tree')) {
       removeChilds(view);
       tree(matches, value);
   } else if (view.classList.contains('table')) {
       removeChilds(view);
       table(matches, value);
   }
    view.classList.toggle('search')
}

function clear(input) {
   const view = document.getElementById('view');

    if (view.classList.contains('tree') && view.classList.contains('search')) {
        view.classList.toggle('search'); removeChilds(view);
        tree();
    } else if (view.classList.contains('table') && view.classList.contains('search')) {
        view.classList.toggle('search'); removeChilds(view);
        table();
   }

   input.value = "";
   input.parentElement.removeChild(document.querySelector('.button_clear'));
}

function inputEvent(element) {
   if (!element.value) {
      clear(element)
      return;
   }

   if (document.querySelector('.button_clear')) return;

   let button = createElemWithAttr('button', {
      style: 'width: 40px; margin-left: 10px;',
      className: 'button_clear ms-3 btn_find',
      innerHTML: '❌',
      onclick: function() {clear(element)}
   });

   element.after(button);
}

// Подсветка вхождения search в string (Свойство NAME полученных данных)
const searchBackLight = (string, search) => {
    return string.replace(new RegExp(search, 'gi'), `<span style="background-color:#ff9447">$&</span>`);
}