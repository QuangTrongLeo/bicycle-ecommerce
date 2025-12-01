import classNames from 'classnames/bind';
import { Footer, Navigation } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { increaseCounter } from '../../redux/action/counterAction';

import styles from './style.module.scss';
const st = classNames.bind(styles);

function MainLayout({ children }) {
    const counter = useSelector((state) => state.counter.count);

    const dispatch = useDispatch();

    return (
        <div className={st('wrapper')}>
            d ds ds ds
            <br />
            ds ds ds
            <br />
            ds ds ds
            <br />
            ds ds ds
            <br />
            ds ds ds
            <br />
            ds ds ds
            <br />
            ds ds ds
            <br />
            ds ds ds
            <br />
            ds ds ds
            <br />v v ds ds ds
            <br />
            ds ds ds
            <br />
            ds ds ds
            <br />
            ds ds ds
            <br />
            ds ds ds
            <br />
            {/* <div className={st('content-container', 'mx-5')}>
                <div style={{ padding: '10px', background: '#eef', borderRadius: '6px' }}>
                    <h3>🔥 Test Redux</h3>
                    <p>
                        Giá trị counter hiện tại: <b>{counter}</b>
                    </p>

                    <button
                        onClick={() => dispatch(increaseCounter())}
                        style={{
                            padding: '8px 12px',
                            background: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}>
                        Tăng counter
                    </button>
                </div> */}
            {/* Nội dung trang */}
            {/* {children}
            </div> */}
            <Footer />
        </div>
    );
}

export default MainLayout;
