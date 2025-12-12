import { products, categories, productColors, productImages } from '~/data/api';
import { store } from '~/redux/store';
import { getColorsByProductId } from './colorService';

export const getProductByColorId = (colorId) => {
    const color = productColors.find((c) => c.id === colorId);
    if (!color) return null;

    return getProductById(color.productId);
};

export const getProductById = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return null;
    return {
        ...product,
        colors: getColorsByProductId(productId),
    };
};

export const getProductsByCategoryId = (categoryId) => {
    return products.filter((p) => p.categoryId === categoryId).map((p) => getProductById(p.id));
};

export const getProductsByCategoryType = (type, limit) => {
    const category = categories.find((c) => c.type === type);
    if (!category) return [];

    const list = products.filter((p) => p.categoryId === category.id);
    const fullList = list.map((p) => getProductById(p.id));

    return limit ? fullList.slice(0, limit) : fullList;
};

export const accessoryProducts = (limit = 10) => getProductsByCategoryType('accessory', limit);

export const getNewestProducts = (limit = 10) => {
    const sorted = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
    return sorted.map((p) => getProductById(p.id));
};

export const getAllProductsFullPaginate = (page = 1, limit = 10) => {
    const fullList = products.map((p) => getProductById(p.id));

    const total = fullList.length;
    const totalPages = Math.ceil(total / limit);

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
        data: fullList.slice(start, end),
        page,
        limit,
        total,
        totalPages,
    };
};

export const getProductsByCategoryPaginate = (categoryId, page = 1, limit = 8) => {
    let list = products.filter((p) => p.categoryId === Number(categoryId));
    const full = list.map((p) => getProductById(p.id));

    const total = full.length;
    const totalPages = Math.ceil(total / limit);

    const start = (page - 1) * limit;

    return {
        data: full.slice(start, start + limit),
        total,
        totalPages,
        page,
    };
};

export const getProductBySizeId = (sizeId) => {
    const state = store.getState();
    const productSizes = state.productSize.items;
    const size = productSizes.find((s) => s.id === sizeId);
    if (!size) return null;

    const color = productColors.find((c) => c.id === size.colorId);
    if (!color) return null;

    const product = products.find((p) => p.id === color.productId);
    if (!product) return null;

    const images = productImages.filter((img) => img.colorId === color.id).map((i) => i.imageUrl);

    const finalPrice = product.discount > 0 ? product.price - (product.price * product.discount) / 100 : product.price;
    return {
        productId: product.id,
        nameProduct: product.name,
        nameSize: size.size,
        stock: size.stock,
        colorId: color.id,
        nameColor: color.colorName,
        colorCode: color.colorHex,
        image: images[0] || '',
        price: product.price,
        finalPrice: finalPrice,
    };
};
