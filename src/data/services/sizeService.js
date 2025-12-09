import { productSizes } from '../api';

export const getSizeById = (sizeId) => {
    return productSizes.find((s) => s.id === sizeId) || null;
};

export const getSizesByColorId = (colorId) => {
    return productSizes
        .filter((s) => s.colorId === colorId)
        .map((s) => ({
            sizeId: s.id,
            sizeName: s.size,
            stock: s.stock,
        }));
};
