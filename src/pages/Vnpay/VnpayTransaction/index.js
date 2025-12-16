import configs from '~/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBankByName, getCardByInfo } from '~/data/services';

function VnpayTransaction() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);

    const amount = params.get('amount');
    const bankName = params.get('bank');
    const orderId = params.get('order');

    const bank = getBankByName(bankName);
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    const [form, setForm] = useState({
        cardNumber: '',
        cardHolder: '',
        issueDate: '',
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitTransaction = (e) => {
        e.preventDefault();

        const card = getCardByInfo({
            bankId: bank.id,
            cardNumber: form.cardNumber,
            cardHolder: form.cardHolder,
            issueDate: form.issueDate,
        });

        if (!card) {
            alert('Thông tin thẻ không hợp lệ');
            return;
        }

        if (!card.result.success) {
            alert(card.result.msg);
            return;
        }

        navigate(
            `${configs.routes.vnpayTransactionConfirm}?amount=${amount}&bank=${bank.name}&order=${orderId}&card=${card.number}`
        );
    };

    return (
        <div className="mx-auto my-4" style={{ maxWidth: '60%' }}>
            <div className="bg-white rounded shadow-sm overflow-hidden">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
                    <img
                        src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo.svg"
                        alt="VNPAY"
                        style={{ height: 32 }}
                    />

                    <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small">Giao dịch hết hạn sau</span>
                        <span className="bg-dark text-white px-2 py-1 rounded small">
                            {minutes}:{seconds}
                        </span>
                    </div>
                </div>

                {/* Body */}
                <div className="row g-0">
                    {/* Left - Order Info */}
                    <div className="col-md-5 p-4" style={{ background: '#f6f7f9' }}>
                        <h1 className="mb-4 fw-bold">Thông tin đơn hàng</h1>

                        <div className="mb-3">
                            <h3 className="text-muted">Số tiền thanh toán</h3>
                            <h3 className="fw-bold text-primary">{Number(amount).toLocaleString()}đ</h3>
                        </div>

                        <div className="mb-3">
                            <h3 className="text-muted">Giá trị đơn hàng</h3>
                            <h3 className="fw-bold">{Number(amount).toLocaleString()}đ</h3>
                        </div>

                        <div className="mb-3">
                            <h3 className="text-muted">Phí giao dịch</h3>
                            <h3 className="fw-bold">0đ</h3>
                        </div>

                        <div className="mb-3">
                            <h3 className="text-muted">Mã đơn hàng</h3>
                            <h3 className="fw-bold">{orderId}</h3>
                        </div>

                        <div>
                            <h3 className="text-muted">Nhà cung cấp</h3>
                            <h3 className="fw-bold">MC CTT VNPAY</h3>
                        </div>
                    </div>

                    {/* Right – Card Info */}
                    <div className="col-md-7 p-4">
                        <h1 className="text-center mb-4 fw-bold">Thanh toán qua Ngân hàng {bank.name}</h1>
                        <hr />

                        <form onSubmit={submitTransaction}>
                            <div className="mb-4">
                                <label className="form-label">Số thẻ</label>
                                <input
                                    className="form-control"
                                    name="cardNumber"
                                    placeholder="Nhập số thẻ"
                                    value={form.cardNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Tên chủ thẻ</label>
                                <input
                                    className="form-control"
                                    name="cardHolder"
                                    placeholder="Nhập tên chủ thẻ (không dấu)"
                                    value={form.cardHolder}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4 col-6 px-0">
                                <label className="form-label">Ngày phát hành</label>
                                <input
                                    className="form-control"
                                    name="issueDate"
                                    placeholder="MM/YY"
                                    value={form.issueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="d-flex justify-content-between mt-4">
                                <button type="button" className="btn btn-light px-4">
                                    Hủy thanh toán
                                </button>
                                <button className="btn px-5 text-white" style={{ background: '#0072bc' }}>
                                    Tiếp tục
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VnpayTransaction;
