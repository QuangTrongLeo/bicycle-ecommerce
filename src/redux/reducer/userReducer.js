import { SET_USER, LOGOUT_USER } from '../action/userAction';

const INITIAL_STATE = {
    currentUser: null, // Lưu thông tin user
    isAuthenticated: false, // Đã đăng nhập hay chưa
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
            };

        case LOGOUT_USER:
            return {
                ...state,
                currentUser: null,
                isAuthenticated: false,
            };

        default:
            return state;
    }
};

export default userReducer;
