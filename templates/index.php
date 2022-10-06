<!DOCTYPE>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../styles/css.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <script language="javascript" type="text/javascript" src="../js/tree.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script language="javascript" type="text/javascript" src="../js/edit_form.js"></script>
    <script language="javascript" type="text/javascript" src="../js/api.js"></script>
    <script language="javascript" type="text/javascript" src="../js/show_edit.js"></script>
    <script language="javascript" type="text/javascript" src="../js/defaulttable.js"></script>
    <script language="javascript" type="text/javascript" src="../js/post.js"></script>
    <script language="javascript" type="text/javascript" src="../js/change_view.js"></script>
    <script language="javascript" type="text/javascript" src="../js/createNew.js"></script>
    <script language="javascript" type="text/javascript" src="../js/ajax_cache.js"></script>
    <script language="javascript" type="text/javascript" src="../js/search.js"></script>
    <title>В2</title>
</head>
<body>
    <div class="container-fluid">
        <header class="d-flex flex-wrap align-items-center justify-content-center py-1 mb-3 mb-md-0">
            <div class="imgpos">
                <img src="../assets/altan_logo.png" alt="" />
            </div>
            <div class="title flex-grow-1">Локальный сервер v 1.2.3 </div>
            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="#" class="nav-link px-2 link-light">Инструменты</a></li>
                <li><a href="#" class="nav-link px-2 link-light">Модули</a></li>
                <li><a href="#" class="nav-link px-2 link-light">Отчеты</a></li>
                <li><a href="#" class="nav-link px-2 link-light">Администрирование</a></li>
                <li><a href="#" class="nav-link px-2 link-light">Помощь</a></li>
                <li>
                    <?php
                if($_COOKIE['user'] == '1'):
                ?>
                    <a href="../php/auth.php" class="btn px-2 btn-link btn_login">Выход</a>
                    <?php else: ?>
                    <a href="../php/auth.php" class="btn px-2 btn-link btn_login">Вход</a>
                    <?php endif; ?>
                </li>
            </ul>
        </header>
    </div>

    <div class="container">
        <ul class="nav col-12 col-md-auto mb-2 justify-content mb-md-0 mt-3">
            <li class="pe-4">СПРАВОЧНИКИ
                <hr>
            </li>
            <li class="px-4">УПРАВЛЕНИЕ ДОСТУПОМ</li>
            <li class="px-4">ПОЛЬЗОВАТЕЛИ</li>
            <li class="px-4">НАСТРОЙКИ СИСТЕМЫ</li>
        </ul>
    </div>
    <?php
    if($_COOKIE['user'] == '1'):
    ?>
    <div class="container_information">
        <div class="row d-flex">
            <div class="col trap">
                <select class="guides">
                    <option value="first">Справочник 1</option>
                    <option value="second">Справочник 2</option>
                    <option value="third">Справочник 3</option>
                </select>
                <div class="d-flex flex-shrink-1">
                    <input class='input_find'>
                    <script>
                    let input_find = document.querySelector('.input_find');
                    input_find.addEventListener('input', function() {inputEvent(this)})
                    </script>
                    <button type="button_find" class="ms-3 btn_find" onClick=search()>Найти</button>
                </div>
                <div class="d-flex back_title_guide">
                    <div class="w-100 p-1 title_guide">Сотрудники
                    </div>
                    <div class="flex-shrink-1 add_pos">
                        <button type="image" class="img_add" id="button_change_view" title = "Форма представления данных" onclick="changeView()"><img id="img_view" src="../assets/table.png" alt=""></button>
                    </div>
                    <div class="flex-shrink-1 add_pos">
                        <button type="image" class="img_add"><img src="../assets/add4.png" alt="" title = "Создать" onclick="createNewObject()"></button>
                    </div>
                </div>
                <div id="view" class="tree"></div>
                <script>
                    freezeButton();
                    tree();
                </script>
            </div>

            <div class="col trap_edit edit align-self-start" id="block_edit">
                <div class="d-flex back_title_element">
                    <div id="ttl_el" class="w-100 p-1 title_element">
                    </div>
                    <div class="flex-shrink-1 add_pos">
                        <button type="image" id="exit" class="img_add" style = "visibility : hidden;"><img src="../assets/exit.png" title ="Закрыть режим редактирования" alt="" onClick=undo_edit()></button>
                    </div>
                    <div class="flex-shrink-1 add_pos">
                        <button type="image" class="img_add"><img src="../assets/change.png" title="Редактировать" alt="" id='img_change'/></button>
                    </div>
                    <div class="flex-shrink-1 add_pos">
                        <button type="image" class="img_add"><img src="../assets/delete.png" title="Закрыть" alt="" onClick=close_edit()></button>
                    </div>
                </div>
                <div id='loading' class='loading p-2' style='text-align: center'>
                    <div class='spinner-border text-primary' id='loader_icon'></div>
                </div>
                <div id="edit_Form" class="p-2"></div>
            </div>
        </div>
    </div>
    <?php endif; ?>
</body>
</html>
