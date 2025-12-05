import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';

const st = classNames.bind(styles);

function CategoryCard({ to = '#', img, name }) {
    return (
        <Link to={to} className={st('link-wrapper')}>
            <div className={st('card-product')}>
                <img src={img} className={st('card-img')} alt={name} />
                <span className={st('card-name')}>{name}</span>
            </div>
        </Link>
    );
}

export default CategoryCard;
