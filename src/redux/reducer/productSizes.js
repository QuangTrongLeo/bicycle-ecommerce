// features/productSizes/productSizesReducer.js
import { ADD_PRODUCT_SIZE, UPDATE_STOCK, REMOVE_PRODUCT_SIZE } from '~/redux/action/productSizesAction';
import { productSizes as initialData } from '~/data/api/product/productSizeApi';

const INITIAL_STATE = {
    items: initialData, // lưu mảng productSizes
};

const productSizesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_PRODUCT_SIZE: {
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        }

        case UPDATE_STOCK: {
            const { id, stock } = action.payload;
            return {
                ...state,
                items: state.items.map((item) => (item.id === id ? { ...item, stock } : item)),
            };
        }

        case REMOVE_PRODUCT_SIZE: {
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };
        }

        default:
            return state;
    }
};

export default productSizesReducer;
