# Website Trung tâm Môi trường Tài nguyên miền núi

Trường Đại học Nông Lâm – Đại học Thái Nguyên.

Website tĩnh nhiều trang: HTML + CSS + JavaScript thuần, không framework, không build tool.
Định hướng dự án xem trong [CLAUDE.md](CLAUDE.md).

## Cấu trúc

```
index.html                 Trang chủ
gioi-thieu / linh-vuc / dich-vu / nghien-cuu / doi-ngu /
dao-tao / tin-tuc / hop-tac / thu-vien / webgis / lien-he .html   (đã có bố cục + nội dung DEMO)
partials/header.html       Header dùng chung (nạp bằng JS)
partials/footer.html       Footer dùng chung (nạp bằng JS)
assets/css/styles.css      Toàn bộ giao diện
assets/js/main.js          Nạp partial + menu + tiện ích
assets/img/                Ảnh nội dung
```

## Chạy ở máy local

Header/footer được nạp bằng `fetch()` nên **phải chạy qua HTTP server**, không mở trực tiếp bằng `file://`.

```bash
# tại thư mục gốc dự án
python -m http.server 5173
```

Mở http://localhost:5173/ — hoặc dùng extension **Live Server** của VS Code.

## Triển khai

**Đã chốt: GitHub Pages.** Bật Pages cho nhánh, thư mục gốc `/`. File `.nojekyll` ở gốc để tắt xử lý Jekyll. Deploy = push, không cần lệnh build.

Các lựa chọn khác vẫn dùng được: Netlify / Cloudflare Pages (kéo thả hoặc kết nối repo), hoặc hosting của trường (FTP).

## Biểu mẫu liên hệ

`lien-he.html` dùng **Formspree** (miễn phí, không backend). Cần:

1. Tạo tài khoản tại https://formspree.io bằng email chính thức của Trung tâm.
2. Tạo một form, lấy endpoint dạng `https://formspree.io/f/xxxxxxxx`.
3. Thay `YOUR_FORM_ID` trong `lien-he.html` bằng mã đó.

## Ghi chú nội dung

Thông tin liên hệ, số liệu, tên đề tài/dự án hiện tại là **dữ liệu minh hoạ (DEMO)**, đánh dấu bằng comment `<!-- DEMO -->` trong HTML. Cần thay bằng thông tin chính thức của Trung tâm trước khi công bố.
