const users = [
    {
        id: 1,
        username: 'admin',
        password: '1',
        role: 'admin',
        fullName: 'admin',
    },
    {
        id: 2,
        username: 'user01',
        password: 'user123',
        role: 'user',
        fullName: 'Nguyễn Huy Vũ',
    },
];

export const checkUserLogin = (username, password) => {
    const foundUser = users.find((u) => u.username === username && u.password === password);

    if (!foundUser) {
        return {
            success: false,
            message: 'Sai tài khoản hoặc mật khẩu!',
            user: null,
        };
    }

    const { password: _, ...safeUser } = foundUser;

    return {
        success: true,
        message: 'Đăng nhập thành công!',
        user: safeUser,
    };
};
