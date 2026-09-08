interface ConsultationRequestData {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
}

export default {
  async afterCreate(event: { result: ConsultationRequestData }) {
    const { fullName, email, phone, organization, message } = event.result;
    const emailService = strapi.plugin('email').service('email');
    const adminEmail = process.env.EMAIL_TO;

    try {
      if (adminEmail) {
        await emailService.send({
          to: adminEmail,
          subject: `[CEMR] Yêu cầu tư vấn mới từ ${fullName}`,
          text: [
            `Họ tên: ${fullName}`,
            `Email: ${email}`,
            phone ? `Điện thoại: ${phone}` : null,
            organization ? `Cơ quan: ${organization}` : null,
            '',
            'Nội dung yêu cầu:',
            message,
          ]
            .filter(Boolean)
            .join('\n'),
        });
      }

      await emailService.send({
        to: email,
        subject: 'Đã nhận được yêu cầu tư vấn của bạn — CEMR',
        text: `Chào ${fullName},\n\nTrung tâm Môi trường Tài nguyên miền núi đã nhận được yêu cầu tư vấn của bạn và sẽ phản hồi sớm nhất có thể.\n\nNội dung bạn đã gửi:\n${message}\n\nTrân trọng,\nCEMR`,
      });
    } catch (error) {
      strapi.log.error('Gửi email thông báo yêu cầu tư vấn thất bại', error);
    }
  },
};
