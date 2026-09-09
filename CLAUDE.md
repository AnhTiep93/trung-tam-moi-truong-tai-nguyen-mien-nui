# CLAUDE.md

Tài liệu định hướng cho dự án **website quảng bá dịch vụ của Trung tâm Môi trường Tài nguyên miền núi** — Trường Đại học Nông Lâm, Đại học Thái Nguyên.

Nguồn tham khảo trong repo:
- `anh tham khao.png` — mẫu style tham khảo (site wellness "Hương Nhung"): bố cục editorial, nhiều khoảng trắng, tiêu đề serif có từ nhấn in nghiêng, một màu điểm nhấn duy nhất, header mảnh, footer nhiều cột.
- `New Tài liệu DOCX.docx` — brief nội dung gốc của Trung tâm (sitemap đầy đủ, các lĩnh vực, dịch vụ, mô hình nội dung).

---

## 1. Hiện trạng — đọc trước khi làm

- Dự án **bắt đầu lại từ đầu**. Repo có lịch sử git của một hướng cũ (Next.js + Strapi + WebGIS) đã bị bỏ, và một hướng "1 trang tĩnh" cũng đã bị bỏ. **Không khôi phục code cũ** trừ khi người dùng yêu cầu rõ.
- Hướng hiện tại đã chốt với người dùng:
  - **Website nhiều trang** (multi-page), không phải 1 trang cuộn.
  - **HTML/CSS/JS tĩnh thuần** — không framework, không build tool, không CMS, không database.
  - **Tông sáng, editorial tối giản** — mượn bố cục & typography của ảnh tham khảo nhưng đổi sang nền sáng, phù hợp một cơ quan khoa học (không dùng nền tối kiểu spa).
- Ngôn ngữ: **chỉ tiếng Việt** ở giai đoạn này. Chưa làm song ngữ.

**Quy tắc khi làm việc trong repo:**
- Không tự ý thêm framework / build step / package manager / dependency npm. Nếu thấy cần, **hỏi người dùng trước**.
- Thư viện bên thứ ba: chỉ khi thật sự cần (ví dụ bản đồ), và nạp qua `<script>`/`<link>` từ CDN, không qua bundler.
- Sửa nội dung trực tiếp trong file `.html` tương ứng.
- Giữ mọi trang dùng chung một `header` và `footer` (xem mục 5).

---

## 2. Mục tiêu & đối tượng

Website là **kênh quảng bá dịch vụ và năng lực** của Trung tâm, đồng thời là hồ sơ giới thiệu chính thức. Thứ tự ưu tiên nội dung:

1. **Dịch vụ** Trung tâm cung cấp (tư vấn tài nguyên đất, môi trường, GIS – đo đạc – bản đồ, UAV/LiDAR, quy hoạch, carbon).
2. **Lĩnh vực hoạt động & năng lực chuyên môn**.
3. **Đề tài – dự án – sản phẩm khoa học** tiêu biểu (làm bằng chứng uy tín).
4. Giới thiệu đơn vị, đội ngũ, đối tác, liên hệ.

Đối tượng: tỉnh/huyện/xã và sở ngành, doanh nghiệp, đối tác nghiên cứu trong và ngoài nước, cán bộ/sinh viên nhà trường.

Slogan chính:

> **Khoa học – Công nghệ – Tài nguyên – Môi trường vì phát triển bền vững miền núi**

---

## 3. Công nghệ & chạy dự án

- HTML5 ngữ nghĩa + CSS thuần (một file `assets/css/styles.css`, dùng CSS custom properties) + một file `assets/js/main.js`.
- Không có bước build. Deploy = copy thư mục lên host tĩnh.
- **Chạy local:** cần một static server để `fetch()` partial header/footer hoạt động (không mở bằng `file://`):
  ```
  python -m http.server 5173
  ```
  hoặc extension "Live Server" của VS Code.
- **Deploy:** GitHub Pages / Netlify / Cloudflare Pages / hosting sẵn có của trường. Không cần cấu hình đặc biệt; đặt `index.html` ở gốc.
- Hỗ trợ trình duyệt: 2 phiên bản gần nhất của Chrome/Edge/Firefox/Safari. Không cần hỗ trợ IE.

---

## 4. Cấu trúc thư mục

```
/
├── index.html                 # Trang chủ
├── gioi-thieu.html
├── linh-vuc.html
├── dich-vu.html
├── nghien-cuu.html            # Đề tài, dự án, công bố, sản phẩm KH
├── doi-ngu.html
├── dao-tao.html
├── tin-tuc.html
├── hop-tac.html
├── thu-vien.html
├── webgis.html                # Hiện là trang giới thiệu/placeholder, chưa nhúng bản đồ thật
├── lien-he.html
├── partials/
│   ├── header.html            # Nạp vào mọi trang qua main.js
│   └── footer.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/                   # ảnh nội dung, đặt tên kebab-case
├── anh tham khao.png          # tài liệu tham khảo, không deploy
├── New Tài liệu DOCX.docx     # tài liệu tham khảo, không deploy
├── CLAUDE.md
└── README.md
```

- Tên file trang: **kebab-case, tiếng Việt không dấu**, phẳng ở gốc (dễ cho GitHub Pages).
- Mỗi trang là một file HTML hoàn chỉnh, tự chứa `<head>`, dẫn tới `assets/css/styles.css` và `assets/js/main.js`.

### Header/footer dùng chung

Vì không có build tool, tránh copy-paste lệch nhau bằng cách để `<header>` và `<footer>` trong `partials/`, rồi trong mỗi trang chỉ đặt:

```html
<div data-include="partials/header.html"></div>
...
<div data-include="partials/footer.html"></div>
```

`main.js` tìm mọi phần tử `[data-include]`, `fetch` file và chèn nội dung, sau đó gắn lại các sự kiện (menu mobile, đánh dấu link trang hiện tại theo `location.pathname`).

---

## 5. Sitemap & điều hướng

Menu chính (giữ gọn — gộp bớt so với brief gốc):

| Menu | Trang | Ghi chú nội dung |
|---|---|---|
| Trang chủ | `index.html` | Hero + slogan, giới thiệu ngắn, lĩnh vực nổi bật, dịch vụ, dự án tiêu biểu, đối tác, CTA liên hệ |
| Giới thiệu | `gioi-thieu.html` | Giới thiệu chung, lịch sử (timeline), chức năng–nhiệm vụ, tầm nhìn–sứ mệnh, cơ cấu tổ chức |
| Lĩnh vực | `linh-vuc.html` | 8 nhóm: Tài nguyên rừng, Tài nguyên đất, Môi trường, GIS–Viễn thám, Quy hoạch & phát triển miền núi, Nông nghiệp & tài nguyên, Biến đổi khí hậu, Chuyển đổi số TN–MT |
| Dịch vụ | `dich-vu.html` | **Trọng tâm.** Nhóm dịch vụ + mô tả + "quy trình làm việc" + CTA yêu cầu tư vấn |
| Nghiên cứu | `nghien-cuu.html` | Đề tài (theo cấp), dự án, công bố khoa học, sản phẩm khoa học |
| Đội ngũ | `doi-ngu.html` | Ban Giám đốc, nhà khoa học, nghiên cứu viên, cộng tác viên — thẻ ảnh + học hàm/vị + chuyên môn |
| Đào tạo | `dao-tao.html` | Khóa GIS, viễn thám, LiDAR, UAV, môi trường, quản lý tài nguyên, tập huấn cán bộ địa phương |
| Tin tức | `tin-tuc.html` | Danh sách tin hoạt động, hội thảo, thực địa, hợp tác, tuyển dụng, thông báo |
| Hợp tác | `hop-tac.html` | Đối tác trong nước / quốc tế — logo + tên + nội dung hợp tác |
| Thư viện | `thu-vien.html` | Tài liệu, văn bản pháp luật, tiêu chuẩn, báo cáo — danh sách + link tải |
| WebGIS | `webgis.html` | Giới thiệu năng lực WebGIS + placeholder bản đồ. Nhúng bản đồ thật là việc sau. |
| Liên hệ | `lien-he.html` | Địa chỉ, điện thoại, email, Google Maps, Fanpage, Zalo, form liên hệ |

- "Hình ảnh – Video" trong brief gốc: gộp vào từng trang (Tin tức, Nghiên cứu) thay vì làm menu riêng, trừ khi người dùng muốn.
- Form liên hệ: chưa có backend. Dùng `mailto:` hoặc dịch vụ form tĩnh (Formspree/Netlify Forms) — **hỏi người dùng** trước khi chọn.

---

## 6. Hệ thống thiết kế

Nguyên tắc: **tối giản, nhiều khoảng trắng, một màu điểm nhấn, phân cấp bằng typography chứ không bằng màu**. Lấy nhịp bố cục và cách dùng serif của ảnh tham khảo, bỏ nền tối.

### Màu (đặt trong `:root`)

```css
--bg:            #FBFAF7;  /* nền kem ấm */
--surface:       #FFFFFF;  /* thẻ, vùng nổi */
--ink:           #1A1D1B;  /* chữ chính */
--ink-soft:      #55605A;  /* chữ phụ, mô tả */
--line:          #E5E2D9;  /* đường kẻ, viền */
--primary:       #1F5C3D;  /* xanh rừng đậm — link, nút, tiêu đề mục */
--primary-hover: #17462F;
--accent:        #B07D2B;  /* vàng đồng trầm — CHỈ dùng cho từ nhấn in nghiêng, gạch chân nhỏ, eyebrow. Dùng tiết chế. */
```

- Không thêm màu thứ 3. Trạng thái (hover, active) làm bằng đổi độ đậm/nền nhạt, không đổi hue.
- Nếu sau này cần dark mode: định nghĩa lại các token trên trong `@media (prefers-color-scheme: dark)` — chưa làm bây giờ.

### Typography

- **Tiêu đề (display):** `Lora`, serif — dùng cho `h1`–`h3`. Từ khoá nhấn để **in nghiêng** (`<em>`) đúng tinh thần ảnh tham khảo ("Nghệ thuật *đánh thức*...").
- **Nội dung & UI:** `Be Vietnam Pro`, sans-serif.
- Nạp từ Google Fonts với subset `vietnamese` (kiểm tra dấu tiếng Việt hiển thị đủ). Luôn có fallback: `Lora, "Times New Roman", serif` và `"Be Vietnam Pro", system-ui, sans-serif`.
- Cỡ chữ fluid bằng `clamp()`. Body ~ `1.0625rem`, line-height `1.7`. Tiêu đề line-height `1.15`.
- `h1` chỉ 1 lần/trang. Không bỏ cấp heading.

### Bố cục & khoảng cách

- Container: `max-width: 1180px; margin-inline: auto; padding-inline: clamp(1.25rem, 5vw, 3rem);`
- Khoảng cách dọc giữa các section: `padding-block: clamp(4rem, 10vw, 8rem);`
- Thang spacing gốc 4px (0.25rem). Dùng bội số.
- Đường kẻ mảnh 1px màu `--line` để ngăn khối, thay cho đổ bóng nặng. Bóng (nếu có) rất nhẹ.
- Responsive: mobile-first, breakpoint chính `768px` và `1024px`. Không tràn ngang; bảng/khối rộng cho `overflow-x: auto`.

### Component quy ước (class trong `styles.css`)

- `.eyebrow` — nhãn nhỏ chữ hoa, `letter-spacing`, màu `--accent`, đứng trên tiêu đề section.
- `.btn` + `.btn--primary` (nền `--primary`) / `.btn--ghost` (viền, nền trong suốt).
- `.card` — nền `--surface`, viền `--line`, bo góc nhẹ (`8px`).
- `.section-head` — cụm eyebrow + h2 + đoạn dẫn (`.lead`).
- `.lead` — đoạn mở đầu cỡ lớn hơn, màu `--ink-soft`.
- `.grid` — layout lưới responsive dùng `repeat(auto-fit, minmax(...))`.
- `.breadcrumb` — trên các trang con.
- `.stat` — con số + nhãn, cho phần "Thành tựu".

### Ảnh & icon

- Ảnh nội dung: đặt trong `assets/img/`, luôn có `alt` tiếng Việt có nghĩa, khai báo `width`/`height` hoặc `aspect-ratio`, dùng `loading="lazy"` cho ảnh dưới màn hình đầu.
- Icon: dùng SVG inline đơn giản (nét mảnh, một màu) — không nạp icon font.
- Chưa có ảnh thật: dùng khối placeholder màu `--line` có nhãn, **không** chèn ảnh stock ngẫu nhiên.

### Truy cập được (a11y)

- Tương phản chữ/nền đạt WCAG AA.
- Mọi phần tử tương tác focus thấy rõ (`:focus-visible`).
- Menu mobile: nút có `aria-expanded`, đóng được bằng phím `Esc`.
- Link "bỏ qua tới nội dung" đầu trang.

---

## 7. Quy ước code

- HTML: thụt 2 space, thẻ ngữ nghĩa (`header/nav/main/section/article/footer`), một `<main>` mỗi trang.
- CSS: một file, sắp xếp theo thứ tự: tokens → reset → base → layout → components → utilities → responsive. Đặt tên class kiểu BEM nhẹ (`block__element--modifier`). Không dùng `!important` trừ utility.
- JS: vanilla ES6+, không phụ thuộc ngoài. Bọc trong module/IIFE, `defer` khi nạp. Chức năng tối thiểu: include partial, menu mobile, đánh dấu link hiện tại, năm động trong footer, (tùy chọn) cuộn mượt tới anchor.
- Không inline `style=` trừ trường hợp thật đặc biệt. Không JS trong thuộc tính `onclick`.
- Tiếng Việt trong nội dung; comment code có thể tiếng Việt.
- Trước khi tạo class/biến mới, kiểm tra `styles.css` xem đã có cái tái dùng được chưa.

---

## 8. Nội dung & dữ liệu

- **Mọi thông tin liên hệ, số liệu, tên đề tài/dự án, tên cán bộ hiện tại đều là DEMO** cho tới khi Trung tâm cung cấp bản chính thức. Đánh dấu rõ vùng demo (comment HTML `<!-- DEMO: cần dữ liệu thật -->`).
- Không bịa tên người thật, số điện thoại, email, kết quả dự án.
- Thông tin đơn vị cần lấy chính thức: tên tiếng Anh & viết tắt, địa chỉ, điện thoại, email, website, cơ cấu tổ chức, danh sách nhân sự, danh mục đề tài/dự án, logo đối tác.

---

## 9. Quyết định & việc chưa quyết định

### Đã chốt (2026-09)

- **Form liên hệ: Formspree** (miễn phí, không backend). `lien-he.html` đã đặt sẵn `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">` + honeypot `_gotcha`. Cần tạo tài khoản Formspree bằng email chính thức của Trung tâm rồi thay `YOUR_FORM_ID`.
- **Host: GitHub Pages.** Bật Pages cho nhánh, thư mục gốc `/`. Có file `.nojekyll` ở gốc để tắt xử lý Jekyll. Mọi đường dẫn trong HTML là tương đối — không thêm dấu `/` đầu.
- **Song ngữ Việt–Anh: LÀM SAU**, khi Trung tâm cấp nội dung chính thức (giờ toàn nội dung DEMO, dịch bây giờ sẽ phải làm lại). Cách dự kiến khi làm: thư mục `/en/` chứa bản sao đầy đủ + nút chuyển ngôn ngữ ở `partials/header.html`. Chưa thêm nút "EN" chết vào header.
- **WebGIS: dùng Leaflet** (nạp CSS/JS từ CDN) — đơn giản, nhiều tài liệu và plugin hơn MapLibre GL. Chưa nhúng; `webgis.html` hiện là trang giới thiệu năng lực + danh sách lớp. Nhúng bản đồ thật + nguồn dữ liệu lớp là việc sau.
- **Lĩnh vực & dịch vụ: một trang + mục neo (anchor)**, chưa tách trang con cho từng mục. `linh-vuc.html` và `dich-vu.html` có `.anchor-nav` dẫn tới các `<article class="field-block" id="...">`.

### Chưa quyết

- Bộ nhận diện: logo, mã màu chính thức của Trung tâm/Trường (nếu có, sẽ thay `--primary`).
- Nội dung "Hình ảnh – Video" có cần trang riêng không (hiện gộp vào Tin tức / Nghiên cứu).

---

## 10. Định hướng dài hạn (tham khảo — CHƯA làm)

Brief gốc định vị website thành 4 lớp: giới thiệu đơn vị + cổng thông tin khoa học (đề tài/dự án/công bố) + nền tảng dịch vụ tư vấn + WebGIS tài nguyên miền núi tương tác.

Khi lượng nội dung lớn tới mức quản lý tay không nổi, cân nhắc (theo thứ tự nhẹ → nặng): chuyển sang Astro (vẫn ra HTML tĩnh, có component/layout) → thêm CMS headless → khôi phục hướng Next.js + Strapi + PostGIS trong lịch sử git. **Không làm sớm.**

Mô hình nội dung tham khảo cho tương lai: Person, Project, Publication, Service, News, Partner, Document, MediaAlbum, Equipment, GISLayer.
