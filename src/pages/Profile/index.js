import { useSelector } from 'react-redux';
import { getUserInfo } from '~/data/api/user/userApi';

import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';

import { rankImages } from '~/assets/images';
import cashIcon from '../../assets/images/user/mceclip6_39.png';

const st = classNames.bind(styles);

function Profile() {
    const user = useSelector((state) => state.user.currentUser);

    if (!user) return <h2>Vui lòng đăng nhập!</h2>;

    const { profile, wallet, rank } = getUserInfo(user.id);

    const rankImgs = {
        none: rankImages.none,
        silver: rankImages.silver,
        gold: rankImages.gold,
        platinum: rankImages.platium,
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className={st('profile-header')}>
                        <div className="row">
                            <div className="col-md-9">
                                <h3>Hi, {profile.fullName}</h3>

                                <img className={st('rank-current')} src={rankImgs[rank.rank]} alt="" />

                                <div className={st('profile-spending')}>
                                    <p>
                                        Chi tiêu thêm <span>{rank.spendingToNextRank.toLocaleString()}đ</span> để lên
                                        hạng
                                    </p>
                                    <img className={st('rank-next')} src={rankImages.silver} alt="" />
                                </div>

                                <div className={st('spend-line')}>
                                    <div className={st('spend-progress')}></div>

                                    <div className={st('spend-point')} style={{ left: '0%' }}>
                                        <img src={rankImages.none} alt="" />
                                    </div>

                                    <div className={st('spend-point')} style={{ left: '33.3%' }}>
                                        <img src={rankImages.silver} alt="" />
                                    </div>

                                    <div className={st('spend-point')} style={{ left: '66.6%' }}>
                                        <img src={rankImages.gold} alt="" />
                                    </div>

                                    <div className={st('spend-point')} style={{ left: '99.9%' }}>
                                        <img src={rankImages.platium} alt="" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className={st('profile-summary')}>
                                    <div className={st('coolcash-box')}>
                                        <p style={{ textAlign: 'end' }}>Bạn đang có</p>

                                        <div className={st('coolcash')}>
                                            <img src={cashIcon} alt="" />
                                            <p>{wallet.coolcash.toLocaleString()} CoolCash</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="row" style={{ marginTop: 20 }}>
                <div className="col-md-3">
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

                <div className="col-md-9" style={{ paddingRight: 0 }}>
                    <div className={st('profile-content')}>
                        <h2>Thông tin tài khoản</h2>

                        <div className={st('info-row')}>
                            <p>Họ và tên</p>
                            <p>{profile.fullName}</p>
                        </div>

                        <div className={st('info-row')}>
                            <p>Số điện thoại</p>
                            <p>{profile.phone}</p>
                        </div>

                        <div className={st('info-row')}>
                            <p>Giới tính</p>
                            <p>{profile.gender}</p>
                        </div>

                        <div className={st('info-row')}>
                            <p>Ngày sinh</p>
                            <p>{profile.birthday}</p>
                        </div>

                        <div className={st('info-row')}>
                            <p>Địa chỉ</p>
                            <p>{profile.address}</p>
                        </div>

                        <button className={st('btn-edit')}>Chỉnh sửa thông tin cá nhân</button>

                        <h2 style={{ marginTop: 20 }}>Thông tin đăng nhập</h2>

                        <div className={st('info-row')}>
                            <p>Email</p>
                            <p>{profile.email}</p>
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
