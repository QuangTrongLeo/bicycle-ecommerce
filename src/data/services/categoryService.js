import { categories } from '../api';

export const getCategoryBySlug = (slug) => {
    return categories.find((category) => category.name === slug);
};
