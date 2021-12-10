import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch,useSelector } from 'react-redux';
import * as actionsAuth from '../store/actions/auth';
import moment from "moment";



const StartupScreen = props => {
    const dispatch = useDispatch();


    useEffect(() => {

        const isLogIn = async () => {

            const userData = await AsyncStorage.getItem('userData');
           
            

            if (!userData) {
             //  console.log('ide na auth beyveye',userData);
                //props.navigation.navigate('Auth');
                dispatch(actionsAuth.didtryLI());
                return;
            }

           // console.log("user auth data", userData);
            const objUserData = JSON.parse(userData);
            const istekaoToken = moment(objUserData.expiresIn).isSameOrBefore(new Date().toISOString());
           // console.log(istekaoToken, new Date().toISOString(), objUserData.expiresIn);

            if (istekaoToken || !objUserData.token || !objUserData.userId) {
                //props.navigation.navigate('Auth');
                dispatch(actionsAuth.didtryLI());
                return;
            }
            const leftTime = new Date(objUserData.expiresIn).getTime() - new Date().getTime();

        
           await dispatch(actionsAuth.autoLogin(objUserData.userId,objUserData.token, leftTime));
   //autologin
          
        
            //dispatch(actionsAuth.didtryLI());
            console.log(objUserData.userId);
           // props.navigation.navigate('Admin');

        };

        isLogIn();


    }, []);


    return <View style={styles.screen}>
        <ActivityIndicator color={Colors.primary} size='large' />
    </View>;
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
export default StartupScreen;