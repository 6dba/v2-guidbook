/* Сортировка для value select-листа
 * Привязывается к select-листу
 * value: string - тип сортировки
 * property: string - поля обьекта (столбец),
 *  для которого производитсясортировка */
function sort(element) {
    sortCache(element.value, element.id)
}