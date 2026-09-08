import type { Core } from '@strapi/strapi';

// FRONTEND_URL: domain thật của trang web (ví dụ https://cemr.edu.vn) — dùng để
// giới hạn CORS ở production thay vì cho phép mọi origin như mặc định dev.
const frontendUrl = process.env.FRONTEND_URL;
// strapi::cors chỉ chấp nhận mảng string hoặc undefined (undefined = cho phép mọi origin).
const corsOrigin = frontendUrl ? [frontendUrl] : undefined;

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', frontendUrl].filter(Boolean),
          'media-src': ["'self'", 'data:', 'blob:', frontendUrl].filter(Boolean),
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: corsOrigin,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
