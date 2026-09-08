import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const localesService = strapi.plugin('i18n').service('locales');
    const existing = await localesService.find();
    const codes = existing.map((locale: { code: string }) => locale.code);

    if (!codes.includes('vi')) {
      await localesService.create({ code: 'vi', name: 'Vietnamese (vi)' });
    }
    if (!codes.includes('en')) {
      await localesService.create({ code: 'en', name: 'English (en)' });
    }

    const currentDefault = await localesService.getDefaultLocale();
    if (currentDefault !== 'vi') {
      await localesService.setDefaultLocale({ code: 'vi' });
    }

    await allowPublicPermissions(strapi, {
      'api::person.person': ['find', 'findOne'],
      'api::project.project': ['find', 'findOne'],
      'api::publication.publication': ['find', 'findOne'],
      'api::service.service': ['find', 'findOne'],
      'api::news-item.news-item': ['find', 'findOne'],
      'api::partner.partner': ['find', 'findOne'],
      'api::document.document': ['find', 'findOne'],
      'api::media-album.media-album': ['find', 'findOne'],
      'api::training-course.training-course': ['find', 'findOne'],
      'api::gis-layer.gis-layer': ['find', 'findOne'],
      // Chỉ cho phép "create" — không lộ find/findOne để không ai đọc được yêu cầu của người khác.
      'api::consultation-request.consultation-request': ['create'],
      'api::course-registration.course-registration': ['create'],
    });
  },
};

async function allowPublicPermissions(
  strapi: Core.Strapi,
  permissionsByUid: Record<string, string[]>
) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  for (const [uid, actions] of Object.entries(permissionsByUid)) {
    for (const action of actions) {
      const actionId = `${uid}.${action}`;
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action: actionId, role: publicRole.id } });

      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action: actionId, role: publicRole.id },
        });
      }
    }
  }
}
