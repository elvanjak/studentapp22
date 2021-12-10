import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, View, KeyboardAvoidingView, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as astionsAuth from '../../store/actions/auth';
import { LinearGradient } from 'expo-linear-gradient';
import actionsProfile from '../../store/actions/profile';

const FORM_UPDATE = 'UPDATE';
const formReducer = (state, action) => {

    if (action.type === FORM_UPDATE) {

        const updatedValues = { ...state.inputValues };
        updatedValues[action.inputId] = action.value;

        const updatedValidities = {
            ...state.inputValidities,
            [action.inputId]: action.valid
        };

        const updatedTouched = {
            ...state.inputTouched,
            [action.inputId]: action.touched
        };

        let updatedFormIsValid = true;

        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            inputTouched: updatedTouched,
            formIsValid: updatedFormIsValid
        }

    }
    else return state;

};
const AuthScreen = props => {

    const dispatch = useDispatch();

    const [signOrLog, setSignOrLog] = useState(true);
    const [isLoading, setLoading] = useState(false);

    const [FormState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputTouched: {
            email: false,
            password: false,
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    });
    const textChangeHandler = (inputId, required, url, min, max, minLength, email, maxLength, text) => {
        // const urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
console.log(' text change auth screen');
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;

        if (required && text.trim().length === 0) {
            isValid = false;
        }
        if (email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (min != null && +text < min) {
            isValid = false;
        }
        if (max != null && +text > max) {
            isValid = false;
        }
        if (minLength != null && text.length < minLength) {
            isValid = false;
        }
        if (maxLength != null && text.length > maxLength) {
            isValid = false;
        }
        dispatchFormState({
            type: FORM_UPDATE,
            value: text,
            valid: isValid,
            inputId: inputId,
            touched: true
        });
    }

    const signOrLogF = async () => {
        try {
            setLoading(true);
            await dispatch(astionsAuth.signupORlogin(FormState.inputValues.email, FormState.inputValues.password, signOrLog));
            //setLoading(false);
           // await dispatch(actionsProfile.gProfile());
            Alert.alert('Message', 'Successfully' + `${signOrLog ? ' signed up.' : ' logged in.'}`, [{ text: 'OK', style: 'default' }]);

           // props.navigation.navigate('Admin');
        }
        catch (err) {
            setLoading(false);
            Alert.alert('Something went wrong!', err, [{ text: 'OK', style: 'cancel' }, { text: 'TRY AGAIN', style: 'default', onPress: signOrLogF }]);
        }
    }
console.log('render auth screen');
    return <KeyboardAvoidingView
        behavior='height'
        keyboardVerticalOffset={5}
        style={styles.screen}>
        <LinearGradient colors={['#087ee1', '#087ee1', '#05e8ba']} style={{
            ...styles.screen, justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{ ...styles.card, ...styles.authContainer }}>
                <ScrollView>
                    <Input
                        inputId='email'
                        label='E-mail'
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize='none'
                        errorText='Pleasew enter a valid email address'
                        onChanged={textChangeHandler}
                        value={FormState.inputValues.email}
                        valid={FormState.inputValidities.email}
                        touched={FormState.inputTouched.email}
                    />

                    <Input
                        inputId='password'
                        label='Password'
                        keyboardType='default'
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize='none'
                        errorText='Please enter a valid password'
                        onChanged={textChangeHandler}
                        value={FormState.inputValues.password}
                        valid={FormState.inputValidities.password}
                        touched={FormState.inputTouched.password} />

                    <View style={{ marginTop: 10 }}>
                        {isLoading ? <View style={styles.screen}>
                            <ActivityIndicator color={Colors.primary} size='small' />
                        </View> : <View style={{ marginTop: 10 }}>
                                <Button title={signOrLog ? 'SignUp' : 'Login'} color={Colors.accent} disabled={!FormState.formIsValid} onPress={signOrLogF} />
                            </View>
                        }
                        <View style={{ marginTop: 10 }}>
                            <Button title={!signOrLog ? 'Switch to SignUp' : 'Switch to Login'} color={Colors.primary} onPress={() => {setSignOrLog(prevState => !prevState) }} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    </KeyboardAvoidingView>

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        height: 350,
        padding: 20
    },
    card: {
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 10,

    }
});

//AuthScreen.navigationOptions

export const screenOptions={
    headerTitle: 'Authentification form'
};
export default AuthScreen;