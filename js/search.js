async function search() {
   let input = document.querySelector('.input_find')
   let view = document.getElementById('view');

   if (!input.value) return;

   const allUrl = 'http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer'
   const data = await getData(allUrl);

   /* Соотвествует совпадениям по наименованию (предприятия, подразделения)
    * и наименованию типа подразделения */
   const matches = data.filter(
      item => (item.NAME.toLowerCase().includes(input.value.toLowerCase()) ||
           item.DIVISION_TYPE_NAME.toLowerCase().includes(input.value.toLowerCase()))
   )

   if (!matches) return;

   if (view.classList.contains('tree')) {
      removeChilds(view);
      createView('root', matches, input.value);
   } else if (view.classList.contains('table')) {
      /* Вставляйте сюда функцию очистки view и отображения поисковых данных
       * в табличном представлении */
   }
}

function clear(input) {
   let view = document.getElementById('view');

   /* Лишнее обновление view если было заполнено поисковое поле, но не нажата кнопка Найти,
    * то есть исходное отображение заменяется на исходное,
    * не критично, но нужно решить */
   if (view.classList.contains('tree')) {
      removeChilds(view);
      tree();
   } else if (view.classList.contains('table')) {
      removeChilds(view);
      load();
   }

   input.value = ""
   input.parentElement.removeChild(document.querySelector('.button_clear'))
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
