import classNames from 'classnames/bind';
import styles from './style.module.scss';
import configs from '../../config';
import { MediumRectangleCard } from '../../components';
const st = classNames.bind(styles);

const products = [
    {
        id: 1,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 2,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 3,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 4,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 5,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 6,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 7,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 8,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 9,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 10,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 11,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
    {
        id: 12,
        img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590894785_f2da60cdf3c759008e4a94cea20275da.jpg',
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
    },
];

function SubCategory() {
    return (
        <div>
            <h1 className={st('content')}>SubCategory Page</h1>
            {products.map((product) => (
                <MediumRectangleCard
                    key={product.id}
                    to={`${configs.routes.detail}/${product.name}`}
                    name={product.name}
                    desc={product.desc}
                    img={product.img}
                    price={product.price}
                    discount={product.discount}
                />
            ))}
        </div>
    );
}

export default SubCategory;
