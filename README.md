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

## Triển khai production (VPS tự quản, Docker)

Repo có sẵn `docker-compose.yml` orchestrate 4 service: `postgres` (PostGIS), `cms` (Strapi), `web` (Next.js), `caddy` (reverse proxy, tự xin HTTPS Let's Encrypt).

**Yêu cầu trên VPS:** Docker + Docker Compose plugin đã cài, 2 domain đã trỏ DNS (A record) về IP của VPS — 1 cho web, 1 cho CMS (ví dụ `example.com` và `cms.example.com`).

```bash
git clone <repo-url> && cd "THAY TUAN"
cp .env.production.example .env
# Sửa .env: domain thật, sinh secrets mới (KHÔNG dùng secrets dev), SMTP nếu có

docker compose up -d --build
```

- Web: `https://<SITE_DOMAIN>`
- CMS admin: `https://<CMS_DOMAIN>/admin`

**Lưu ý quan trọng:**
- Sinh `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` **mới** cho production bằng `openssl rand -base64 32` (không tái sử dụng secrets ở `cms/.env` local).
- Sau khi lên production, vào `/admin` tạo tài khoản admin, chạy seed nếu muốn có dữ liệu mẫu (`docker compose exec cms npm run seed`), rồi **xoá dữ liệu demo** trước khi nhập nội dung thật.
- Ảnh/file upload được lưu ở Docker volume `cms_uploads` — nên có kế hoạch backup định kỳ (cùng với volume `postgres_data`).
- Đây là cấu hình do Claude viết dựa trên tài liệu chính thức, **chưa được test thật trên VPS** (môi trường phát triển này không có Docker) — nên chạy thử trên 1 VPS staging trước khi trỏ domain thật.

## Trạng thái hiện tại

Đã hoàn thành 4 giai đoạn theo kế hoạch: nền tảng (i18n, design tokens, CMS), MVP (các trang chính), mở rộng nội dung (thư viện, hình ảnh/video, đào tạo, SEO, tìm kiếm), và WebGIS (bản đồ tương tác, dữ liệu GeoJSON minh hoạ). Toàn bộ nội dung hiện tại là **dữ liệu mẫu demo** — cần Trung tâm cung cấp nội dung chính thức trước khi ra mắt thật.
