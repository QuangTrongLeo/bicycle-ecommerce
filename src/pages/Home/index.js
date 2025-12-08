import classNames from 'classnames/bind';
import configs from '../../config';
import styles from './style.module.scss';
import GradientText from '../../components/GradientText';
import { formatSlugify } from '~/utils';
import { LargeProductCard, MainHorizontalScroll, CategoryCard } from '../../components';
import { getCategories, getNewestProducts, accessoryProducts } from '~/data/services';

const st = classNames.bind(styles);

function Home() {
    const categories = getCategories();

    // Lấy sản phẩm mới nhất (full thông tin)
    const newProducts = getNewestProducts(5);

    // Lấy sản phẩm phụ kiện (full thông tin)
    const accessories = accessoryProducts(5);

    return (
        <div className={st('container')}>
            <div className="row">
                <div className="col l-12 m-12 c-12">
                    {/* Header */}
                    <div className={st('header')}>
                        <GradientText
                            text={'Cửa hàng. Cách tốt nhất để bạn mua sản phẩm bạn thích'}
                            colorWord={2}
                            wordsPerLine={6}
                        />
                    </div>

                    {/* Danh mục */}
                    <div className={st('product-group')}>
                        <MainHorizontalScroll>
                            {categories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    to={`${configs.routes.category}/${formatSlugify(category.name)}`}
                                    name={category.name}
                                    img={category.img}
                                />
                            ))}
                        </MainHorizontalScroll>
                    </div>

                    {/* Sản phẩm mới nhất */}
                    <div className={st('product-group')}>
                        <GradientText
                            text={'Những sản phẩm mới nhất. Quà này ai cũng mê.'}
                            colorWord={5}
                            fontSize={30}
                        />

                        <MainHorizontalScroll>
                            {newProducts.map((product) => (
                                <LargeProductCard
                                    key={product.id}
                                    to={`${configs.routes.detail}/${product.id}`}
                                    name={product.name}
                                    desc={product.desc}
                                    img={product.colors[0].images[0].imageUrl}
                                    price={product.price}
                                    discount={product.discount}
                                />
                            ))}
                        </MainHorizontalScroll>
                    </div>

                    {/* Sản phẩm phụ kiện */}
                    <div className={st('product-group')}>
                        <GradientText text={'Cá nhân hóa. Món quà có một không hai.'} colorWord={3} fontSize={30} />

                        <MainHorizontalScroll>
                            {accessories.map((product) => (
                                <LargeProductCard
                                    key={product.id}
                                    to={`${configs.routes.detail}/${product.id}`}
                                    name={product.name}
                                    desc={product.desc}
                                    img={product.colors[0].images[0].imageUrl}
                                    price={product.price}
                                    discount={product.discount}
                                />
                            ))}
                        </MainHorizontalScroll>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
