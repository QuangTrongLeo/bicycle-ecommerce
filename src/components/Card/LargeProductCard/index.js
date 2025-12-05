import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import GradientText from '../../GradientText';
import styles from './style.module.scss';
import { formatCurrency, formatRoundToThousand } from '~/utils';

const st = classNames.bind(styles);

function LargeProductCard({ to = '#', img, name, desc, price, discount }) {
    const discountPrice = discount > 0 ? formatRoundToThousand(price - (price * discount) / 100) : null;

    return (
        <Link to={to} className={st('link-wrapper')}>
            <div className={st('card-product')}>
                <img src={img} className={st('card-img')} alt={name} />

                <div className={st('card-content')}>
                    <h2 className={st('card-name')}>{name}</h2>

                    <GradientText text={desc} fullColorWord={true} fontSize={24} />

                    <div className={st('card-price')}>
                        {discount > 0 ? (
                            <>
                                <span className={st('price')}>{formatCurrency(discountPrice)}đ</span>
                                <span className={st('origin-price')}>{formatCurrency(price)}đ</span>
                            </>
                        ) : (
                            <span className={st('price')}>{formatCurrency(price)}đ</span>
                        )}
                    </div>
                </div>

                {/* Nếu cần badge giảm giá thì mở lại đoạn này */}
                {/* {finalDiscount > 0 && (
                    <div className={st('discount-badge')}>
                        <span className={st('discount-text')}>-{Math.round(finalDiscount * 100)}%</span>
                    </div>
                )} */}
            </div>
        </Link>
    );
}

export default LargeProductCard;
