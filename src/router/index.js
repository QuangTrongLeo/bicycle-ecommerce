import configs from '../config';
import { Home, Login, Register, Detail, Searched, Profile, Category, SubCategory, Collection } from '../pages';
import { SecondLayout } from '../layouts';

const excludeForUser = [configs.routes.login, configs.routes.register];

const publishRoutes = [
    { path: configs.routes.home, page: Home },
    { path: configs.routes.login, page: Login },
    { path: configs.routes.register, page: Register },
    { path: configs.routes.collection, page: Collection, layout: SecondLayout },
    { path: `${configs.routes.detail}/:slug`, page: Detail },
    { path: configs.routes.searched, page: Searched },
    { path: `${configs.routes.categories}/:slug`, page: Category },
    { path: `${configs.routes.category}/:slug`, page: SubCategory, layout: SecondLayout },
];

const userRoutes = [
    { path: configs.routes.profile, page: Profile },
    ...publishRoutes.filter((route) => !excludeForUser.includes(route.path)),
];

const adminRoutes = [...userRoutes];

export { publishRoutes, userRoutes, adminRoutes };
