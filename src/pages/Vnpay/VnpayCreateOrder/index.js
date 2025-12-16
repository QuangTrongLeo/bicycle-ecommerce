import classNames from 'classnames/bind';
import styles from './style.module.scss';
import configs from '~/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getBanks, getBankById } from '~/data/services';

const st = classNames.bind(styles);

function VnpayCreateOrder() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);

    const amount = params.get('amount');
    const orderId = params.get('order');

    const banks = getBanks();

    const [form, setForm] = useState({
        amount,
        orderDesc: `Thanh toán đơn hàng ${orderId}`,
        bankId: 0,
    });

    const bank = getBankById(Number(form.bankId));

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitCreateOrder = (e) => {
        e.preventDefault();
        if (form.bankId === 0) {
            alert('Vui lòng chọn ngân hàng');
            return;
        }
        navigate(`${configs.routes.vnpayTransaction}?amount=${form.amount}&bank=${bank.name}&order=${orderId}`);
    };

    return (
        <div className={st('container')}>
            <div className={st('card')}>
                <h2 className={st('title')}>Tạo đơn thanh toán VNPAY</h2>

                <form onSubmit={submitCreateOrder}>
                    <div className={st('formGroup')}>
                        <label>Số tiền</label>
                        <input className={st('input')} value={Number(form.amount).toLocaleString()} readOnly />
                    </div>

                    <div className={st('formGroup')}>
                        <label>Nội dung thanh toán</label>
                        <textarea
                            className={st('textarea')}
                            rows="2"
                            name="orderDesc"
                            value={form.orderDesc}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={st('formGroup')}>
                        <label>Ngân hàng</label>
                        <select className={st('select')} name="bankId" value={form.bankId} onChange={handleChange}>
                            {banks.map((bank) => (
                                <option key={bank.id} value={bank.id}>
                                    {bank.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className={st('submitBtn')}>Thanh toán Redirect</button>
                </form>
            </div>
        </div>
    );
}

export default VnpayCreateOrder;
