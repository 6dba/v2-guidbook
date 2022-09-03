# V2 GUIDBOOK
## Описание
Веб представление справочника для внутренней документации компании В2-ГРУПП
## Зависимости
- PHP 5.6
- php5.6-curl

## Подготовка инструментария и зависимостей
### Путь самурая. Windows. Ручная установка интерпретатора PHP 5.6
1. Скачать подходящий интепретатор [x64](https://windows.php.net/downloads/releases/archives/php-5.6.0-Win32-VC11-x64.zip) или [x86](https://windows.php.net/downloads/releases/archives/php-5.6.0-Win32-VC11-x86.zip) (в который уже включен файл ***php.ini*** с указанной в нем зависимостью: ***php5.6-curl***)
2. Распаковать архив в нужное место, добавить путь в переменную [PATH](https://pcask.ru/os/kak-otredaktirovat-path-v-windows-7-8-i-windows-10/)
3. Поместетить файл ***php.ini*** из директории [***tools***](https://github.com/6dba/v2-guidbook/tree/develop/tools) в папку с интерпретатором
3. Проверить корректность установки, запустив в консоли:

		php -v
4. Если вывелась версия, то интерпретатор установлен, ура! Можно пользоваться:

		php src/data.php

### Альтернативный путь
Установить [***PhpStorm от JetBrains***](https://www.jetbrains.com/ru-ru/phpstorm/), управлять проектом из неё, но нужно проследить, чтобы версия интерпретатора также была ***5.6***

### Линуксоиды
	apt-get install -y software-properties-common
	add-apt-repository ppa:ondrej/php
	apt-get update
	apt-get install -y php5.6