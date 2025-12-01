import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { LargeSquareCard } from '../../components';
const st = classNames.bind(styles);

function Home() {
    return (
        <h1 className={st('content')}>
            Home Page
            <LargeSquareCard
                to="https://xedapthegioi.vn/product/xe-dap-the-thao-galaxy-c100/"
                img="https://xedapthegioi.vn/wp-content/uploads/2018/03/galaxy-c100-7-768x576.jpg"
                name="Xe đạp thể thao Galaxy C100"
                desc="Xe đạp Galaxy"
                price="3690000"
                discount="13"
            />
            <LargeSquareCard
                to="https://xedapthegioi.vn/product/xe-dap-the-thao-galaxy-c100/"
                img="https://xedapthegioi.vn/wp-content/uploads/2018/03/galaxy-c100-7-768x576.jpg"
                name="Xe đạp thể thao Galaxy C100"
                price="3690000"
            />
            <LargeSquareCard
                to="https://xedapthegioi.vn/product/xe-dap-the-thao-galaxy-c100/"
                img="https://xedapthegioi.vn/wp-content/uploads/2018/03/galaxy-c100-7-768x576.jpg"
                name="Xe đạp thể thao Galaxy C100"
                price="3690000"
                discount="13"
            />
            <LargeSquareCard
                to="https://xedapthegioi.vn/product/xe-dap-the-thao-galaxy-c100/"
                img="https://xedapthegioi.vn/wp-content/uploads/2018/03/galaxy-c100-7-768x576.jpg"
                name="Xe đạp thể thao Galaxy C100"
                price="3690000"
            />
        </h1>
    );
}

export default Home;
