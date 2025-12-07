import { productSizes } from '../api';

export const getSizesByColorId = (colorId) => {
    return productSizes
        .filter((s) => s.colorId === colorId)
        .map((s) => ({
            sizeId: s.id,
            sizeName: s.size,
            stock: s.stock,
        }));
};
