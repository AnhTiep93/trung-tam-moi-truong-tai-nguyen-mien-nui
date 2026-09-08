import type { FieldSlug, ServiceGroup } from "./types";

export interface FieldDefinition {
  slug: FieldSlug;
  icon: string;
  title: { vi: string; en: string };
  summary: { vi: string; en: string };
  activities: { vi: string[]; en: string[] };
  relatedServiceGroup?: ServiceGroup;
}

export const fields: FieldDefinition[] = [
  {
    slug: "tai-nguyen-rung",
    icon: "🌳",
    title: { vi: "Tài nguyên rừng", en: "Forest resources" },
    summary: {
      vi: "Điều tra, theo dõi diễn biến và bảo tồn tài nguyên rừng miền núi.",
      en: "Surveying, monitoring, and conserving mountain forest resources.",
    },
    activities: {
      vi: [
        "Điều tra tài nguyên rừng",
        "Theo dõi diễn biến rừng",
        "GIS và viễn thám",
        "Carbon rừng",
        "Tín chỉ carbon REDD+",
        "Đa dạng sinh học",
      ],
      en: [
        "Forest resource surveys",
        "Forest change monitoring",
        "GIS and remote sensing",
        "Forest carbon",
        "REDD+ carbon credits",
        "Biodiversity",
      ],
    },
  },
  {
    slug: "tai-nguyen-dat",
    relatedServiceGroup: "tai-nguyen-dat",
    icon: "🌱",
    title: { vi: "Tài nguyên đất", en: "Land resources" },
    summary: {
      vi: "Điều tra, đánh giá và quy hoạch sử dụng đất bền vững.",
      en: "Surveying, evaluating, and planning sustainable land use.",
    },
    activities: {
      vi: [
        "Điều tra đất",
        "Đánh giá đất đai",
        "Quy hoạch sử dụng đất",
        "Thống kê, kiểm kê đất đai",
        "Cơ sở dữ liệu đất đai",
        "Đánh giá thích hợp đất đai",
      ],
      en: [
        "Soil surveys",
        "Land evaluation",
        "Land use planning",
        "Land statistics and inventory",
        "Land databases",
        "Land suitability assessment",
      ],
    },
  },
  {
    slug: "moi-truong",
    relatedServiceGroup: "moi-truong",
    icon: "🌎",
    title: { vi: "Môi trường", en: "Environment" },
    summary: {
      vi: "Quan trắc, đánh giá tác động và phục hồi môi trường.",
      en: "Monitoring, impact assessment, and environmental restoration.",
    },
    activities: {
      vi: [
        "Quan trắc môi trường",
        "Đánh giá tác động môi trường",
        "Quản lý chất thải",
        "Ô nhiễm đất, nước",
        "Phục hồi môi trường",
        "Biến đổi khí hậu",
      ],
      en: [
        "Environmental monitoring",
        "Environmental impact assessment",
        "Waste management",
        "Soil and water pollution",
        "Environmental restoration",
        "Climate change",
      ],
    },
  },
  {
    slug: "gis-vien-tham",
    relatedServiceGroup: "gis-webgis",
    icon: "🗺️",
    title: { vi: "GIS – Viễn thám", en: "GIS – Remote sensing" },
    summary: {
      vi: "Thế mạnh nổi bật của Trung tâm: GIS, viễn thám, UAV, LiDAR, WebGIS.",
      en: "A key strength of the Center: GIS, remote sensing, UAV, LiDAR, WebGIS.",
    },
    activities: {
      vi: [
        "GIS",
        "Remote Sensing",
        "UAV/Drone",
        "LiDAR",
        "WebGIS",
        "Xây dựng cơ sở dữ liệu không gian",
        "Bản đồ số",
        "Phân tích không gian",
        "AI trong GIS",
      ],
      en: [
        "GIS",
        "Remote sensing",
        "UAV/Drone",
        "LiDAR",
        "WebGIS",
        "Spatial database development",
        "Digital mapping",
        "Spatial analysis",
        "AI in GIS",
      ],
    },
  },
  {
    slug: "quy-hoach",
    relatedServiceGroup: "quy-hoach",
    icon: "🏘️",
    title: {
      vi: "Quy hoạch và phát triển miền núi",
      en: "Mountain planning and development",
    },
    summary: {
      vi: "Quy hoạch xây dựng, sử dụng đất và phát triển kinh tế - xã hội miền núi.",
      en: "Construction and land-use planning, and mountain socio-economic development.",
    },
    activities: {
      vi: [
        "Quy hoạch xây dựng",
        "Quy hoạch sử dụng đất",
        "Quy hoạch nông thôn",
        "Quy hoạch xã",
        "Quy hoạch vùng",
        "Phát triển kinh tế – xã hội miền núi",
        "Phát triển nông nghiệp bền vững",
      ],
      en: [
        "Construction planning",
        "Land-use planning",
        "Rural planning",
        "Commune planning",
        "Regional planning",
        "Mountain socio-economic development",
        "Sustainable agriculture development",
      ],
    },
  },
  {
    slug: "nong-nghiep-tai-nguyen",
    icon: "🌾",
    title: {
      vi: "Nông nghiệp và tài nguyên",
      en: "Agriculture and resources",
    },
    summary: {
      vi: "Nông nghiệp công nghệ cao, chính xác và phát triển chuỗi giá trị nông sản.",
      en: "High-tech, precision agriculture and agricultural value-chain development.",
    },
    activities: {
      vi: [
        "Nông nghiệp công nghệ cao",
        "Nông nghiệp chính xác",
        "Đánh giá đất",
        "Cây trồng phù hợp",
        "Phát triển sản phẩm địa phương",
        "Chuỗi giá trị nông sản",
      ],
      en: [
        "High-tech agriculture",
        "Precision agriculture",
        "Soil evaluation",
        "Suitable crops",
        "Local product development",
        "Agricultural value chains",
      ],
    },
  },
  {
    slug: "bien-doi-khi-hau",
    relatedServiceGroup: "carbon",
    icon: "☁️",
    title: { vi: "Biến đổi khí hậu", en: "Climate change" },
    summary: {
      vi: "Giám sát, đánh giá rủi ro và thích ứng với biến đổi khí hậu.",
      en: "Monitoring, risk assessment, and climate change adaptation.",
    },
    activities: {
      vi: [
        "Giám sát biến đổi khí hậu",
        "Đánh giá rủi ro thiên tai",
        "Thích ứng biến đổi khí hậu",
        "Giảm phát thải",
        "Carbon nông nghiệp",
        "Carbon rừng",
      ],
      en: [
        "Climate change monitoring",
        "Disaster risk assessment",
        "Climate change adaptation",
        "Emission reduction",
        "Agricultural carbon",
        "Forest carbon",
      ],
    },
  },
  {
    slug: "chuyen-doi-so",
    icon: "💻",
    title: {
      vi: "Chuyển đổi số tài nguyên môi trường",
      en: "Digital transformation for resources & environment",
    },
    summary: {
      vi: "Cơ sở dữ liệu, WebGIS Dashboard và hệ thống hỗ trợ ra quyết định.",
      en: "Databases, WebGIS dashboards, and decision-support systems.",
    },
    activities: {
      vi: [
        "Cơ sở dữ liệu tài nguyên",
        "WebGIS Dashboard",
        "Bản đồ trực tuyến",
        "Số hóa dữ liệu",
        "AI và Big Data",
        "Hệ thống hỗ trợ ra quyết định",
      ],
      en: [
        "Resource databases",
        "WebGIS dashboard",
        "Online maps",
        "Data digitization",
        "AI and Big Data",
        "Decision-support systems",
      ],
    },
  },
];

export function getField(slug: string) {
  return fields.find((field) => field.slug === slug) ?? null;
}
