<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL ^E_NOTICE );
include 'hash.php';
//Вызов функции
if ( $_POST['sort'] == 'a-z' || $_POST['sort'] == 'z-a' ) {
    qsort();
} else if ( $_POST['sort'] == 'null' || $_POST['sort'] == 'not_null' ) {
    qsort_to_null();
} else {
    echo $_POST['sort'];
}
/*
* Функция вычисляет количество элементов,
* тем самым подготавливая параметры для первого запуска,
* и запускает сам процесс.
*/

function qsort() {

    $left = 0;
    $right = apcu_cache_info( true )['nentries']-1;
    while ( apcu_exists( "$right" ) == false )
    $right--;
    my_sort( $left, $right );

}

/*
* Функция, непосредственно производящая сортировку.
* Так как массив передается по ссылке, ничего не возвращает.
*/

function my_sort( $left, $right ) {

    //Создаем копии пришедших переменных, с которыми будем манипулировать в дальнейшем.
    $l = $left;
    $r = $right;

    //Вычисляем 'центр', на который будем опираться. Берем значение ~центральной ячейки массива.
    $center_index = ( int )( ( $left + $right ) / 2 );
    $center = mc_decrypt( apcu_fetch( "$center_index" ), ENCRYPTION_KEY )->$_POST['name'];

    //Цикл, начинающий саму сортировку
    do {

        //Ищем значения больше 'центра'
        if ( $_POST['sort'] == 'a-z') {
            while ( strnatcasecmp( mc_decrypt( apcu_fetch( "$r" ), ENCRYPTION_KEY )->$_POST['name'], $center ) >= 1 ) {
                $r--;
            }

            //Ищем значения меньше 'центра'
            while ( strnatcasecmp( mc_decrypt( apcu_fetch( "$l" ), ENCRYPTION_KEY )->$_POST['name'], $center ) <= -1 ) {
                $l++;

            }
        } else if ( $_POST['sort'] == 'z-a' ) {
            while ( strnatcasecmp( mc_decrypt( apcu_fetch( "$r" ), ENCRYPTION_KEY )->$_POST['name'], $center ) <= -1 ) {
                $r--;
            }

            //Ищем значения меньше 'центра'
            while ( strnatcasecmp( mc_decrypt( apcu_fetch( "$l" ), ENCRYPTION_KEY )->$_POST['name'], $center ) >= 1 ) {
                $l++;
            }
        }

        //После прохода циклов проверяем счетчики циклов
        if ( $l <= $r ) {

            //И если условие true, то меняем ячейки друг с другом.

            $save = apcu_fetch( "$r" );

            apcu_store( "$r", apcu_fetch( "$l" ) );
            apcu_store( "$l", $save );

            //И переводим счетчики на следующий элементы
            $l++;
            $r--;
        }

        //Повторяем цикл, если true
    }
    while ( $l < $r );

    if ( $r > $left ) {
        //Если условие true, совершаем рекурсию
        //Передаем массив, исходное начало и текущий конец
        my_sort( $left, $r );
    }

    if ( $l < $right ) {
        //Если условие true, совершаем рекурсию
        //Передаем массив, текущие начало и конец
        my_sort( $l, $right );
    }
    //Сортировка завершена

}

function my_sort1( $left, $right ) {

    //Создаем копии пришедших переменных, с которыми будем манипулировать в дальнейшем.
    $l = $left;
    $r = $right;

    //Вычисляем 'центр', на который будем опираться. Берем значение ~центральной ячейки массива.
    $center_index = ( int )( ( $left + $right ) / 2 );
    $center = mc_decrypt( apcu_fetch( "$center_index" ), ENCRYPTION_KEY )->DIVISION_TYPE_NAME;

    //Цикл, начинающий саму сортировку
    do {

        //Ищем значения больше 'центра'
        while ( strnatcasecmp( mc_decrypt( apcu_fetch( "$r" ), ENCRYPTION_KEY )->DIVISION_TYPE_NAME, $center ) <= -1 || !apcu_fetch( "$r" ) ) {
            $r--;
        }

        //Ищем значения меньше 'центра'
        while ( strnatcasecmp( mc_decrypt( apcu_fetch( "$l" ), ENCRYPTION_KEY )->DIVISION_TYPE_NAME, $center ) >= 1 ) {
            $l++;
        }

        //После прохода циклов проверяем счетчики циклов
        if ( $l <= $r ) {

            //И если условие true, то меняем ячейки друг с другом
            $save = apcu_fetch( "$r" );
            apcu_store( "$r", apcu_fetch( "$l" ) );
            apcu_store( "$l", $save );

            //И переводим счетчики на следующий элементы
            $l++;
            $r--;
        }

        //Повторяем цикл, если true
    }
    while ( $l < $r );

    if ( $r > $left ) {
        //Если условие true, совершаем рекурсию
        //Передаем массив, исходное начало и текущий конец
        my_sort( $left, $r );
    }

    if ( $l < $right ) {
        //Если условие true, совершаем рекурсию
        //Передаем массив, текущие начало и конец
        my_sort( $l, $right );
    }
    //Сортировка завершена

}
?>
