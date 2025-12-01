import classNames from 'classnames/bind';
import styles from './style.module.scss';
const st = classNames.bind(styles);

function Category() {
  return <h1 className={st('content')}>Category Page</h1>;
}

export default Category;
