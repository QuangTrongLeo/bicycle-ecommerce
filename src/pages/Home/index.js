import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { LargeSquareCard, MainHorizontalScroll, SmallSquareCard } from '../../components';
const st = classNames.bind(styles);

const products = [
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

const categories = [
    {
        id: 1,
        to: 'https://www.apple.com/vn/shop/buy-iphone',
        img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-iphone-nav-202509?wid=1200&hei=780&fmt=png-alpha&.v=dW5XbHI1eDVpd01qWUU4bFRtWGZXM1doT212VzJoWjBSKzRpbmNETHN1QnRHU3BERzdnOWdiQkwvWTZGajY2b1M0TjRWdzF2UjRGVEY0c3dBQVZ6VFN0TmdKaCs3NTJMbFVuOGp2LzI5RGc',
        name: 'Xe đạp thể thao kabk kabakg abka agkgag',
    },
    {
        id: 2,
        to: 'https://www.apple.com/vn/shop/buy-ipad',
        img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-ipad-nav-202405?wid=400&hei=260&fmt=png-alpha&.v=dW5XbHI1eDVpd01qWUU4bFRtWGZXNGFLQTJVNnlNQmQrVmRBYnZYei9jckUzelNmMnRxajE0NHhmMWtLazl6eG53M0FRZHBXNTh1U1lFVEtSR2YzTm5qbE56RWRpRFNIRXZvbkd2S0l5dTg',
        name: 'Xe đạp nhập khẩu',
    },
    {
        id: 3,
        to: 'https://www.apple.com/vn/shop/buy-watch',
        img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-watch-nav-202509_GEO_VN?wid=400&hei=260&fmt=png-alpha&.v=S0tSVzBtSkRkSFFhMm1zS1NmeWtkK0gvNGFhODF5SWpidW9tVnFmL2Irb1R1VkJuQ29uUmRMelVabnRBV0VHSGM5THdmR1U4Nmp4b2NFbEg2N21UQzYzZVFZZGtHNUI4c1NvME1xTTYxSzRMSUNabG1aSTZUOVg1S2E0WTkzNG0',
        name: 'Xe đạp trẻ em',
    },
    {
        id: 4,
        to: 'https://www.apple.com/vn/shop/accessories/all',
        img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-accessories-nav-202509?wid=400&hei=260&fmt=png-alpha&.v=QnhsNk96S0o4R1dkN2FveStNM1hwNzZGMHVrNGw2NTM5Vmk2bHZzMXQ3aWRqT2drRk00QWZTdStjaG1MbFN0Z1BrcjVFNVdueFRVbVY3TGtiL2RjUWZiYi92WkVCUEt5TCtGS2UwaWpxS3I3V3pZTFFiS3ZLYmI4VE9UR00xblE',
        name: 'Phụ kiện',
    },
];

function Home() {
    return (
        <div className={st('wrapper')}>
            <div class={st('header')}>
                <div class={st('header-title')}>Cửa Hàng</div>
                <div class={st('header-subtitle')}>Trao những điều đặc biệt.</div>
            </div>

            <MainHorizontalScroll>
                {categories.map((category) => (
                    <SmallSquareCard key={category.id} {...category} />
                ))}
            </MainHorizontalScroll>
            <div className={st('new-product-group')}>
                <h2>Những sản phẩm mới nhất</h2>
                <MainHorizontalScroll>
                    {products.map((product) => (
                        <LargeSquareCard key={product.id} {...product} />
                    ))}
                </MainHorizontalScroll>
            </div>
        </div>
    );
}

export default Home;
