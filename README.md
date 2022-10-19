# V2 GUIDBOOK
## Описание
Веб представление справочника для внутренней документации компании В2-ГРУПП
## Внешние зависимости
- [PHP 5.6](https://www.php.net/releases/5_6_0.php)
- php5.6-curl
- php5.6-apcu (.dll -> директория ***tools***) (версия apcu=4.0.11)
- php5.6-fpm

## Подготовка инструментария и зависимостей
### Путь самурая. Windows. Ручная установка интерпретатора PHP 5.6
1. Скачать подходящий интепретатор [***x64***](https://windows.php.net/downloads/releases/archives/php-5.6.0-Win32-VC11-x64.zip) или [***x86***](https://windows.php.net/downloads/releases/archives/php-5.6.0-Win32-VC11-x86.zip)
2. Распаковать архив в нужное место, добавить путь в переменную [***PATH***](https://pcask.ru/os/kak-otredaktirovat-path-v-windows-7-8-i-windows-10/)
3. Поместетить файл ***php.ini*** (с указанной в нем зависимостью: ***php5.6-curl***) из директории [***tools***](https://github.com/6dba/v2-guidbook/tree/develop/tools) в папку с интерпретатором, при необходимости установить остальные стронние зависимости, указанные выше.
4. Проверить корректность установки, запустив в консоли:

		php -v
5. Если вывелась версия, то интерпретатор установлен, ура! 
6. Установить необходимые сторонние зависимости.
7. Можно пользоваться!
### Альтернативный путь
Установить [***PhpStorm от JetBrains***](https://www.jetbrains.com/ru-ru/phpstorm/), управлять проектом из неё, но нужно проследить, чтобы версия интерпретатора также была ***5.6***. Возможно придётся повторить [***путь самурая***](https://github.com/6dba/v2-guidbook/tree/develop#%D0%BF%D1%83%D1%82%D1%8C-%D1%81%D0%B0%D0%BC%D1%83%D1%80%D0%B0%D1%8F-windows-%D1%80%D1%83%D1%87%D0%BD%D0%B0%D1%8F-%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BF%D1%80%D0%B5%D1%82%D0%B0%D1%82%D0%BE%D1%80%D0%B0-php-56) и установить интерпретатор вручную, дабы использовать его в IDE.

### Linux
	apt-get install -y software-properties-common
	add-apt-repository ppa:ondrej/php
	apt-get update
	apt-get install -y php5.6 php5.6-apcu php5.6-fpm php5.6-curl php5.6-mcrypt

## NGINX. Пример файла конфигурации сайта
```nginx
server {
    listen 8080; # нестандартный порт

server_name v2.local;
charset utf-8;

root /var/www/v2-guidbook; # путь к директории с исходным кодом веб-сервиса
index index.html index.htm index.php;

location ~ \.php$ {
    try_files $uri =404;
    fastcgi_pass unix:/run/php/php5.6-fpm.sock; # сокет PHP интерпретатора
    fastcgi_index index.php;
    include fastcgi_params;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    }

}
```