import { vouchers } from '../api';

export const getVouchers = () => {
    return vouchers;
};

export const getVoucherById = (voucherId) => {
    return vouchers.find((voucher) => voucher.id === voucherId) || null;
};
