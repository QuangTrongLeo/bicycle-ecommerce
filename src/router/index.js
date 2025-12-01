import configs from '../config';
import { Home, Login, Register, Detail, Searched, Profile, Category, SubCategory } from '../pages';
import { SecondLayout } from '../layouts';
const publishRoutes = [
  { path: configs.routes.home, page: Home },
  { path: configs.routes.login, page: Login },
  { path: configs.routes.register, page: Register },
  { path: configs.routes.detail, page: Detail },
  { path: configs.routes.searched, page: Searched },
  { path: configs.routes.category, page: Category },
  { path: configs.routes.sub_category, page: SubCategory, layout: SecondLayout },
];

const userRoutes = [
  { path: configs.routes.home, page: Home },
  { path: configs.routes.profile, page: Profile },
  { path: configs.routes.detail, page: Detail },
  { path: configs.routes.searched, page: Searched },
  { path: configs.routes.category, page: Category },
  { path: configs.routes.sub_category, page: SubCategory, layout: SecondLayout },
];

const adminRoutes = [...userRoutes];

export { publishRoutes, userRoutes, adminRoutes };
