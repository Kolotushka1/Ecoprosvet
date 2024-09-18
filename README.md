# Экопросвет

## Запуск

Прототип веб-портала единой платформы информирования горожан об экологических мероприятий, проводимых в г. Москва **Экопросвет**

Для локального запуска необходимо:
1. Установить Docker
2. Клонировать репозиторий
```bash
git clone https://github.com/Kolotushka1/Ecoprosvet/ 
```
3. Отредактировать файл compose.yml, вставив токен бота и токены OAuth2
4. Запустить командой
```bash
docker compose up -d
```
Сайт запускается на адресе localhost:80

## Архитектура

Клиентская часть сайта является реактивной (виртуальная DOM, данные загружаются и отображаются без перезагрузки страницы)
и реализована на фрейморвке React.

Бэкенд разделён на две части: прикладное API и сервер авторизации:
* Прикладное API реализовано на языке Python и фреймворке Django.
* Сервер авторизации реализован на языке Java и фреймворке Spring.

Оба компонента работают на основе СУБД MySQL.
Разделение на компоненты применено для повышения безопасности приложения и изоляции важной части бизнес-логики, связанной с авторизацией.

