import AsyncStorage from '@react-native-async-storage/async-storage';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const DID_T_LI = 'DID_T_LI';
export const student_app = 'Your key....';
const singupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${student_app}`;
const loginURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${student_app}`;
import { getProfile } from '../../sqlite/db';

let timer;
export const autoLogin = (userId, token, extime) => {

    autoLogOut(extime);
    console.log('sta li je ovdje ', userId, token);
    return { type: LOGIN, userId: userId, token: token }; 

    };



export const signupORlogin = (email, password, signOrLog) => {
    return async dispatch => {
        try {
            let resData = null;
            const response = await fetch(signOrLog ? singupURL : loginURL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

            resData = await response.json();
            //  console.log(resData);
            const errPom = signOrLog ? 'Signup' : 'Login';
            if (!resData || resData.error) { throw new Error(errPom + ' - > ' + resData.error.code + ' message: ' + resData.error.message) }


            if (response.ok) {

                if (signOrLog) dispatch({ type: SIGNUP, userId: resData.localId, token: resData.idToken });
                else dispatch({ type: LOGIN, userId: resData.localId, token: resData.idToken });
                const expires = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);

                AsyncStorage.setItem('userData',
                    JSON.stringify({
                        userId: resData.localId,
                        token: resData.idToken,
                        expiresIn: expires.toISOString()
                    })
                );

                dispatch(autoLogOut(parseInt(resData.expiresIn) * 1000));

            }

        } catch (err) {
            if (err.message) throw err.message; else throw err;

        }

    }
};

export const logOut = () => {
    if (timer) {
        clearTimeout(timer);
    }
    AsyncStorage.removeItem('userData');
    return {
        type: LOGOUT
    };
};

export const autoLogOut = expiresTime => {
    return dispatch => {

        timer = setTimeout(() => {
            dispatch(logOut());
            //console.log('autoLogout');
        }, expiresTime);

    };

};

export const didtryLI = () => {
    return {
        type: DID_T_LI,
    };

};
