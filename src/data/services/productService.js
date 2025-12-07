import {
    products,
    categories,
    productColors,
    productImages,
    productSizes,
    orderItems,
    orderStatusHistory,
} from '~/data/api';
import { useSelector } from 'react-redux';

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
                    stock: s.stock,
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

export const getAllProductsFullPaginate = (page = 1, limit = 10) => {
    const fullList = products.map((p) => getFullProduct(p.id));

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

export const getTopCategoriesBySold = (limit = 3) => {
    // 1. Lấy các order đã completed từ lịch sử trạng thái
    const completedOrderIds = orderStatusHistory.filter((s) => s.status === 'completed').map((s) => s.orderId);

    // 2. Đếm số lượng bán theo category
    const categoryCount = {};

    orderItems.forEach((item) => {
        // chỉ tính các item thuộc order đã hoàn thành
        if (!completedOrderIds.includes(item.orderId)) return;

        const product = products.find((p) => p.id === item.productId);
        if (!product) return;

        const cateId = product.categoryId;

        categoryCount[cateId] = (categoryCount[cateId] || 0) + item.quantity;
    });

    // 3. Convert thành mảng & sort
    const sorted = Object.keys(categoryCount)
        .map((cateId) => ({
            ...categories.find((c) => c.id === Number(cateId)),
            sold: categoryCount[cateId],
        }))
        .sort((a, b) => b.sold - a.sold);

    return sorted.slice(0, limit);
};

export const getProductsByCategoryPaginate = (categoryId, page = 1, limit = 8) => {
    let list = products.filter((p) => p.categoryId === Number(categoryId));
    const full = list.map((p) => getFullProduct(p.id));

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

export const getAllColors = (limit = 8) => {
    const unique = productColors
        .map((c) => ({
            id: c.id,
            code: c.colorHex,
            name: c.colorName,
        }))
        .filter((item, index, arr) => arr.findIndex((x) => x.code === item.code) === index);

    return unique.slice(0, limit);
};

export const getProductFromSizeId = (sizeId) => {
    const size = productSizes.find((s) => s.id === sizeId);
    if (!size) return null;

    const color = productColors.find((c) => c.id === size.colorId);
    if (!color) return null;

    const product = products.find((p) => p.id === color.productId);
    if (!product) return null;

    const images = productImages.filter((img) => img.colorId === color.id).map((i) => i.imageUrl);

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
        discountPrice: product.discount || product.price,
    };
};
