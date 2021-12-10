import React from 'react';
import { View, Text, Image, StyleSheet, TouchabelOpacity, Platform, TouchableNativeFeedback } from 'react-native';
const ProductItem = props => {

let TouchableCMP=TouchabelOpacity;
if(Platform.OS==='android' && Platform.Version>=21) TouchableCMP=TouchableNativeFeedback;

    return (<View style={styles.card}>
    <TouchableCMP onPress={props.onSelect} useForeground>
        <View>
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.details}>
        <Text style={styles.title}>Title: {props.title}</Text>
        <Text style={styles.price}>Professor: {props.price}</Text>
        </View>
        <View style={styles.actions}>
            {props.children}
        </View>
        </View>
        </TouchableCMP>
    </View>
    );
};

const styles = StyleSheet.create({
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
        margin: 20,
       
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily:'lato-regular'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily:'lato-semibold'

    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:4,
        height: '25%',
    
    paddingHorizontal:20




    },
    details:{
        height: '15%',
        padding: 10,
        alignItems:'center',
        
    },
    
    
imageContainer:{
        width: '100%',
        height: '60%',
        overflow:'hidden',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    }



});

export default ProductItem;