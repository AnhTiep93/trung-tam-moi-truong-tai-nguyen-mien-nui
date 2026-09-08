/**
 * Seed dữ liệu mẫu (demo, đúng chuyên ngành) để kiểm tra API và dựng giao diện
 * trước khi Trung tâm cung cấp nội dung chính thức.
 *
 * Chạy: npm run seed
 */
import { compileStrapi, createStrapi } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function seed() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'error';

  await seedPeople(app);
  await seedProjects(app);
  await seedServices(app);
  await seedNews(app);
  await seedPartners(app);
  await seedDocuments(app);
  await seedMediaAlbums(app);
  await seedTrainingCourses(app);
  await seedGisLayers(app);
  await seedEquipment(app);

  console.log('Seed hoàn tất.');
  await app.destroy();
  process.exit(0);
}

async function seedIfEmpty(
  app: Core.Strapi,
  uid:
    | 'api::person.person'
    | 'api::project.project'
    | 'api::service.service'
    | 'api::news-item.news-item'
    | 'api::partner.partner'
    | 'api::document.document'
    | 'api::media-album.media-album'
    | 'api::training-course.training-course'
    | 'api::gis-layer.gis-layer'
    | 'api::equipment.equipment',
  items: Record<string, unknown>[],
  slugSourceField?: string
) {
  const existingCount = await app.documents(uid).count({});
  if (existingCount > 0) {
    console.log(`Bỏ qua ${uid} (đã có ${existingCount} bản ghi).`);
    return;
  }

  for (const item of items) {
    const data = { ...item };
    if (slugSourceField && !data.slug && typeof data[slugSourceField] === 'string') {
      data.slug = slugify(data[slugSourceField] as string);
    }
    await app.documents(uid).create({ data, locale: 'vi', status: 'published' });
  }
  console.log(`Đã tạo ${items.length} bản ghi cho ${uid}.`);
}

async function seedPeople(app: Core.Strapi) {
  await seedIfEmpty(app, 'api::person.person', [
    {
      fullName: 'PGS.TS. Nguyễn Văn An',
      academicTitle: 'Phó Giáo sư, Tiến sĩ',
      position: 'Giám đốc Trung tâm',
      group: 'ban-giam-doc',
      specialization: 'Quản lý tài nguyên đất, quy hoạch sử dụng đất',
      researchFields: 'Đánh giá đất đai, quy hoạch sử dụng đất miền núi',
      email: 'nguyenvanan.demo@tuaf.edu.vn',
      order: 1,
    },
    {
      fullName: 'TS. Trần Thị Bình',
      academicTitle: 'Tiến sĩ',
      position: 'Phó Giám đốc Trung tâm',
      group: 'ban-giam-doc',
      specialization: 'GIS và Viễn thám',
      researchFields: 'Ứng dụng GIS trong quản lý tài nguyên rừng',
      email: 'tranthibinh.demo@tuaf.edu.vn',
      order: 2,
    },
    {
      fullName: 'ThS. Lê Văn Cường',
      academicTitle: 'Thạc sĩ',
      position: 'Nghiên cứu viên',
      group: 'nha-khoa-hoc',
      specialization: 'Môi trường và biến đổi khí hậu',
      researchFields: 'Quan trắc môi trường, đánh giá tác động môi trường',
      email: 'levancuong.demo@tuaf.edu.vn',
      order: 3,
    },
    {
      fullName: 'ThS. Phạm Thị Dung',
      academicTitle: 'Thạc sĩ',
      position: 'Nghiên cứu viên',
      group: 'nghien-cuu-vien',
      specialization: 'Đo đạc bản đồ, UAV/LiDAR',
      researchFields: 'Khảo sát địa hình, xây dựng cơ sở dữ liệu không gian',
      email: 'phamthidung.demo@tuaf.edu.vn',
      order: 4,
    },
  ], 'fullName');
}

async function seedProjects(app: Core.Strapi) {
  await seedIfEmpty(app, 'api::project.project', [
    {
      title: 'Điều tra, đánh giá thoái hóa đất phục vụ quy hoạch sử dụng đất bền vững vùng miền núi phía Bắc',
      level: 'bo',
      field: 'tai-nguyen-dat',
      leadResearcher: 'PGS.TS. Nguyễn Văn An',
      hostInstitution: 'Trường Đại học Nông Lâm, Đại học Thái Nguyên',
      location: 'Các tỉnh miền núi phía Bắc',
      objective: 'Đánh giá hiện trạng thoái hóa đất và đề xuất giải pháp sử dụng đất bền vững.',
      result: 'Bộ bản đồ thoái hóa đất và báo cáo đề xuất quy hoạch (dữ liệu minh hoạ).',
    },
    {
      title: 'Ứng dụng GIS và viễn thám giám sát diễn biến rừng tỉnh Thái Nguyên',
      level: 'tinh',
      field: 'tai-nguyen-rung',
      leadResearcher: 'TS. Trần Thị Bình',
      hostInstitution: 'Trường Đại học Nông Lâm, Đại học Thái Nguyên',
      location: 'Tỉnh Thái Nguyên',
      objective: 'Xây dựng hệ thống giám sát diễn biến rừng bằng ảnh viễn thám đa thời gian.',
      result: 'Hệ thống bản đồ diễn biến rừng cập nhật hàng năm (dữ liệu minh hoạ).',
    },
    {
      title: 'Đánh giá phát thải và tiềm năng tín chỉ carbon rừng trồng',
      level: 'nha-nuoc',
      field: 'bien-doi-khi-hau',
      leadResearcher: 'ThS. Lê Văn Cường',
      hostInstitution: 'Trường Đại học Nông Lâm, Đại học Thái Nguyên',
      location: 'Khu vực trung du miền núi phía Bắc',
      objective: 'Xác định trữ lượng carbon rừng trồng và khả năng tham gia thị trường tín chỉ carbon.',
      result: 'Báo cáo trữ lượng carbon và hướng dẫn kỹ thuật đo đếm (dữ liệu minh hoạ).',
    },
    {
      title: 'Hợp tác nghiên cứu quản lý tài nguyên nước lưu vực miền núi',
      level: 'quoc-te',
      field: 'moi-truong',
      leadResearcher: 'TS. Trần Thị Bình',
      hostInstitution: 'Trường Đại học Nông Lâm, Đại học Thái Nguyên',
      partnerInstitutions: 'Đối tác quốc tế (demo)',
      location: 'Lưu vực sông miền núi phía Bắc',
      objective: 'Xây dựng mô hình quản lý tổng hợp tài nguyên nước có sự tham gia của cộng đồng.',
      result: 'Đang triển khai (dữ liệu minh hoạ).',
    },
  ], 'title');
}

async function seedServices(app: Core.Strapi) {
  await seedIfEmpty(app, 'api::service.service', [
    {
      name: 'Tư vấn, điều tra và đánh giá tài nguyên đất',
      group: 'tai-nguyen-dat',
      summary: 'Điều tra, đánh giá đất đai, quy hoạch và kiểm kê sử dụng đất.',
      order: 1,
    },
    {
      name: 'Dịch vụ GIS – WebGIS',
      group: 'gis-webgis',
      summary: 'Xây dựng bản đồ, cơ sở dữ liệu GIS, WebGIS và phân tích không gian.',
      order: 2,
    },
    {
      name: 'Khảo sát địa hình UAV/LiDAR/GNSS RTK',
      group: 'do-dac-ban-do',
      summary: 'Đo đạc, khảo sát địa hình bằng UAV, LiDAR và GNSS RTK.',
      order: 3,
    },
    {
      name: 'Tư vấn kiểm kê và tín chỉ carbon',
      group: 'carbon',
      summary: 'Kiểm kê phát thải, tính toán và giám sát carbon rừng, carbon nông nghiệp.',
      order: 4,
    },
  ], 'name');
}

async function seedNews(app: Core.Strapi) {
  const today = new Date().toISOString().slice(0, 10);
  await seedIfEmpty(app, 'api::news-item.news-item', [
    {
      title: 'Hội thảo khoa học "Ứng dụng GIS trong quản lý tài nguyên miền núi" (demo)',
      category: 'hoi-thao',
      publishedDate: today,
      summary: 'Trung tâm tổ chức hội thảo khoa học chia sẻ kết quả nghiên cứu ứng dụng GIS.',
    },
    {
      title: 'Ký kết hợp tác nghiên cứu với đối tác quốc tế (demo)',
      category: 'hop-tac-quoc-te',
      publishedDate: today,
      summary: 'Trung tâm mở rộng hợp tác nghiên cứu quốc tế trong lĩnh vực tài nguyên và môi trường.',
    },
    {
      title: 'Khai giảng khóa đào tạo GIS và viễn thám cho cán bộ địa phương (demo)',
      category: 'dao-tao',
      publishedDate: today,
      summary: 'Khóa đào tạo trang bị kỹ năng GIS – viễn thám cho cán bộ quản lý tài nguyên tại địa phương.',
    },
  ], 'title');
}

async function seedPartners(app: Core.Strapi) {
  await seedIfEmpty(app, 'api::partner.partner', [
    {
      name: 'Sở Tài nguyên và Môi trường tỉnh Thái Nguyên (demo)',
      type: 'trong-nuoc',
      cooperationContent: 'Hợp tác điều tra, đánh giá tài nguyên đất và môi trường.',
      order: 1,
    },
    {
      name: 'Viện nghiên cứu quốc tế (demo)',
      type: 'quoc-te',
      cooperationContent: 'Hợp tác nghiên cứu và trao đổi khoa học.',
      order: 2,
    },
    {
      name: 'Doanh nghiệp công nghệ GIS (demo)',
      type: 'trong-nuoc',
      cooperationContent: 'Hợp tác chuyển giao công nghệ WebGIS.',
      order: 3,
    },
  ]);
}

async function seedDocuments(app: Core.Strapi) {
  const today = new Date().toISOString().slice(0, 10);
  await seedIfEmpty(
    app,
    'api::document.document',
    [
      {
        title: 'Luật Đất đai (văn bản hợp nhất, demo)',
        category: 'van-ban-phap-luat',
        summary: 'Văn bản pháp luật liên quan đến quản lý và sử dụng đất đai.',
        publishedDate: today,
      },
      {
        title: 'Quy chuẩn kỹ thuật quốc gia về quan trắc môi trường (demo)',
        category: 'tieu-chuan-quy-chuan',
        summary: 'Quy chuẩn kỹ thuật áp dụng cho hoạt động quan trắc môi trường.',
        publishedDate: today,
      },
      {
        title: 'Hướng dẫn kỹ thuật xây dựng cơ sở dữ liệu GIS (demo)',
        category: 'tai-lieu-gis',
        summary: 'Tài liệu hướng dẫn quy trình xây dựng và chuẩn hoá dữ liệu GIS.',
        publishedDate: today,
      },
      {
        title: 'Báo cáo hiện trạng môi trường khu vực miền núi phía Bắc (demo)',
        category: 'bao-cao-nghien-cuu',
        summary: 'Báo cáo tổng hợp hiện trạng môi trường phục vụ nghiên cứu.',
        publishedDate: today,
      },
    ],
    'title'
  );
}

async function seedMediaAlbums(app: Core.Strapi) {
  const today = new Date().toISOString().slice(0, 10);
  await seedIfEmpty(
    app,
    'api::media-album.media-album',
    [
      {
        title: 'Khảo sát thực địa tài nguyên rừng (demo)',
        category: 'khao-sat-thuc-dia',
        publishedDate: today,
      },
      {
        title: 'Hội thảo khoa học GIS và viễn thám (demo)',
        category: 'hoi-thao',
        publishedDate: today,
      },
      {
        title: 'Hoạt động đào tạo UAV/LiDAR cho cán bộ địa phương (demo)',
        category: 'dao-tao',
        publishedDate: today,
      },
    ],
    'title'
  );
}

async function seedTrainingCourses(app: Core.Strapi) {
  await seedIfEmpty(
    app,
    'api::training-course.training-course',
    [
      {
        title: 'Khóa đào tạo GIS căn bản (demo)',
        summary: 'Trang bị kiến thức và kỹ năng GIS cơ bản cho cán bộ quản lý tài nguyên.',
        duration: '5 ngày',
        schedule: 'Khai giảng định kỳ hàng quý (demo)',
        location: 'Trường Đại học Nông Lâm, Đại học Thái Nguyên',
        registrationOpen: true,
      },
      {
        title: 'Khóa đào tạo ứng dụng UAV/Drone trong khảo sát (demo)',
        summary: 'Hướng dẫn vận hành UAV và xử lý dữ liệu ảnh phục vụ khảo sát địa hình.',
        duration: '3 ngày',
        schedule: 'Liên hệ để biết lịch khai giảng (demo)',
        location: 'Trường Đại học Nông Lâm, Đại học Thái Nguyên',
        registrationOpen: true,
      },
      {
        title: 'Tập huấn quản lý tài nguyên và môi trường cho cán bộ địa phương (demo)',
        summary: 'Tập huấn kỹ năng điều tra, đánh giá và quản lý tài nguyên môi trường.',
        duration: '2 ngày',
        schedule: 'Theo yêu cầu của địa phương (demo)',
        location: 'Tổ chức tại địa phương hoặc tại Trung tâm',
        registrationOpen: true,
      },
    ],
    'title'
  );
}

async function seedGisLayers(app: Core.Strapi) {
  await seedIfEmpty(
    app,
    'api::gis-layer.gis-layer',
    [
      {
        name: 'Ranh giới hành chính (minh hoạ)',
        category: 'ranh-gioi-hanh-chinh',
        description:
          'Ranh giới minh hoạ khu vực miền núi phía Bắc — hình học giả lập, không phải dữ liệu đo đạc chính thức.',
        color: '#4b564e',
        fillOpacity: 0.05,
        defaultVisible: true,
        order: 1,
        geojson: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'Ranh giới minh hoạ' },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [105.7, 21.5],
                    [105.95, 21.5],
                    [105.95, 21.7],
                    [105.7, 21.7],
                    [105.7, 21.5],
                  ],
                ],
              },
            },
          ],
        },
      },
      {
        name: 'Tài nguyên rừng (minh hoạ)',
        category: 'rung',
        description:
          'Vùng rừng minh hoạ — hình học giả lập phục vụ trình diễn WebGIS, sẽ thay bằng dữ liệu điều tra rừng thực tế.',
        color: '#1f6d45',
        fillOpacity: 0.45,
        defaultVisible: true,
        order: 2,
        geojson: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'Vùng rừng minh hoạ' },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [105.72, 21.6],
                    [105.82, 21.6],
                    [105.82, 21.68],
                    [105.72, 21.68],
                    [105.72, 21.6],
                  ],
                ],
              },
            },
          ],
        },
      },
      {
        name: 'Tài nguyên đất (minh hoạ)',
        category: 'dat',
        description:
          'Vùng đất nông nghiệp minh hoạ — hình học giả lập phục vụ trình diễn WebGIS, sẽ thay bằng dữ liệu điều tra đất thực tế.',
        color: '#d9822b',
        fillOpacity: 0.4,
        defaultVisible: true,
        order: 3,
        geojson: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'Vùng đất minh hoạ' },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [105.83, 21.52],
                    [105.93, 21.52],
                    [105.93, 21.6],
                    [105.83, 21.6],
                    [105.83, 21.52],
                  ],
                ],
              },
            },
          ],
        },
      },
      {
        name: 'Sông suối (minh hoạ)',
        category: 'song-suoi',
        description:
          'Đường sông suối minh hoạ — hình học giả lập, sẽ thay bằng dữ liệu thủy văn thực tế.',
        color: '#1d6fa5',
        fillOpacity: 0,
        defaultVisible: true,
        order: 4,
        geojson: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'Sông minh hoạ' },
              geometry: {
                type: 'LineString',
                coordinates: [
                  [105.7, 21.55],
                  [105.8, 21.58],
                  [105.88, 21.62],
                  [105.95, 21.65],
                ],
              },
            },
          ],
        },
      },
      {
        name: 'Giao thông (minh hoạ)',
        category: 'giao-thong',
        description:
          'Tuyến đường giao thông minh hoạ — hình học giả lập, sẽ thay bằng dữ liệu giao thông thực tế.',
        color: '#4b564e',
        fillOpacity: 0,
        defaultVisible: false,
        order: 5,
        geojson: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'Tuyến đường minh hoạ' },
              geometry: {
                type: 'LineString',
                coordinates: [
                  [105.72, 21.52],
                  [105.8, 21.6],
                  [105.9, 21.68],
                ],
              },
            },
          ],
        },
      },
      {
        name: 'Quy hoạch sử dụng đất (minh hoạ)',
        category: 'quy-hoach',
        description:
          'Vùng quy hoạch minh hoạ — hình học giả lập, sẽ thay bằng dữ liệu quy hoạch thực tế được phê duyệt.',
        color: '#8a5cb8',
        fillOpacity: 0.3,
        defaultVisible: false,
        order: 6,
        geojson: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'Vùng quy hoạch minh hoạ' },
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [105.78, 21.62],
                    [105.86, 21.62],
                    [105.86, 21.68],
                    [105.78, 21.68],
                    [105.78, 21.62],
                  ],
                ],
              },
            },
          ],
        },
      },
      {
        name: 'Điểm thiên tai (minh hoạ)',
        category: 'thien-tai',
        description:
          'Điểm nguy cơ thiên tai minh hoạ — hình học giả lập, sẽ thay bằng dữ liệu cảnh báo thiên tai thực tế.',
        color: '#c0392b',
        fillOpacity: 0.6,
        defaultVisible: false,
        order: 7,
        geojson: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'Điểm sạt lở minh hoạ 1' },
              geometry: { type: 'Point', coordinates: [105.76, 21.63] },
            },
            {
              type: 'Feature',
              properties: { name: 'Điểm sạt lở minh hoạ 2' },
              geometry: { type: 'Point', coordinates: [105.9, 21.56] },
            },
          ],
        },
      },
    ],
    'name'
  );
}

async function seedEquipment(app: Core.Strapi) {
  await seedIfEmpty(
    app,
    'api::equipment.equipment',
    [
      {
        name: 'Phòng GIS (demo)',
        type: 'phong-lab',
        function: 'Xây dựng, biên tập và phân tích dữ liệu bản đồ, cơ sở dữ liệu không gian.',
        order: 1,
      },
      {
        name: 'Phòng Viễn thám (demo)',
        type: 'phong-lab',
        function: 'Xử lý, giải đoán ảnh vệ tinh và ảnh viễn thám phục vụ giám sát tài nguyên.',
        order: 2,
      },
      {
        name: 'Phòng phân tích môi trường (demo)',
        type: 'phong-lab',
        function: 'Phân tích mẫu môi trường (đất, nước, không khí) phục vụ nghiên cứu và dịch vụ tư vấn.',
        order: 3,
      },
      {
        name: 'Phòng thí nghiệm đất (demo)',
        type: 'phong-lab',
        function: 'Phân tích tính chất lý hóa của đất phục vụ điều tra, đánh giá đất đai.',
        order: 4,
      },
      {
        name: 'Máy GNSS RTK (demo)',
        type: 'thiet-bi',
        specifications: 'Độ chính xác định vị cỡ cm, hỗ trợ đo đạc thực địa (thông số minh hoạ).',
        function: 'Đo đạc, định vị chính xác cao phục vụ khảo sát địa hình.',
        order: 5,
      },
      {
        name: 'UAV/Drone khảo sát (demo)',
        type: 'thiet-bi',
        specifications: 'Gắn camera chụp ảnh phổ thường/đa phổ (thông số minh hoạ).',
        function: 'Chụp ảnh trên không phục vụ khảo sát địa hình, giám sát tài nguyên rừng và đất.',
        order: 6,
      },
      {
        name: 'Máy quét LiDAR (demo)',
        type: 'thiet-bi',
        specifications: 'Quét điểm 3D mật độ cao (thông số minh hoạ).',
        function: 'Thu thập dữ liệu địa hình 3D độ chính xác cao, đo đạc rừng.',
        order: 7,
      },
      {
        name: 'Máy toàn đạc điện tử (demo)',
        type: 'thiet-bi',
        function: 'Đo đạc góc, khoảng cách phục vụ khảo sát địa hình truyền thống.',
        order: 8,
      },
      {
        name: 'Hệ thống máy tính / Server GIS (demo)',
        type: 'thiet-bi',
        function: 'Lưu trữ, xử lý dữ liệu không gian và vận hành WebGIS.',
        order: 9,
      },
    ],
    'name'
  );
}

seed();
