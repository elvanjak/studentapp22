import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const AttendanceData = (props) => {

const datumi=(vrijeme)=>{
    return vrijeme.map(v =><View style={{ marginBottom:10}} key={v.datum}>
       <View style={{flexDirection:'row', alignItems:'center', marginLeft:20}}>
           <Text style={{fontFamily:'lato-semibold', fontSize: 16, color:Colors.primary, marginRight:10}}>Date:</Text>
        <Text>{v.datum}</Text>
        </View>
        <Text style={{fontFamily:'lato-italic'}}>(active time) {v.start}</Text>
        </View>);
};

    return (<View style={styles.card}>

        {props.videos.map(el => {
           
           let vr=datumi(el.vrijeme);
            return (<View key={el.title+Math.random()}>
                <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#ccc',marginBottom:10}}>
                    <Text style={{fontFamily:'lato-semibold',fontSize:16, color:Colors.primary, marginRight:10}}>Video --- </Text>
                    <Text style={{fontFamily:'lato-semibold',fontSize:16, marginRight:10}}>{el.title}</Text>
                    </View>
                        {vr}</View>)
        })}

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
        margin: 10,
        marginLeft:30,
        width:350,
        padding:10
    }


});

export default AttendanceData;