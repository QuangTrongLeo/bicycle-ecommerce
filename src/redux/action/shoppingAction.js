// ACTION TYPES
import { calculateDelivery } from '~/data/services/deliveryService';

export const ADD_SIZE = 'ADD_SIZE';
export const UPDATE_SIZE_QUANTITY = 'UPDATE_SIZE_QUANTITY';
export const REMOVE_SIZE = 'REMOVE_SIZE';
export const CONFIRM_ORDER = 'CONFIRM_ORDER'; //

// ACTION CREATORS
export const addSize = (size) => ({
    type: ADD_SIZE,
    payload: size, // { sizeId, quantity }
});

export const updateSizeQuantity = (size) => ({
    type: UPDATE_SIZE_QUANTITY,
    payload: size, // { sizeId, quantity }
});

export const removeSize = (sizeId) => ({
    type: REMOVE_SIZE,
    payload: { sizeId },
});

// Thêm hàm xác nhận đơn hàng
export const confirmOrder = ({ items, deliveryId, paymentId }) => {
    const shippingFee = calculateDelivery(deliveryId).shippingFee;
    const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0) + shippingFee;

    return {
        type: CONFIRM_ORDER,
        payload: {
            items, // [{ sizeId, quantity, price }]
            totalPrice, // tổng tiền sản phẩm + phí ship
            shippingFee, // phí vận chuyển
            deliveryId, // hình thức giao hàng
            paymentId, // hình thức thanh toán
            date: new Date().toISOString(), // thời gian mua
            orderStatusHistory: [
                {
                    status: 'pending',
                    time: new Date().toISOString(),
                },
            ],
        },
    };
};
