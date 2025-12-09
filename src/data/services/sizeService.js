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

export const decreaseSizeStock = (sizeId, quantity) => {
    const sizeToUpdate = getSizeById(sizeId);

    if (sizeToUpdate) {
        const newStock = sizeToUpdate.stock - quantity;
        sizeToUpdate.stock = newStock >= 0 ? newStock : 0;
        return sizeToUpdate;
    }

    return null;
};

export const increaseSizeStock = (sizeId, quantity) => {
    const sizeToUpdate = getSizeById(sizeId);

    if (sizeToUpdate) {
        const newStock = sizeToUpdate.stock + quantity;
        sizeToUpdate.stock = newStock;
        return sizeToUpdate;
    }

    return null;
};
