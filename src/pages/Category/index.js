import classNames from 'classnames/bind';
import styles from './style.module.scss';
import configs from '../../config';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { formatSlugify } from '~/utils';
import { MainProductCard, LimitList, GradientText, CartNotification } from '../../components';
import { getCategoryNameBySlug, getProductsByCategorySlug } from '~/data/services';
const st = classNames.bind(styles);

function Category() {
    const { slug } = useParams();
    const [cartItem, setCartItem] = useState(null);
    const [products] = useState(getProductsByCategorySlug(slug));
    const [showCartNotification, setShowCartNotification] = useState(false);
    const categoryName = getCategoryNameBySlug(slug);
    console.log(categoryName);
    console.log(products);
    const handleShowCartNotification = (data) => {
        setCartItem(data);
        setShowCartNotification(true);
    };
    const handleCloseCartNotification = () => {
        setShowCartNotification(false);
        setCartItem(cartItem);
    };
    return (
        <div>
            {showCartNotification && (
                <CartNotification
                    name={cartItem.name}
                    price={cartItem.price}
                    color={cartItem.color}
                    size={cartItem.size}
                    img={cartItem.image}
                    quantity={cartItem.quantity}
                    onClose={handleCloseCartNotification}
                />
            )}
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
                                colors={product.colors}
                                onShow={handleShowCartNotification}
                            />
                        </div>
                    ))}
                </LimitList>
            </div>
        </div>
    );
}

export default Category;
