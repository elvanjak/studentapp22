import { LOGIN, SIGNUP, LOGOUT, DID_T_LI } from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
    didLI: false
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case DID_T_LI:
            //console.log('da li pokusava');
            return {
                ...state,
                didLI: true
            }
        case LOGOUT:
            //console.log('check logout');
            return {
                ...initialState,
                didLI: true
            };
        case LOGIN:
            //console.log('check login', action.token, action.userId);
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                didLI: true
            };
        case SIGNUP:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                didLI: true
            };
        default: return state;
    }


};

export default authReducer;