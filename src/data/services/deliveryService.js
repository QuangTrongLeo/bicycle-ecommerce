import { delivery, payment, feePerKm } from '~/data/api';

// Lấy tất cả phương thức vận chuyển
export const getAllDeliveryMethods = () => {
    return delivery;
};

// Lấy tất cả phương thức thanh toán
export const getAllPaymentMethods = () => {
    return payment;
};

export const calculateDelivery = (deliveryId = 1) => {
    const distanceKm = 10; // khoảng cách cố định

    const priceFeePerKm = feePerKm.find((p) => p.deliveryId === deliveryId);
    const shippingFee = distanceKm * priceFeePerKm.price;
    return {
        deliveryId,
        distanceKm,
        shippingFee,
    };
};
