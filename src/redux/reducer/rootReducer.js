import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../reducer/userReducer';
import cartReducer from '../reducer/cartReducer';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
});

export default rootReducer;
