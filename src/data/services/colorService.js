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
