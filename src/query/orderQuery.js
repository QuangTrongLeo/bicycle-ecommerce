import { orderItems, products, productColors, productSizes, orders, orderStatusHistory } from '~/api';

export const getOrderDetail = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return null;

    const items = orderItems.filter((i) => i.orderId === orderId);

    // convert sang full product giống getFullProduct
    const fullItems = items.map((item) => {
        return {
            ...item,
            product: products.find((p) => p.id === item.productId),
            color: productColors.find((c) => c.id === item.colorId),
            size: productSizes.find((s) => s.id === item.sizeId),
        };
    });

    return {
        ...order,
        items: fullItems,
    };
};

export const getLatestStatus = (orderId) => {
    return orderStatusHistory
        .filter((s) => s.orderId === orderId)
        .sort((a, b) => new Date(b.time) - new Date(a.time))[0].status;
};
