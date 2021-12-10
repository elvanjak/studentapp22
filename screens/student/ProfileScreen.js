import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as actionsProfile from '../../store/actions/profile';
import ImgPicker from '../../components/Image/ImgPicker';
import LocationPicker from '../../components/Map/LocationPicker';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ProfileScreen = props => {

    const dispatch = useDispatch();

   
    const [loading, setLoading] = useState(false);

    let errorTitleMessage = null;
    let errorIndexMessage = null;

    const [title, setTitle] = useState('');
    const [index, setIndex] = useState('');


    const [errorTitle, setErrorTitle] = useState(null);
    const [errorIndex, setErrorIndex] = useState(null);

    const [titleTouched, setTitleTouched] = useState(false);
    const [indexTouched, setIndexTouched] = useState(false);

    const [pickedLocation, setPickedLocation] = useState({ lat: 15.6, lng: 12.3 });



    const [pickedImage, setPickedImage] = useState();

    const student = useSelector(state => state.profile.profile);
    const token = useSelector(state => state.auth.token);
   

    const getP = useCallback(async () => {
        setLoading(true);
        if (student !== null) {
            setTitle(student.full_name);
            setIndex(student.index_number);
            setPickedLocation({ lat: student.lat, lng: student.lng });
            setPickedImage(student.imageUrl);
            setTitleTouched(true);
            setIndexTouched(true);

        }
        setLoading(false);

    }, [dispatch]);

    useEffect(() => {
         getP();
      //  console.log('Ima li profila', student);
    
    }, [getP]);


    const placeLocation = placeLocation => {
        setPickedLocation(placeLocation);
    };

    const titleChangeHandler = text => {
        setTitleTouched(true);
        if (text.trim().length <= 3) setErrorTitle('Fullname is too short!');
        else setErrorTitle(null);
        setTitle(text);
    };

    const indexChangeHandler = text => {
        setIndexTouched(true);
        if (text.trim().length === 0) setErrorIndex('Index number is required!');
        else setErrorIndex(null);
        setIndex(text);
    };

    const placeImage = imageUrl => {

        setPickedImage(imageUrl);
    };
    const savePlaceHandler =async () => {
        if ((errorTitle === null) && (title.trim().length > 3) && (errorIndex === null) && (index.trim().length !== 0) && pickedImage) {
            setLoading(true);
            await dispatch(actionsProfile.cUProfile(title, index, pickedImage, pickedLocation.lat, pickedLocation.lng,token));
            setLoading(false);
            Alert.alert("Info message", 'Profile data has been successfully saved!', [{ text: 'OK', style: 'default' }]);
        }

        else {

            let alertMessage = "";
            alertMessage += errorTitle ? errorTitle + ". " : "";
            alertMessage += errorIndex ? errorIndex + ". " : "";
            alertMessage += !!pickedImage ? "" : "Profile image is required! Please take it!";


            Alert.alert('Correct yours entries.', alertMessage, [{ text: 'OK', style: 'default' }]);
        }


    };

    if (titleTouched && errorTitle)
        errorTitleMessage = (<Text style={{ ...styles.label, ...styles.error }}>{errorTitle}</Text>);

    if (indexTouched && errorIndex)
        errorIndexMessage = (<Text style={{ ...styles.label, ...styles.error }}>{errorIndex}</Text>);

    //if (error) return <View style={styles.form}><Text>{error}</Text></View>;
   // if (loading) return <View style={styles.form}><ActivityIndicator size='large' color={Colors.accent} /></View>;

   // console.log(student, title,index);

    return <ScrollView><View style={styles.form}>
        <Text style={styles.label}>Full name:</Text>
        <TextInput
            style={styles.textInput}
            autoCapitalize='sentences'
            value={title}
            onChangeText={titleChangeHandler} />
        {errorTitleMessage}
        <Text style={styles.label}>Index number:</Text>
        <TextInput
            style={styles.textInput}
            value={index}
            onChangeText={indexChangeHandler} />
        {errorIndexMessage}
        <ImgPicker onImageSet={placeImage} />
        <LocationPicker pick={placeLocation} routeM={props.route} navigator={props.navigation}/>
        {loading ? <ActivityIndicator size='small' color={Colors.primary} /> : <Button title="Save" onPress={savePlaceHandler} color={Colors.primary} />}
    </View>
    </ScrollView>;
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
    error: {
        color: Colors.primary,

    }

});
//ProfileScreen.navigationOptions = 
export const screenOptions = navData => {
    return {
        headerTitle: 'Profile data',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navData.navigation.toggleDrawer()} />
        </HeaderButtons>
    }

};
export default ProfileScreen;