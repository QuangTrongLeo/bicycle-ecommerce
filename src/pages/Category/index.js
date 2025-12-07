import classNames from 'classnames/bind';
import styles from './style.module.scss';
import configs from '../../config';
import { useParams } from 'react-router-dom';
import { formatSlugify } from '~/utils';
import { categories } from '~/data/api';
import { MainProductCard, LimitList, GradientText, CartNotification } from '../../components';
import { xeDapFixedGearMagicbrosCX5PlusImages } from '~/assets/images/product/xe-dap-the-thao';
import { muBaoHiemXeDapSCOHIROWORKImages } from '~/assets/images/product/phu-kien';
const st = classNames.bind(styles);

const products = [
    {
        id: 1,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        desc: 'Mô tả chi tiết về xe đạp Fixed Gear Magicbros CX5 Plus.',
        category_id: 1,
        category_name: 'Xe Đạp',

        variants: [
            {
                color_id: 1,
                color_name: 'Trắng',
                hex_code: 'var(--white-color)',

                images: [xeDapFixedGearMagicbrosCX5PlusImages.white, muBaoHiemXeDapSCOHIROWORKImages.yellow],

                sizes: [
                    { size_id: 101, size_name: 'S', quantity: 20 },
                    { size_id: 102, size_name: 'M', quantity: 30 },
                    { size_id: 103, size_name: 'L', quantity: 0 },
                ],
            },

            {
                color_id: 2,
                color_name: 'Vàng',
                hex_code: 'yellow',

                images: [muBaoHiemXeDapSCOHIROWORKImages.yellow],

                sizes: [
                    { size_id: 201, size_name: 'M', quantity: 15 },
                    { size_id: 202, size_name: 'L', quantity: 15 },
                ],
            },
        ],
    },

    {
        id: 2,
        name: 'Mũ Bảo Hiểm Xe Đạp SCOHIR WORK',
        price: '850000',
        discount: '0',
        desc: 'Mũ bảo hiểm chất lượng cao dành cho xe đạp.',
        category_id: 2,
        category_name: 'Phụ Kiện',

        variants: [
            {
                color_id: 3,
                color_name: 'Vàng',
                hex_code: 'yellow',

                images: [muBaoHiemXeDapSCOHIROWORKImages.yellow],

                sizes: [{ size_id: 101, size_name: 'M', quantity: 75 }],
            },
        ],
    },
];

const findCategoryNameBySlug = (slug) => {
    const foundCategory = categories.find((cat) => formatSlugify(cat.name) === slug);
    return foundCategory ? foundCategory.name : 'Danh mục';
};

function Category() {
    const { slug } = useParams();
    const categoryName = findCategoryNameBySlug(slug);
    return (
        <div>
            <CartNotification />
            <GradientText text={categoryName} fullColorWord={true} />
            <div className={st('row', 'g-4')}>
                <LimitList>
                    {products.map((product) => (
                        <div key={product.id} className={st('col-12', 'col-md-4', 'col-lg-3')}>
                            <MainProductCard
                                to={`${configs.routes.detail}/${formatSlugify(product.name)}`}
                                name={product.name}
                                desc={product.desc}
                                price={product.price}
                                discount={product.discount}
                                variants={product.variants}
                            />
                        </div>
                    ))}
                </LimitList>
            </div>
        </div>
    );
}

export default Category;
