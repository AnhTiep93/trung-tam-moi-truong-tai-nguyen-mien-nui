interface CourseRegistrationData {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  note?: string;
  course?: number | string;
}

export default {
  async afterCreate(event: { result: CourseRegistrationData }) {
    const { fullName, email, phone, organization, note, course } =
      event.result;
    const emailService = strapi.plugin('email').service('email');
    const adminEmail = process.env.EMAIL_TO;

    let courseTitle = '';
    try {
      if (course) {
        const courseEntry = await strapi
          .documents('api::training-course.training-course')
          .findOne({ documentId: String(course) });
        courseTitle = courseEntry?.title ?? '';
      }
    } catch {
      // Không chặn việc gửi email nếu không lấy được tên khóa học.
    }

    try {
      if (adminEmail) {
        await emailService.send({
          to: adminEmail,
          subject: `[CEMR] Đăng ký khóa học mới từ ${fullName}`,
          text: [
            courseTitle ? `Khóa học: ${courseTitle}` : null,
            `Họ tên: ${fullName}`,
            `Email: ${email}`,
            phone ? `Điện thoại: ${phone}` : null,
            organization ? `Cơ quan: ${organization}` : null,
            note ? `Ghi chú: ${note}` : null,
          ]
            .filter(Boolean)
            .join('\n'),
        });
      }

      await emailService.send({
        to: email,
        subject: 'Xác nhận đăng ký khóa đào tạo — CEMR',
        text: `Chào ${fullName},\n\nTrung tâm Môi trường Tài nguyên miền núi đã nhận được đăng ký của bạn${
          courseTitle ? ` cho khóa học "${courseTitle}"` : ''
        }. Chúng tôi sẽ liên hệ lại để xác nhận lịch học sớm nhất.\n\nTrân trọng,\nCEMR`,
      });
    } catch (error) {
      strapi.log.error('Gửi email xác nhận đăng ký khóa học thất bại', error);
    }
  },
};
