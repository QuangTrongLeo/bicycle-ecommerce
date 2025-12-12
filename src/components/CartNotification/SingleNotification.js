// SingleNotification.jsx
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import configs from '~/config';
import { Link } from 'react-router-dom';
import { formatCurrency } from '~/utils';
import { useEffect, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProductBySizeId } from '~/data/services/productService';

const st = classNames.bind(styles);

function SingleNotification({ sizeId, index, notificationId, createdAt, onClose }) {
    const [productData, setProductData] = useState(null);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (!sizeId) return;
        const data = getProductBySizeId(sizeId);
        if (data) setProductData(data);

        const now = Date.now();
        const elapsed = now - createdAt;
        const showDelay = Math.max(50 - elapsed, 0);
        const hideDelay = Math.max(3500 - elapsed, 0);
        const cleanupDelay = Math.max(4000 - elapsed, 0);

        const showTimer = setTimeout(() => setIsShow(true), showDelay);
        const hideTimer = setTimeout(() => setIsShow(false), hideDelay);
        const cleanupTimer = setTimeout(() => {
            onClose(notificationId);
        }, cleanupDelay);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
            clearTimeout(cleanupTimer);
        };
    }, [sizeId, notificationId, createdAt, onClose]);

    if (!productData) return null;

    const dialogClasses = st('dialog', { 'dialog-show': isShow, 'dialog-hide': !isShow });

    const handleClose = () => {
        setIsShow(false);
        setTimeout(() => {
            onClose(notificationId);
        }, 500);
    };

    const topPosition = 50 + index * 250;

    return (
        <div className={st('modal-show')} style={{ top: `${topPosition}px` }}>
            <div className={dialogClasses}>
                <div className={st('content')}>
                    <div className={st('header', 'mx-4')}>
                        <h4 className={st('title')}>Thêm vào giỏ hàng thành công</h4>
                        <button type="button" className={st('close-btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark} className={st('close-icon')} />
                        </button>
                    </div>
                    <div className={st('body', 'mx-4')}>
                        <img src={productData.image} className={st('img', 'col-3')} alt={productData.nameProduct} />
                        <div className={st('info', 'col-9')}>
                            <div className={st('name')}>{productData.nameProduct}</div>
                            <div className={st('variant')}>
                                <span>{productData.nameColor}</span>
                                <span>/</span>
                                <span>{productData.nameSize}</span>
                            </div>
                            <div className={st('price')}>{formatCurrency(productData.finalPrice)}đ</div>
                        </div>
                    </div>
                    <div className={st('footer', 'mx-4')}>
                        <Link to={configs.routes.cart}>
                            <button type="button" className={st('btn')}>
                                Xem giỏ hàng →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleNotification;
