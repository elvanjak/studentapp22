import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Camera } from 'expo-camera';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Camerica from './Camerica';
import VideoPlayerClassroom from './VideoPlayerClass';
import { AppState } from 'react-native';
import Colors from '../../constants/Colors';
import * as actionsData from '../../store/actions/data';

const StartClassScreen = (props) => {

    const dispatch = useDispatch();

    const [w, setW] = useState(Dimensions.get('window').width);
    const [h, setH] = useState(Dimensions.get('window').height - 35);

    const [hasPermission, setHasPermission] = useState(null);

    const [salji, setSalji] = useState(false);

    const videoUrl = props.route.params ? props.route.params.videoUri : '';

    const [kamera, setKamera] = useState(true);
    const [appState, setAppState] = useState(AppState.currentState);

    const handleAppStateChange = (state) => {
        setAppState(state);
    }
    const idS = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);
    //const fullName = useSelector(state => state.profile.profile.full_name);
    // const iNumber = useSelector(state => state.profile.profile.index_number);


    const vracenoSaKamere = async (timestamp, time, lice, Loko, Doko, Treptaj, periodIzmedjuTreptaja, otvorenoLijevoVjer, otvorenoDesnoVjer) => {
        console.log(timestamp, time, lice, Loko, Doko, Treptaj, periodIzmedjuTreptaja, otvorenoLijevoVjer, otvorenoDesnoVjer);
        let data = {
            timestamp: timestamp,
            timeFormat: time,
            liceIma: lice,
            LokoIma: Loko,
            DokoIma: Doko,
            Treptaj: Treptaj,
            periodIzmedjuTreptaja: periodIzmedjuTreptaja,
            otvorenoLijevoOkoVjer: otvorenoLijevoVjer,
            otvorenoDesnoOkoVjer: otvorenoDesnoVjer
        };

        if (salji) await actionsData.sendData(idS, props.route.params.title, props.route.params.videoTitle, { ...data }, token);
    };

    useEffect(() => {

        setTimeout(() => setSalji(true), 3000);
        //lock orientation to landscape
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        props.navigation.setOptions({
            headerTitle: `Video:${props.route.params.title},${props.route.params.videoTitle}`,
            headerTitleStyle: {
                fontFamily: 'lato-regular',
                fontSize: 20
            },
        });
        AppState.addEventListener('change', handleAppStateChange);
        return (() => {
            AppState.removeEventListener('change', handleAppStateChange);
        })
    }, []);

    useEffect(() => {
        const sub = ScreenOrientation.addOrientationChangeListener(changeWH);
        Dimensions.addEventListener('change', changeWH);
        return () => {
            Dimensions.removeEventListener('change', changeWH);
            sub.remove();
        }
    }, []);


    const changeWH = () => {

        setW(Dimensions.get('window').width);
        setH(Dimensions.get('window').height - 35);
    }

    useEffect(() => {
        console.log(appState);
    });



    const mounKamera = () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        setKamera(true);
    }
    const UNmounKamera = () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
        setKamera(false);
    }
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        if (appState === 'active') mounKamera();
        else UNmounKamera();
        const unsub = props.navigation.addListener('focus', mounKamera);
        const unsub2 = props.navigation.addListener('blur', UNmounKamera);
        return () => {
            unsub();
            unsub2(); //console.log('When'); 
        };

    }, [appState, props.navigation]);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }




    return (<View style={styles.screen}>
        <ScrollView>

            <VideoPlayerClassroom url={videoUrl} w={w} h={h}  />
            {kamera ? <Camerica vratiPodatke={vracenoSaKamere} /> : null}
        </ScrollView>
    </View>);
}

const styles = StyleSheet.create({
    screen:
    {
        flex: 1
    },
    naslov: {
        marginVertical: 3,
    },
    tekst: {
        textAlign: 'center',
        fontFamily: 'lato-regular',
        fontSize: 16,
        color: Colors.primary
    }



});

export default StartClassScreen;

export const screenOptions = navData => {

    return ({

        // headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        //     <Item
        //         title="Menu"
        //         iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        //         onPress={() => navData.navigation.toggleDrawer()} />
        // </HeaderButtons>
    });
}