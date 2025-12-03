import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTruck, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import Logo from '../../assets/img/logo/logo.png';
import styles from './style.module.scss';
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
    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

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
        <div className={st('navigation-wrapper')}>
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
                            <span>
                                <Link to="/">
                                    <img src={Logo} alt="logo" width={20} />
                                </Link>
                            </span>

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
                            {isAuthenticated ? (
                                <>
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className={st('input-icon')}
                                        onClick={() => navigate('/profile')}
                                    />
                                    <FontAwesomeIcon icon={faCartShopping} className={st('input-icon')} />
                                    <FontAwesomeIcon icon={faTruck} className={st('input-icon')} />
                                </>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </div>
                    </nav>
                </div>

                {currentMenuData && <div className={st('page-overlay')}></div>}

                {currentMenuData && (
                    <div className={st('dropdown-menu', isClosingDropdown && 'dropdown-closing')}>
                        <div className="container">
                            <div className={st('dropdown-content')}>
                                {currentMenuData.map((section, idx) => (
                                    <div key={idx} className={st('dropdown-section', idx === 0 && 'first-section')}>
                                        <p className={st('section-title')}>{section.heading}</p>

                                        <div className={st('section-items')}>
                                            {section.items.map((item, index) => (
                                                <span key={index}>
                                                    {item.path ? (
                                                        <Link to={item.path}>{item.label}</Link>
                                                    ) : (
                                                        <Link to={item.label}>{item.label}</Link>
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
        </div>
    );
}

export default Navigation;
