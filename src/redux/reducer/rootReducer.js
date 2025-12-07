import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../reducer/counterReducer';
import userReducer from '../reducer/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
