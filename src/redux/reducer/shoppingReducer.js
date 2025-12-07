import { ADD_SIZE, UPDATE_SIZE_QUANTITY, REMOVE_SIZE, CONFIRM_ORDER } from '~/redux/action/shoppingAction';

// INITIAL STATE
const INITIAL_STATE = {
    sizes: [], // [{ sizeId: 1, quantity: 2 }, ...]
    orderHistory: [], // Lưu các đơn hàng đã hoàn tất
};

// REDUCER
const shoppingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SIZE: {
            const { sizeId, quantity } = action.payload;
            const existingIndex = state.sizes.findIndex((item) => item.sizeId === sizeId);

            if (existingIndex !== -1) {
                // tạo item mới thay vì mutate trực tiếp
                const updatedSizes = state.sizes.map((item, idx) =>
                    idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
                );
                return { ...state, sizes: updatedSizes };
            } else {
                return { ...state, sizes: [...state.sizes, { sizeId, quantity }] };
            }
        }

        case UPDATE_SIZE_QUANTITY:
            return {
                ...state,
                sizes: state.sizes.map((item) =>
                    item.sizeId === action.payload.sizeId ? { ...item, quantity: action.payload.quantity } : item
                ),
            };

        case REMOVE_SIZE:
            return {
                ...state,
                sizes: state.sizes.filter((item) => item.sizeId !== action.payload.sizeId),
            };

        case CONFIRM_ORDER:
            const purchasedSizeIds = action.payload.items.map((item) => item.sizeId);
            return {
                ...state,
                orderHistory: [
                    ...(Array.isArray(state.orderHistory) ? state.orderHistory : []),
                    {
                        id: new Date().getTime(),
                        ...action.payload,
                    },
                ],
                sizes: state.sizes.filter((item) => !purchasedSizeIds.includes(item.sizeId)),
            };
        default:
            return state;
    }
};

export default shoppingReducer;
