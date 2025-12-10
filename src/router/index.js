import configs from '../config';
import {
    Home,
    Login,
    Register,
    Detail,
    Searched,
    Profile,
    Category,
    Cart,
    OrderHistory,
    DetailOrderHistory,
} from '../pages';
import { SecondLayout } from '../layouts';

const excludeForUser = [configs.routes.login, configs.routes.register];

const publishRoutes = [
    { path: configs.routes.home, page: Home },
    { path: configs.routes.login, page: Login },
    { path: configs.routes.register, page: Register },
    { path: `${configs.routes.detail}/:id`, page: Detail },
    { path: configs.routes.searched, page: Searched },
    { path: `${configs.routes.category}`, page: Category },
    // { path: `${configs.routes.category}/:slug`, page: Category, layout: SecondLayout },
];

const userRoutes = [
    { path: configs.routes.profile, page: Profile },
    { path: configs.routes.cart, page: Cart },
    { path: configs.routes.orderHistory, page: OrderHistory },
    { path: `${configs.routes.detailOrderHistory}/:id`, page: DetailOrderHistory },
    ...publishRoutes.filter((route) => !excludeForUser.includes(route.path)),
];

const adminRoutes = [...userRoutes];

export { publishRoutes, userRoutes, adminRoutes };
