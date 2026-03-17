import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::pattern.pattern', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('Вы должны быть авторизованы, чтобы создать урок');
    }

    if (!ctx.is('multipart')) {
      ctx.request.body.data = {
        ...ctx.request.body.data,
        author: user.id,
      };
      return super.create(ctx);
    }

    try {
      const files = ctx.request.files;
      const coverFile = files?.['files.cover']; 

      let data = ctx.request.body.data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      
      data.author = user.id;

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
        populate: ['cover', 'author'],
      });

      return this.transformResponse(result);

    } catch (err) {
      console.error('Ошибка в кастомном контроллере:', err);
      return ctx.badRequest('Internal error during record creation', { details: err.message });
    }
  }
}));