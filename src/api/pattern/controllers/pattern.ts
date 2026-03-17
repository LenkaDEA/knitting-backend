import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::pattern.pattern', ({ strapi }) => ({
  async create(ctx) {
    if (!ctx.is('multipart')) {
      return super.create(ctx);
    }

    try {
      const files = ctx.request.files;
      const coverFile = files?.['files.cover']; 

      let data = ctx.request.body.data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      const entry = await strapi.documents('api::pattern.pattern').create({
        data: data,
        status: 'published'
      });

      if (coverFile) {
        await strapi.plugin('upload').service('upload').upload({
          data: {
            refId: entry.id,
            ref: 'api::pattern.pattern', 
            field: 'cover',
          },
          files: coverFile,
        });
      }

      const result = await strapi.documents('api::pattern.pattern').findOne({
        documentId: entry.documentId,
        populate: ['cover'],
      });

      return this.transformResponse(result);

    } catch (err) {
      console.error('Ошибка в кастомном контроллере:', err);
      return ctx.badRequest('Internal error during record creation', { details: err.message });
    }
  }
}));