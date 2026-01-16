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
    VnpayCreateOrder,
    VnpayTransaction,
    VnpayTransactionConfirm,
    PaymentResult,
    Support,
    Promotion,
} from '../pages';

const excludeForUser = [configs.routes.login, configs.routes.register];

const publishRoutes = [
    { path: configs.routes.home, page: Home },
    { path: configs.routes.login, page: Login },
    { path: configs.routes.register, page: Register },
    { path: `${configs.routes.detail}/:id`, page: Detail },
    { path: configs.routes.searched, page: Searched },
    { path: `${configs.routes.category}`, page: Category },
    { path: configs.routes.promotion, page: Promotion },

];

const userRoutes = [
    { path: configs.routes.profile, page: Profile },
    { path: configs.routes.cart, page: Cart },
    { path: configs.routes.orderHistory, page: OrderHistory },
    { path: `${configs.routes.detailOrderHistory}/:id`, page: DetailOrderHistory },
    { path: configs.routes.vnpayCreateOrder, page: VnpayCreateOrder },
    { path: configs.routes.vnpayTransaction, page: VnpayTransaction },
    { path: configs.routes.vnpayTransactionConfirm, page: VnpayTransactionConfirm },
    { path: configs.routes.paymentResult, page: PaymentResult },
    { path: configs.routes.support, page: Support }, 

    ...publishRoutes.filter((route) => !excludeForUser.includes(route.path)),
];

const adminRoutes = [...userRoutes];

export { publishRoutes, userRoutes, adminRoutes };
