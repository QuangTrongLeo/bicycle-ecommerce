export const DECREASE_VOUCHER_QUANTITY = 'DECREASE_VOUCHER_QUANTITY';

export const decreaseVoucherQuantity = (voucherId) => ({
    type: DECREASE_VOUCHER_QUANTITY,
    payload: { voucherId },
});
