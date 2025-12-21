import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faShieldHalved, faCircleQuestion, faHeadset } from '@fortawesome/free-solid-svg-icons';

const st = classNames.bind(styles);

function Support() {
    // State để điều khiển tab nội dung bên phải
    const [activeTab, setActiveTab] = useState('policy');

    // Dữ liệu nội dung (Giả lập)
    const renderContent = () => {
        switch (activeTab) {
            case 'policy':
                return (
                    <div className={st('tab-content')}>
                        <h2>Chính sách & Quy định</h2>
                        <div className={st('info-block')}>
                            <h4>1. Chính sách đổi trả</h4>
                            <p>Thời gian đổi trả trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm phải còn nguyên tem mác và chưa qua sử dụng.</p>
                        </div>
                        <div className={st('info-block')}>
                            <h4>2. Chính sách bảo hành</h4>
                            <p>Bảo hành 6 tháng đối với các lỗi do nhà sản xuất (bong keo, đứt chỉ...). Không bảo hành lỗi do người sử dụng.</p>
                        </div>
                        <div className={st('info-block')}>
                            <h4>3. Chính sách vận chuyển</h4>
                            <p>Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ. Thời gian giao hàng tiêu chuẩn từ 2-4 ngày làm việc.</p>
                        </div>
                    </div>
                );
            case 'faq':
                return (
                    <div className={st('tab-content')}>
                        <h2>Câu hỏi thường gặp (FAQ)</h2>
                        <div className={st('info-block')}>
                            <h4>Làm sao để chọn size giày chuẩn?</h4>
                            <p>Bạn có thể tham khảo bảng quy đổi size trong trang chi tiết sản phẩm hoặc liên hệ hotline để được tư vấn đo chân.</p>
                        </div>
                        <div className={st('info-block')}>
                            <h4>Tôi có được kiểm tra hàng trước khi nhận không?</h4>
                            <p>Có. Chúng tôi khuyến khích khách hàng kiểm tra sản phẩm trước khi thanh toán cho shipper.</p>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className={st('tab-content')}>
                        <h2>Liên hệ hỗ trợ</h2>
                        <div className={st('info-row')}>
                            <p>Hotline</p>
                            <p className={st('highlight')}>1900 123 456</p>
                        </div>
                        <div className={st('info-row')}>
                            <p>Email</p>
                            <p>support@shopgiay.com</p>
                        </div>
                        <div className={st('info-row')}>
                            <p>Địa chỉ văn phòng</p>
                            <p>123 Đường ABC, Quận 1, TP.HCM</p>
                        </div>
                        <div className={st('info-row')}>
                            <p>Thời gian làm việc</p>
                            <p>8:00 - 21:00 (Tất cả các ngày trong tuần)</p>
                        </div>
                        <button className={st('btn-contact')}>Gửi yêu cầu hỗ trợ ngay</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container" style={{ marginTop: 20, marginBottom: 40 }}>
            {/* Header trang Support - Giống header Profile nhưng đơn giản hơn */}
            <div className="row">
                <div className="col-md-12">
                    <div className={st('support-header')}>
                        <h3>Trung tâm hỗ trợ khách hàng</h3>
                        <p>Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn</p>
                    </div>
                </div>
            </div>

            {/* Main Content: Chia cột giống Profile */}
            <div className="row" style={{ marginTop: 20 }}>
                {/* Cột trái: Menu */}
                <div className="col-md-3">
                    <div className={st('support-menu')}>
                        <div 
                            className={st('menu-item', { active: activeTab === 'policy' })}
                            onClick={() => setActiveTab('policy')}
                        >
                            <span>
                                <FontAwesomeIcon icon={faShieldHalved} className={st('icon-left')} />
                                Chính sách
                            </span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>

                        <div 
                            className={st('menu-item', { active: activeTab === 'faq' })}
                            onClick={() => setActiveTab('faq')}
                        >
                            <span>
                                <FontAwesomeIcon icon={faCircleQuestion} className={st('icon-left')} />
                                Câu hỏi thường gặp
                            </span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>

                        <div 
                            className={st('menu-item', { active: activeTab === 'contact' })}
                            onClick={() => setActiveTab('contact')}
                        >
                            <span>
                                <FontAwesomeIcon icon={faHeadset} className={st('icon-left')} />
                                Liên hệ
                            </span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </div>
                </div>

                {/* Cột phải: Nội dung tương ứng */}
                <div className="col-md-9" style={{ paddingRight: 0 }}>
                    <div className={st('support-content')}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Support;