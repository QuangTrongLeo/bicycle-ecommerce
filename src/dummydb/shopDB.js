import category1 from '../assets/img/category/category1.png';
import category2 from '../assets/img/category/category2.png';
import category3 from '../assets/img/category/category3.png';
import category4 from '../assets/img/category/category4.png';

import product1 from '../assets/img/product/product1.png';
import product2 from '../assets/img/product/product2.png';

export const categories = [
    { id: 1, type: 'sport', name: 'Xe đạp thể thao', img: category1 },
    { id: 2, type: 'kids', name: 'Xe đạp trẻ em', img: category2 },
    { id: 3, type: 'electric', name: 'Xe đạp trợ lực điện', img: category3 },
    { id: 4, type: 'accessory', name: 'Phụ kiện', img: category4 },
];

export const products = [
    {
        id: 1,
        categoryId: 1,
        img: product1,
        name: 'Galaxy 100',
        desc: 'Xe đạp Galaxy',
        price: 3690000,
        discount: 13,
        createdAt: '2024-12-26',
    },
    {
        id: 2,
        categoryId: 1,
        img: product1,
        name: 'Xe đạp Galaxy mẫu 2',
        desc: 'Xe đạp Galaxy',
        price: 3690000,
        discount: 0,
        createdAt: '2024-12-20',
    },
    {
        id: 3,
        categoryId: 2,
        img: product1,
        name: 'Xe đạp nhập khẩu cao cấp',
        desc: 'Xe đạp nhập khẩu',
        price: 4990000,
        discount: 10,
        createdAt: '2024-12-15',
    },
    {
        id: 4,
        categoryId: 3,
        img: product1,
        name: 'Xe đạp trẻ em Galaxy',
        desc: 'Xe đạp trẻ em',
        price: 2490000,
        discount: 0,
        createdAt: '2024-12-10',
    },
    {
        id: 5,
        categoryId: 3,
        img: product1,
        name: 'Xe đạp trẻ em Galaxy mẫu 2',
        desc: 'Xe đạp trẻ em',
        price: 2490000,
        discount: 0,
        createdAt: '2024-11-30',
    },
    {
        id: 6,
        categoryId: 4,
        img: product2,
        name: 'Xe đạp trẻ em Galaxy mẫu 2',
        desc: 'Xe đạp trẻ em',
        price: 2490000,
        discount: 0,
        createdAt: '2024-11-30',
    },
    {
        id: 7,
        categoryId: 4,
        img: product2,
        name: 'Xe đạp trẻ em Galaxy mẫu 2',
        desc: 'Xe đạp trẻ em',
        price: 2490000,
        discount: 0,
        createdAt: '2024-11-30',
    },
    {
        id: 8,
        categoryId: 4,
        img: product2,
        name: 'Xe đạp trẻ em Galaxy mẫu 2',
        desc: 'Xe đạp trẻ em',
        price: 2490000,
        discount: 0,
        createdAt: '2024-11-30',
    },
    {
        id: 9,
        categoryId: 4,
        img: product2,
        name: 'Xe đạp trẻ em Galaxy mẫu 2',
        desc: 'Xe đạp trẻ em',
        price: 2490000,
        discount: 0,
        createdAt: '2024-11-30',
    },
];

export const getAllCategories = () => [...categories];

export const getProductsByCategory = (cateId) => products.filter((p) => p.categoryId === cateId);

export const getNewestProducts = (limit = 10) => {
    return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
};

const getProductsByCategoryType = (type, limit) => {
    const category = categories.find((c) => c.type === type);
    if (!category) return [];

    let list = products.filter((p) => p.categoryId === category.id);
    return limit ? list.slice(0, limit) : list;
};
export const accessoryProducts = (limit = 10) => {
    return getProductsByCategoryType('accessory', limit);
};
