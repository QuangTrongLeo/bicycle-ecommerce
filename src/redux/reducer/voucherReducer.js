import { DECREASE_VOUCHER_QUANTITY } from '../action/voucherAction';

const INITIAL_STATE = { vouchers: [] };

const voucherReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DECREASE_VOUCHER_QUANTITY: {
            const { voucherId } = action.payload;

            return {
                ...state,
                vouchers: state.vouchers.map((voucher) =>
                    voucher.id === voucherId && voucher.quantity > 0
                        ? { ...voucher, quantity: voucher.quantity - 1 }
                        : voucher
                ),
            };
        }

        default:
            return state;
    }
};

export default voucherReducer;
