import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
import { checkUserLogin } from '~/api/user/userApi';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '~/redux/action/userAction';

import styles from './style.module.scss';
const st = classNames.bind(styles);

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [errorText, setErrorText] = useState('');

    // mỗi input có state focus riêng
    const [focusUser, setFocusUser] = useState(false);
    const [focusPass, setFocusPass] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nameLoginRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = e.target.nameLogin.value.trim();
        const password = e.target.password?.value.trim();

        // mở password khi mới nhập username
        if (!showPassword) {
            if (username) {
                setShowPassword(true);
            }
            return;
        }

        // kiểm tra rỗng
        if (!username || !password) {
            setErrorText('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        const result = checkUserLogin(username, password);

        if (!result.success) {
            setErrorText(result.message);
            return;
        }

        dispatch(setUser(result.user));
        navigate('/');
    };

    const handleIconClick = () => {
        const username = nameLoginRef.current?.value.trim();
        if (username) setShowPassword(true);
    };

    return (
        <div className={st('login-page')}>
            <div className={st('under-navigation')}>
                <div className="container">
                    <span className={st('login-header')}>Đăng nhập để thanh toán nhanh hơn.</span>
                </div>

                <div className="row justify-content-center" style={{ paddingTop: 70 }}>
                    <div className="col-md-6">
                        <div className={st('login-container', 'text-center', 'p-4')}>
                            <h1 className={st('login-title')}>Đăng nhập vào Silk Road</h1>

                            <form className={st('form')} onSubmit={handleSubmit}>
                                {/* USERNAME */}
                                <div
                                    className={st('input-box')}
                                    style={{
                                        border: focusUser ? '1px solid #007bff' : '1px solid #ced4da',
                                    }}>
                                    <input
                                        type="text"
                                        id="nameLogin"
                                        name="nameLogin"
                                        ref={nameLoginRef}
                                        className={st('input')}
                                        placeholder=" "
                                        required
                                        onFocus={() => setFocusUser(true)}
                                        onBlur={() => setFocusUser(false)}
                                    />

                                    <label htmlFor="nameLogin" className={st('label')}>
                                        Vui lòng điền tài khoản của bạn
                                    </label>

                                    {!showPassword && (
                                        <FontAwesomeIcon
                                            icon={faCircleRight}
                                            className={st('input-icon')}
                                            onClick={handleIconClick}
                                        />
                                    )}
                                </div>

                                {/* PASSWORD */}
                                {showPassword && (
                                    <div
                                        className={st('input-box')}
                                        style={{
                                            border: focusPass ? '1px solid #007bff' : '1px solid #ced4da',
                                        }}>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className={st('input')}
                                            placeholder=" "
                                            required
                                            onFocus={() => setFocusPass(true)}
                                            onBlur={() => setFocusPass(false)}
                                        />

                                        <label htmlFor="password" className={st('label')}>
                                            Vui lòng điền mật khẩu của bạn
                                        </label>
                                    </div>
                                )}

                                {/* LOGIN BUTTON */}
                                {showPassword && (
                                    <button type="submit" className={st('login-btn')}>
                                        Đăng nhập
                                    </button>
                                )}

                                {/* ERROR */}
                                <div className={st('error-box')}>
                                    <span>{errorText}</span>
                                </div>

                                {/* REMEMBER ME */}
                                {showPassword && (
                                    <div className={st('remember')}>
                                        <div className={`${st('form-check')} my-3`}>
                                            <input type="checkbox" className="checkbox" />
                                            <label className="form-check-label">Lưu tôi</label>
                                        </div>
                                    </div>
                                )}

                                {/* LINKS */}
                                <div className={st('login-links')}>
                                    <a href="/forgetPass" style={{ color: '#06c' }}>
                                        Bạn đã quên mật khẩu ?
                                    </a>

                                    <a href="/register">
                                        Bạn không có tài khoản?
                                        <span style={{ color: '#06c' }}> Tạo tài khoản ngay.</span>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
