const roundToThousand = (value) => {
    if (!value || isNaN(Number(value))) return 0;
    return Math.round(Number(value) / 1000) * 1000;
};

export default roundToThousand;
