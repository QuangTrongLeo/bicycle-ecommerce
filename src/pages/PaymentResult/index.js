import { useLocation, Link } from 'react-router-dom';
import configs from '~/config';

export default function PaymentResult() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);

    const status = params.get('status');
    const orderId = params.get('order');
    const amount = params.get('amount');

    return (
        <div style={{ marginTop: 50, textAlign: 'center' }}>
            <div>
                <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Review-empty.png"
                    alt="Transaction Status"
                    style={{ width: 120, height: 120, marginBottom: 20 }}
                />
            </div>

            {/* Giao dịch thành công */}
            {status === 'success' && (
                <div>
                    <h3 style={{ fontWeight: 'bold', color: '#28a745' }}>
                        Bạn đã giao dịch thành công! <i className="fas fa-check-circle"></i>
                    </h3>
                    <p style={{ fontSize: 18, marginTop: 15 }}>Vui lòng để ý số điện thoại của nhân viên tư vấn:</p>
                    <strong style={{ color: 'red', fontSize: 24 }}>024 38 291 291</strong>
                    <p style={{ marginTop: 15 }}>
                        <b>Mã đơn hàng:</b> {orderId}
                    </p>
                    <p>
                        <b>Số tiền:</b> {amount ? Number(amount).toLocaleString() : 0} VND
                    </p>
                    <div style={{ marginTop: 15 }}>
                        <Link
                            to={configs.routes.orderHistory}
                            style={{
                                fontSize: 24,
                                textDecoration: 'underline',
                            }}>
                            Kiểm tra đơn hàng của bạn !
                        </Link>
                    </div>
                </div>
            )}

            {/* Giao dịch thất bại */}
            {status === 'fail' && (
                <div>
                    <h3 style={{ fontWeight: 'bold', color: '#dc3545' }}>Đơn hàng giao dịch thất bại!</h3>
                    <p style={{ fontSize: 18, marginTop: 15 }}>Cảm ơn quý khách đã dùng dịch vụ của chúng tôi.</p>
                    <p style={{ fontSize: 18 }}>Liên hệ tổng đài để được tư vấn:</p>
                    <strong style={{ color: 'red', fontSize: 24 }}>024 38 291 291</strong>
                    <p style={{ marginTop: 15 }}>
                        <b>Mã đơn hàng:</b> {orderId}
                    </p>
                    <p>
                        <b>Số tiền:</b> {amount ? Number(amount).toLocaleString() : 0} VND
                    </p>
                    <div style={{ marginTop: 15 }}>
                        <Link
                            to={configs.routes.orderHistory}
                            style={{
                                fontSize: 24,
                                textDecoration: 'underline',
                            }}>
                            Kiểm tra đơn hàng của bạn !
                        </Link>
                    </div>
                </div>
            )}

            {/* Đang xử lý */}
            {!status && (
                <div>
                    <h3 style={{ fontWeight: 'bold', color: '#ffc107' }}>
                        Chúng tôi đã tiếp nhận đơn hàng, xin chờ quá trình xử lý!
                    </h3>
                    <p style={{ fontSize: 18, marginTop: 15 }}>Vui lòng để ý số điện thoại của nhân viên tư vấn:</p>
                    <strong style={{ color: 'red', fontSize: 24 }}>024 38 291 291</strong>
                    <p style={{ marginTop: 15 }}>
                        <b>Mã đơn hàng:</b> {orderId}
                    </p>
                    <p>
                        <b>Số tiền:</b> {amount ? Number(amount).toLocaleString() : 0} VND
                    </p>
                    <div style={{ marginTop: 15 }}>
                        <Link
                            to={configs.routes.orderHistory}
                            style={{
                                fontSize: 24,
                                textDecoration: 'underline',
                            }}>
                            Kiểm tra đơn hàng của bạn !
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
