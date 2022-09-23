<!DOCTYPE>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">

    <title>В2</title>
</head>

<body>
    <div class="container-fluid">
        <header class="d-flex flex-wrap align-items-center justify-content-center py-1 mb-3 mb-md-0">
            <div class="imgpos">
                <img src="ing/logo2.png" alt="" />
            </div>
            <div class="title flex-grow-1">Локальный сервер V1.2.3</div>
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
                    <a href="/auth.php" class="btn px-2 btn-link btn_login">Выход</a>
                    <?php else: ?>
                    <a href="/auth.php" class="btn px-2 btn-link btn_login">Вход</a>
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
        <div class="row">
            <div class="col trap">
                <select class="guides">
                    <option value="first">Справочник 1</option>
                    <option value="second">Справочник 2</option>
                    <option value="third">Справочник 3</option>
                </select>
                <button type="button_find" class="btn_find">Найти</button>
                <div class="d-flex back_title_guide">
                    <div class="w-100 p-1 title_guide">Заголовок справочника
                    </div>
                    <div class="flex-shrink-1 add_pos">
                        <button type="image" class="img_add"><img src="ing/add4.png" alt"" onClick=selectItem()></button>
                    </div>
                </div>
                
                
                <div class = "typetable w-100 p-1 title_guide">
                  <caption>Место переключения режима</caption> 
                  <tr>
                    <th rowspan="1" class="first">Номер</th>
                    <th rowspan="1" class="first">Наименование</th>
                  </tr>
                  <tr>
                    <td rowspan="1" class="first">№ ...</td>
                    <td> </td>
                    <td> </td>
                  </tr>
                </div>
                
                
                
            </div>
            <div class="col trap">
                <div class="d-flex back_title_element">
                    <div id="ttl_el" class="w-100 p-1 title_element">Заголовок выбранного элемента
                    </div>
                    <div class="flex-shrink-1 add_pos">
                        <button type="image" class="img_add"><img src="ing/exit.png" alt"" /></button>
                    </div>
                    <div class="flex-shrink-1 add_pos">
                        <button type="image" class="img_add"><img src="ing/change.png" alt"" /></button>
                    </div>
                    <div class="flex-shrink-1 add_pos">
                        <button type="image" class="img_add"><img src="ing/delete.png" alt"" /></button>
                    </div>
                </div>
                <div id="edit_Form">Форма просмотра/редактирования</div>
            </div>
        </div>
    </div>
    <?php endif; ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script language="javascript" type="text/javascript" src="edit_form.js"></script>
</body>

</html>
