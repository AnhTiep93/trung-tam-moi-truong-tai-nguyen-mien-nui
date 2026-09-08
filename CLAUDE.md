# CLAUDE.md

Tài liệu định hướng cho dự án website **Trung tâm Môi trường Tài nguyên miền núi** — Trường Đại học Nông Lâm, Đại học Thái Nguyên. File này giúp Claude Code (và bất kỳ ai tham gia dự án) hiểu mục tiêu, cấu trúc và quy ước kỹ thuật khi làm việc trong repo.

## 1. Tổng quan dự án

Đây **không phải** một website giới thiệu đơn thuần, mà cần định vị thành 4 lớp giá trị:

1. **Website Trung tâm** — giới thiệu chính thức, xây dựng uy tín, hình ảnh chuyên nghiệp.
2. **Cổng thông tin khoa học** — đề tài, dự án, công bố khoa học, sản phẩm nghiên cứu.
3. **Nền tảng dịch vụ tư vấn** — GIS, đo đạc, tài nguyên đất, môi trường, quy hoạch, carbon.
4. **WebGIS tài nguyên miền núi** — bản đồ tương tác, có thể trở thành sản phẩm đặc trưng của Trung tâm.

Đối tượng người dùng: cán bộ/sinh viên nhà trường, các tỉnh/huyện/xã, doanh nghiệp cần tư vấn, đối tác quốc tế (Nhật Bản, Đài Loan, Hàn Quốc...).

**Slogan gợi ý:** "Khoa học – Công nghệ – Tài nguyên – Môi trường vì phát triển bền vững miền núi"

## 2. Định hướng thiết kế

- Phong cách **hiện đại, chuyên nghiệp, khoa học** — không màu mè, ưu tiên rõ ràng và đáng tin cậy (tương tự website viện nghiên cứu/đại học quốc tế).
- Bảng màu gợi ý: xanh lá/xanh rừng + xanh dương (đất/nước/môi trường) làm màu chủ đạo, trung tính (trắng/xám) làm nền, 1 màu nhấn (cam/vàng đất) cho CTA.
- Ưu tiên hình ảnh/video thực địa, bản đồ, biểu đồ dữ liệu — tránh ảnh stock chung chung.
- Responsive-first, tốc độ tải nhanh (nhiều nội dung + bản đồ nên cần lazy-load, tối ưu ảnh).
- Hỗ trợ đa ngôn ngữ **Tiếng Việt / English** (đối tác quốc tế là đối tượng quan trọng) — nên thiết kế i18n ngay từ đầu, không patch sau.
- Accessibility cơ bản (contrast, alt text, keyboard nav) vì đây là website đơn vị nhà nước/giáo dục.

## 3. Tech stack (đã chọn)

- **Framework:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS
- **CMS nội dung:** Headless CMS (Strapi hoặc Sanity) để cán bộ Trung tâm tự cập nhật tin tức, đội ngũ, đề tài/dự án mà không cần sửa code
- **Database:** PostgreSQL + **PostGIS** (bắt buộc để lưu dữ liệu không gian cho WebGIS: ranh giới hành chính, rừng, đất, quy hoạch...)
- **WebGIS:** Leaflet hoặc MapLibre GL JS ở frontend; GeoServer hoặc tự expose GeoJSON/vector tile từ PostGIS ở backend
- **Auth/Admin:** dùng auth của CMS cho quản trị nội dung; cân nhắc role riêng cho "quản trị viên" vs "cán bộ nhập liệu"
- **Hosting:** Vercel (frontend) + server riêng/VPS cho PostGIS + GeoServer nếu cần

> Đây là lựa chọn ban đầu, có thể điều chỉnh khi có ràng buộc hạ tầng thực tế (ví dụ trường có hosting riêng, cần WordPress migration...). Khi đổi stack, cập nhật lại mục này.

## 4. Sơ đồ menu / Sitemap

```
TRANG CHỦ
GIỚI THIỆU
├── Giới thiệu chung (tên VN/EN/viết tắt, đơn vị trực thuộc, địa chỉ, liên hệ)
├── Lịch sử phát triển (dạng timeline)
├── Chức năng – nhiệm vụ
├── Tầm nhìn – sứ mệnh
└── Cơ cấu tổ chức (sơ đồ: Ban Giám đốc → phòng/bộ phận → nhóm nghiên cứu)
ĐỘI NGŨ
├── Ban Giám đốc
├── Nhà khoa học
├── Nghiên cứu viên
└── Cộng tác viên
LĨNH VỰC (8 nhóm)
├── Tài nguyên rừng
├── Tài nguyên đất
├── Môi trường
├── GIS – Viễn thám
├── Quy hoạch và phát triển miền núi
├── Nông nghiệp và tài nguyên
├── Biến đổi khí hậu
└── Chuyển đổi số tài nguyên môi trường
NGHIÊN CỨU
├── Đề tài (cấp Nhà nước / Bộ / tỉnh / Đại học)
├── Dự án (quốc tế / hợp tác doanh nghiệp)
├── Công bố khoa học
└── Sản phẩm khoa học (bài báo, sách, giáo trình, báo cáo, bản đồ, CSDL, phần mềm, sáng chế)
DỊCH VỤ
├── GIS – WebGIS
├── Đo đạc – bản đồ (GNSS, RTK, UAV, LiDAR)
├── Tài nguyên đất
├── Môi trường
├── Quy hoạch
└── Carbon (kiểm kê phát thải, tín chỉ carbon)
WEBGIS (bản đồ tương tác tài nguyên miền núi)
ĐÀO TẠO (khóa học GIS/viễn thám/LiDAR/UAV, có thể đăng ký online)
TIN TỨC – SỰ KIỆN
HỢP TÁC (đối tác trong nước / quốc tế)
THƯ VIỆN (tài liệu, văn bản pháp luật, tiêu chuẩn — tìm kiếm/xem/tải)
HÌNH ẢNH – VIDEO
LIÊN HỆ
```

## 5. Mô hình nội dung (content models) chính

Khi dựng CMS/schema, các entity cốt lõi cần có:

- **Person (Nhân sự):** ảnh, họ tên, học hàm/học vị, chức vụ, nhóm (Ban Giám đốc/Nhà khoa học/NCV/CTV), chuyên môn, lĩnh vực nghiên cứu, email, ORCID/Google Scholar, danh sách đề tài/bài báo liên kết.
- **Project (Đề tài/Dự án):** tên, cấp (Nhà nước/Bộ/tỉnh/Đại học/quốc tế/doanh nghiệp), chủ nhiệm, thời gian, cơ quan chủ trì, đơn vị phối hợp, kinh phí, địa bàn, mục tiêu, kết quả, hình ảnh, sản phẩm/dữ liệu đính kèm.
- **Publication (Sản phẩm khoa học):** loại (bài báo/sách/giáo trình/báo cáo/bản đồ/CSDL/phần mềm/sáng chế), tác giả, năm, link/file.
- **Service (Dịch vụ):** nhóm dịch vụ, mô tả, form yêu cầu tư vấn.
- **News (Tin tức – sự kiện):** loại (hoạt động/NCKH/hội thảo/đào tạo/hợp tác/thực địa/tuyển dụng/thông báo), ảnh/video, ngày đăng.
- **Partner (Đối tác):** logo, tên, loại (trong nước/quốc tế), nội dung hợp tác.
- **Document (Thư viện):** loại tài liệu, file, từ khóa tìm kiếm.
- **Media (Ảnh/Video):** album theo chủ đề (khảo sát, hội thảo, đào tạo...).
- **Equipment (Thiết bị/CSVC):** phòng/lab, tên thiết bị, ảnh, thông số, chức năng, dịch vụ liên quan.
- **GIS Layer (lớp bản đồ):** loại (ranh giới hành chính, địa hình, đất, rừng, sông suối, giao thông, hiện trạng SDĐ, quy hoạch, môi trường, khí hậu, thiên tai) — lưu ở PostGIS, expose qua API dạng GeoJSON/vector tile, frontend cho phép bật/tắt từng lớp.

## 6. Quy ước phát triển

- Ưu tiên component tái sử dụng cho các khối lặp lại: card nhân sự, card dự án, card tin tức, card dịch vụ — vì 8 lĩnh vực + nhiều loại đề tài dùng chung layout.
- Toàn bộ nội dung tiếng Việt có dấu — đảm bảo encoding UTF-8 xuyên suốt (DB, API, frontend).
- Route/slug nên đặt theo tiếng Anh không dấu (ví dụ `/linh-vuc/tai-nguyen-rung` hoặc `/fields/forest-resources` tùy quyết định i18n), nội dung hiển thị bằng tiếng Việt/Anh theo ngôn ngữ đang chọn.
- Dữ liệu không gian (GeoJSON, shapefile) không commit trực tiếp vào git nếu dung lượng lớn — lưu ở PostGIS hoặc object storage, chỉ commit script/migration.
- Khi thêm lớp bản đồ mới trong WebGIS, cập nhật cả: bảng PostGIS, API endpoint, và control bật/tắt layer ở frontend.
- Form liên hệ / đăng ký khóa học / yêu cầu tư vấn cần validate input và chống spam (rate limit hoặc captcha) trước khi gửi vào hệ thống.

## 7. Việc chưa quyết định / cần hỏi lại người dùng khi phát sinh

- CMS cụ thể (Strapi vs Sanity vs tự viết) — chọn khi bắt đầu code phần backend.
- Hạ tầng hosting cho PostGIS/GeoServer (VPS riêng, cloud, hay dùng server sẵn có của trường).
- Phạm vi WebGIS giai đoạn 1 (bao nhiêu lớp dữ liệu, có tích hợp UAV/LiDAR ngay không) — nên làm MVP với vài lớp cơ bản trước.
- Ngôn ngữ hiển thị mặc định và cách tổ chức URL đa ngôn ngữ.
