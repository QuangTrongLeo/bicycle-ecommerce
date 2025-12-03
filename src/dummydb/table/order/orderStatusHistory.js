export const orderStatusHistory = [
    // ORDER 1 — completed
    { id: 1, orderId: 1, status: 'processing', time: '2024-12-20 10:25' },
    { id: 2, orderId: 1, status: 'shipping', time: '2024-12-21 08:00' },
    { id: 3, orderId: 1, status: 'completed', time: '2024-12-22 09:00' },

    // ORDER 2 — completed
    { id: 4, orderId: 2, status: 'processing', time: '2024-12-22 14:10' },
    { id: 5, orderId: 2, status: 'shipping', time: '2024-12-22 18:30' },
    { id: 6, orderId: 2, status: 'completed', time: '2024-12-23 09:30' },

    // ORDER 3 — completed
    { id: 7, orderId: 3, status: 'processing', time: '2024-12-25 09:12' },
    { id: 8, orderId: 3, status: 'shipping', time: '2024-12-25 14:00' },
    { id: 9, orderId: 3, status: 'completed', time: '2024-12-26 11:00' },

    // ORDER 4 — failed
    { id: 10, orderId: 4, status: 'processing', time: '2024-12-26 13:50' },
    { id: 11, orderId: 4, status: 'shipping', time: '2024-12-27 09:10' },
    { id: 12, orderId: 4, status: 'failed', time: '2024-12-27 20:00' },
];
