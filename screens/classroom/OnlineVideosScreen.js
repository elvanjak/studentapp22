import React, {useEffect} from 'react';
import { Alert, FlatList, Platform, Text, View} from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';


const OrdersScreen = props => {
    const courses = useSelector(state => state.courses.studentCourses);
  

useEffect(()=>{
    props.navigation.setOptions({
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => props.navigation.toggleDrawer()} />
    </HeaderButtons>
    });

},[]);
if(courses!==null && courses.length===0) { return <View style={{flex:1,alignItems:'center', justifyContent:'center'}}><Text style={{ fontSize: 20 }}>Please, join a course!</Text></View> }
    return (<FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={(itemData) => 
        <OrderItem 
        title={itemData.item.title} 
        professor={itemData.item.professor}
        items={itemData.item.videos} 
        navigation={props.navigation} />}
          />);
};

//OrdersScreen.navigationOptions
export const screenOptions = navData => {

    return ({
        headerTitle: 'Choose class to watch...'
    });

};
export default OrdersScreen;
