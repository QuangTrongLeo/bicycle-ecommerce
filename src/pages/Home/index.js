import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { LargeSquareCard, MainHorizontalScroll } from '../../components';
const st = classNames.bind(styles);

const apiNewProduct = [
    {
        id: 1,
        to: 'https://xedapthegioi.vn/product/xe-dap-the-thao-galaxy-c100/',
        img: 'https://xedapthegioi.vn/wp-content/uploads/2018/03/galaxy-c100-7-768x576.jpg',
        name: 'Xe đạp thể thao Galaxy C100',
        desc: 'Xe đạp Galaxy',
        price: 3690000,
        discount: 13,
    },
    {
        id: 2,
        to: 'https://xedapthegioi.vn/product/xe-dap-the-thao-galaxy-c100/',
        img: 'https://xedapthegioi.vn/wp-content/uploads/2018/03/galaxy-c100-7-768x576.jpg',
        name: 'Xe đạp thể thao Galaxy C100',
        desc: 'Xe đạp Galaxy',
        price: 3690000,
        discount: 0,
    },
    {
        id: 3,
        to: 'https://xedapthegioi.vn/product/xe-dap-the-thao-galaxy-c100/',
        img: 'https://xedapthegioi.vn/wp-content/uploads/2018/03/galaxy-c100-7-768x576.jpg',
        name: 'Xe đạp thể thao Galaxy C100',
        desc: 'Xe đạp Galaxy',
        price: 3690000,
        discount: 10,
    },
    {
        id: 4,
        to: 'https://xedapthegioi.vn/product/xe-dap-the-thao-galaxy-c100/',
        img: 'https://xedapthegioi.vn/wp-content/uploads/2018/03/galaxy-c100-7-768x576.jpg',
        name: 'Xe đạp thể thao Galaxy C100',
        desc: 'Xe đạp Galaxy',
        price: 3690000,
        discount: 0,
    },
    {
        id: 5,
        to: 'https://xedapthegioi.vn/product/xe-dap-the-thao-galaxy-c100/',
        img: 'https://xedapthegioi.vn/wp-content/uploads/2018/03/galaxy-c100-7-768x576.jpg',
        name: 'Xe đạp thể thao Galaxy C100',
        desc: 'Xe đạp Galaxy',
        price: 3690000,
        discount: 0,
    },
];

function Home() {
    return (
        <div className={st('wrapper')}>
            <div className={st('new-product-group')}>
                <h2>Những sản phẩm mới nhất</h2>
                <MainHorizontalScroll>
                    {apiNewProduct.map((product) => (
                        <LargeSquareCard key={product.id} {...product} />
                    ))}
                </MainHorizontalScroll>
            </div>
        </div>
    );
}

export default Home;
