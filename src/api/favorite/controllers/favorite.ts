import { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async toggle(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Вы не авторизованы');
      }

      const { patternId } = ctx.request.body;
      if (!patternId) {
        return ctx.badRequest('Не передан patternId');
      }

      const currentUser = await strapi.documents('plugin::users-permissions.user').findOne({
        documentId: user.documentId,
        populate: ['favorites'],
      });

      const favorites = currentUser.favorites || [];

      const isFavorite = favorites.some((fav: any) => fav.documentId === patternId);

      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = favorites
          .filter((fav: any) => fav.documentId !== patternId)
          .map((fav: any) => fav.documentId);
      } else {
        updatedFavorites = [...favorites.map((fav: any) => fav.documentId), patternId];
      }

      await strapi.documents('plugin::users-permissions.user').update({
        documentId: user.documentId,
        data: {
          favorites: updatedFavorites,
        },
      });

      return ctx.send({ 
        success: true, 
        isFavorite: !isFavorite 
      });

    } catch (err) {
      console.error('Ошибка в контроллере favorites:', err);
      return ctx.internalServerError('Что-то пошло не так при обновлении избранного');
    }
  },
});