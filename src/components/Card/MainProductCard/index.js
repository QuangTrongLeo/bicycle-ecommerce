import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { formatCurrency, formatRoundToThousand } from '~/utils';
const st = classNames.bind(styles);

function MainProductCard({ to = '#', name, price, discount, colors, onShow }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [currentImg, setCurrentImg] = useState(colors[0].images[0].imageUrl);
    const [quantity] = useState(1);

    const finalPrice =
        discount > 0 ? formatRoundToThousand(price - (price * discount) / 100) : formatRoundToThousand(price);

    const createItem = (size) => ({
        name: name,
        price: finalPrice,
        color: selectedColor.colorName,
        size: size.sizeName,
        image: selectedColor.images[0].imageUrl,
        quantity: quantity,
    });

    const handleSelectColor = (e, color) => {
        e.preventDefault();
        setSelectedColor(color);
        setCurrentImg(color.images[0].imageUrl);
        setSelectedSize(null);
    };

    const handleSelectSize = (e, size) => {
        e.preventDefault();
        if (size.stock > 0) {
            setSelectedSize(size);
            setSelectedSize(null);
            const item = createItem(size);
            if (onShow) {
                onShow(item);
            }
            console.log(
                `Đã thêm vào giỏ hàng: Sản phẩm ${name}, Giá ${finalPrice}, Màu: ${selectedColor.colorName}, Size: ${size.sizeName}, Số lượng: ${quantity}`
            );
        } else {
            console.log(`Size ${size.sizeName} đã hết hàng.`);
        }
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
                                        key={size.sizeId}
                                        className={st('size-button', {
                                            'size-disabled': size.stock <= 0,
                                            'size-selected': selectedSize && selectedSize.sizeId === size.sizeId,
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
                    {/* COLORS */}
                    <div className={st('card-color')}>
                        {colors.map((color) => (
                            <button
                                key={color.colorId}
                                style={{ backgroundColor: color.colorHex }}
                                onClick={(e) => handleSelectColor(e, color)}
                                className={st('color-btn', {
                                    selected: selectedColor.colorId === color.colorId,
                                })}>
                                {color.colorName}
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
