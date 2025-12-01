import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
const st = classNames.bind(styles);

const formatCurrency = (value) => {
  if (!value || isNaN(Number(value))) return '0';
  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(Number(value));
};

const roundToThousand = (value) => {
  return Math.round(value / 1000) * 1000;
};

function MediumRectangleCard({ to = '#', img, name, price, discount }) {
  const originPrice = discount > 0 ? roundToThousand(price / (1 - discount / 100)) : null;
  return (
    <Link to={to} className={st('link-wrapper')}>
      <div className={st('card', 'card-product')}>
        <img src={img} className={st('card-img-top')} alt={name} />
        <div className={st('card-body')}>
          <div>Color</div>
          <h5 className={st('card-name')}>{name}</h5>
          <div className={st('card-price')}>
            <span className={st('card-cur-price')}>{formatCurrency(price)}đ</span>
            {discount > 0 && (
              <>
                <span className={st('card-discount-percent')}>-{discount}%</span>
                <span className={st('card-origin-price')}>{formatCurrency(originPrice)}đ</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MediumRectangleCard;
