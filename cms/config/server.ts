import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Bắt buộc đặt đúng khi chạy sau reverse proxy (Caddy/Nginx) ở production,
  // để Strapi sinh URL media (ảnh, file) đúng domain public thay vì localhost.
  url: env('PUBLIC_URL', undefined),
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
