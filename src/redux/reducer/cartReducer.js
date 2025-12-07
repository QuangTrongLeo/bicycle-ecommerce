import { ADD_SIZE, UPDATE_SIZE_QUANTITY, REMOVE_SIZE } from '~/redux/action/cartAction';

// INITIAL STATE
const INITIAL_STATE = {
    sizes: [], // [{ sizeId: 1, quantity: 2 }, ...]
};

// REDUCER
const sizeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SIZE:
            const existingIndex = state.sizes.findIndex((item) => item.sizeId === action.payload.sizeId);
            if (existingIndex >= 0) {
                const updatedSizes = [...state.sizes];
                updatedSizes[existingIndex].quantity = action.payload.quantity;
                return {
                    ...state,
                    sizes: updatedSizes,
                };
            } else {
                return {
                    ...state,
                    sizes: [...state.sizes, action.payload],
                };
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

        default:
            return state;
    }
};

export default sizeReducer;
