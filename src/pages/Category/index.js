import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { CenterHorizontalScroll, SmallSquareCard } from '../../components';
const st = classNames.bind(styles);

const subCategories = [
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

function Category() {
    return (
        <div>
            <h1 className={st('content')}>Category Page</h1>
            <CenterHorizontalScroll>
                {subCategories.map((category) => (
                    <SmallSquareCard key={category.id} {...category} />
                ))}
            </CenterHorizontalScroll>
        </div>
    );
}

export default Category;
