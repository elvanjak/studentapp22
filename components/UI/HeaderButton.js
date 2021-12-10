import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CutomHeaderButton  = props=>{

    return <HeaderButton 
    IconComponent={Ionicons} 
    color={Platform.OS === 'android' ? 'white' : Colors.primary }
    {...props}
    iconSize={23} />;
};

export default CutomHeaderButton;