import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as actionsData from '../../store/actions/data';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AttendanceData from '../../components/shop/AttendanceData';

const AttendanceDataScreen = props => {

    const dataAt = useSelector(state => state.data.data);
    const [isLoading,setIsLoading]=useState(false);


    const dispatch = useDispatch();

    const myOrders = async () => {
        try {
            setIsLoading(true);
            await dispatch(actionsData.fetchData());
            
        }
        catch (err) { Alert.alert('Cant pull data!', [{ text: 'OK' }]); };
        setIsLoading(false);
        console.log(dataAt);
    };

    useEffect(() => {
        myOrders();
        const listen = props.navigation.addListener('focus', myOrders);
        return () => { listen(); }
    }, [dispatch]);

   
    if(isLoading) return <View style={{flex:1, justifyContent:'center',alignItems:'center'}}><ActivityIndicator color={Colors.primary} size="large" /></View>;
   else if (dataAt !== null && dataAt.length === 0) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>There are no data!</Text></View>;

    //console.log(dataAt,'sreen');

    return (<FlatList
        data={dataAt}
        refreshing={isLoading}
        onRefresh={myOrders}
        keyExtractor={item => (item.kurs)}
        renderItem={(itemData) => <View>
            <Text style={{fontFamily:'lato-italic', fontSize: 20,color:Colors.primary, marginTop:10, marginLeft:10}}>
            {itemData.item.kurs}
            </Text>
            <AttendanceData videos={itemData.item.videos} />
            </View>}
    />);
};

export const screenOptions = navData => {

    return ({
        headerTitle: 'Attendance data...',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navData.navigation.toggleDrawer()} />
        </HeaderButtons>
    });

};
export default AttendanceDataScreen;
