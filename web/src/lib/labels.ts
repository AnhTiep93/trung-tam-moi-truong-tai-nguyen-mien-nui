type LabelMap = Record<string, { vi: string; en: string }>;

export const personGroupLabels: LabelMap = {
  "ban-giam-doc": { vi: "Ban Giám đốc", en: "Board of Directors" },
  "nha-khoa-hoc": { vi: "Nhà khoa học", en: "Scientists" },
  "nghien-cuu-vien": { vi: "Nghiên cứu viên", en: "Researchers" },
  "ky-thuat-vien": { vi: "Kỹ thuật viên", en: "Technicians" },
  "cong-tac-vien": { vi: "Cộng tác viên", en: "Collaborators" },
};

export const projectLevelLabels: LabelMap = {
  "nha-nuoc": { vi: "Cấp Nhà nước", en: "National level" },
  bo: { vi: "Cấp Bộ", en: "Ministry level" },
  tinh: { vi: "Cấp tỉnh", en: "Provincial level" },
  "dai-hoc": { vi: "Cấp Đại học", en: "University level" },
  "quoc-te": { vi: "Dự án quốc tế", en: "International project" },
  "doanh-nghiep": { vi: "Hợp tác doanh nghiệp", en: "Business cooperation" },
};

export const publicationTypeLabels: LabelMap = {
  "bai-bao": { vi: "Bài báo khoa học", en: "Journal article" },
  sach: { vi: "Sách", en: "Book" },
  "giao-trinh": { vi: "Giáo trình", en: "Textbook" },
  "bao-cao": { vi: "Báo cáo", en: "Report" },
  "ban-do": { vi: "Bản đồ", en: "Map" },
  "co-so-du-lieu": { vi: "Cơ sở dữ liệu", en: "Database" },
  "phan-mem": { vi: "Phần mềm", en: "Software" },
  "sang-che": { vi: "Sáng chế / GPHI", en: "Patent / utility solution" },
};

export const serviceGroupLabels: LabelMap = {
  "gis-webgis": { vi: "GIS – WebGIS", en: "GIS – WebGIS" },
  "do-dac-ban-do": { vi: "Đo đạc – bản đồ", en: "Surveying – mapping" },
  "tai-nguyen-dat": { vi: "Tài nguyên đất", en: "Land resources" },
  "moi-truong": { vi: "Môi trường", en: "Environment" },
  "quy-hoach": { vi: "Quy hoạch", en: "Planning" },
  carbon: { vi: "Carbon", en: "Carbon" },
};

export const newsCategoryLabels: LabelMap = {
  "hoat-dong-trung-tam": { vi: "Hoạt động Trung tâm", en: "Center activities" },
  "nghien-cuu-khoa-hoc": { vi: "Nghiên cứu khoa học", en: "Scientific research" },
  "hoi-thao": { vi: "Hội thảo", en: "Workshop" },
  "dao-tao": { vi: "Đào tạo", en: "Training" },
  "chuyen-giao-cong-nghe": { vi: "Chuyển giao công nghệ", en: "Technology transfer" },
  "hop-tac-quoc-te": { vi: "Hợp tác quốc tế", en: "International cooperation" },
  "thuc-dia": { vi: "Hoạt động thực địa", en: "Field activities" },
  "tuyen-dung": { vi: "Tuyển dụng", en: "Recruitment" },
  "thong-bao": { vi: "Thông báo", en: "Announcement" },
};

export const documentCategoryLabels: LabelMap = {
  "van-ban-phap-luat": { vi: "Văn bản pháp luật", en: "Legal documents" },
  "tieu-chuan-quy-chuan": { vi: "Tiêu chuẩn – quy chuẩn", en: "Standards & regulations" },
  "tai-lieu-gis": { vi: "Tài liệu GIS", en: "GIS documents" },
  "tai-lieu-moi-truong": { vi: "Tài liệu môi trường", en: "Environment documents" },
  "tai-lieu-dat-dai": { vi: "Tài liệu đất đai", en: "Land documents" },
  "tai-lieu-quy-hoach": { vi: "Tài liệu quy hoạch", en: "Planning documents" },
  "bao-cao-nghien-cuu": { vi: "Báo cáo nghiên cứu", en: "Research reports" },
};

export const equipmentTypeLabels: LabelMap = {
  "phong-lab": { vi: "Phòng / Lab", en: "Room / Lab" },
  "thiet-bi": { vi: "Thiết bị", en: "Equipment" },
};

export const gisLayerCategoryLabels: LabelMap = {
  "ranh-gioi-hanh-chinh": { vi: "Ranh giới hành chính", en: "Administrative boundary" },
  rung: { vi: "Rừng", en: "Forest" },
  dat: { vi: "Đất", en: "Land" },
  "song-suoi": { vi: "Sông suối", en: "Rivers & streams" },
  "giao-thong": { vi: "Giao thông", en: "Transportation" },
  "hien-trang-su-dung-dat": { vi: "Hiện trạng sử dụng đất", en: "Current land use" },
  "quy-hoach": { vi: "Quy hoạch", en: "Planning" },
  "moi-truong": { vi: "Môi trường", en: "Environment" },
  "khi-hau": { vi: "Khí hậu", en: "Climate" },
  "thien-tai": { vi: "Thiên tai", en: "Natural hazards" },
};

export const mediaAlbumCategoryLabels: LabelMap = {
  "khao-sat-thuc-dia": { vi: "Khảo sát thực địa", en: "Field surveys" },
  "hoi-thao": { vi: "Hội thảo", en: "Workshops" },
  "nghien-cuu": { vi: "Nghiên cứu", en: "Research" },
  "dao-tao": { vi: "Đào tạo", en: "Training" },
  "lam-viec-dia-phuong": { vi: "Làm việc với địa phương", en: "Local engagement" },
  "hop-tac-quoc-te": { vi: "Hợp tác quốc tế", en: "International cooperation" },
};

export const partnerTypeLabels: LabelMap = {
  "trong-nuoc": { vi: "Đối tác trong nước", en: "Domestic partner" },
  "quoc-te": { vi: "Đối tác quốc tế", en: "International partner" },
};

export function getLabel(
  map: LabelMap,
  key: string | null | undefined,
  locale: string
): string {
  if (!key) return "";
  const entry = map[key];
  if (!entry) return key;
  return locale === "en" ? entry.en : entry.vi;
}
