import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_SIZE_QUANTITY, REMOVE_SIZE, confirmOrder } from '~/redux/action/shoppingAction';
import { updateStock } from '~/redux/action/productSizesAction'; // THÊM IMPORT NÀY
import { getAllDeliveryMethods, getAllPaymentMethods, calculateDelivery, getProductBySizeId } from '~/data/services';
import styles from './style.module.scss';
import { showToast } from '~/components/Toast/Toast';

const st = classNames.bind(styles);

function Cart() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const userId = currentUser?.id;

    // Lấy tất cả sizes từ shopping state và lọc theo userId
    const sizes = useSelector((state) => state.shopping.sizes);
    const userSizes = useMemo(() => sizes.filter((item) => item.userId === userId), [sizes, userId]);

    const [shoppingCartItems, setShoppingCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [listDeliveries, setListDeliveries] = useState([]);
    const [listPayments, setListPayments] = useState([]);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState(1);
    const [selectedPaymentId, setSelectedPaymentId] = useState(1);

    // Load phương thức giao hàng và thanh toán
    useEffect(() => {
        setListDeliveries(getAllDeliveryMethods());
        setListPayments(getAllPaymentMethods());
    }, []);

    // Ghép chi tiết sản phẩm vào giỏ hàng
    useEffect(() => {
        if (!userSizes || userSizes.length === 0) {
            setShoppingCartItems([]);
            return;
        }

        const fullItems = userSizes
            .map((item) => {
                const productDetail = getProductBySizeId(item.sizeId);
                if (!productDetail) return null;
                return { ...item, ...productDetail };
            })
            .filter(Boolean);
        setShoppingCartItems(fullItems);
    }, [userSizes]);

    // Tính tổng thanh toán
    const totalAmount = useMemo(() => {
        const productsTotal = selectedItems.reduce((acc, item) => acc + item.quantity * item.discountPrice, 0);
        const deliveryFee = calculateDelivery(selectedDeliveryId).shippingFee;
        return productsTotal + deliveryFee;
    }, [selectedItems, selectedDeliveryId]);

    const increaseQuantity = (index) => {
        const item = shoppingCartItems[index];
        const productDetail = getProductBySizeId(item.sizeId);

        if (item.quantity < productDetail.stock) {
            dispatch({
                type: UPDATE_SIZE_QUANTITY,
                payload: { userId, sizeId: item.sizeId, quantity: item.quantity + 1 },
            });
        } else {
            showToast(`Không thể mua quá tồn kho (${productDetail.stock})`);
        }
    };

    const decreaseQuantity = (index) => {
        const item = shoppingCartItems[index];
        if (item.quantity > 1) {
            dispatch({
                type: UPDATE_SIZE_QUANTITY,
                payload: { userId, sizeId: item.sizeId, quantity: item.quantity - 1 },
            });
        }
    };

    const handleDelete = (index) => {
        const item = shoppingCartItems[index];
        dispatch({ type: REMOVE_SIZE, payload: { userId, sizeId: item.sizeId } });
    };

    // Chọn hoặc bỏ chọn item
    const toggleSelection = (item) => {
        if (selectedItems.some((i) => i.sizeId === item.sizeId)) {
            setSelectedItems(selectedItems.filter((i) => i.sizeId !== item.sizeId));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const isSelected = (item) => selectedItems.some((i) => i.sizeId === item.sizeId);

    // --------------------------
    // HANDLE CHECKOUT - ĐÃ CẬP NHẬT
    // --------------------------
    const handleCheckout = () => {
        if (selectedItems.length === 0) return;

        // Kiểm tra tồn kho trước khi đặt hàng
        for (const item of selectedItems) {
            const productDetail = getProductBySizeId(item.sizeId);
            if (item.quantity > productDetail.stock) {
                showToast(`Sản phẩm ${productDetail.nameProduct} vượt tồn kho. Vui lòng giảm số lượng.`);
                return;
            }
        }

        const orderItems = selectedItems.map((item) => ({
            sizeId: item.sizeId,
            quantity: item.quantity,
            price: item.discountPrice,
        }));

        // Dispatch action xác nhận đơn hàng
        dispatch(
            confirmOrder({
                userId,
                items: orderItems,
                deliveryId: selectedDeliveryId,
                paymentId: selectedPaymentId,
            })
        );

        // CẬP NHẬT TỒN KHO SAU KHI ĐẶT HÀNG THÀNH CÔNG
        selectedItems.forEach((item) => {
            const productDetail = getProductBySizeId(item.sizeId);
            const newStock = productDetail.stock - item.quantity;

            // Dispatch action cập nhật stock
            dispatch(
                updateStock({
                    id: item.sizeId,
                    stock: newStock,
                })
            );
        });

        // Xóa các items đã mua khỏi giỏ hàng
        selectedItems.forEach((item) => {
            dispatch({
                type: REMOVE_SIZE,
                payload: { userId, sizeId: item.sizeId },
            });
        });

        setSelectedItems([]);
        showToast('Bạn đã đặt hàng thành công');
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
