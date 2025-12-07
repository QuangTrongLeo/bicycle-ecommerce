import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../reducer/userReducer';
import shoppingReducer from './shoppingReducer';

const rootReducer = combineReducers({
    user: userReducer,
    shopping: shoppingReducer,
});

export default rootReducer;
