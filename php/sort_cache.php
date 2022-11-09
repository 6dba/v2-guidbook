<?php
ini_set( 'display_errors', 1 );
error_reporting( E_ALL ^E_NOTICE );
include 'hash.php';
//Вызов функции
$left = 0;
$right = apcu_cache_info( true )['num_entries']-1;
while ( apcu_exists( "$right" ) == false )
{$right--;}
if ( $_POST['sort'] == 'a-z' || $_POST['sort'] == 'z-a' )
sort_high_low( $left, $right );
else if ( $_POST['sort'] == 'empty' || $_POST['sort'] == 'not_empty' )
sort_null_not( $left, $right );
else
echo $_POST['sort'];

/*
* Функция, непосредственно производящая сортировку.
* Так как массив передается по ссылке, ничего не возвращает.
*/

function sort_high_low( $left, $right ) {


    //Создаем копии пришедших переменных, с которыми будем манипулировать в дальнейшем.
    $l = $left;
    $r = $right;

    //Вычисляем 'центр', на который будем опираться. Берем значение ~центральной ячейки массива.
    $center_index = ( int )( ( $left + $right ) / 2 );
    $center = mb_strtolower( apcu_fetch( "$center_index" )->$_POST['name'] );

    //Цикл, начинающий саму сортировку
    do {

        //Ищем значения больше 'центра'
        if ( $_POST['sort'] == 'a-z' ) {
            while ( strnatcmp( mb_strtolower( apcu_fetch( "$r" )->$_POST['name'] ), $center ) >= 1 ) {
                $r--;
            }

            //Ищем значения меньше 'центра'
            while ( strnatcmp( mb_strtolower( apcu_fetch( "$l" )->$_POST['name'] ), $center ) <= -1 ) {
                $l++;

            }
        } else if ( $_POST['sort'] == 'z-a' ) {
            while ( strnatcmp( mb_strtolower( apcu_fetch( "$r" )->$_POST['name'] ), $center ) <= -1 ) {
                $r--;
            }

            //Ищем значения меньше 'центра'
            while ( strnatcmp( mb_strtolower( apcu_fetch( "$l" )->$_POST['name'] ), $center ) >= 1 ) {
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
        sort_high_low( $left, $r );
    }

    if ( $l < $right ) {
        //Если условие true, совершаем рекурсию
        //Передаем массив, текущие начало и конец
        sort_high_low( $l, $right );
    }
    //Сортировка завершена

}

function sort_null_not( $left, $right ) {

    //Создаем копии пришедших переменных, с которыми будем манипулировать в дальнейшем.
    $l = $left;
    $r = $right;

    //Вычисляем 'центр', на который будем опираться. Берем значение ~центральной ячейки массива.
    $center_index = ( int )( ( $left + $right ) / 2 );
    $center = mb_strtolower( apcu_fetch( "$center_index" )->$_POST['name'] );

    //Цикл, начинающий саму сортировку
    do {

        //Ищем значения больше 'центра'
        if ( $_POST['sort'] == 'empty' ) {
            while ( strnatcmp( mb_strtolower( apcu_fetch( "$r" )->$_POST['name'] ), $center ) >= 1 ) {
                $r--;
            }

            //Ищем значения меньше 'центра'
            while ( strnatcmp( mb_strtolower( apcu_fetch( "$l" )->$_POST['name'] ), $center ) <= -1 ) {
                $l++;

            }
        } else if ( $_POST['sort'] == 'not_empty' ) {
            while ( strnatcmp( mb_strtolower( apcu_fetch( "$r" )->$_POST['name'] ), $center ) <= -1 ) {
                $r--;
            }

            //Ищем значения меньше 'центра'
            while ( strnatcmp( mb_strtolower( apcu_fetch( "$l" )->$_POST['name'] ), $center ) >= 1 ) {
                $l++;
            }
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
        sort_null_not( $left, $r );
    }

    if ( $l < $right ) {
        //Если условие true, совершаем рекурсию
        //Передаем массив, текущие начало и конец
        sort_null_not( $l, $right );
    }
    //Сортировка завершена

}
?>
