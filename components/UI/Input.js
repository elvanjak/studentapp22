import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';


const Input = props => {

    return <View style={styles.formControl}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput
            style={styles.input}
            value={props.value}
            onChangeText={props.onChanged.bind(this, props.inputId,
                 props.required, props.url, props.min, props.max, props.minLength,props.email, props.maxLength)}
            {...props} />
        {props.touched ? (<View >
            <Text style={{ fontFamily: 'lato-italic', fontSize: 15, color: Colors.primary }}>
                {props.valid ? null : props.errorText}
                </Text>
                </View>): null}
                </View>;

};

const styles=StyleSheet.create({
                formControl: {
                width: '100%'
    },
    label: {
                fontFamily: 'lato-semibold',
                fontSize:14,
        marginVertical: 8
    },
    input: {
                paddingHorizontal: 2,
        borderBottomWidth: 1,
        paddingVertical: 5,
        borderBottomColor: '#ccc'
    }
});

export default Input;