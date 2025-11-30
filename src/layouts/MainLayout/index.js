import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Header, Footer } from '../../components';
const st = classNames.bind(styles);

function MainLayout({ children }) {
  return (
    <div className={st('wrapper')}>
      <Header />
      <div className={st('content-container', 'mx-5')}>{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
