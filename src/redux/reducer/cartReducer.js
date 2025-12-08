import { buildCartItem } from '~/data/services';
import { ADD_TO_CART } from '../action/cartAction';

const INITIAL_STATE = {
    userId: null,
    cartItems: [],
};

export default function cartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_TO_CART: {
            const { userId, sizeId, quantity } = action.payload;
            if (!userId) return state; // Chưa có userId thì không cho thêm vào cart
            const newCartItem = buildCartItem(sizeId, quantity);
            if (!newCartItem) return state;
            const currentUserCart = userId === state.userId ? state.cartItems : [];
            const existingCartItem = currentUserCart.find((cartItem) => cartItem.size.sizeId === sizeId); // Kiểm tra sản phầm cùng size có tồn tại chưa
            let updatedCartItems;
            if (existingCartItem) {
                // Nếu đã tồn tại thì cộng dồn số lượng
                updatedCartItems = currentUserCart.map((cartItem) =>
                    cartItem.size.sizeId === sizeId ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
                );
            } else {
                // Nếu tồn tại thì thêm cartItem mới
                updatedCartItems = [...currentUserCart, newCartItem];
            }

            return {
                ...state,
                userId,
                cartItems: updatedCartItems,
            };
        }

        default:
            return state;
    }
}
