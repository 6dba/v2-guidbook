/* Очистка элемента */
<<<<<<< HEAD
function removeChilds(element) {
   while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
   }
=======
function removeChilds(item) {
    while (item.hasChildNodes()) {
        item.removeChild(item.lastChild);
    }
>>>>>>> 093e43440dfbbbf23374313d8b94cf05158dcf15
}

function changeView() {

    let view = document.getElementById('view');
    let icon = document.getElementById('img_view');

<<<<<<< HEAD
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
=======
    if (view.classList.contains('tree')) {
        freezeButton();
        view.classList.remove('tree');
        view.classList.add('table');
        /* Отрисовка нов    ого view */
        load();
        /* Подмена классов */
        icon.src = '../assets/tree.png';
        removeChilds(view);
        
>>>>>>> 093e43440dfbbbf23374313d8b94cf05158dcf15

    } else if (view.classList.contains('table')) {
        freezeButton();
        view.classList.remove('table');
        view.classList.add('tree');
        tree();
        icon.src = '../assets/table.png';
        removeChilds(view);
        
    }

    return;
}

function freezeButton()
{
    button_change_view.onclick = null;
        setTimeout(function() {
            button_change_view.onclick = changeView
        }, 1000);
}
