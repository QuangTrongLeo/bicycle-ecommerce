import { categories, products, orderItems, orderStatusHistory } from '../api';
import { formatSlugify } from '~/utils';

export const getCategories = () => [...categories];

export const getCategoryBySlug = (slug) => {
    const category = categories.find((c) => formatSlugify(c.name) === slug);
    return category || null;
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
