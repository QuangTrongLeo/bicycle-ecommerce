import classNames from 'classnames/bind';
import styles from './style.module.scss';

const st = classNames.bind(styles);

function Footer() {
    return (
        <footer className={st('footer')}>
            <div className={st('container')}>
                <div className={st('row')}>
                    <div className={st('col-md-12', 'header-footer')}>
                        <span>
                            ∆ Chính sách mua sắm tại Silk Road. Các sản phẩm và dịch vụ tại Silk Road được cung cấp
                            thông qua các đối tác chính thức. Giá hiển thị trên trang chỉ mang tính tham khảo và có thể
                            thay đổi. Giá bán cuối cùng phụ thuộc vào tình trạng, kích cỡ, và phiên bản sản phẩm. Thuế
                            GTGT có thể được áp dụng trên toàn bộ giá trị của đơn hàng. Bạn cần xuất trình giấy tờ tùy
                            thân hợp lệ nếu được yêu cầu. Đối tác của Silk Road có quyền từ chối, hủy bỏ hoặc giới hạn
                            số lượng mua hàng. Vui lòng xem Điều khoản & Điều kiện hoặc liên hệ dịch vụ khách hàng.
                        </span>
                    </div>

                    {/* === COPYRIGHT + LOCATION === */}
                    <div className={st('col-md-12')}>
                        <div
                            className={st('content-footer')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <div>Bản quyền © Silk Road Inc. 2024. Bảo lưu mọi quyền.</div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>Việt Nam</span>
                            </div>
                        </div>
                    </div>

                    {/* === POLICY === */}
                    <div className={st('col-md-12', 'policy')}>
                        <span>Chính Sách Quyền Riêng Tư | </span>
                        <span>Điều Khoản Sử Dụng | </span>
                        <span>Bán Hàng và Hoàn Tiền | </span>
                        <span>Pháp Lý | </span>
                        <span>Bản đồ trang web</span>
                    </div>

                    {/* === ADDRESS === */}
                    <div className={st('col-md-12')}>
                        <span>địa chỉ: VQCR+GP6, khu phố 6, Thủ Đức, Hồ Chí Minh</span>
                    </div>

                    {/* === SOCIAL LINKS === */}
                    <div
                        className={st('col-md-12', 'social')}
                        style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span>theo dõi chúng tôi: </span>

                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className={st('social-link')}>
                            Facebook
                        </a>

                        <span>|</span>

                        <a
                            href="https://www.instagram.com/yourprofile"
                            target="_blank"
                            rel="noreferrer"
                            className={st('social-link')}>
                            Instagram
                        </a>

                        <span>|</span>

                        <a
                            href="https://twitter.com/yourprofile"
                            target="_blank"
                            rel="noreferrer"
                            className={st('social-link')}>
                            Twitter
                        </a>

                        <span>|</span>

                        <a
                            href="https://www.tiktok.com/@yourprofile"
                            target="_blank"
                            rel="noreferrer"
                            className={st('social-link')}>
                            TikTok
                        </a>

                        <span>|</span>

                        <a
                            href="https://www.youtube.com/channel/yourchannel"
                            target="_blank"
                            rel="noreferrer"
                            className={st('social-link')}>
                            YouTube
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
