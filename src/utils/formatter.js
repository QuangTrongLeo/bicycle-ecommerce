const formatCurrency = (value) => {
    const numberValue = Number(value);
    if (!value || isNaN(numberValue)) return '0';

    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
    }).format(numberValue);
};

const formatRoundToThousand = (value) => {
    if (!value || isNaN(Number(value))) return 0;
    return Math.round(Number(value) / 1000) * 1000;
};

export default {
    formatCurrency,
    formatRoundToThousand,
};
