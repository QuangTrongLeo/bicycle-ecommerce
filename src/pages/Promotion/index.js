import classNames from 'classnames/bind';
import styles from './style.module.scss';
import GradientText from '../../components/GradientText';
import { LargeProductCard } from '../../components';
import { getAllProducts } from '~/data/services';
import configs from '../../config';

const st = classNames.bind(styles);

function Promotion() {
    const allProducts = getAllProducts();

    const promoProducts = allProducts.filter((product) => product.discount && product.discount > 0);

    return (
        <div className={st('container')}>
            <div className="row">
                <div className="col l-12 m-12 c-12">
                    {/* Header trang khuyến mãi */}
                    <div className={st('header')}>
                        <GradientText
                            text={'Săn Sale Cực Chất - Ưu Đãi Ngập Tràn'}
                            colorWord={3}
                            fontSize={36}
                            wordsPerLine={10}
                        />
                        <p className={st('sub-title')}>
                            Cập nhật những mẫu giày và phụ kiện đang giảm giá hot nhất tại cửa hàng.
                        </p>
                    </div>
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className={st('product-list')}>
                {promoProducts.length > 0 ? (
                    <div className="row">
                        {promoProducts.map((product) => (
                            <div key={product.id} className="col l-3 m-4 c-6 mb-20">
                                <LargeProductCard
                                    to={`${configs.routes.detail}/${product.id}`}
                                    name={product.name}
                                    desc={product.desc}
                                    img={
                                        product.colors && product.colors[0] && product.colors[0].images
                                            ? product.colors[0].images[0].imageUrl
                                            : ''
                                    }
                                    price={product.price}
                                    discount={product.discount}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={st('empty-state')}>
                        <p>Hiện tại chưa có chương trình khuyến mãi nào.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Promotion;