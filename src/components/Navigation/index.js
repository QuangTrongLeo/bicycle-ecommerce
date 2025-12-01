import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './style.module.scss';

import Logo from '../../assets/img/logo/logo.png';
const st = classNames.bind(styles);

const menuData = {
    store: [
        {
            heading: 'Mua hàng',
            items: [
                { label: 'Mua Sản Phẩm Mới Nhất', path: '/new-products' },
                { label: 'Giày', path: '/shoes' },
                { label: 'Dép', path: '/sandals' },
                { label: 'Thương Hiệu' },
                { label: 'Phụ kiện' },
            ],
        },
        {
            heading: 'Chính sách',
            items: [
                { label: 'Chính sách bảo mật' },
                { label: 'Chính sách vận chuyển' },
                { label: 'Chính sách đổi trả' },
            ],
        },
        {
            heading: 'Liên hệ',
            items: [{ label: 'Liên hệ hotline' }, { label: 'Liên hệ email' }],
        },
    ],

    shoes: [
        {
            heading: 'Khám phá các loại giày',
            items: [
                { label: 'Giày thể thao nam', path: '/men-sports-shoes' },
                { label: 'Giày thể thao nữ', path: '/women-shoes' },
                { label: 'Giày công sở' },
                { label: 'Giày cao gót' },
            ],
        },
        {
            heading: 'Mua giày',
            items: [{ label: 'Giày nam' }, { label: 'Giày nữ' }, { label: 'Giày trẻ em' }],
        },
        {
            heading: 'Thương hiệu',
            items: ['Adidas', 'Nike', 'Converse', 'Puma', 'Vans'].map((brand) => ({ label: brand })),
        },
    ],

    sandals: [
        {
            heading: 'Khám phá các loại dép',
            items: [
                { label: 'Dép nam', path: '/men-sandal' },
                { label: 'Dép nữ', path: '/women-sandals' },
                { label: 'Dép trẻ em', path: '/kids-sandal' },
            ],
        },
        {
            heading: 'Mua dép',
            items: [{ label: 'Dép nam' }, { label: 'Dép nữ' }, { label: 'Dép trẻ em' }],
        },
        {
            heading: 'Thương hiệu',
            items: ['Havaianas', 'Crocs', 'Nike', 'Adidas'].map((brand) => ({ label: brand })),
        },
    ],
};

function Navigation() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isClosingDropdown, setIsClosingDropdown] = useState(false);

    const currentMenuData = activeDropdown ? menuData[activeDropdown] : null;

    const openDropdown = (menuKey) => {
        setIsClosingDropdown(false);
        setActiveDropdown(menuKey);
    };

    const closeDropdown = () => {
        setIsClosingDropdown(true);

        setTimeout(() => {
            setActiveDropdown(null);
            setIsClosingDropdown(false);
        }, 300);
    };

    return (
        <>
            <div className={st('header-decoration')}>
                <div className={st('decoration-shape', 'decoration-yellow')}></div>
                <div className={st('decoration-shape', 'decoration-pink-primary')}></div>
                <div className={st('decoration-shape', 'decoration-pink-secondary')}></div>
                <div className={st('decoration-shape', 'decoration-blue')}></div>
            </div>

            <div className={st('navigation')} onMouseLeave={closeDropdown}>
                <div className="container">
                    <nav className={st('nav-container')}>
                        <div className={st('nav-left')}>
                            <Link to="/">
                                <img src={Logo} alt="logo" width={20} />
                            </Link>

                            <span onMouseEnter={() => openDropdown('store')}>
                                <Link to="/">Cửa hàng</Link>
                            </span>

                            <span onMouseEnter={() => openDropdown('shoes')}>
                                <Link to="/shoes">Giày</Link>
                            </span>

                            <span onMouseEnter={() => openDropdown('sandals')}>
                                <Link to="/sandals">Dép</Link>
                            </span>

                            <span>
                                <Link to="/promotion">Sản phẩm khuyến mãi</Link>
                            </span>

                            <span>
                                <Link to="/support">Hỗ trợ</Link>
                            </span>
                        </div>

                        <div className={st('nav-right')}>
                            <Link to="/login">Login</Link>
                        </div>
                    </nav>
                </div>

                {currentMenuData && (
                    <div className={st('dropdown-menu', isClosingDropdown && 'dropdown-closing')}>
                        <div className="container">
                            <div className={st('dropdown-content')}>
                                {currentMenuData.map((section, idx) => (
                                    <div key={idx} className={st('dropdown-section')}>
                                        <p className={st('section-title')}>{section.heading}</p>

                                        <div className={st('section-items')}>
                                            {section.items.map((item, index) => (
                                                <span key={index}>
                                                    {item.path ? (
                                                        <Link to={item.path}>{item.label}</Link>
                                                    ) : (
                                                        <span>{item.label}</span>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Navigation;
