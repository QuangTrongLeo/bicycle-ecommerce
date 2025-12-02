import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
const st = classNames.bind(styles);

const formatCurrency = (value) => {
    if (!value || isNaN(Number(value))) return '0';
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
    }).format(Number(value));
};

const roundToThousand = (value) => {
    return Math.round(value / 1000) * 1000;
};

function MediumRectangleCard({ to = '#', img, name, price, discount, variants }) {
    const [currentImg, setCurrentImg] = useState(img);
    const [selectedColor, setSelectedColor] = useState(variants[0].color_id);

    const originPrice = discount > 0 ? roundToThousand(price / (1 - discount / 100)) : null;
    const handleButtonClick = (e, variant) => {
        e.preventDefault();
        setCurrentImg(variant.img);
        setSelectedColor(variant.color_id);
    };
    return (
        <Link to={to} className={st('link-wrapper')}>
            <div className={st('card', 'card-product')}>
                <img src={currentImg} className={st('card-img-top')} alt={name} />
                <div className={st('card-body')}>
                    <div className={st('card-color')}>
                        {variants.map((variant) => (
                            <button
                                key={variant.color_id}
                                style={{ backgroundColor: variant.hex_code }}
                                onClick={(e) => handleButtonClick(e, variant)}
                                className={st('color-btn', {
                                    selected: selectedColor === variant.color_id,
                                })}>
                                {variant.color_name}
                            </button>
                        ))}
                    </div>
                    <h5 className={st('card-name')}>{name}</h5>
                    <div className={st('card-price')}>
                        <span className={st('card-cur-price')}>{formatCurrency(price)}đ</span>
                        {discount > 0 && (
                            <>
                                <span className={st('card-discount-percent')}>-{discount}%</span>
                                <span className={st('card-origin-price')}>{formatCurrency(originPrice)}đ</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MediumRectangleCard;
