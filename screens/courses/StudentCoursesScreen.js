import React, { useState, useEffect } from 'react';
import { FlatList, Platform, Button, Alert, ActivityIndicator, View, Text} from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as actions from '../../store/actions/courses';


const UserProductsScreen = props => {

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();

   


    useEffect(()=>{
       props.navigation.setOptions({headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
       <Item
           title="Menu"
           iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
           onPress={()=>props.navigation.navigate('Message',{title:'All courses'})} />
   </HeaderButtons>}) },[]);
   
   
const userProducts = useSelector(state => state.courses.studentCourses);

    
  

const deleteHandler = (id) => {
    Alert.alert('Are you sure?',
        'Do you want to leave this course?',
        [{ text: 'no', style: 'default' },
        {
            text: 'yes', style: 'destructive',
            onPress: async () => {

                setLoading(true);
                setError(null);
                try {
                    await dispatch(actions.leaveCourse(id))
                }
                catch (err) {
                    setError(err.message);
                }
                setLoading(false);
            }
        }]

    );
}

if (error) { Alert.alert('Error', error, [{ text: 'OK', style: 'default' }]); }
if (isLoading) { return <View><ActivityIndicator size='large' color={Colors.primary} /></View> }
if(userProducts!==null && userProducts.length===0) { return <View style={{flex:1,alignItems:'center', justifyContent:'center'}}><Text style={{ fontSize: 20 }}>Please, join a course!</Text></View> }
return <FlatList
    data={userProducts}
    keyExtractor={(item) => item.id}
    renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.professor}
        onSelect={() => { }} >
        <Button title="Send message" color={Colors.primary} onPress={()=>props.navigation.navigate('Message',{title:itemData.item.title})} />
        <Button title="Leave the course" color={Colors.primary} onPress={deleteHandler.bind(this, itemData.item.id)} />
    </ProductItem>}
/>

};



//UserProductsScreen.navigationOptions 
export const screenOptions = navData => {
    return {
        headerTitle: "Your Courses",
    };
};

export default UserProductsScreen;