<!DOCTYPE>
<html lang="ru">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="../styles/dragtable.css">
    <link rel="stylesheet" href="../styles/bootstrap.min.css">
    <link rel="stylesheet" href="../styles/login.css">
    <link rel="stylesheet" href="../styles/jquery-ui.css">
    <link rel="stylesheet" href="../styles/selectize.default.css">
    <link rel="stylesheet" href="../styles/css.css">
    <script language="javascript" type="text/javascript" src="../libs/jquery.min.js"></script>
    <script language="javascript" type="text/javascript" src="../libs/jquery-ui.min.js"></script>
    <script language="javascript" type="text/javascript" src="../libs/tableToExcel.js"></script>
    <script language="javascript" type="text/javascript" src="../libs/selectize.min.js"></script>
    <script language="javascript" type="text/javascript" src="../libs/dragtable.js"></script>

    <script language="javascript" type="text/javascript" src="../js/urls.js"></script>
    <script language="javascript" type="text/javascript" src="../js/api.js"></script>
    <script language="javascript" type="text/javascript" src="../js/dynamic.js"></script>
    <script language="javascript" type="text/javascript" src="../js/tree.js"></script>
    <script language="javascript" type="text/javascript" src="../js/table.js"></script>
    <script language="javascript" type="text/javascript" src="../js/edit_form.js"></script>
    <script language="javascript" type="text/javascript" src="../js/show_edit.js"></script>
    <script language="javascript" type="text/javascript" src="../js/change_view.js"></script>
    <script language="javascript" type="text/javascript" src="../js/createNew.js"></script>
    <script language="javascript" type="text/javascript" src="../js/search.js"></script>
    <script language="javascript" type="text/javascript" src="../js/functions_for_buttons.js"></script>
    <script language="javascript" type="text/javascript" src="../js/excel.js"></script>
    <script language="javascript" type="text/javascript" src="../js/contextmenu.js"></script>
    <script language="javascript" type="text/javascript" src="../js/sortTable.js"></script>



    <title>В2</title>
</head>

<body>
    <div id='context_menu' class='context-menu dropend'>
        <div class='dropdown-toggle' id='deleteTd'>Удалить столбец
            <ul class='dropcontext' id='drop_delete'>
            </ul>
        </div>

        <div class='dropdown-toggle' id='addTd'>Добавить столбец
            <ul class='dropcontext' id='drop_add'>
            </ul>
        </div>

        <div id='save_view' onclick=saveView()>Сохранить вид</div>
    </div>
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
                if(isset($_COOKIE['PHPSESSID'])):
                ?>
                    <a href="../php/auth.php" class="btn px-2" style='color:white'>Выход</a>
                    <?php else: ?>
                    <a href='#' id='login_button' class="btn ui-corner-all ui-widget">Вход</a>
                    <?php endif; ?>
                </li>
            </ul>
        </header>
    </div>

    <div class='container-login mt-4' id='dialog-form'>
        <input type='text' class='form-control' name='login' id='login' placeholder='Введите логин'><br>
        <input type='text' class='form-control' name='password' id='password' placeholder='Введите пароль'><br>
        <button class='btn-login btn' id='entry' onClick=login()>Войти</button>
    </div>
    <script>
        dialog = $("#dialog-form").dialog({
            autoOpen: false,
            draggable: false,
            width: 500,
            title: 'Вход',
            hide: {
                effect: "blind",
                duration: 1000
            },
            modal: true,
            resizable: false,
            show: {
                effect: "blind",
                duration: 800
            }
        });
        $("#login_button").button().on("click", function() {
            dialog.dialog("open");
        });

        function login() {
            let login_value = document.getElementById('login').value.trim();
            let password_value = document.getElementById('password').value.trim();
            if (!login_value.length)
                document.getElementById('login').style = 'border-color: red';
            if (!password_value.length)
                document.getElementById('password').style = 'border-color: red';
            if (login_value.length && password_value.length) {
                document.getElementById('entry').onclick = '';
                let data = {
                    url_login: 'http://81.161.220.59:8100/api/access/?action=authorization',
                    data_login: {
                        login: login_value,
                        password: password_value
                    }
                };
                $.ajax({
                    url: '../php/auth.php',
                    method: 'POST',
                    data: data,
                    success: function(response) {
                        if (response == 200)
                            location.reload();
                        else
                            alert(response);
                        document.getElementById('entry').onclick = login;
                    },
                    error: function(jqxhr, status, errorMsg) {
                        alert(errorMsg)
                    }
                })
            }
        }

    </script>

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
    if(isset($_COOKIE['PHPSESSID'])):
    ?>
    <div class="main" id="main">
        <div class="container_information">
            <div class="row d-flex" style="overflow-y: inherit">
                <div class="mySidebar col" id="mySidebar" style='display: none;'>
                    <label for="label-bar" class="labels_bar" style='margin-left:-12px; min-width: 260px'>
                        <button class="btn_close" onClick=filter_close() title="Закрыть">X</button>
                        <span>Фильтр</span>
                    </label>
                    <a>Наименование</a>
                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-type-name form-check-input" type="checkbox" id="place" value="Место работы">
                        <span class="checkbox__label">Место работы</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-type-name form-check-input" type="checkbox" id="brigade" value="Бригада">
                        <span class="checkbox__label">Бригада</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-type-name form-check-input" type="checkbox" id="division" value="Подразделение">
                        <span class="checkbox__label">Подразделение</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-type-name form-check-input" type="checkbox" id="company" value="Предприятие">
                        <span class="checkbox__label">Предприятие</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-type-name form-check-input" type="checkbox" id="holding" value="Холдинг">
                        <span class="checkbox__label">Холдинг</span>
                    </label>

                    <a>Тип предприятия</a>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="sinking" value="Горные работы (в подземных условиях)">
                        <span class="checkbox__label">Горные работы (в подземных условиях)</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="sinking" value="Горные работы (открытым способом)">
                        <span class="checkbox__label">Горные работы (открытым способом)</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="sinking" value="Обогащение полезных ископаемых">
                        <span class="checkbox__label">Обогащение полезных ископаемых</span>
                    </label>


                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="sinking" value="Подрядная организация">
                        <span class="checkbox__label">Подрядная организация</span>
                    </label>

                    <a>Тип подразделения</a>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="stall" value="БВР">
                        <span class="checkbox__label">БВР</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="stall" value="Вспомогательные работы">
                        <span class="checkbox__label">Вспомогательные работы</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="stall" value="Выход готовой продукции">
                        <span class="checkbox__label">Выход готовой продукции</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="stall" value="Добыча">
                        <span class="checkbox__label">Добыча</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="stall" value="Дробление">
                        <span class="checkbox__label">Дробление</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="stall" value="Обогащение">
                        <span class="checkbox__label">Обогащение</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="stall" value="Перевозка">
                        <span class="checkbox__label">Перевозка</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="stall" value="Подготовительные работы">
                        <span class="checkbox__label">Подготовительные работы</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="stall" value="Производственный контроль">
                        <span class="checkbox__label">Производственный контроль</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="sinking" value="Проходка">
                        <span class="checkbox__label">Проходка</span>
                    </label>

                    <label for="сheckbox-filter" class="checkbox">
                        <input class="check-division-type-name form-check-input" type="checkbox" id="stall" value="Очистной забой">
                        <span class="checkbox__label">Очистной забой</span>
                    </label>

                    <a>Сортировка</a>
                    <select id="short_name">
                        <option value="" selected>--Название--</option>
                        <option value="empty">Сначала пустые</option>
                        <option value="not_empty">Сначала непустые</option>
                    </select>

                    <select id="type_name">
                        <option value="" selected>--Наименование--</option>
                        <option value="empty">Сначала пустые</option>
                        <option value="not_empty">Сначала непустые</option>
                    </select>

                    <select id="division_type_name">
                        <option value="" selected>--Тип подразделения--</option>
                        <option value="empty">Сначала пустые</option>
                        <option value="not_empty">Сначала непустые</option>
                    </select>


                    <button id="button_Ok" class="btn_ok" onclick=accept_filters()>Применить</button>
                    <button id="button_drop" class="btn_drop" onclick=drop_filters()>Сброс</button>

                </div>
                <script>
                    $('#name').change(function() {
                        document.getElementById('type_name').value = '';
                        document.getElementById('division_type_name').value = '';
                    });
                    $('#type_name').change(function() {
                        document.getElementById('name').value = '';
                        document.getElementById('division_type_name').value = '';
                    });
                    $('#division_type_name').change(function() {
                        document.getElementById('type_name').value = '';
                        document.getElementById('name').value = '';
                    });

                </script>
                <div class="col trap">
                    <div class="d-flex flex-shrink-1">
                        <button class="btn_filter" id='btn_filter' onClick=filter_open() style='display:none'><img src="../assets/filter.png" alt="" id='img_filter' /></button>
                        <input type=text class="input_find" id='input_find' placeholder="Введите текст для поиска">
                        <button type="button_find" class="ms-3 btn_find" onclick=search()>Найти</button>
                        <script>
                            let checkCoockie = setInterval(() => {
                                if (document.cookie.indexOf("PHPSESSID") == -1)
                                {location.reload();
                                 clearInterval(checkCoockie);
                                }
                            }, 36000000);
                            $('.input_find').on('input', function() {
                                inputEvent(this)
                            })

                            $('.input_find').keyup(function(event) {
                                if (event.key == 'Enter') search();
                            });

                        </script>
                    </div>

                    <div class="d-flex back_title_guide">
                        <div id="title" class="w-100 p-1 title_guide">Сотрудники</div>
                        <div id="excel" class="flex-shrink-1 add_pos">
                            <button class="img_add"><img src="../assets/excel.png" alt="" title="Экспорт в Excel" onclick=toExcel()></button>
                        </div>
                        <div class="flex-shrink-1 add_pos">
                            <button class="img_add" id='reload_cache_button' onclick=reload_cache()><img src="../assets/reload.png" alt="" title="Обновить"></button>
                        </div>
                        <div class="flex-shrink-1 add_pos">
                            <button class="img_add" id="button_change_view" title="Форма представления данных" onclick=changeView()><img id="img_view" src="../assets/table.png" alt=""></button>
                        </div>
                        <div class="flex-shrink-1 add_pos">
                            <button class="img_add"><img src="../assets/add4.png" alt="" title="Создать" onclick=createNewObject()></button>
                        </div>
                    </div>
                    <div id='loading_view' class='loading p-2' style='text-align: center'>
                        <div class='spinner-border text-primary' id='loader_icon' style='margin: 150px 0 0 0'></div>
                    </div>
                <div id="view" class='tree'></div>
                <div class="flex-shrink-1 add_pos">
                    <button href="#" id="scroll_top" title="Наверх"></button>
                </div>
                    <script>
                        document.getElementById('button_change_view').onclick = null;
                        tree().then(()=>{document.getElementById('button_change_view').onclick = changeView});
                        img_view.src = '../assets/table.png';
                        document.getElementById('excel').style.visibility = 'hidden'

                        $(function(){
                            $('#view').scroll(function() {
                                if($('#view').scrollTop() > 25) {
                                    $('#scroll_top').show();
                                } else {
                                    $('#scroll_top').hide();
                                }
                            });

                            $('#scroll_top').click(function(){
                                $('#view').animate({scrollTop: 0}, 500);
                                return false;
                            });
                        });
                    </script>
                </div>


                <div class="col trap_edit edit align-self-start" id="block_edit">

                    <div class="d-flex back_title_element">
                        <div id="ttl_el" class="w-100 p-1 title_element" style='word-wrap: break-word'>
                        </div>
                        <div class="flex-shrink-1 add_pos">
                            <button id="deleteObject" class="img_add" style="visibility : hidden;"><img src="../assets/delete.png" title="Удалить" alt="" onClick=delete_object()></button>
                        </div>
                        <div class="flex-shrink-1 add_pos">
                            <button id="exit" class="img_add" style="visibility : hidden;"><img src="../assets/exit.png" title="Закрыть режим редактирования" alt="" onClick=undo_edit()></button>
                        </div>
                        <div class="flex-shrink-1 add_pos">
                            <button class="img_add"><img src="../assets/change.png" title="Редактировать" alt="" id='img_change' onClick=edit() /></button>
                        </div>
                        <div class="flex-shrink-1 add_pos">
                            <button class="img_add"><img src="../assets/close.png" title="Закрыть" alt="" onClick=close_edit()></button>
                        </div>
                    </div>
                    <div id='loading' class='loading p-2' style='text-align: center'>
                        <div class='spinner-border text-primary' id='loader_icon'></div>
                    </div>
                    <div id="edit_Form" class="p-2"></div>
                </div>
            </div>
        </div>
    </div>
    <?php endif; ?>
</body>

</html>
