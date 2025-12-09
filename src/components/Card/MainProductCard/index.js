import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { formatCurrency, formatRoundToThousand } from '~/utils';
import styles from './style.module.scss';
import { CartNotification } from '~/components';

const st = classNames.bind(styles);

function MainProductCard({ product }) {
    const { id, name, price, discount, colors } = product;

    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [currentImg, setCurrentImg] = useState(colors[0].images[0].imageUrl);

    const [showNotify, setShowNotify] = useState(false);
    const [cartItem, setCartItem] = useState(null);

    const finalPrice =
        discount > 0 ? formatRoundToThousand(price - (price * discount) / 100) : formatRoundToThousand(price);

    const handleSelectColor = (e, color) => {
        e.preventDefault();
        setSelectedColor(color);
        setCurrentImg(color.images[0].imageUrl);
    };

    const handleSelectSize = (e, size) => {
        e.preventDefault();
        if (size.stock <= 0) return;

        setCartItem(size.sizeId);
        setShowNotify(true);
    };

    const handleMouseEnter = () => {
        if (selectedColor.images.length > 1) {
            setCurrentImg(selectedColor.images[1].imageUrl);
        }
    };

    const handleMouseLeave = () => {
        setCurrentImg(selectedColor.images[0].imageUrl);
    };

    return (
        <>
            {showNotify && <CartNotification sizeId={cartItem} onClose={() => setShowNotify(false)} />}

            <Link to={`/detail/${id}`} className={st('link-wrapper')}>
                <div className={st('card-product')}>
                    <div
                        className={st('card-img-wrapper')}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <img src={currentImg} className={st('card-img-top')} alt={name} />

                        <div className={st('add-to-cart-overlay')}>
                            <div className={st('overlay-content')}>
                                <div className={st('size-buttons-title')}>Thêm nhanh vào giỏ hàng +</div>

                                <div className={st('size-buttons-container')}>
                                    {selectedColor.sizes.map((size) => (
                                        <button
                                            key={size.sizeId}
                                            className={st('size-button', {
                                                'size-disabled': size.stock <= 0,
                                            })}
                                            onClick={(e) => handleSelectSize(e, size)}
                                            disabled={size.stock <= 0}>
                                            {size.sizeName}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={st('card-body')}>
                        <div className={st('card-color')}>
                            {colors.map((color) => (
                                <button
                                    key={color.colorId}
                                    style={{ backgroundColor: color.colorHex }}
                                    onClick={(e) => handleSelectColor(e, color)}
                                    className={st('color-btn', {
                                        selected: selectedColor.colorId === color.colorId,
                                    })}></button>
                            ))}
                        </div>

                        <h5 className={st('card-name')}>{name}</h5>

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
        </>
    );
}

export default MainProductCard;
