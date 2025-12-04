import classNames from 'classnames/bind';
import styles from './style.module.scss';
import configs from '../../config';
import { CenterHorizontalScroll, SmallSquareCard } from '../../components';
import { categoryImages } from '~/assets/images';
const st = classNames.bind(styles);

const subCategories = [
    {
        id: 1,
        img: categoryImages.xe_dap_the_thao,
        name: 'Xe đạp thể thao',
    },
    {
        id: 2,
        img: categoryImages.xe_dap_tre_em,
        name: 'Xe đạp trẻ em',
    },
    {
        id: 3,
        img: categoryImages.xe_dap_tro_luc_dien,
        name: 'Xe đạp trợ lực điện',
    },
    {
        id: 4,
        img: categoryImages.phu_kien,
        name: 'Phụ kiện',
    },
];

function Category() {
    return (
        <div>
            <h1 className={st('content')}>Category Page</h1>
            <CenterHorizontalScroll>
                {subCategories.map((sc) => (
                    <SmallSquareCard
                        key={sc.id}
                        to={`${configs.routes.sub_category}/${sc.name}`}
                        name={sc.name}
                        img={sc.img}
                    />
                ))}
            </CenterHorizontalScroll>
        </div>
    );
}

export default Category;
