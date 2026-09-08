import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedTypes = [
  'image/svg+xml',
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: {
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes,
      },
    },
  },
  email: {
    config: {
      // Chưa cấu hình SMTP thật thì dùng "sendmail" mặc định của Strapi (sẽ lỗi êm,
      // không chặn request) — set các biến SMTP_* trong .env để gửi email thật.
      provider: env('SMTP_HOST') ? 'nodemailer' : 'sendmail',
      providerOptions: env('SMTP_HOST')
        ? {
            host: env('SMTP_HOST'),
            port: env.int('SMTP_PORT', 587),
            auth: {
              user: env('SMTP_USERNAME'),
              pass: env('SMTP_PASSWORD'),
            },
          }
        : undefined,
      settings: {
        defaultFrom: env('EMAIL_FROM', 'no-reply@cemr.local'),
        defaultReplyTo: env('EMAIL_FROM', 'no-reply@cemr.local'),
      },
    },
  },
});

export default config;
