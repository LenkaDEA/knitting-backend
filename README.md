# ![Logo](https://raw.githubusercontent.com/LenkaDEA/knitting-next/main/.github/assets/mainLogo.svg) Knitting Backend

<p align="center">
  <b>English</b> • <a href="README.ru.md">Русский</a>
</p>

<div align="center">

![Strapi](https://img.shields.io/badge/Strapi_5-2F2E8B?style=for-the-badge&logo=strapi&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Yandex Cloud](https://img.shields.io/badge/Yandex_S3-FF0000?style=for-the-badge&logo=yandex&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

</div>

The backend service for the knitting digital platform. It provides the REST API, content management capabilities, and secure media storage.

## Features
- **REST API:** Delivering structured data to the client application (Next.js).
- **Admin Panel:** User-friendly CMS interface for creating, editing, and moderating content.
- **S3 Integration:** Automatic image uploads and secure storage in Yandex Object Storage.
- **Access Management:** Configurable roles, user permissions, and secure JWT authentication.
- **Database:** Relational database for organized storage of tutorials, patterns, and user data.

## Tech Stack

- **Core:** Strapi 5 (Headless CMS).
- **Database:** SQLite.
- **Storage:** Yandex Object Storage (S3-compatible cloud storage).
- **Infrastructure:** Docker, Docker Compose, Nginx.

## Environment Setup
Create a `.env` file in the root of the project. To ensure Strapi and the S3 plugin function correctly, add the following variables:
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
ENCRYPTION_KEY=your_encryption_key

# S3 Settings (Yandex Cloud)
AWS_ACCESS_KEY_ID=your_key_id
AWS_ACCESS_SECRET=your_secret
AWS_REGION=eu-central-1
AWS_BUCKET=your_bucket_name
AWS_ENDPOINT=https://endpoint_url
```

*(Tip: Base keys for local development are automatically generated during Strapi project initialization).*

## Local Development
This repository handles only the server-side API. To display the user interface, you will also need to run the frontend application.

- Frontend Repository: [knitting-next](https://github.com/LenkaDEA/knitting-next)

### Running the Project
1. Clone the repository and navigate to the project directory:
```bash
git clone https://github.com/LenkaDEA/knitting-backend.git
cd knitting-backend
```
2. Install dependencies using your preferred package manager:
```bash
npm install
# or
yarn install
```
3. Start the server in development mode:
```bash
npm run dev
# or
yarn dev
```
4. Open the Admin Panel: Content management is available at http://localhost:1337/admin.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).