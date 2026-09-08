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

## Triển khai production (PaaS — không cần quản lý server)

Cách này phù hợp nếu bạn **không dùng VPS**: web lên **Vercel**, CMS + database lên **Railway** hoặc **Render**. Cả hai đều là PaaS (deploy bằng git, không phải tự cài OS/Docker/Nginx).

### 1. CMS + Database (Railway hoặc Render)

Cả hai đều làm theo pattern giống nhau:

1. Tạo project mới, chọn "Deploy from GitHub repo", trỏ **root/source directory vào `cms/`** (repo đã có sẵn `cms/Dockerfile` để nền tảng build tự động nhận ra và dùng).
2. Thêm 1 service **PostgreSQL** (add-on/plugin có sẵn của Railway/Render — bản miễn phí/mặc định là Postgres thường, **không có PostGIS**, nhưng không sao vì hiện tại lớp GIS đang lưu dạng JSON trong Strapi, chưa cần PostGIS thật). Railway cấp sẵn 1 biến `DATABASE_URL` — map thẳng biến đó vào service CMS là đủ, không cần tách từng field host/port/user/password.
3. Đặt `DATABASE_CLIENT=postgres`, `DATABASE_SSL=true`, và **`DATABASE_SSL_REJECT_UNAUTHORIZED=false`** — Postgres managed của Railway/Render dùng chứng chỉ SSL tự ký, để `true` (mặc định) sẽ báo lỗi kết nối.
4. Khai báo các biến còn lại (xem đầy đủ trong `.env.production.example`): `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` (sinh mới bằng `openssl rand -base64 32`, một số nền tảng như Render có nút "Generate" tự sinh), `PUBLIC_URL` (domain CMS mà nền tảng cấp, ví dụ `https://cemr-cms.up.railway.app`), `FRONTEND_URL` (domain Vercel ở bước 2), và SMTP nếu có.
5. Deploy xong, vào `<domain-cms>/admin` tạo tài khoản admin.

> **Lưu ý dung lượng ảnh/file:** Railway/Render ở gói miễn phí/rẻ thường **không có ổ đĩa lưu trữ bền vững** (ephemeral storage) — file upload qua Strapi Media Library có thể mất khi service khởi động lại. Nếu cần dùng ảnh/file thật, nên cấu hình Strapi Upload provider ra dịch vụ ngoài (Cloudinary, AWS S3, Backblaze B2...) thay vì lưu local — đây là việc cần làm thêm khi có nội dung thật, hiện chưa cấu hình.

### 2. Frontend (Vercel)

1. Import repo vào Vercel, đặt **root directory = `web/`**.
2. Khai báo biến môi trường trong Vercel dashboard: `NEXT_PUBLIC_STRAPI_URL` và `STRAPI_URL` (= domain CMS ở bước 1), `NEXT_PUBLIC_SITE_URL` (= domain Vercel cấp, hoặc domain riêng nếu gắn custom domain).
3. Vercel tự nhận diện Next.js, không cần Dockerfile (file `web/Dockerfile` chỉ dùng cho phương án VPS bên dưới, Vercel bỏ qua).

Sau khi cả 2 lên, quay lại Railway/Render cập nhật `FRONTEND_URL` = domain Vercel thật (để CORS hoạt động đúng), rồi redeploy CMS.

### Có thể chọn cả 2 phương án song song

`.env.production.example` và các thay đổi cấu hình (`cms/config/server.ts`, `cms/config/middlewares.ts`) dùng chung cho cả 2 cách deploy — không có gì xung đột nếu sau này bạn đổi ý sang tự quản VPS.

## Triển khai production — phương án thay thế (VPS tự quản, Docker)

Chỉ cần nếu sau này bạn có VPS riêng và muốn tự quản hạ tầng thay vì dùng PaaS ở trên. Repo có sẵn `docker-compose.yml` orchestrate 4 service: `postgres` (PostGIS), `cms` (Strapi), `web` (Next.js), `caddy` (reverse proxy, tự xin HTTPS Let's Encrypt).

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
