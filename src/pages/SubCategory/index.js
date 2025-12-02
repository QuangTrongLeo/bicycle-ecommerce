import classNames from 'classnames/bind';
import styles from './style.module.scss';
import configs from '../../config';
import { MediumRectangleCard } from '../../components';
const st = classNames.bind(styles);

const products = [
    {
        id: 1,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 2,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 3,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 4,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 5,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 6,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 7,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 8,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 9,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 10,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 11,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
    {
        id: 12,
        name: 'Xe Đạp Fixed Gear Magicbros CX5 Plus',
        price: '3490000',
        discount: '13',
        variants: [
            {
                color_id: 1,
                color_name: 'Đen',
                hex_code: 'black',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590878547_778a368ec9d7e33993967797f014b448.jpg',
                quantity: 50,
            },
            {
                color_id: 2,
                color_name: 'Trắng',
                hex_code: '#fff',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590888439_2c315bac3cb2ad805cf3b2c54cac170f.jpg',
                quantity: 30,
            },
            {
                color_id: 3,
                color_name: 'Xanh',
                hex_code: 'blue',
                img: 'https://xedapthegioi.vn/wp-content/uploads/2024/02/z5568590895965_d1750d13c6fe7c8c7629e038d4931402.jpg',
                quantity: 0,
            },
        ],
    },
];

function SubCategory() {
    return (
        <div>
            <h1 className={st('content')}>SubCategory Page</h1>

            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.id} className="col-6 col-md-4 col-lg-3">
                        <MediumRectangleCard
                            to={`${configs.routes.detail}/${product.name}`}
                            name={product.name}
                            desc={product.desc}
                            img={product.variants[0].img}
                            price={product.price}
                            discount={product.discount}
                            variants={product.variants}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubCategory;
