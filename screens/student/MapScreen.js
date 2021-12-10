import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const MapScreen = props => {
  const [selectedLocation, setSelectedLocation] = useState();


  const initalLocation = props.route.params ? props.route.params.initialLocation : null;

  if (initalLocation) {
    markerCoordinates = {
      latitude: parseFloat(initalLocation.lat + ""),
      longitude: parseFloat(initalLocation.lng + "")
    };
  }

  const mapRegion = {
    latitude: initalLocation ? initalLocation.lat : 37.78,
    longitude: initalLocation ? initalLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });

  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      return;
    }
    props.navigation.navigate('Profile', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {

    //props.navigation.setParams({ saveLocation: savePickedLocationHandler });
    const readOnly = props.route.params ? props.route.params.readOnly : true;
    if (!readOnly) props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Save"
            iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
            onPress={savePickedLocationHandler} />
        </HeaderButtons>
      )

    });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    mapRegion.latitude = selectedLocation.lat;
    mapRegion.longitude = selectedLocation.lng;
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

//MapScreen.navigationOptions 
export const screenOptions = navData => {

  return {
    headerTitle: " Choose your location ",
  };

};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
