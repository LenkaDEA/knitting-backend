import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  /* Replace 'strapi::security', with this snippet */
      /* Beginning of snippet */
      {
        name: 'strapi::security',
        config: {
          contentSecurityPolicy: {
            useDefaults: true,
            directives: {
              'connect-src': ["'self'", 'https:'],
              'img-src': [
                "'self'",
                'data:',
                'blob:',
                'storage.yandexcloud.net',
                'knitting-s3.storage.yandexcloud.net',
              ],
              'media-src': [
                "'self'",
                'data:',
                'blob:',
                'storage.yandexcloud.net',
                'knitting-s3.storage.yandexcloud.net',
              ],
              upgradeInsecureRequests: null,
            },
          },
        },
      },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
