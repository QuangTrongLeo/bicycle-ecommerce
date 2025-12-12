import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency, formatRoundToThousand } from '~/utils';
import styles from './style.module.scss';
import { showCartNotification } from '~/components/CartNotification';
import { addSize } from '~/redux/action/shoppingAction';
import { showToast } from '~/components/Toast/Toast';

const st = classNames.bind(styles);

function MainProductCard({ product }) {
    const { id, name, price, discount, colors } = product;

    const dispatch = useDispatch();
    const { sizes: cartSizes } = useSelector((state) => state.shopping);
    const currentUser = useSelector((state) => state.user.currentUser);
    const userId = currentUser?.id || null;

    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [currentImg, setCurrentImg] = useState(colors[0].images[0].imageUrl);

    const finalPrice =
        discount > 0 ? formatRoundToThousand(price - (price * discount) / 100) : formatRoundToThousand(price);

    const handleSelectColor = (e, color) => {
        e.preventDefault();
        setSelectedColor(color);
        setCurrentImg(color.images[0].imageUrl);
    };

    const handleSelectSize = (e, size) => {
        e.preventDefault();
        if (!userId) {
            showToast('Bạn cần đăng nhập để thêm vào giỏ hàng!');
            return;
        }
        const quantityInCart = cartSizes.find((item) => item.sizeId === size.sizeId)?.quantity || 0;
        const totalQuantity = quantityInCart + 1; // mặc định mua 1
        if (totalQuantity > size.stock) {
            showToast(`Bạn chỉ có thể mua tối đa ${size.stock} sản phẩm cho Size ${size.sizeName}`);
            return;
        }

        const payload = {
            userId: currentUser.id,
            sizeId: size.sizeId,
            quantity: 1,
        };

        dispatch(addSize(payload));

        // Gọi notification đơn giản
        showCartNotification(size.sizeId);
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
        <Link to={`/detail/${id}`} className={st('link-wrapper')}>
            <div className={st('card-product')}>
                <div className={st('card-img-wrapper')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
    );
}

export default MainProductCard;
