import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../reducer/counterReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
});

export default rootReducer;
