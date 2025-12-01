import classNames from 'classnames/bind';
import styles from './style.module.scss';
const st = classNames.bind(styles);

function Home() {
    return <h1 className={st('content')}>Home Page</h1>;
}

export default Home;
