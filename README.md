# Website Trung tâm Môi trường Tài nguyên miền núi

Xem định hướng, sitemap và mô hình nội dung tại [CLAUDE.md](./CLAUDE.md).

## Cấu trúc dự án

- `web/` — Frontend Next.js (App Router, TypeScript, Tailwind CSS, i18n vi/en)
- `cms/` — Backend Strapi (headless CMS quản trị nội dung: nhân sự, đề tài/dự án, dịch vụ, tin tức, đối tác...)

## Chạy dự án ở local

### 1. CMS (Strapi)

```bash
cd cms
npm install
npm run develop
```

- Trang quản trị: http://localhost:1337/admin (lần đầu vào sẽ được yêu cầu tạo tài khoản admin)
- API công khai: http://localhost:1337/api/...

Nạp dữ liệu mẫu (đúng chuyên ngành, dùng để dựng giao diện trước khi có nội dung thật):

```bash
npm run seed
```

> CSDL mặc định dùng SQLite cho local (`cms/.tmp/data.db`, không commit vào git). Khi triển khai thật, đổi sang PostgreSQL qua biến môi trường `DATABASE_CLIENT=postgres` trong `cms/.env` (xem `cms/.env.example`).

### 2. Frontend (Next.js)

```bash
cd web
npm install
npm run dev
```

Truy cập http://localhost:3000 (tự chuyển hướng sang `/vi`).

## Trạng thái hiện tại

Đang ở **Giai đoạn 0 — Khởi tạo nền tảng** theo kế hoạch xây dựng (design tokens, i18n, content types CMS, dữ liệu mẫu). Xem chi tiết các giai đoạn tiếp theo (MVP, mở rộng nội dung, WebGIS) trong lịch sử trao đổi hoặc yêu cầu Claude nhắc lại kế hoạch.
