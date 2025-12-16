import {
    ADD_SIZE,
    UPDATE_SIZE_QUANTITY,
    REMOVE_SIZE,
    PROCESSING_ORDER,
    CONFIRM_ORDER,
} from '~/redux/action/shoppingAction';

// INITIAL STATE
const INITIAL_STATE = {
    sizes: [], // [{ userId, sizeId, quantity }, ...]
    orderHistory: [], // Lưu các đơn hàng đã hoàn tất
    processingOrder: null,
};

// REDUCER
const shoppingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SIZE: {
            console.log('ADD_SIZE', action.payload);
            const { userId, sizeId, quantity } = action.payload;
            const existingIndex = state.sizes.findIndex((item) => item.sizeId === sizeId && item.userId === userId);

            if (existingIndex !== -1) {
                const updatedSizes = state.sizes.map((item, idx) =>
                    idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
                );
                return { ...state, sizes: updatedSizes };
            } else {
                return { ...state, sizes: [...state.sizes, { userId, sizeId, quantity }] };
            }
        }

        case UPDATE_SIZE_QUANTITY: {
            const { userId, sizeId, quantity } = action.payload;
            return {
                ...state,
                sizes: state.sizes.map((item) =>
                    item.userId === userId && item.sizeId === sizeId ? { ...item, quantity } : item
                ),
            };
        }

        case REMOVE_SIZE: {
            const { userId, sizeId } = action.payload;
            return {
                ...state,
                sizes: state.sizes.filter((item) => !(item.userId === userId && item.sizeId === sizeId)),
            };
        }

        case PROCESSING_ORDER: {
            return {
                ...state,
                processingOrder: {
                    ...action.payload,
                    createdAt: Date.now(),
                },
            };
        }

        case CONFIRM_ORDER: {
            const {
                id,
                userId,
                items,
                deliveryId,
                paymentId,
                shippingFee,
                productsTotalFee,
                discountFee,
                totalPrice,
                date,
                orderStatusHistory,
            } = action.payload;
            const purchasedSizeIds = items.map((item) => item.sizeId);

            return {
                ...state,
                orderHistory: [
                    ...(Array.isArray(state.orderHistory) ? state.orderHistory : []),
                    {
                        id,
                        userId,
                        items,
                        deliveryId,
                        paymentId,
                        shippingFee,
                        productsTotalFee,
                        discountFee,
                        totalPrice,
                        date,
                        orderStatusHistory,
                    },
                ],
                sizes: state.sizes.filter(
                    (item) => !(item.userId === userId && purchasedSizeIds.includes(item.sizeId))
                ),
                processingOrder: null,
            };
        }

        default:
            return state;
    }
};

export default shoppingReducer;
