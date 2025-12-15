export const GET_VOUCHERS = 'GET_VOUCHERS';
export const DECREASE_VOUCHER_QUANTITY = 'DECREASE_VOUCHER_QUANTITY';

export const getVouchers = (vouchers) => ({
    type: GET_VOUCHERS,
    payload: vouchers,
});

export const decreaseVoucherQuantity = (voucherId) => ({
    type: DECREASE_VOUCHER_QUANTITY,
    payload: { voucherId },
});
