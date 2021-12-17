import React, { useEffect, useState,useRef} from 'react';
import { View, Text } from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
//import { WebView } from 'react-native-webview';


const VideoPlayerClassroom = (props) => {

  
        return (<Video
            rate={1.0}
            useNativeControls
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={true}
            isLooping={false}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            style={{width: props.w, height: props.h}}
            source={{ uri: props.url }} />

        );

        <WebView
            style={{ width: '100%', height: 600, marginVertical: 50, padding: 5 }}
            javaScriptEnabled={true}
            source={{ uri: 'https://youtu.be/sKuIrnV_nOQ' }} />

    
};

export default VideoPlayerClassroom;

