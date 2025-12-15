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
export const confirmOrder = ({
    userId,
    items,
    deliveryId,
    paymentId,
    shippingFee,
    productsTotalFee,
    discountFee,
    totalPrice,
}) => {
    return {
        type: CONFIRM_ORDER,
        payload: {
            userId,
            items,
            deliveryId,
            paymentId,
            shippingFee,
            productsTotalFee,
            discountFee,
            totalPrice,
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
