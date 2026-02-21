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
    const categories = await strapi.documents('api::category.category').findMany({
      limit: 1,
    });

    if (categories.length === 0) {
      console.log('Начинаю заполнение базы данных...');
      await seedDatabase(strapi);
      console.log('База данных успешно заполнена!');
    }
  },
};

async function seedDatabase(strapi: Core.Strapi) {
  // const cat1 = await strapi.documents('api::category.category').create({
  //     data: {
  //       name: 'Носки',
  //       slug: 'noski',
  //     },
  //     status: 'published',
  //   });

  //   const cat2 = await strapi.documents('api::category.category').create({
  //   data: {
  //     name: 'Шапки',
  //     slug: 'shapki',
  //   },
  //   status: 'published',
  // });

  // const pattern1 = await strapi.documents('api::pattern.pattern').create({
  //   data: {
  //     title: 'Носки на котика',
  //     slug: 'noski-na-kotika',
  //     tool: 'hook',
  //     shortDescription: 'Классический зигзаг для текстиля.',
  //     description: '<p>Вязание этих носков крючком — это истинное удовольствие, которое превращает обычный моток пряжи в невероятно уютный и стильный аксессуар для дома.</p><p>Вы удивитесь, насколько легко и быстро осваивается эта техника: благодаря понятным приемам и отсутствию сложных спиц, работа продвигается буквально на глазах, принося медитативное спокойствие.</p><p>Готовые носочки получаются потрясающе мягкими, теплыми и эластичными, идеально облегая ножку и создавая неповторимое ощущение комфорта, которое невозможно найти в магазинных вещах.</p><p>Это идеальный проект для тех, кто ценит свое время, ведь всего за пару вечеров вы создадите шедевр, который станет согревающим подарком для себя или близких.</p>',
  //     videoUrl:'https://rutube.ru/video/a9611c35916083f6a7329a7acc4190c8/?r=wd',
  //     categories: [cat1.documentId, cat2.documentId],
  //   },
  //   status: 'published',
  // });

  // const user1 = await strapi.documents('plugin::users-permissions.user').create({
  //   data: {
  //     username: 'testUser1',
  //     email: 'test1@example.com',
  //     password: 'SafePassword123',
  //     confirmed: true,
  //     role: 1,
  //     favorites: [pattern1.documentId],
  //   },
  //   status: 'published'
  // });

  const videoUrl = 'https://rutube.ru/video/a9611c35916083f6a7329a7acc4190c8/?r=wd';

  const categoriesData = [
    { name: 'Носки', slug: 'noski' },
    { name: 'Шапки', slug: 'shapki' },
    { name: 'Шарфы и Снуды', slug: 'sharfy-i-snudy' },
    { name: 'Свитеры', slug: 'svitery' },
    { name: 'Кардиганы', slug: 'kardigany' },
    { name: 'Варежки и Перчатки', slug: 'varezhki-i-perchatki' },
    { name: 'Пледы', slug: 'pledy' },
    { name: 'Игрушки (Амигуруми)', slug: 'igrushki' },
    { name: 'Сумки', slug: 'sumki' },
    { name: 'Топы и Майки', slug: 'topy-i-mayki' },
    { name: 'Юбки и Платья', slug: 'yubki-i-platya' },
    { name: 'Для дома', slug: 'dlya-doma' },
  ];

  const createdCategories = [];
  console.log('Создание категорий...');
  for (const cat of categoriesData) {
    const created = await strapi.documents('api::category.category').create({
      data: cat,
      status: 'published',
    });
    createdCategories.push(created);
  };


  const getDesc = (title: string, tool: 'needles' | 'hook') => 
    `<p>Вязание проекта «${title}» — это истинное удовольствие, которое превращает обычный моток пряжи в стильную вещь.</p>
     <p>Вы удивитесь, насколько легко осваивается эта техника. Используя ${tool === 'hook' ? 'крючок' : 'спицы'}, работа продвигается буквально на глазах, принося медитативное спокойствие.</p>
     <p>Готовое изделие получается потрясающе мягким, теплым и эластичным. Это идеальный проект для тех, кто ценит свое время и хочет создать шедевр для себя или близких.</p>`;

  const patternsData = [
    { title: 'Носки на котика', slug: 'noski-na-kotika', tool: 'hook', short: 'Классический зигзаг для текстиля.' },
    { title: 'Зимняя шапка бини', slug: 'zimnyaya-shapka-bini', tool: 'needles', short: 'Простая шапка лицевой гладью.' },
    { title: 'Ажурный шарф', slug: 'azhurnyi-sharf', tool: 'hook', short: 'Легкий шарф с цветочным узором.' },
    { title: 'Свитер оверсайз', slug: 'sviter-oversize', tool: 'needles', short: 'Модный и уютный свитер крупной вязки.' },
    { title: 'Бабушкин квадрат', slug: 'babushkin-kvadrat', tool: 'hook', short: 'Базовый мотив для пледов и сумок.' },
    { title: 'Варежки с косами', slug: 'varezhki-s-kosami', tool: 'needles', short: 'Теплые варежки с анатомическим пальцем.' },
    { title: 'Плюшевый мишка', slug: 'plushevyi-mishka', tool: 'hook', short: 'Мягкая игрушка амигуруми.' },
    { title: 'Летний кроп-топ', slug: 'letniy-crop-top', tool: 'hook', short: 'Дышащий топ из хлопка.' },
    { title: 'Кардиган летучая мышь', slug: 'kardigan-letuchaya-mysh', tool: 'needles', short: 'Свободный кардиган без швов.' },
    { title: 'Сумка-шоппер', slug: 'sumka-shopper', tool: 'hook', short: 'Эко-сумка из трикотажной пряжи.' },
    { title: 'Детский плед', slug: 'detskiy-pled', tool: 'needles', short: 'Гипоаллергенный плед для малыша.' },
    { title: 'Следки крючком', slug: 'sledki-kruchkom', tool: 'hook', short: 'Быстрые тапочки за один вечер.' },
    { title: 'Снуд в два оборота', slug: 'snud-v-dva-oborota', tool: 'needles', short: 'Теплый шарф-хомут английской резинкой.' },
    { title: 'Мини-юбка', slug: 'mini-yubka', tool: 'needles', short: 'Плотная юбка с жаккардовым узором.' },
    { title: 'Корзинка для мелочей', slug: 'korzinka-dlya-melochey', tool: 'hook', short: 'Интерьерная корзина с деревянным дном.' },
    { title: 'Шаль Харуни', slug: 'shal-haruni', tool: 'needles', short: 'Сложная, но невероятно красивая шаль.' },
    { title: 'Повязка на голову', slug: 'povyazka-na-golovu', tool: 'needles', short: 'Стильный аксессуар с перехлестом.' },
    { title: 'Брелок-сердечко', slug: 'brelok-serdechko', tool: 'hook', short: 'Маленький сувенир крючком.' },
    { title: 'Мужской джемпер', slug: 'muzhskoy-dzhemper', tool: 'needles', short: 'Классический джемпер регланом сверху.' },
    { title: 'Авоська ретро', slug: 'avoska-retro', tool: 'hook', short: 'Удобная сетка для продуктов.' },
    { title: 'Гетры для танцев', slug: 'getry-dlya-tantsev', tool: 'needles', short: 'Удлиненные гетры с открытой пяткой.' },
    { title: 'Чехол на подушку', slug: 'chehol-na-podushku', tool: 'hook', short: 'Декоративная наволочка с шишечками.' },
    { title: 'Манишка детская', slug: 'manishka-detskaya', tool: 'needles', short: 'Отличная альтернатива шарфу.' },
    { title: 'Панама из рафии', slug: 'panama-iz-rafii', tool: 'hook', short: 'Трендовый летний головной убор.' },
    { title: 'Гольфы ажурные', slug: 'golfy-azhurnye', tool: 'needles', short: 'Тонкие гольфы из носочной пряжи.' },
    { title: 'Свитер для собаки', slug: 'sviter-dlya-sobaki', tool: 'needles', short: 'Одежда для мелких пород.' },
    { title: 'Кот Саймона', slug: 'kot-sajmona', tool: 'hook', short: 'Популярная игрушка своими руками.' },
    { title: 'Пляжная туника', slug: 'plyazhnaya-tunika', tool: 'hook', short: 'Сетка для отдыха на море.' },
    { title: 'Митенки совы', slug: 'mitenki-sovy', tool: 'needles', short: 'Перчатки без пальцев с узором совы.' },
    { title: 'Коврик в ванную', slug: 'kovrik-v-vannuyu', tool: 'hook', short: 'Вязание из остатков пряжи.' },
    { title: 'Шапка ушанка', slug: 'shapka-ushanka', tool: 'hook', short: 'Очень теплая шапка с подкладом.' },
    { title: 'Платье-лапша', slug: 'platie-lapsha', tool: 'needles', short: 'Облегающее платье резинкой 2х2.' },
    { title: 'Клатч из шнура', slug: 'klatch-iz-shnura', tool: 'hook', short: 'Вечерняя сумочка с фермуаром.' },
    { title: 'Пончо с бахромой', slug: 'poncho-s-bahromoy', tool: 'needles', short: 'Удобная накидка для прохладных вечеров.' },
    { title: 'Подставки под горячее', slug: 'podstavki-pod-goryachee', tool: 'hook', short: 'Мандалы для уюта на кухне.' },
    { title: 'Чехол для ноутбука', slug: 'chehol-dlya-noutbuka', tool: 'hook', short: 'Плотный чехол узором "паркет".' },
  ];

  const createdPatterns = [];
  console.log('Создание уроков...');
  for (let i = 0; i < patternsData.length; i++) {
    const pat = patternsData[i];

    const randomCat1 = createdCategories[i % createdCategories.length].documentId;
    const randomCat2 = createdCategories[(i + 3) % createdCategories.length].documentId;

    const created = await strapi.documents('api::pattern.pattern').create({
      data: {
        title: pat.title,
        slug: pat.slug,
        tool: pat.tool as "needles" | "hook" ,
        shortDescription: pat.short,
        description: getDesc(pat.title, pat.tool as "needles" | "hook"),
        videoUrl: videoUrl,
        categories: [randomCat1, randomCat2],
      },
      status: 'published',
    });
    createdPatterns.push(created);
  }

  const usersData = [
    { username: 'testUser1', email: 'test1@example.com', password: 'SafePassword123' },
    { username: 'yarnMaster', email: 'master@example.com', password: 'SafePassword123' },
    { username: 'knittingFan', email: 'fan@example.com', password: 'SafePassword123' },
  ];

  console.log('Создание пользователей...');
  for (let i = 0; i < usersData.length; i++) {
    const user = usersData[i];
    
    const fav1 = createdPatterns[i].documentId;
    const fav2 = createdPatterns[i + 5].documentId;
    const fav3 = createdPatterns[i + 10].documentId;

    await strapi.documents('plugin::users-permissions.user').create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        confirmed: true,
        role: 1,
        favorites: [fav1, fav2, fav3], 
      },
      status: 'published'
    });
  }

}