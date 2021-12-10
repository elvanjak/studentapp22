import React, { useEffect, useState,useRef} from 'react';
import { View, Text } from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
//import { WebView } from 'react-native-webview';


const VideoPlayerClassroom = (props) => {
   



    //console.log(w,h,'sto neceee');

    // useEffect((() => {
    //     var firebaseConfig = {
    //         apiKey: "AIzaSyB0VT4VPcvHLpnz6yd3tY39Ges-yba3h64",
    //         authDomain: "student-attention-monitoring.firebaseapp.com",
    //         databaseURL: "https://student-attention-monitoring.firebaseio.com",
    //         projectId: "student-attention-monitoring",
    //         storageBucket: "student-attention-monitoring.appspot.com",
    //         messagingSenderId: "443464589671",
    //         appId: "1:443464589671:web:1165915d1453cbfa468fc2",
    //         measurementId: "G-64ZRZZZSW1"
    //     };
    //     // Initialize Firebase
    //     firebase.initializeApp(firebaseConfig);
    //     firebase.analytics();
    //     const storage = firebase.storage();
    //     //https://firebasestorage.googleapis.com/v0/b/student-attention-monitoring.appspot.com/o/video-10a88c5672d803721c4e7fa7e9c01d68-V.mp4?alt=media&token=ec6f3d1f-27d1-4813-b8a1-7b86a2bc6144
    //     var urlREF = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/student-attention-monitoring.appspot.com/o/video-10a88c5672d803721c4e7fa7e9c01d68-V.mp4?alt=media&token=ec6f3d1f-27d1-4813-b8a1-7b86a2bc6144');


    //     // Get the download URL
    //     urlREF.getDownloadURL().then(function (url) {
    //         // Insert url into an <img> tag to "download"
    //         setVideoUrl(url);
    //     }).catch(function (error) {

    //         // A full list of error codes is available at
    //         // https://firebase.google.com/docs/storage/web/handle-errors
    //         switch (error.code) {
    //             case 'storage/object-not-found':
    //                 setError('File doesn\'t exist');
    //                 break;

    //             case 'storage/unauthorized':
    //                 // User doesn't have permission to access the object
    //                 setError('User doesn\'t have permission to access the object');
    //                 break;

    //             case 'storage/canceled':
    //                 // User canceled the upload
    //                 setError('User canceled the upload');
    //                 break;

    //             case 'storage/unknown':
    //                 // Unknown error occurred, inspect the server response
    //                 setError('Unknown error occurred, inspect the server response');
    //                 break;
    //             default: setError(error.code + ".!>"+error);
    //         }
    //     });
    // }, []));

console.log(props.w,props.h,'sta baaaa');
  
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
 // return (
   // <Video
    //     source={{ uri: 'https://www.youtube.com/embed/mJH5VvjbwjM' }}
    //     rate={1.0}
    //     volume={1.0}
    //     isMuted={false}
    //     resizeMode="cover"
    //     shouldPlay={false}
    //     isLooping={false}
    //     useNativeControls
    //     resizeMode={Video.RESIZE_MODE_CONTAIN}
    //     style={{width: '100%', height: '100%' }}
    //   />
    //);
