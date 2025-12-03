import { products } from '../table/products';
import { categories } from '../table/categories';
import { productColors } from '../table/productColors';
import { productImages } from '../table/productImages';
import { productSizes } from '../table/productSizes';

export const getFullProduct = (productId) => {
    const p = products.find((x) => x.id === productId);
    if (!p) return null;

    const colors = productColors.filter((c) => c.productId === productId);

    return {
        ...p,
        colors: colors.map((color) => ({
            ...color,
            images: productImages.filter((img) => img.colorId === color.id).map((i) => i.imageUrl),
            sizes: productSizes
                .filter((s) => s.colorId === color.id)
                .map((s) => ({
                    id: s.id,
                    size: s.size,
                    price: s.price,
                })),
        })),
    };
};

export const getProductsByCategoryType = (type, limit) => {
    const category = categories.find((c) => c.type === type);
    if (!category) return [];

    const list = products.filter((p) => p.categoryId === category.id);
    const fullList = list.map((p) => getFullProduct(p.id));

    return limit ? fullList.slice(0, limit) : fullList;
};

export const accessoryProducts = (limit = 10) => getProductsByCategoryType('accessory', limit);

export const getAllCategories = () => [...categories];

export const getNewestProductsFull = (limit = 10) => {
    const sorted = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);

    return sorted.map((p) => getFullProduct(p.id));
};
