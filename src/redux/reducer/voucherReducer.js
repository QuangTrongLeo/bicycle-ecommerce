import { GET_VOUCHERS, DECREASE_VOUCHER_QUANTITY } from '../action/voucherAction';
import { vouchers } from '~/data/api';

const INITIAL_STATE = { vouchers: vouchers };

const voucherReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_VOUCHERS:
            return {
                ...state,
                vouchers: action.payload,
            };

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
