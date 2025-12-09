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

function CartNotification({ sizeId, onClose }) {
    console.log(sizeId);
    const [isShow, setIsShow] = useState(false);
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const data = getProductBySizeId(sizeId);
        if (data) setProductData(data);

        const showTimer = setTimeout(() => setIsShow(true), 50);
        const hideTimer = setTimeout(() => {
            setIsShow(false);
            const cleanupTimer = setTimeout(() => onClose(), 500);
            return () => clearTimeout(cleanupTimer);
        }, 3000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [sizeId, onClose]);

    if (!productData) return null;

    const dialogClasses = st('dialog', 'dialog-show', { 'dialog-hide': !isShow });

    const handleClose = () => {
        setIsShow(false);
        setTimeout(() => onClose(), 500);
    };

    return (
        <div className={st('modal-show')}>
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
                            <div className={st('price')}>{formatCurrency(productData.discountPrice)}đ</div>
                        </div>
                    </div>
                    <div className={st('footer', 'mx-4')}>
                        <Link to={configs.routes.cart}>
                            <button type="button" className={st('btn')}>
                                Xem giỏ hàng <i className={st('fa-solid', 'fa-arrow-right')}></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartNotification;
