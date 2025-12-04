export const orders = [
    {
        id: 1,
        userId: 2,
        createdAt: '2024-12-20 10:25',
        status: 'processing',
        totalPrice: 7380000,
        shippingAddress: '123, Đường 123, Quận 1, TP.HCM',
        paymentMethod: 'cod',
    },
    {
        id: 2,
        userId: 2,
        createdAt: '2024-12-22 14:10',
        status: 'completed',
        totalPrice: 2490000,
        shippingAddress: '123, Đường 123, Quận 1, TP.HCM',
        paymentMethod: 'momo',
    },

    {
        id: 3,
        userId: 1,
        createdAt: '2024-12-25 09:12',
        status: 'completed',
        totalPrice: 4990000,
        paymentMethod: 'cod',
        shippingAddress: '456, Đường XYZ, Hà Nội',
    },
    {
        id: 4,
        userId: 2,
        createdAt: '2024-12-26 13:50',
        status: 'shipping',
        totalPrice: 2490000,
        paymentMethod: 'banking',
        shippingAddress: '789, Đường ABC, Đà Nẵng',
    },
];
