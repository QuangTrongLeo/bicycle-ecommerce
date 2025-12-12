import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import shoppingReducer from './shoppingReducer';
import productSizesReducer from './productSizes';

const rootReducer = combineReducers({
    user: userReducer,
    shopping: shoppingReducer,
    productSize: productSizesReducer,
});

export default rootReducer;
