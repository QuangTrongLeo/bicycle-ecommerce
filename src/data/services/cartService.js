import { getProductByColorId } from './productService';
import { getColorById } from './colorService';
import { getSizeById } from './sizeService';
import { formatRoundToThousand } from '~/utils';

export const buildCartItem = (sizeId, quantity) => {
    const size = getSizeById(sizeId);
    const color = getColorById(size.colorId);
    const product = getProductByColorId(color.colorId);
    const image = color.images[0].imageUrl;
    const finalPrice =
        product.discount > 0
            ? formatRoundToThousand(product.price * (1 - product.discount / 100))
            : formatRoundToThousand(product.price);

    return {
        id: product.id,
        name: product.name,
        price: finalPrice,

        color: {
            colorId: color.colorId,
            colorName: color.colorName,
            colorHex: color.colorHex,
        },

        size: {
            sizeId: size.id,
            sizeName: size.size,
            stock: size.stock,
        },
        image,
        quantity,
    };
};
