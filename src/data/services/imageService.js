import { productImages } from '../api';

export const getImagesByColorId = (colorId) => {
    return productImages
        .filter((img) => img.colorId === colorId)
        .map((img) => ({
            imageId: img.id,
            imageUrl: img.imageUrl,
        }));
};
