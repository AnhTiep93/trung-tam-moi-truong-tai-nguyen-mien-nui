# CLAUDE.md

Tài liệu định hướng cho dự án website **Trung tâm Môi trường Tài nguyên miền núi** — Trường Đại học Nông Lâm, Đại học Thái Nguyên.

## Hiện trạng (đọc mục này trước)

Dự án hiện tại là **1 website tĩnh đơn giản**: `index.html` + `styles.css` + `script.js`, không framework, không build tool, không CMS, không database. Đây là quyết định có chủ đích của người dùng sau khi thấy hướng đầy đủ (Next.js + Strapi + WebGIS...) quá phức tạp so với nhu cầu trước mắt.

**Khi làm việc trong repo này:**
- Sửa nội dung trực tiếp trong `index.html`.
- Không tự ý thêm framework/build step/dependency trừ khi người dùng yêu cầu rõ.
- Phần "Định hướng dài hạn" bên dưới là tầm nhìn gốc của Trung tâm — giữ lại để tham khảo khi thực sự cần mở rộng, **không phải việc cần làm ngay**.

## Định hướng thiết kế (đang áp dụng)

- Phong cách hiện đại, chuyên nghiệp, khoa học — không màu mè.
- Bảng màu: xanh rừng (`#1f6d45`) làm chủ đạo, xanh dương (`#1d6fa5`) phụ, cam đất (`#d9822b`) làm điểm nhấn/CTA, nền trung tính.
- Responsive, có menu mobile.
- Hiện tại chỉ tiếng Việt — chưa làm song ngữ (có thể thêm sau nếu cần, xem mục "chưa quyết định" bên dưới).

## Slogan

"Khoa học – Công nghệ – Tài nguyên – Môi trường vì phát triển bền vững miền núi"

## Việc chưa quyết định

- Nội dung trong `index.html` hiện là **dữ liệu minh hoạ** (đánh dấu "demo" ở phần liên hệ) — cần thông tin chính thức (địa chỉ, điện thoại, email thật) từ Trung tâm trước khi công bố.
- Nơi host trang tĩnh (GitHub Pages / Netlify / hosting sẵn có) — xem gợi ý trong README.md.
- Có làm song ngữ Việt/Anh không, và có cần thêm trang con (không chỉ 1 trang) không.

---

## Định hướng dài hạn (tầm nhìn gốc — CHƯA triển khai, chỉ để tham khảo)

Tài liệu gốc của Trung tâm đề xuất định vị website thành 4 lớp: giới thiệu đơn vị, cổng thông tin khoa học (đề tài/dự án/công bố), nền tảng dịch vụ tư vấn, và WebGIS tương tác. Đối tượng: cán bộ/sinh viên, tỉnh/huyện/xã, doanh nghiệp, đối tác quốc tế.

Nếu sau này quay lại hướng đầy đủ, đã từng thử nghiệm với **Next.js + Strapi CMS + PostgreSQL/PostGIS + MapLibre GL (WebGIS)** — toàn bộ code vẫn còn trong lịch sử git (trước commit xoá `web/` và `cms/`), có thể khôi phục bằng `git log` để tìm lại.

<details>
<summary>Sơ đồ menu / sitemap đầy đủ (tham khảo)</summary>

```
TRANG CHỦ
GIỚI THIỆU (chung, lịch sử, chức năng-nhiệm vụ, tầm nhìn-sứ mệnh, cơ cấu tổ chức)
ĐỘI NGŨ (Ban Giám đốc, Nhà khoa học, Nghiên cứu viên, Cộng tác viên)
LĨNH VỰC (8 nhóm: Tài nguyên rừng, Tài nguyên đất, Môi trường, GIS-Viễn thám,
          Quy hoạch, Nông nghiệp-tài nguyên, Biến đổi khí hậu, Chuyển đổi số)
NGHIÊN CỨU (Đề tài, Dự án, Công bố khoa học, Sản phẩm khoa học)
DỊCH VỤ (GIS-WebGIS, Đo đạc-bản đồ, Tài nguyên đất, Môi trường, Quy hoạch, Carbon)
WEBGIS
ĐÀO TẠO
TIN TỨC – SỰ KIỆN
HỢP TÁC (trong nước / quốc tế)
THƯ VIỆN
HÌNH ẢNH – VIDEO
LIÊN HỆ
```
</details>

<details>
<summary>Mô hình nội dung tham khảo (nếu sau này làm lại CMS)</summary>

Person, Project, Publication, Service, News, Partner, Document, Media Album, Equipment, GIS Layer — chi tiết từng trường dữ liệu xem trong lịch sử git ở các commit trước khi `web/`/`cms/` bị xoá.
</details>
