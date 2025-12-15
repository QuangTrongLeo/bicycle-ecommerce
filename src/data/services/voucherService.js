import { vouchers } from '../api';

export const getVouchers = () => {
    return vouchers;
};

export const getVoucherById = (vouchers, voucherId) => {
    return vouchers.find((v) => v.id === voucherId) || null;
};
