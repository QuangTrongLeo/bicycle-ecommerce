import configs from '../config';
import { Home, Login, Register, Detail, Searched, Profile, Category, SubCategory } from '../pages';
import { SecondLayout } from '../layouts';
const publishRoutes = [
    { path: configs.routes.home, page: Home },
    { path: configs.routes.login, page: Login },
    { path: configs.routes.register, page: Register },
    { path: `${configs.routes.detail}/:slug`, page: Detail },
    { path: configs.routes.searched, page: Searched },
    { path: `${configs.routes.category}/:slug`, page: Category },
    { path: `${configs.routes.sub_category}/:slug`, page: SubCategory, layout: SecondLayout },
];

const userRoutes = [
    { path: configs.routes.home, page: Home },
    { path: configs.routes.profile, page: Profile },
    { path: `${configs.routes.detail}/:slug`, page: Detail },
    { path: configs.routes.searched, page: Searched },
    { path: `${configs.routes.category}/:slug`, page: Category },
    { path: `${configs.routes.sub_category}/:slug`, page: SubCategory, layout: SecondLayout },
];

const adminRoutes = [];

export { publishRoutes, userRoutes, adminRoutes };
