import React from 'react';
import {View, Text, StyleSheet, Platform,TouchableOpacity, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { relativeTimeRounding } from 'moment';

const VideoItem =props=>{

    return <View style={styles.cartItem}>
        <View style={styles.itemData}>
            <View  style={styles.qt}>
            <View style={styles.quantity}><Text style={styles.quantity}>{props.videoId}</Text></View>
            <View style={styles.img}><Image source={require('../../assets/class-design-sketch-name.png')} style={{resizeMode: 'cover',width:'100%', height:'100%'}}/></View>
            <View style={styles.title}><Text style={styles.title}>{props.videoTitle}</Text></View>
            </View>
            <View style={styles.amount}><Text style={styles.amount}>{props.videoDuration}</Text></View>
        </View>
        {props.playable && 
        <View style={styles.playButton}>
            <TouchableOpacity onPress={props.onPlay} >
                <Ionicons name={Platform.OS=== 'android' ? 'md-play-circle' : 'ios-play-circle'} size={45} color={Colors.primary} />
            </TouchableOpacity>
        </View>
        }
    </View>
};

const styles=StyleSheet.create({
    cartItem:{
        flex:1,
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:5,
     
    },
    qt:{
        flex:0.65,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemData:{
        flex:0.95,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
      
    },
    img:{
        height:'90%',
        width:'60%'
        
    },
    quantity:{
        fontFamily: 'lato-regular',
        fontSize: 14,
        color: '#888',
      
    },
    title:{
        fontFamily: 'lato-semibold',
        fontSize: 16,
        textAlignVertical:'center'
    },
    amount:{ 
  
    fontFamily: 'lato-semibold',
    fontSize: 15,
    alignItems:'flex-end',
    justifyContent:'center'
},
    playButton:{
      flex:0.15,
      marginLeft:5,
      alignItems:'center',
      justifyContent: 'center'
    }
});
export default VideoItem;
