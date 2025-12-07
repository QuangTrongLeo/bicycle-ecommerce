import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { formatCurrency, formatRoundToThousand } from '~/utils';
const st = classNames.bind(styles);

function MainProductCard({ to = '#', name, price, discount, variants, onShowNotification }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(variants[0]);
    const [currentImg, setCurrentImg] = useState(variants[0].images[0]);

    const finalPrice =
        discount > 0 ? formatRoundToThousand(price - (price * discount) / 100) : formatRoundToThousand(price);

    const handleSelectColor = (e, variant) => {
        e.preventDefault();
        setSelectedColor(variant);
        setCurrentImg(variant.images[0]);
        setSelectedSize(null);
    };

    const handleSelectSize = (e, size) => {
        e.preventDefault();
        if (size.quantity > 0) {
            setSelectedSize(size);
            setSelectedSize(null);
            const itemData = {
                name: name,
                price: finalPrice,
                color: selectedColor.color_name,
                size: size.size_name,
                img: selectedColor.images[0],
            };
            if (onShowNotification) {
                onShowNotification(itemData);
            }
            console.log(
                `Đã thêm vào giỏ hàng: Sản phẩm ${name}, Giá ${finalPrice}, Màu: ${selectedColor.color_name}, Size: ${size.size_name}`
            );
        } else {
            console.log(`Size ${size.size_name} đã hết hàng.`);
        }
    };

    const handleMouseEnter = () => {
        if (selectedColor.images.length > 1) {
            setCurrentImg(selectedColor.images[1]);
        }
    };

    const handleMouseLeave = () => {
        setCurrentImg(selectedColor.images[0]);
    };

    return (
        <Link to={to} className={st('link-wrapper')}>
            <div className={st('card', 'card-product')}>
                <div className={st('card-img-wrapper')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={currentImg} className={st('card-img-top')} alt={name} />
                    {/* SIZES */}
                    <div className={st('add-to-cart-overlay')}>
                        <div className={st('overlay-content')}>
                            <div className={st('size-buttons-title')}>Thêm nhanh vào giỏ hàng +</div>

                            <div className={st('size-buttons-container')}>
                                {selectedColor.sizes.map((size) => (
                                    <button
                                        key={size.size_id}
                                        className={st('size-button', {
                                            'size-disabled': size.quantity <= 0,
                                            'size-selected': selectedSize && selectedSize.size_id === size.size_id,
                                        })}
                                        onClick={(e) => handleSelectSize(e, size)}
                                        disabled={size.quantity <= 0}>
                                        {size.size_name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={st('card-body')}>
                    {/* COLORS */}
                    <div className={st('card-color')}>
                        {variants.map((variant) => (
                            <button
                                key={variant.color_id}
                                style={{ backgroundColor: variant.hex_code }}
                                onClick={(e) => handleSelectColor(e, variant)}
                                className={st('color-btn', {
                                    selected: selectedColor.color_id === variant.color_id,
                                })}>
                                {variant.color_name}
                            </button>
                        ))}
                    </div>

                    {/* NAME */}
                    <h5 className={st('card-name')}>{name}</h5>

                    {/* PRICE */}
                    <div className={st('card-price')}>
                        {discount > 0 ? (
                            <>
                                <span className={st('card-cur-price')}>{formatCurrency(finalPrice)}đ</span>
                                <span className={st('card-discount-percent')}>-{discount}%</span>
                                <span className={st('card-origin-price')}>{formatCurrency(price)}đ</span>
                            </>
                        ) : (
                            <span className={st('card-cur-price')}>{formatCurrency(price)}đ</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MainProductCard;
