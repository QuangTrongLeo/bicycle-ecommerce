const currency = (value) => {
    const numberValue = Number(value);
    if (!value || isNaN(numberValue)) return '0';

    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
    }).format(numberValue);
};

export default currency;
