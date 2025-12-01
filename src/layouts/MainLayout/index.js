import classNames from 'classnames/bind';
import { Header, Footer, Navigation } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { increaseCounter } from '../../redux/action/counterAction';

import styles from './style.module.scss';
const st = classNames.bind(styles);

function MainLayout({ children }) {
    const counter = useSelector((state) => state.counter.count);

    const dispatch = useDispatch();

    return (
        <div className={st('wrapper')}>
            <Navigation />
            <Header />
            <div className="mx-5">{children}</div>
            <Footer />
        </div>
    );
}

export default MainLayout;
