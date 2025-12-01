import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';

import rankNone from '../../assets/img/rank/none.png';
import rankSilver from '../../assets/img/rank/silver.png';
import rankGold from '../../assets/img/rank/gold.png';
import rankPlatinum from '../../assets/img/rank/platinum.png';
import cashIcon from '../../assets/img/user/mceclip6_39.png';

const st = classNames.bind(styles);

function Profile() {
    return (
        <div className="container">
            d
            <div className="row">
                {/* HEADER USER */}
                <div className="col-md-12">
                    <div className={st('profile-header')}>
                        <div className="row">
                            {/* LEFT */}
                            <div className="col-md-9">
                                <h3>Hi, Nguyễn Huy Vũ</h3>

                                <img className={st('rank-current')} src={rankNone} alt="" />

                                <div className={st('profile-spending')}>
                                    <p>
                                        Chi tiêu thêm <span>252.000đ</span> để lên hạng
                                    </p>
                                    <img className={st('rank-next')} src={rankSilver} alt="" />
                                </div>

                                {/* LINE SPEND */}
                                <div className={st('spend-line')}>
                                    <div className={st('spend-progress')}></div>

                                    <div className={st('spend-point')} style={{ left: '0%' }}>
                                        <img src={rankNone} alt="" />
                                    </div>

                                    <div className={st('spend-point')} style={{ left: '33.3%' }}>
                                        <img src={rankSilver} alt="" />
                                    </div>

                                    <div className={st('spend-point')} style={{ left: '66.6%' }}>
                                        <img src={rankGold} alt="" />
                                    </div>

                                    <div className={st('spend-point')} style={{ left: '99.9%' }}>
                                        <img src={rankPlatinum} alt="" />
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="col-md-3">
                                <div className={st('profile-summary')}>
                                    <div className={st('coolcash-box')}>
                                        <p style={{ textAlign: 'end' }}>Bạn đang có</p>

                                        <div className={st('coolcash')}>
                                            <img src={cashIcon} alt="" />
                                            <p>3.000 CoolCash</p>
                                        </div>
                                    </div>

                                    <div className={st('reward')}>
                                        <div className="btn">
                                            <div className="text">
                                                <div>SirkRoad</div>
                                                <div>Rewards Hub</div>
                                            </div>
                                            <div className="icon">
                                                <i className="fa-solid fa-right-long"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* MAIN CONTENT */}
            <div className="row" style={{ marginTop: 20 }}>
                {/* LEFT MENU */}
                <div className="col-md-3" style={{ padding: 0 }}>
                    <div className={st('user-menu')}>
                        <div className={st('menu-item')}>
                            <span>Lịch sử đơn hàng</span>
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>

                        <div className={st('menu-item')}>
                            <span>Chính sách và câu hỏi thường gặp</span>
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>

                        <Link to="/logout">
                            <div className={st('menu-item-logout')}>Đăng xuất</div>
                        </Link>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="col-md-9" style={{ paddingRight: 0 }}>
                    <div className={st('profile-content')}>
                        {/* PERSONAL INFO */}
                        <h2>Thông tin tài khoản</h2>

                        <div className={st('info-row')}>
                            <p>Họ và tên</p>
                            <p>Nguyễn Huy Vũ</p>
                        </div>

                        <div className={st('info-row')}>
                            <p>Số điện thoại</p>
                            <p>0987654321</p>
                        </div>

                        <div className={st('info-row')}>
                            <p>Giới tính</p>
                            <p>Nam</p>
                        </div>

                        <div className={st('info-row')}>
                            <p>Ngày tháng năm sinh</p>
                            <p>10/01/2003</p>
                        </div>

                        <div className={st('info-row')}>
                            <p>Địa chỉ</p>
                            <p>123, Đường 123, Quận 1, TP.HCM</p>
                        </div>

                        <button className={st('btn-edit')}>Chỉnh sửa thông tin cá nhân</button>

                        {/* LOGIN INFO */}
                        <h2 style={{ marginTop: 20 }}>Thông tin đăng nhập</h2>

                        <div className={st('info-row')}>
                            <p>Email</p>
                            <p>huyvu10012003@gmai.com</p>
                        </div>

                        <div className={st('info-row')}>
                            <p>Mật khẩu</p>
                            <p>********</p>
                        </div>

                        <button className={st('btn-edit')}>Chỉnh sửa thông tin cá nhân</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
