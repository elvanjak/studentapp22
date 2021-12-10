import React, {useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import VideoItem from './VideoItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {

    const [showDetail, setShowDetail]=useState(false);

    return <View style={styles.orderItem}>
        <View style={styles.summary}>
            <Text style={styles.title}>Title: {props.title}</Text>
            <Text style={styles.date}>Professor: {props.professor}</Text>
        </View>
        <View style={styles.show}>
        <Button color={Colors.primary} 
        title={!showDetail? "Show videos": 'Hide videos'}
        onPress={()=>setShowDetail(prevState=>!prevState)} />
        </View>
        {showDetail && (props.items.length!==null) && <View>
            {props.items.map(item=><VideoItem 
                videoId={item.videoId} 
                videoDuration={item.videoDuration} 
                videoTitle={item.videoTitle} 
                playable={true} 
                key={item.videoId}
                onPlay={()=>props.navigation.navigate('StartClass',{videoUri: item.videoUrl,title:props.title, videoTitle:item.videoTitle})}/>)}
        </View>}
    </View>;
};

const styles=StyleSheet.create({
    orderItem:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        padding:10,
        margin:20
    },
    summary:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    title:{
        fontFamily:'lato-regular',
        fontSize:16
    },
    date:{
        fontFamily:'lato-semibold',
        fontSize:16,
        color:'#888'
    },
    show:{
        marginTop:5,
        alignItems:'center'
    }
});
export default OrderItem;