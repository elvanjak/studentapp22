import React, { useEffect, useState } from 'react';
import {
    View,
    Button,
    Image,
    Text,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';

import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPerview from './MapPerview';

const LocationPicker = props => {
    const student = useSelector(state => state.profile.profile);
    const [pickedLocation, setPickedLocation] = useState(student ? {lat:student.lat,lng:student.lng}: null);
    const [isFetching, setIsFetching] = useState(false);

    let mapPickedLocation = null;
    if(!!props.routeM.params)  mapPickedLocation=props.routeM.params.pickedLocation;
   

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            props.pick(mapPickedLocation);
        }

    }, [mapPickedLocation]);

    const propagatePickedLocation = (location) => {
        setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
        props.pick({ lat: location.coords.latitude, lng: location.coords.longitude });

    };

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {

        const ok = await verifyPermissions();
        if (!ok) return;
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            console.log(location.coords.latitude, location.coords.longitude)
            propagatePickedLocation(location);

        }

        catch (err) {
            Alert.alert('Something went wrong in getting location!', err.message, [{ text: 'OK' }]);
        }
        setIsFetching(false);
    }

    return <View style={styles.locationPicker}>
        <MapPerview fetch={isFetching} location={pickedLocation} navigator={props.navigator} />
        <View style={styles.action}>
            <Button
                title='Get Your location!'
                color={Colors.primary}
                onPress={getLocationHandler} />
            <Button
                title='Pick Your location!'
                color={Colors.primary}
                onPress={() => props.navigator.navigate('Map', {initialLocation:pickedLocation})} />
        </View>

    </View>;
};

const styles = StyleSheet.create({
    locationPicker:
    {
        flex: 1,
        marginBottom: 15
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }


});

export default LocationPicker;
