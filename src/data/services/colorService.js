import { productColors } from '../api';
import { getImagesByColorId } from './imageService';
import { getSizesByColorId } from './sizeService';

export const getColorsByProductId = (productId) => {
    return productColors
        .filter((c) => c.productId === productId)
        .map((c) => ({
            colorId: c.id,
            colorName: c.colorName,
            colorHex: c.colorHex,
            images: getImagesByColorId(c.id),
            sizes: getSizesByColorId(c.id),
        }));
};

export const getColors = (limit = 8) => {
    const unique = productColors
        .map((c) => ({
            id: c.id,
            code: c.colorHex,
            name: c.colorName,
        }))
        .filter((item, index, arr) => arr.findIndex((x) => x.code === item.code) === index);

    return unique.slice(0, limit);
};
