import React, { useState, useLayoutEffect } from 'react';
import { View, ScrollView, Platform, Text, ActivityIndicator, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


const MessageScreen = props => {

    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const token = useSelector(state => state.auth.token);
    const studentData = useSelector(state => state.profile.profile);
    
    const [tekst,setTekst]=useState('');

    
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant notifications permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }

        return true;
    };

    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true,
                shouldSetBadge: true,
                shouldPlaySound: true
            };
        }
    });
    const sendNotifyToServerPrep = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        if(studentData === null){
            return;
        }

        setIsLoading(true);

        const kome = await fetch('https://student-attention-monitoring.firebaseio.com/students.json?auth=' + token);
        if (!kome.ok) { throw new Error('Something went wrong while getting ExpoPushTokens!'); }
        //Notifications.getExpoPushTokenAsync();
        const tokeni=await kome.json();
        
        
         for(const key in tokeni){
console.log(tekst);
            let message = {
                to: tokeni[key].ExpoPushToken,
                sound: 'default',
                title: 'Message for Course : '+props.route.params.title,
                body: studentData.full_name + ", "+studentData.index_number+":"+ tekst,
                data: { time: new Date().getTime() },
            };

            console.log(message);
            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
            break;
         }

        //console.log(response.data);
        // setPushToken(response.data);

        
       

        // console.log(responseS, 'sa servera')
        setIsLoading(false);
        props.navigation.goBack();

    };


   useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Save"
                        iconName={
                            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                        }
                        onPress={sendNotifyToServerPrep}
                    />
                </HeaderButtons>
            )
        });
    }, [props.navigation,sendNotifyToServerPrep]);

    const textChangeHandler = (inputId, required, url, min, max, minLength, email, maxLength, text) => {
        const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

        //  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;

        if (required && text.trim().length === 0) {
            isValid = false;
        }
        if (url && !urlRegex.test(text.toLowerCase())) {
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
        setTekst(text);
    }
    if (error) { Alert.alert('Error message', error, [{ text: 'OK' }]); }
    if (isLoading) { return <View><ActivityIndicator size='large' color={Colors.primary} /></View> }

   
    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={10}
            style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        label='Message'
                        value={tekst}
                        onChanged={textChangeHandler}
                        autoCorrect
                        placeholder='Text...'
                        returnKeyType='done'
                        valid={true}
                        errorText='Please enter a valid text'
                        inputId='textm'
                        touched={true}
                        multiline={true}
                        required={true}
                        url={false}
                    />

                </View>
            </ScrollView>
        </KeyboardAvoidingView>);
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    }

});

//MessageScreen.navigationOptions 
export const screenOptions = navData => {

    return {
        headerTitle: 'Enter your message...',

    };
};
export default MessageScreen;