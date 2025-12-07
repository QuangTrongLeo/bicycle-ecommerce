// ACTION TYPES
export const ADD_SIZE = 'ADD_SIZE';
export const UPDATE_SIZE_QUANTITY = 'UPDATE_SIZE_QUANTITY';
export const REMOVE_SIZE = 'REMOVE_SIZE';

// ACTION CREATORS
export const addSize = (size) => ({
    type: ADD_SIZE,
    payload: size, // { sizeId, quantity }
});

export const updateSizeQuantity = (size) => ({
    type: UPDATE_SIZE_QUANTITY,
    payload: size, // { sizeId, quantity }
});

export const removeSize = (sizeId) => ({
    type: REMOVE_SIZE,
    payload: { sizeId },
});
