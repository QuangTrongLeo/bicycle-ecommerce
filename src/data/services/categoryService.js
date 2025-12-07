import { categories } from '../api';
import { formatSlugify } from '~/utils';

export const getCategoryNameBySlug = (slug) => {
    const category = categories.find((c) => formatSlugify(c.name) === slug);
    return category ? category.name : null;
};

export const getCategoryIdBySlug = (slug) => {
    const category = categories.find((c) => formatSlugify(c.name) === slug);
    return category ? category.id : null;
};
