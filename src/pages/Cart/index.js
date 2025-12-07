import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_SIZE_QUANTITY, REMOVE_SIZE, confirmOrder } from '~/redux/action/shoppingAction';
import { getProductFromSizeId } from '~/data/services/productService';
import { getAllDeliveryMethods, getAllPaymentMethods, calculateDelivery } from '~/data/services';
import styles from './style.module.scss';
const st = classNames.bind(styles);

function Cart() {
    const { sizes } = useSelector((state) => state.shopping);
    const dispatch = useDispatch();

    const [shoppingCartItems, setShoppingCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [listDeliveries, setListDeliveries] = useState([]);
    const [listPayments, setListPayments] = useState([]);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState(1);
    const [selectedPaymentId, setSelectedPaymentId] = useState(1);

    useEffect(() => {
        setListDeliveries(getAllDeliveryMethods());
        setListPayments(getAllPaymentMethods());
    }, []);

    useEffect(() => {
        if (!sizes || sizes.length === 0) {
            setShoppingCartItems([]);
            return;
        }

        const fullItems = sizes
            .map((item) => {
                const productDetail = getProductFromSizeId(item.sizeId);
                if (!productDetail) return null;
                return { ...item, ...productDetail };
            })
            .filter(Boolean);

        setShoppingCartItems(fullItems);
    }, [sizes]);

    const totalAmount = useMemo(() => {
        const productsTotal = selectedItems.reduce((acc, item) => acc + item.quantity * item.discountPrice, 0);
        const deliveryFee = calculateDelivery(selectedDeliveryId).shippingFee;
        return productsTotal + deliveryFee;
    }, [selectedItems, selectedDeliveryId]);

    // --------------------------
    // HANDLE QUANTITY
    // --------------------------
    const increaseQuantity = (index) => {
        const item = shoppingCartItems[index];
        const productDetail = getProductFromSizeId(item.sizeId);

        if (item.quantity < productDetail.stock) {
            dispatch({
                type: UPDATE_SIZE_QUANTITY,
                payload: { sizeId: item.sizeId, quantity: item.quantity + 1 },
            });
        } else {
            alert(`Không thể mua quá tồn kho (${productDetail.stock})`);
        }
    };

    const decreaseQuantity = (index) => {
        const item = shoppingCartItems[index];
        if (item.quantity > 1) {
            dispatch({
                type: UPDATE_SIZE_QUANTITY,
                payload: { sizeId: item.sizeId, quantity: item.quantity - 1 },
            });
        }
    };

    const handleDelete = (index) => {
        const item = shoppingCartItems[index];
        dispatch({ type: REMOVE_SIZE, payload: { sizeId: item.sizeId } });
    };

    const toggleSelection = (item) => {
        if (selectedItems.some((i) => i.sizeId === item.sizeId)) {
            setSelectedItems(selectedItems.filter((i) => i.sizeId !== item.sizeId));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const isSelected = (item) => selectedItems.some((i) => i.sizeId === item.sizeId);

    // --------------------------
    // HANDLE CHECKOUT
    // --------------------------
    const handleCheckout = () => {
        if (selectedItems.length === 0) return;

        // kiểm tra tồn kho trước khi checkout
        for (const item of selectedItems) {
            const productDetail = getProductFromSizeId(item.sizeId);
            if (item.quantity > productDetail.stock) {
                alert(`Sản phẩm ${productDetail.nameProduct} vượt tồn kho. Vui lòng giảm số lượng.`);
                return;
            }
        }

        const orderItems = selectedItems.map((item) => ({
            sizeId: item.sizeId,
            quantity: item.quantity,
            price: item.discountPrice,
        }));

        dispatch(
            confirmOrder({
                items: orderItems,
                deliveryId: selectedDeliveryId,
                paymentId: selectedPaymentId,
            })
        );

        setSelectedItems([]);
        alert('Đơn hàng đã được lưu vào lịch sử!');
    };

    return (
        <div className={st('cart-page')}>
            <main className="container py-5">
                <div className="row">
                    {/* LEFT - Cart items */}
                    <div className={`${st('right')} col-lg-8`}>
                        <h1 className="fw-bold">Giỏ hàng</h1>
                        {shoppingCartItems.length === 0 && (
                            <div className="alert alert-info text-center">
                                Giỏ hàng của bạn đang trống. Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!
                            </div>
                        )}
                        {shoppingCartItems.map((item, index) => (
                            <div
                                key={item.sizeId}
                                className={st('items', { selected: isSelected(item) })}
                                onClick={() => toggleSelection(item)}
                                style={{ cursor: 'pointer' }}>
                                <div className="row align-items-center">
                                    <div className="col-2">
                                        <img src={item.image} alt={item.nameProduct} className="img-fluid rounded-3" />
                                    </div>
                                    <div className="col-4">
                                        <h6 className="text-muted">{item.nameProduct}</h6>
                                        <h6>
                                            Size {item.nameSize} | {item.nameColor}
                                        </h6>
                                    </div>
                                    <div
                                        className={`${st('quantity')} col-2 d-flex`}
                                        onClick={(e) => e.stopPropagation()}>
                                        <button
                                            className={`${st('btn-quantity')}`}
                                            onClick={() => decreaseQuantity(index)}>
                                            -
                                        </button>
                                        <input readOnly value={item.quantity} className={`${st('input-quantity')}`} />
                                        <button
                                            className={`${st('btn-quantity')}`}
                                            onClick={() => increaseQuantity(index)}>
                                            +
                                        </button>
                                    </div>
                                    <div className="col-3">
                                        <h6 className="text-end">{item.discountPrice.toLocaleString()}đ</h6>
                                    </div>
                                    <div className="col-1 text-end">
                                        <button
                                            className="btn btn-link text-danger"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(index);
                                            }}>
                                            ×
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT - Summary */}
                    <div className="col-lg-4">
                        <div className="card p-4">
                            <h3 className="mb-4 fw-bold">Tóm tắt đơn hàng</h3>

                            <div className="mb-3">
                                <h5>Tổng số sản phẩm</h5>
                                <div id={st('totalSelectedItems')}>{selectedItems.length} món</div>
                            </div>

                            <div className="mb-3">
                                <h5>Phương thức giao hàng</h5>
                                <select
                                    id={st('deliverySelect')}
                                    className="form-select"
                                    value={selectedDeliveryId}
                                    onChange={(e) => setSelectedDeliveryId(Number(e.target.value))}>
                                    {listDeliveries.map((delivery) => (
                                        <option key={delivery.id} value={delivery.id}>
                                            {delivery.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <h5>Hình thức thanh toán</h5>
                                <select
                                    id={st('paymentId')}
                                    className="form-select"
                                    value={selectedPaymentId}
                                    onChange={(e) => setSelectedPaymentId(Number(e.target.value))}>
                                    {listPayments.map((payment) => (
                                        <option key={payment.id} value={payment.id}>
                                            {payment.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <hr />

                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                <h5>Chi phí sản phẩm</h5>
                                <div>
                                    {selectedItems
                                        .reduce((acc, item) => acc + item.quantity * item.discountPrice, 0)
                                        .toLocaleString()}
                                    đ
                                </div>
                            </div>

                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                <h5>Phí vận chuyển</h5>
                                <div>{calculateDelivery(selectedDeliveryId).shippingFee.toLocaleString()}đ</div>
                            </div>

                            <hr />

                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                <h5>Tổng thanh toán</h5>
                                <div className="text-danger fw-bold">{totalAmount.toLocaleString()}đ</div>
                            </div>

                            <button
                                className="btn btn-dark w-100 btn-lg"
                                disabled={selectedItems.length === 0}
                                onClick={handleCheckout}>
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Cart;
