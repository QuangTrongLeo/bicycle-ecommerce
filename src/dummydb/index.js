// =====================
// BẢNG USERS
// =====================
export const users = [
    {
        id: 1,
        username: 'admin',
        password: '1',
        role: 'admin',
    },
    {
        id: 2,
        username: 'user01',
        password: 'user123',
        role: 'user',
    },
];

// =====================
// BẢNG PROFILE
// =====================
export const userProfiles = [
    {
        userId: 1,
        fullName: 'admin',
        phone: '0000000000',
        gender: 'Nam',
        birthday: '01/01/2000',
        address: 'Chưa cập nhật',
        email: 'admin@example.com',
    },
    {
        userId: 2,
        fullName: 'Nguyễn Huy Vũ',
        phone: '0987654321',
        gender: 'Nam',
        birthday: '10/01/2003',
        address: '123, Đường 123, Quận 1, TP.HCM',
        email: 'huyvu10012003@gmail.com',
    },
];

// =====================
// BẢNG WALLET
// =====================
export const userWallet = [
    {
        userId: 1,
        coolcash: 5000,
    },
    {
        userId: 2,
        coolcash: 3000,
    },
];

// =====================
// BẢNG RANK
// =====================
export const userRanks = [
    {
        userId: 1,
        rank: 'none',
        spendingToNextRank: 500000,
    },
    {
        userId: 2,
        rank: 'none',
        spendingToNextRank: 252000,
    },
];

// =====================
// HÀM LOGIN
// =====================
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

export const getUserProfile = (userId) => userProfiles.find((p) => p.userId === userId) || null;

export const getUserWallet = (userId) => userWallet.find((w) => w.userId === userId) || null;

export const getUserRank = (userId) => userRanks.find((r) => r.userId === userId) || null;
