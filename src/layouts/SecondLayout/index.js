import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Header, SideBar, Footer, Navigation } from '../../components';
const st = classNames.bind(styles);

function SecondLayout({ children }) {
    return (
        <div className={st('wrapper')}>
            <Navigation />
            <Header />
            <div className={st('row', 'mx-5')}>
                <div className={st('col-3')}>
                    <SideBar />
                </div>
                <div className={st('col-9')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default SecondLayout;
