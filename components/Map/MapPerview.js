import React from 'react';
import {
    Image,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text
} from 'react-native';

import Colors from '../../constants/Colors';
import {student_app} from '../../store/actions/auth';
const MapPreview = props => {
    let imagePreviewUrl;


    let prikaz;

    if (props.location) {
        
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&` +
            `zoom=16&size=400x200&maptype=roadmap` +
            `&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}` +
            `&key=${student_app}`;
            console.log(imagePreviewUrl);
        prikaz = <Image style={styles.imageM} source={{ uri: imagePreviewUrl }} />;
    }
    else if (props.fetch) prikaz = <ActivityIndicator size='small' color={Colors.primary} />;
    else prikaz = <Text>No place found jet...</Text>

    return <TouchableOpacity onPress={()=>{if(props.navigator) props.navigator.navigate('Map',{initialLocation:props.location, readOnly:props.readOnly})}} style={{...styles.mapPerview,...props.style}}>
        {prikaz}
    </TouchableOpacity>

};

const styles = StyleSheet.create({

    mapPerview:
    {
        marginBottom: 10,
        width: '100%',
        height: 250,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageM: {
        width: '100%',
        height: '100%'
    }

});

export default MapPreview;




