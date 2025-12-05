import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
const st = classNames.bind(styles);

function LimitList({ children, limit = 8 }) {
    const items = Array.isArray(children) ? children : [children];
    const [visibleCount, setVisibleCount] = useState(limit);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + limit);
    };

    const isAllShown = visibleCount >= items.length;

    return (
        <>
            {/* Render children trực tiếp để giữ layout Bootstrap */}
            {items.slice(0, visibleCount)}

            {/* Button nằm sau danh sách, không nằm trong .row */}
            {!isAllShown && (
                <div className={st('text-center')}>
                    <button className={st('btn', 'btn-primary')} onClick={handleShowMore}>
                        Xem thêm →
                    </button>
                </div>
            )}
        </>
    );
}

export default LimitList;
