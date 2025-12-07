import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { formatCurrency } from '~/utils';
import { xeDapFixedGearMagicbrosCX5PlusImages } from '~/assets/images';
const st = classNames.bind(styles);

function CartNotification({ img, name, color, size, price, onClose }) {
    return (
        <div className={st('modal', 'show-modal')}>
            <div className={st('modal-dialog', 'show-modal-dialog')}>
                <div className={st('modal-content')}>
                    <div className={st('modal-header-cus', 'mx-4')}>
                        <h4 className={st('modal-title')}>Thêm vào giỏ hàng thành công</h4>
                        <button type="button" className={st('button-close')} onClick={onClose}>
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className={st('modal-body', 'mx-2', 'row')}>
                        <img
                            src={xeDapFixedGearMagicbrosCX5PlusImages.white}
                            className={st('modal-body-img', 'col-3')}
                            alt={name}
                        />
                        <div className={st('modal-body-info', 'col-9')}>
                            <div className={st('modal-body-info__name')}>Xe Đạp Fixed Gear Magic bros CX5 Plus</div>
                            <div className={st('modal-body-info__variant')}>
                                <span>Trắng</span>
                                <span>/</span>
                                <span>M</span>
                            </div>
                            <div className={st('modal-body-info__price')}>{formatCurrency(123000)}đ</div>
                        </div>
                    </div>
                    <div className={st('modal-footer')}>
                        <Link>
                            <button type="button" className={st('btn', 'btn-primary')}>
                                Xem giỏ hàng <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartNotification;
