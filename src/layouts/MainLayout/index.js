import classNames from 'classnames/bind';
import { Header, Footer, Navigation } from '../../components';
import styles from './style.module.scss';
const st = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className={st('wrapper')}>
            <Navigation />
            <Header />
            <div className={st('mx-5')}>{children}</div>
            <Footer />
        </div>
    );
}

export default MainLayout;
