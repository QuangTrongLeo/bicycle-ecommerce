import { store } from '~/redux/store';

export const getSizeById = (sizeId) => {
    const state = store.getState();
    const productSizes = state.productSize.items;
    return productSizes.find((s) => s.id === sizeId) || null;
};

export const getSizesByColorId = (colorId) => {
    const state = store.getState();
    const productSizes = state.productSize.items;
    return productSizes
        .filter((s) => s.colorId === colorId)
        .map((s) => ({
            sizeId: s.id,
            sizeName: s.size,
            stock: s.stock,
        }));
};
