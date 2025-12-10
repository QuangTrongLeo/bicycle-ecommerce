import classNames from 'classnames/bind';
import { Footer, Navigation } from '../../components';
import styles from './style.module.scss';
const st = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className={st('wrapper')}>
            <Navigation />
            <div className={st('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default MainLayout;
