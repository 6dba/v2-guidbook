/* Очистка элемента */
function removeChilds(element) {
   while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
   }
}

function changeView() {

   let view = document.getElementById('view');
   let icon = document.getElementById('img_view');

   if (view.classList.contains('tree')) {
      icon.src = '../assets/tree-icon.png'; removeChilds(view);
      /* Отрисовка нового view */
      load();
      /* Подмена классов */
      view.classList.remove('tree'); view.classList.add('table');
   } else if (view.classList.contains('table')) {
      icon.src = '../assets/table.png'; removeChilds(view);
      tree();
      view.classList.remove('table'); view.classList.add('tree');
   }

   return;
}
