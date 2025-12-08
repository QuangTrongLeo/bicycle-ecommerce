import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { getProductById } from '~/data/services';

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

    const { sizes: cartSizes } = useSelector((state) => state.shopping);

    // Load product
    useEffect(() => {
        const p = getProductById(Number(id));
        if (!p) return;

        const firstColor = p.colors[0];
        const firstSize = firstColor.sizes[0];

        setProduct(p);
        setSelectedColor(firstColor);
        setSelectedSize(firstSize);
        setSelectedImg(firstColor.images[0].imageUrl);
    }, [id]);

    if (!product || !selectedColor || !selectedSize) return <h3>Đang tải dữ liệu sản phẩm...</h3>;

    const currentColor = selectedColor;
    const currentSize = selectedSize;

    const handleSelectColor = (colorObj) => {
        setSelectedColor(colorObj);
        setSelectedSize(colorObj.sizes[0]);
        setQuantity(1);
        setSelectedImg(colorObj.images[0].imageUrl);
    };

    const increase = () => {
        const maxStock = currentSize.stock;
        setQuantity((q) => (q < maxStock ? q + 1 : q));
    };

    const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const handleAddToCart = () => {
        const quantityInCart = cartSizes.find((item) => item.sizeId === currentSize.sizeId)?.quantity || 0;

        const totalQuantity = quantityInCart + quantity;

        if (totalQuantity > currentSize.stock) {
            alert(`Bạn chỉ có thể mua tối đa ${currentSize.stock} sản phẩm cho Size ${currentSize.sizeName}`);
            return;
        }

        dispatch(
            addSize({
                sizeId: currentSize.sizeId,
                quantity,
            })
        );

        alert(`Đã thêm Size ${currentSize.sizeName} vào giỏ hàng`);
        setQuantity(1);
    };

    return (
        <div className={st('detail-page')}>
            <div className="container">
                {/* TITLE */}
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10 py-3">
                        <h3 className="fw-bold">Chi tiết sản phẩm</h3>
                    </div>
                </div>

                <div className={st('content-detail', 'container')}>
                    <div className="row">
                        {/* THUMBNAIL */}
                        <div className="col-12 col-md-1">
                            <div className={st('thumbnail-container', 'mt-5')}>
                                {currentColor.images.map((img, i) => (
                                    <div key={i} className={st('thumbnail-item')}>
                                        <img
                                            src={img.imageUrl}
                                            className="img-fluid"
                                            style={{ objectFit: 'contain' }}
                                            onClick={() => setSelectedImg(img.imageUrl)}
                                            alt=""
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* MAIN IMAGE */}
                        <div className={`${st('main-image')} col-12 col-md-5 d-flex justify-content-center`}>
                            <img src={selectedImg} className="img-fluid" alt="" />
                        </div>

                        {/* INFO */}
                        <div className="col-12 col-md-5">
                            <div className={st('info', 'ms-3')}>
                                <h1 className="fw-bold" style={{ fontSize: 32 }}>
                                    {product.name}
                                </h1>

                                <h3 className="fw-bold mt-3" style={{ fontSize: 24 }}>
                                    {product.price.toLocaleString()}đ
                                </h3>

                                {/* COLORS */}
                                <h3 className="mt-4">Màu sắc</h3>
                                <div className="row mb-1">
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
                                <h3 className="mt-4">Kích cỡ</h3>
                                <div className="row mb-4">
                                    {currentColor.sizes.map((size) => (
                                        <div className="col-auto text-center" key={size.sizeId}>
                                            <button
                                                className={st(
                                                    'option-size',
                                                    selectedSize.sizeId === size.sizeId && 'sizeOnClicked'
                                                )}
                                                onClick={() => {
                                                    setSelectedSize(size);
                                                    setQuantity(1);
                                                }}
                                                disabled={size.stock === 0}
                                                style={{
                                                    opacity: size.stock === 0 ? 0.4 : 1,
                                                    cursor: size.stock === 0 ? 'not-allowed' : 'pointer',
                                                }}>
                                                <span className="fw-bold">Size {size.sizeName}</span>
                                            </button>

                                            <div style={{ fontSize: 12, marginTop: 4 }}>
                                                {size.stock > 0 ? `Còn ${size.stock}` : 'Hết hàng'}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* QUANTITY */}
                                <div className="row mb-5">
                                    <div className="col-auto">
                                        <button
                                            className={`sl-box rounded-pill d-flex justify-content-lg-around align-items-center me-2`}
                                            style={{
                                                width: 100,
                                                height: 50,
                                                backgroundColor: '#fff',
                                                border: '1px solid black',
                                            }}>
                                            <FontAwesomeIcon icon={faMinus} onClick={decrease} />
                                            <span className="fw-bold">{quantity}</span>
                                            <FontAwesomeIcon icon={faPlus} onClick={increase} />
                                        </button>
                                    </div>

                                    {/* ADD TO CART */}
                                    <div className="col-auto" style={{ flex: 1, height: 50 }}>
                                        <button
                                            className={st(
                                                'addToCard',
                                                'cart-box',
                                                'rounded-pill',
                                                'd-flex',
                                                'justify-content-center',
                                                'align-items-center'
                                            )}
                                            onClick={handleAddToCart}>
                                            <FontAwesomeIcon icon={faCartShopping} className="mx-2" />
                                            <span className="fw-bold">Thêm vào giỏ hàng</span>
                                        </button>
                                    </div>
                                </div>

                                {/* POLICIES */}
                                <div className={`${st('policy')} row mb-5`}>
                                    <h4 className="fw-bold">POLICIES</h4>

                                    <div className="col-6 d-flex align-items-center mb-2">
                                        <FontAwesomeIcon icon={faRotate} className="me-2" />
                                        <span>60 ngày đổi trả</span>
                                    </div>

                                    <div className="col-6 d-flex align-items-center mb-2">
                                        <FontAwesomeIcon icon={faMedal} className="me-2" />
                                        <span>Đúng chất liệu, màu sắc</span>
                                    </div>

                                    <div className="col-6 d-flex align-items-center mt-3">
                                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                                        <span>Hotline 113 hỗ trợ 8h30 - 22h</span>
                                    </div>

                                    <div className="col-6 d-flex align-items-center mt-3">
                                        <FontAwesomeIcon icon={faStreetView} className="me-2" />
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
