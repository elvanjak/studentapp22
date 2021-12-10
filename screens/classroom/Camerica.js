import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Camerica = (props) => {

    const [type, setType] = useState(Camera.Constants.Type.front);
    const [faces, setFaces] = useState(null);
    const [blinkC, setBlinkC] = useState({ br: 0, moment: 0, period: 0 });
    const [eyesOpen, setEyesOpen] = useState();
    const [faceSquare, setFaceSquare] = useState();
    const [leftEyeC, setLeftEyeC] = useState();
    const [rightEyeC, setRightEyeC] = useState();
    const [leftEP, setLeftEP] = useState(0);
    const [rightEP, setRightEP] = useState(0);
    const [i, setI] = useState(0);
    const [bio,setBio]=useState(false);
    const [Loko,setLoko]=useState(false);
    const [Doko,setDoko]=useState(false);
    
    let layout;
    let layoutEyeL;
    let layoutEyeR;
    let faceSq;
    let transformPropss;
    let eye;
   

    const handleFacesDetected = (faces) => {

        setBio(false);
        setLoko(false);
        setDoko(false);
        //console.log(faces);
        if (faces.faces.length !== 0) {

            if (faces.faces[0].leftEyePosition) { setLoko(true); setLeftEyeC(faces.faces[0].leftEyePosition); }
            else setLeftEyeC({ x: -1, y: -1 });

            if (faces.faces[0].rightEyePosition) { setDoko(true); setRightEyeC(faces.faces[0].rightEyePosition); }
            else setRightEyeC({ x: -1, y: -1 });

            if (faces.faces[0].leftEyeOpenProbability) setLeftEP(faces.faces[0].leftEyeOpenProbability);
            else setLeftEP(0);

            if (faces.faces[0].rightEyeOpenProbability) setRightEP(faces.faces[0].rightEyeOpenProbability);
            else setRightEP(0);

            setFaceSquare(
                {
                    x: faces.faces[0].bounds.origin.x,
                    y: faces.faces[0].bounds.origin.y,
                    width: faces.faces[0].bounds.size.width,
                    height: faces.faces[0].bounds.size.height
                });


            if ((faces.faces[0].leftEyeOpenProbability < 0.25) && (faces.faces[0].rightEyeOpenProbability < 0.25)) {
                if (eyesOpen === true) {
                    setBio(true);
                    setBlinkC(prev => ({
                        br: prev.br + 1,
                        moment: new Date().getTime(),
                        period: (prev.br === 0) ? 0 :   new Date().getTime()-prev.moment
                    }));
                }

                setEyesOpen(false);

            }
            else {
                setEyesOpen(true);
            }
            setFaces(faces);


        }
        else {
            setFaces(null);
            setFaceSquare({ x: 0, y: 0, width: 0, height: 0 });
            setLeftEyeC({ x: -1, y: -1 });
            setRightEyeC({ x: -1, y: -1 });
        }
        //console.log(leftEyeC,rightEyeC);
        //  timestamp,lice, Loko,Doko, Treptaj,periodIzmedjuTreptaja, leftEyeProb, rightEyeP
       

            props.vratiPodatke(new Date().getTime(),new Date().getDate()+"."+(new Date().getMonth()+1)+"."+new Date().getFullYear()+", time: "+new Date().getHours()+"."+new Date().getMinutes()+"."+new Date().getSeconds()+"."+new Date().getMilliseconds(), (faces.faces.length !== 0) ? true : false, Loko , Doko , bio , blinkC.period / 1000,leftEP,rightEP);
            
        
        setI(prev=>prev+1);
       // console.log(i, new Date().getTime(), (faces.faces.length !== 0) ? 1 : 0, Loko, Doko, bio, blinkC.period / 1000 );
    };




    if (faceSquare) {
        if (leftEyeC && rightEyeC) {
            //console.log(leftEyeC, rightEyeC);
            layoutEyeL = {
                top: leftEyeC.y - 2,
                left: leftEyeC.x - 2,
                width: 4,
                height: 4,
            };
            layoutEyeR = {
                top: rightEyeC.y - 2,
                left: rightEyeC.x - 2,
                width: 4,
                height: 4,
            };
            eye = {
                borderWidth: 3,
                borderRadius: 2,
                position: 'absolute',
                borderColor: '#004DCF',
                justifyContent: 'center',
            }
        }
        layout = {
            top: faceSquare.y,
            left: faceSquare.x,
            width: faceSquare.width >= faceSquare.height ? faceSquare.height : faceSquare.width,
            height: faceSquare.width >= faceSquare.height ? faceSquare.height : faceSquare.width,
        };

        if (faceSquare.width >= faceSquare.height) {
            if (faceSquare.height !== 0)
                transformPropss = { scaleX: faceSquare.width / faceSquare.height };
            else transformPropss = { scaleX: 1 };
            layout.left += (faceSquare.width - faceSquare.height) / 2;
        }
        else {
            if (faceSquare.width !== 0)
                transformPropss = { scaleY: faceSquare.height / faceSquare.width };
            else transformPropss = { scaleY: 1 };
            layout.top += (faceSquare.height - faceSquare.width) / 2;
        }

        faceSq = {
            borderWidth: 2,
            borderRadius: faceSquare.width >= faceSquare.height ? faceSquare.height / 2 : faceSquare.width / 2,
            position: 'absolute',
            transform: [
                transformPropss
            ],
            borderColor: '#FEF3BD',
            justifyContent: 'center',
            backgroundColor: 'rgba(25, 77, 189, 0.1)',
        };

    }
    let oke = null;
    if (leftEyeC && rightEyeC) oke = <View><View key={1} style={[eye, layoutEyeL]} /><View key={2} style={[eye, layoutEyeR]} /></View>;

    return (
        <View style={styles.gradient}>
            <View style={styles.cameraContainer}>
                <Camera
                    style={styles.camera}
                    type={type}
                    onFacesDetected={handleFacesDetected}
                    faceDetectorSettings={{
                        mode: FaceDetector.Constants.Mode.fast,
                        detectLandmarks: FaceDetector.Constants.Landmarks.all,
                        runClassifications: FaceDetector.Constants.Classifications.all,
                        minDetectionInterval: 100,
                        tracking: true,
                    }}>{faceSquare ? <View>
                        <View key={0}
                            style={[faceSq, layout]}>
                        </View>{oke}
                    </View> : <View />}

                </Camera>
            </View>
            <View style={styles.card}>
                <Text style={{ fontSize: 18, marginVertical: 10, color: 'black', marginHorizontal: 10, textAlign: 'center' }}>
                    Count of blinks=&gt;{blinkC.br} and period betweent two last blinks {blinkC.br >= 2 ? (blinkC.period / 1000) : 0} s
         </Text>
                {faceSquare ? <Text> Face x: {faceSquare.x.toFixed(2)}</Text> : null}
                {faceSquare ? <Text> Face y: {faceSquare.y.toFixed(2)}</Text> : null}
                {faceSquare ? <Text> Face width: {faceSquare.width.toFixed(2)}</Text> : null}
                {faceSquare ? <Text> Face height: {faceSquare.height.toFixed(2)}</Text> : null}
                {leftEP ? <Text> Left Eye Open Probability : {leftEP.toFixed(2)}</Text> : null}
                {rightEP ? <Text> Right Eye Open Probability : {rightEP.toFixed(2)}</Text> : null}
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    camera: {
        height: '100%',
        width: '100%'
    },

    card: {
        padding: 5,
        borderColor: '#00BCD4',
        borderWidth: 2,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    gradient: {
        width: '100%',
        height: 600,
        alignItems: 'center'
    },
    cameraContainer: {
        marginTop: 30,
        width: 300,
        height: 300,
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden"
    },

});
export default Camerica;