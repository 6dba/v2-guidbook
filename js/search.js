function search() {
   return;
}

function clear(element) {
   element.value = ""
   element.parentElement.removeChild(document.querySelector('.button_clear'))
}

function inputEvent(element) {
   if (document.querySelector('.button_clear')) return;

   let button = createElemWithAttr('button', {
      style: 'width: 40px; margin-left: 10px;',
      className: 'button_clear ms-3 btn_find',
      innerHTML: '❌',
      onclick: function() {clear(element)}
   });

   element.after(button);
}
