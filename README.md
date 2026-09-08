# Website Trung tâm Môi trường Tài nguyên miền núi

Website tĩnh đơn giản — thuần HTML/CSS/JS, không cần cài đặt hay build gì cả.

Xem định hướng nội dung gốc tại [CLAUDE.md](./CLAUDE.md).

## Cấu trúc

- `index.html` — toàn bộ nội dung trang (một trang, cuộn xuống các mục)
- `styles.css` — giao diện
- `script.js` — menu mobile + năm hiện tại ở footer

## Cách xem

Mở trực tiếp file `index.html` bằng trình duyệt (double-click), hoặc chạy 1 static server nếu muốn có URL local:

```bash
npx http-server -p 8080
```

rồi vào `http://localhost:8080`.

## Cách chỉnh sửa nội dung

Không có CMS hay database — sửa trực tiếp trong `index.html` bằng trình soạn thảo văn bản bất kỳ (VS Code, Notepad...). Mỗi mục nội dung nằm trong 1 thẻ `<section>` riêng, có `id` rõ ràng (`about`, `fields`, `services`, `contact`) để dễ tìm.

## Cách đưa lên mạng (hosting)

Vì là file tĩnh nên có thể host ở bất kỳ đâu, miễn phí:
- **GitHub Pages** — đẩy repo lên GitHub, bật Pages trong Settings.
- **Netlify / Vercel** — kéo-thả cả thư mục vào trang deploy của họ.
- **Hosting/cPanel bất kỳ** — upload 3 file lên thư mục `public_html` hoặc `www`.

## Trạng thái hiện tại

Nội dung đang là **dữ liệu minh hoạ** (đánh dấu "demo" ở phần liên hệ) — cần thay bằng thông tin chính thức của Trung tâm trước khi công bố. Trước đó dự án từng thử hướng đi phức tạp hơn (Next.js + Strapi CMS + WebGIS); toàn bộ vẫn còn trong lịch sử git nếu sau này muốn quay lại.
