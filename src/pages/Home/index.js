import classNames from 'classnames/bind';
import configs from '../../config';
import { LargeSquareCard, MainHorizontalScroll, SmallSquareCard } from '../../components';
import styles from './style.module.scss';
import GradientText from '../../components/Text';
import { getAllCategories, getNewestProducts, accessoryProducts } from '../../dummydb';

const st = classNames.bind(styles);

function Home() {
    const categories = getAllCategories();
    const newProducts = getNewestProducts(5);

    const accessories = accessoryProducts(5);
    console.log(accessories);

    return (
        <div className={st('container')}>
            <div className="row">
                <div className="col l-12 m-12 c-12">
                    <div className={st('header')}>
                        <GradientText
                            text={'Cửa hàng. Cách tốt nhất để bạn mua sản phẩm bạn thích'}
                            colorWord={2}
                            wordsPerLine={6}
                        />
                    </div>
                    <div className={st('product-group')}>
                        <MainHorizontalScroll>
                            {categories.map((category) => (
                                <SmallSquareCard
                                    key={category.id}
                                    to={`${configs.routes.category}/${category.id}`}
                                    name={category.name}
                                    img={category.img}
                                />
                            ))}
                        </MainHorizontalScroll>
                    </div>
                    <div className={st('product-group')}>
                        <GradientText
                            text={'Những sản phẩm mới nhất. Quà này ai cũng mê.'}
                            colorWord={5}
                            fontSize={30}
                        />
                        <MainHorizontalScroll>
                            {newProducts.map((product) => (
                                <LargeSquareCard
                                    key={product.id}
                                    to={`${configs.routes.detail}/${product.id}`}
                                    name={product.name}
                                    desc={product.desc}
                                    img={product.img}
                                    price={product.price}
                                    discount={product.discount}
                                />
                            ))}
                        </MainHorizontalScroll>
                    </div>

                    <div className={st('product-group')}>
                        <GradientText text={'Cá nhân hóa. Món quà có một không hai.'} colorWord={3} fontSize={30} />
                        <MainHorizontalScroll>
                            {accessories.map((product) => (
                                <LargeSquareCard
                                    key={product.id}
                                    to={`${configs.routes.detail}/${product.id}`}
                                    name={product.name}
                                    desc={product.desc}
                                    img={product.img}
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
