import configs from '~/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmOrder } from '~/redux/action/shoppingAction';
import { updateStock } from '~/redux/action/productSizesAction';
import { decreaseVoucherQuantity } from '~/redux/action/voucherAction';
import { getBankById, getCardByNumber, getProductBySizeId } from '~/data/services';

function VnpayTransactionConfirm() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = new URLSearchParams(search);

    const amount = params.get('amount');
    const orderId = params.get('order');
    const cardNumber = params.get('card');
    const processingOrder = useSelector((state) => state.shopping.processingOrder);
    const card = getCardByNumber(cardNumber);
    const bank = getBankById(Number(card.bankId));
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(5 * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (otp !== card.otp) {
            alert('OTP không đúng, vui lòng thử lại.');
            return;
        }

        dispatch(confirmOrder(processingOrder));

        processingOrder.items.forEach((item) => {
            const productDetail = getProductBySizeId(item.sizeId);
            const newStock = productDetail.stock - item.quantity;

            dispatch(
                updateStock({
                    id: item.sizeId,
                    stock: newStock,
                })
            );
        });

        if (processingOrder.voucherId) {
            dispatch(decreaseVoucherQuantity(processingOrder.voucherId));
        }
        navigate(`${configs.routes.paymentResult}?status=success&amount=${amount}&bank=${bank.name}&order=${orderId}`);
    };

    return (
        <div className="mx-auto my-4" style={{ maxWidth: '60%' }}>
            <div className="bg-white rounded shadow-sm overflow-hidden">
                {/* HEADER */}
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

                {/* BODY */}
                <div className="row g-0">
                    {/* LEFT – ORDER INFO */}
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

                    {/* RIGHT – OTP INPUT */}
                    <div className="col-md-7 p-4">
                        <h1 className="text-center mb-4 fw-bold">Xác thực OTP</h1>
                        <hr />

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <h3 className="form-label">Mã OTP</h3>
                                <input
                                    type="text"
                                    className="form-control text-center"
                                    placeholder="Nhập OTP"
                                    value={otp}
                                    onChange={handleChange}
                                    required
                                    maxLength={6}
                                />
                            </div>

                            <div className="d-flex justify-content-between mt-4">
                                <button type="button" className="btn btn-light px-4" onClick={() => navigate(-1)}>
                                    Hủy thanh toán
                                </button>
                                <button className="btn px-5 text-white" style={{ background: '#0072bc' }}>
                                    Xác nhận
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VnpayTransactionConfirm;
