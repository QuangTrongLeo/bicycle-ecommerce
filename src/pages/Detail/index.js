import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatCurrency, formatRoundToThousand } from '~/utils';
import { getProductById, buildsizeID, decreaseSizeStock } from '~/data/services';
import { showCartNotification } from '~/components/CartNotification';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMinus,
    faPlus,
    faMedal,
    faRotate,
    faPhone,
    faStreetView,
    faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { addSize } from '~/redux/action/shoppingAction';

const st = classNames.bind(styles);

function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedImg, setSelectedImg] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [sizeID, setSizeID] = useState(null);

    const { sizes: cartSizes } = useSelector((state) => state.shopping);
    const currentUser = useSelector((state) => state.user.currentUser);
    const userId = currentUser?.id || null;

    // Load product
    useEffect(() => {
        const p = getProductById(Number(id));
        if (!p) return;

        const firstColor = p.colors[0];
        const firstSize = firstColor.sizes[0];
        const firstImg = firstColor.images[0].imageUrl;

        setProduct(p);
        setSelectedColor(firstColor);
        setSelectedSize(firstSize);
        setSelectedImg(firstImg);
    }, [id]);

    useEffect(() => {
        if (product) {
            console.log(product);
        }
    }, [product]);

    if (!product || !selectedColor || !selectedSize) return <h3>Đang tải dữ liệu sản phẩm...</h3>;

    const finalPrice =
        product.discount > 0
            ? formatRoundToThousand(product.price - (product.price * product.discount) / 100)
            : formatRoundToThousand(product.price);

    const handleSelectColor = (color) => {
        setSelectedColor(color);
        setSelectedSize(color.sizes[0]);
        setSelectedImg(color.images[0].imageUrl);
        setQuantity(1);
        console.log(
            ` Bạn đã chọn màu: { colorId: ${color.colorId}, name: ${color.colorName}, colorHex: ${color.colorHex}}`
        );
    };

    const handleSelectSize = (size) => {
        setSelectedSize(size);
        setQuantity(1);
        console.log(`Bạn đã chọn size: { sizeId: ${size.sizeId}, sizeName: ${size.sizeName}, stock: ${size.stock} }`);
    };

    const handleIncreaseQuantity = () => {
        const maxStock = selectedSize.stock;
        setQuantity((q) => (q < maxStock ? q + 1 : q));
        console.log(`Số lượng: ${quantity + 1}`);
    };

    const handleDecreaseQuantity = () => {
        setQuantity((q) => (q > 1 ? q - 1 : 1));
        console.log(`Số lượng: ${quantity - 1}`);
    };

    const handledSize = () => {
        const quantityInCart = cartSizes.find((item) => item.sizeId === selectedSize.sizeId)?.quantity || 0;
        const totalQuantity = quantityInCart + quantity;

        if (!userId) {
            alert('Bạn cần đăng nhập để thêm vào giỏ hàng!');
            return;
        }
        if (totalQuantity > selectedSize.stock) {
            alert(`Bạn chỉ có thể mua tối đa ${selectedSize.stock} sản phẩm cho Size ${selectedSize.sizeName}`);
            return;
        }

        const payload = {
            userId: currentUser.id,
            sizeId: selectedSize.sizeId,
            quantity,
        };

        dispatch(addSize(payload));

        showCartNotification(selectedSize.sizeId);
    };

    return (
        <div className={st('detail-page')}>
            <div className="container">
                {/* TITLE */}
                <div className={st('row')}>
                    <div className={st('col-md-1')}></div>
                    <div className={st('col-md-10', 'py-3')}>
                        <h3 className={st('fw-bold')}>Chi tiết sản phẩm</h3>
                    </div>
                </div>

                {/* PRODUCT DETAIL */}
                <div className={st('content-detail', 'container')}>
                    <div className={st('row')}>
                        {/* THUMBNAIL */}
                        <div className={st('col-12', 'col-md-1')}>
                            <div className={st('thumbnail-container', 'mt-5')}>
                                {selectedColor.images.map((img, i) => (
                                    <div key={i} className={st('thumbnail-item')}>
                                        <img
                                            src={img.imageUrl}
                                            className={st('img-fluid')}
                                            style={{ objectFit: 'contain' }}
                                            onClick={() => setSelectedImg(img.imageUrl)}
                                            alt=""
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* MAIN IMAGE */}
                        <div className={st('main-image', 'col-12', 'col-md-5', 'd-flex', 'justify-content-center')}>
                            <img src={selectedImg} className={st('img-fluid')} alt="" />
                        </div>

                        {/* INFO */}
                        <div className={st('col-12', 'col-md-5')}>
                            <div className={st('info', 'ms-3')}>
                                <h1 className={st('fw-bold')} style={{ fontSize: 32 }}>
                                    {product.name}
                                </h1>
                                {product.discount > 0 ? (
                                    <div
                                        className={st('info-price', 'd-flex')}
                                        style={{ gap: product.discount > 0 ? 12 : 0 }}>
                                        <h4 className="fw-bold mt-3" style={{ fontSize: 20 }}>
                                            {formatCurrency(finalPrice)}đ
                                        </h4>
                                        <h4
                                            className="mt-3"
                                            style={{
                                                fontSize: 20,
                                                textDecoration: 'line-through',
                                                opacity: 0.6,
                                            }}>
                                            {formatCurrency(product.price)}đ
                                        </h4>
                                    </div>
                                ) : (
                                    <h4 className="fw-bold mt-3" style={{ fontSize: 20 }}>
                                        {formatCurrency(finalPrice)}đ
                                    </h4>
                                )}

                                {/* COLORS */}
                                <h3 className={st('mt-4')}>Màu sắc</h3>
                                <div className={st('row', 'mb-1')}>
                                    <div className={st('color-listProduct')}>
                                        {product.colors.map((color) => (
                                            <div
                                                key={color.colorId}
                                                className={st(
                                                    'option-color',
                                                    selectedColor.colorId === color.colorId && 'optionColorOnClicked'
                                                )}
                                                onClick={() => handleSelectColor(color)}>
                                                <button
                                                    style={{ backgroundColor: color.colorHex }}
                                                    className={st('color-button')}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* SIZES */}
                                <h3 className={st('mt-4')}>Kích cỡ</h3>
                                <div className={st('row', 'mb-4')}>
                                    {selectedColor.sizes.map((size) => (
                                        <div className={st('col-auto', 'text-center')} key={size.sizeId}>
                                            <button
                                                className={st(
                                                    'option-size',
                                                    selectedSize.sizeId === size.sizeId && 'sizeOnClicked'
                                                )}
                                                onClick={() => handleSelectSize(size)}
                                                disabled={size.stock === 0}
                                                style={{
                                                    opacity: size.stock === 0 ? 0.4 : 1,
                                                    cursor: size.stock === 0 ? 'not-allowed' : 'pointer',
                                                }}>
                                                <span className={st('fw-bold')}>Size {size.sizeName}</span>
                                            </button>

                                            <div style={{ fontSize: 12, marginTop: 4 }}>
                                                {size.stock > 0 ? `Còn ${size.stock}` : 'Hết hàng'}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* QUANTITY */}
                                <div className={st('row', 'mb-5')}>
                                    <div className={st('col-auto')}>
                                        <button
                                            className={`sl-box rounded-pill d-flex justify-content-lg-around align-items-center me-2`}
                                            style={{
                                                width: 100,
                                                height: 50,
                                                backgroundColor: '#fff',
                                                border: '1px solid black',
                                            }}>
                                            <FontAwesomeIcon icon={faMinus} onClick={handleDecreaseQuantity} />
                                            <span className={st('fw-bold')}>{quantity}</span>
                                            <FontAwesomeIcon icon={faPlus} onClick={handleIncreaseQuantity} />
                                        </button>
                                    </div>

                                    {/* ADD TO CART */}
                                    <div className={st('col-auto')} style={{ flex: 1, height: 50 }}>
                                        <button
                                            className={st(
                                                'addToCard',
                                                'cart-box',
                                                'rounded-pill',
                                                'd-flex',
                                                'justify-content-center',
                                                'align-items-center'
                                            )}
                                            onClick={handledSize}>
                                            <FontAwesomeIcon icon={faCartShopping} className={st('mx-2')} />
                                            <span className={st('fw-bold')}>Thêm vào giỏ hàng</span>
                                        </button>
                                    </div>
                                </div>

                                {/* POLICIES */}
                                <div className={`${st('policy')} row mb-5`}>
                                    <h4 className={st('fw-bold')}>POLICIES</h4>

                                    <div className={st('col-6', 'd-flex', 'align-items-center', 'mb-2')}>
                                        <FontAwesomeIcon icon={faRotate} className={st('me-2')} />
                                        <span>60 ngày đổi trả</span>
                                    </div>

                                    <div className={st('col-6', 'd-flex', 'align-items-center', 'mb-2')}>
                                        <FontAwesomeIcon icon={faMedal} className={st('me-2')} />
                                        <span>Đúng chất liệu, màu sắc</span>
                                    </div>

                                    <div className={st('col-6', 'd-flex', 'align-items-center', 'mb-3')}>
                                        <FontAwesomeIcon icon={faPhone} className={st('me-2')} />
                                        <span>Hotline 113 hỗ trợ 8h30 - 22h</span>
                                    </div>

                                    <div className={st('col-6', 'd-flex', 'align-items-center', 'mb-3')}>
                                        <FontAwesomeIcon icon={faStreetView} className={st('me-2')} />
                                        <span>Nhận hàng trả tại nhà</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
