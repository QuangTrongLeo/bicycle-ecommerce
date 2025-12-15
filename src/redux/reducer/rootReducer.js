import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import shoppingReducer from './shoppingReducer';
import productSizesReducer from './productSizes';
import voucherReducer from './voucherReducer';

const rootReducer = combineReducers({
    user: userReducer,
    shopping: shoppingReducer,
    productSize: productSizesReducer,
    voucher: voucherReducer,
});

export default rootReducer;
