export default {
  routes: [
    {
      method: 'POST',
      path: '/favorites/toggle',
      handler: 'favorite.toggle',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};