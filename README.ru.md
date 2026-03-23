# ![Логотип](https://raw.githubusercontent.com/LenkaDEA/knitting-next/main/.github/assets/mainLogo.svg) Knitting Backend

<p align="center">
  <a href="README.md">English</a> • <b>Русский</b>
</p>

<div align="center">

![Strapi](https://img.shields.io/badge/Strapi_5-2F2E8B?style=for-the-badge&logo=strapi&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Yandex Cloud](https://img.shields.io/badge/Yandex_S3-FF0000?style=for-the-badge&logo=yandex&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

</div>

Серверная часть цифровой платформы для любителей вязания. Обеспечивает работу API, управление контентом и надежное хранение медиафайлов.

## Функционал
- **REST API:** предоставление структурированных данных для клиентского приложения (Next.js).
- **Панель администратора:** удобный интерфейс CMS для создания, редактирования и модерации контента.
- **Интеграция с S3:** автоматическая выгрузка и надежное хранение изображений в Yandex Object Storage.
- **Управление доступом:** настройка ролей, прав пользователей и безопасная JWT-авторизация.
- **База данных:** реляционная база данных для упорядоченного хранения информации о мастер-классах и пользователях.

## Технологический стек

- **Core:** Strapi 5 (Headless CMS).
- **Database:** SQLite.
- **Storage:** Yandex Object Storage (S3-совместимое облачное хранилище).
- **Infrastructure:** Docker, Docker Compose, Nginx.

## Настройка окружения
Создайте файл `.env` в корне проекта. Для корректной работы Strapi и S3 плагина добавьте следующие переменные:
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=ваши_app_keys
API_TOKEN_SALT=ваш_api_token_salt
ADMIN_JWT_SECRET=ваш_admin_jwt_secret
TRANSFER_TOKEN_SALT=ваш_transfer_token_salt
ENCRYPTION_KEY=ваш_encryption_key

# Настройки S3 (Yandex Cloud)
AWS_ACCESS_KEY_ID=ваш_key_id
AWS_ACCESS_SECRET=ваш_secret
AWS_REGION=eu-central-1
AWS_BUCKET=название_вашего_бакета
AWS_ENDPOINT=https://endpoint
```
*(Подсказка: базовые ключи для локального запуска генерируются автоматически при инициализации проекта Strapi).*

## Локальный запуск
Этот репозиторий отвечает только за серверную часть и API. Для отображения пользовательского интерфейса вам также понадобится запустить клиентскую часть.

- Репозиторий Frontend: [knitting-next](https://github.com/LenkaDEA/knitting-next)

### Запуск проекта
1. Клонируйте репозиторий и перейдите в директорию проекта:
```bash
git clone https://github.com/LenkaDEA/knitting-backend.git
cd knitting-backend
```
2. Установите зависимости удобным для вас пакетным менеджером:
```bash
npm install
# или
yarn install
```
3. Запустите сервер в режиме разработки:
```bash
npm run dev
# или
yarn dev
```
4. Откройте панель администратора: управление контентом будет доступно по адресу http://localhost:1337/admin.

## Лицензия
Этот проект распространяется под лицензией [MIT](https://opensource.org/licenses/MIT).