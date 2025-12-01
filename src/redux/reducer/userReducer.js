import { SET_USER, LOGOUT_USER } from '../action/userAction';

const INITIAL_STATE = {
    user: null, // Lưu thông tin user
    isAuthenticated: false, // Đã đăng nhập hay chưa
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };

        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };

        default:
            return state;
    }
};

export default userReducer;
