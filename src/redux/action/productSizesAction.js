// redux/action/productSizesAction.js

// ACTION TYPES
export const ADD_PRODUCT_SIZE = 'ADD_PRODUCT_SIZE';
export const UPDATE_STOCK = 'UPDATE_STOCK';
export const REMOVE_PRODUCT_SIZE = 'REMOVE_PRODUCT_SIZE';

// ACTION CREATORS
export const addProductSize = (productSize) => ({
    type: ADD_PRODUCT_SIZE,
    payload: productSize, // { id, stock, ... }
});

export const updateStock = ({ id, stock }) => ({
    type: UPDATE_STOCK,
    payload: { id, stock },
});

export const removeProductSize = (id) => ({
    type: REMOVE_PRODUCT_SIZE,
    payload: id, // id của productSize cần xóa
});
