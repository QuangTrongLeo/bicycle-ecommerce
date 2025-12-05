import classNames from 'classnames/bind';
import styles from './style.module.scss';
import configs from '../../config';
import { CenterHorizontalScroll, SmallSquareCard } from '../../components';
import { collectionImages } from '~/assets/images';
import { formatSlugify } from '~/utils';
const st = classNames.bind(styles);

const categories = [
    {
        id: 1,
        img: collectionImages.xe_dap_the_thao,
        name: 'Xe đạp thể thao',
    },
    {
        id: 2,
        img: collectionImages.xe_dap_tre_em,
        name: 'Xe đạp trẻ em',
    },
    {
        id: 3,
        img: collectionImages.xe_dap_tro_luc_dien,
        name: 'Xe đạp trợ lực điện',
    },
    {
        id: 4,
        img: collectionImages.phu_kien,
        name: 'Phụ kiện',
    },
];

function Collection() {
    return (
        <div>
            <CenterHorizontalScroll>
                {categories.map((collection) => (
                    <SmallSquareCard
                        key={collection.id}
                        to={`${configs.routes.category}/${formatSlugify(collection.name)}`}
                        name={collection.name}
                        img={collection.img}
                    />
                ))}
            </CenterHorizontalScroll>
            <h1 className={st('content')}>Collection Page</h1>
        </div>
    );
}

export default Collection;
