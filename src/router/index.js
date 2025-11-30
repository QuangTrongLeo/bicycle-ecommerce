import configs from '../config';
import { Home, Login, Register, Detail, Searched, Profile } from '../pages';
import { SecondLayout } from '../layouts';
const publishRoutes = [
  { path: configs.routes.home, page: Home },
  { path: configs.routes.login, page: Login },
  { path: configs.routes.register, page: Register },
  { path: configs.routes.detail, page: Detail },
  { path: configs.routes.searched, page: Searched },
];

const userRoutes = [
  { path: configs.routes.home, page: Home },
  { path: configs.routes.profile, page: Profile },
  { path: configs.routes.detail, page: Detail },
  { path: configs.routes.searched, page: Searched },
];

const adminRoutes = [...userRoutes];

export { publishRoutes, userRoutes, adminRoutes };
