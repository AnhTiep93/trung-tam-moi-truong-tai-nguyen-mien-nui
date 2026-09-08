export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiItemResponse<T> {
  data: T;
}

export type PersonGroup =
  | "ban-giam-doc"
  | "nha-khoa-hoc"
  | "nghien-cuu-vien"
  | "ky-thuat-vien"
  | "cong-tac-vien";

export interface Person {
  id: number;
  documentId: string;
  fullName: string;
  slug: string | null;
  academicTitle: string | null;
  position: string | null;
  group: PersonGroup;
  photo: StrapiMedia | null;
  specialization: string | null;
  researchFields: string | null;
  bio: string | null;
  email: string | null;
  orcid: string | null;
  googleScholar: string | null;
  order: number;
}

export type ProjectLevel =
  | "nha-nuoc"
  | "bo"
  | "tinh"
  | "dai-hoc"
  | "quoc-te"
  | "doanh-nghiep";

export type FieldSlug =
  | "tai-nguyen-rung"
  | "tai-nguyen-dat"
  | "moi-truong"
  | "gis-vien-tham"
  | "quy-hoach"
  | "nong-nghiep-tai-nguyen"
  | "bien-doi-khi-hau"
  | "chuyen-doi-so";

export interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  level: ProjectLevel;
  field: FieldSlug | null;
  leadResearcher: string | null;
  hostInstitution: string | null;
  partnerInstitutions: string | null;
  startDate: string | null;
  endDate: string | null;
  budget: string | null;
  location: string | null;
  objective: string | null;
  result: string | null;
  coverImage: StrapiMedia | null;
}

export type PublicationType =
  | "bai-bao"
  | "sach"
  | "giao-trinh"
  | "bao-cao"
  | "ban-do"
  | "co-so-du-lieu"
  | "phan-mem"
  | "sang-che";

export interface Publication {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  type: PublicationType;
  authors: string | null;
  year: number | null;
  summary: string | null;
  externalLink: string | null;
}

export type ServiceGroup =
  | "gis-webgis"
  | "do-dac-ban-do"
  | "tai-nguyen-dat"
  | "moi-truong"
  | "quy-hoach"
  | "carbon";

export interface Service {
  id: number;
  documentId: string;
  name: string;
  slug: string | null;
  group: ServiceGroup;
  summary: string | null;
  description: string | null;
  order: number;
}

export type NewsCategory =
  | "hoat-dong-trung-tam"
  | "nghien-cuu-khoa-hoc"
  | "hoi-thao"
  | "dao-tao"
  | "chuyen-giao-cong-nghe"
  | "hop-tac-quoc-te"
  | "thuc-dia"
  | "tuyen-dung"
  | "thong-bao";

export interface NewsItem {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  category: NewsCategory;
  publishedDate: string | null;
  summary: string | null;
  content: string | null;
  coverImage: StrapiMedia | null;
}

export type PartnerType = "trong-nuoc" | "quoc-te";

export interface Partner {
  id: number;
  documentId: string;
  name: string;
  type: PartnerType;
  logo: StrapiMedia | null;
  cooperationContent: string | null;
  website: string | null;
  order: number;
}

export type DocumentCategory =
  | "van-ban-phap-luat"
  | "tieu-chuan-quy-chuan"
  | "tai-lieu-gis"
  | "tai-lieu-moi-truong"
  | "tai-lieu-dat-dai"
  | "tai-lieu-quy-hoach"
  | "bao-cao-nghien-cuu";

export interface LibraryDocument {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  category: DocumentCategory;
  summary: string | null;
  file: StrapiMedia | null;
  publishedDate: string | null;
}

export type MediaAlbumCategory =
  | "khao-sat-thuc-dia"
  | "hoi-thao"
  | "nghien-cuu"
  | "dao-tao"
  | "lam-viec-dia-phuong"
  | "hop-tac-quoc-te";

export interface MediaAlbum {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  category: MediaAlbumCategory;
  coverImage: StrapiMedia | null;
  images: StrapiMedia[] | null;
  videoUrl: string | null;
  publishedDate: string | null;
}

export interface TrainingCourse {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  summary: string | null;
  description: string | null;
  duration: string | null;
  schedule: string | null;
  location: string | null;
  registrationOpen: boolean;
  coverImage: StrapiMedia | null;
}

export type GisLayerCategory =
  | "ranh-gioi-hanh-chinh"
  | "rung"
  | "dat"
  | "song-suoi"
  | "giao-thong"
  | "hien-trang-su-dung-dat"
  | "quy-hoach"
  | "moi-truong"
  | "khi-hau"
  | "thien-tai";

export interface GisLayer {
  id: number;
  documentId: string;
  name: string;
  slug: string | null;
  category: GisLayerCategory;
  description: string | null;
  color: string;
  fillOpacity: number;
  defaultVisible: boolean;
  order: number;
  geojson: GeoJSON.FeatureCollection;
}

export type EquipmentType = "phong-lab" | "thiet-bi";

export interface Equipment {
  id: number;
  documentId: string;
  name: string;
  slug: string | null;
  type: EquipmentType;
  specifications: string | null;
  function: string | null;
  image: StrapiMedia | null;
  order: number;
}
