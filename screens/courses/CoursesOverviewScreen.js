import React, { useEffect, useState, useCallback } from 'react';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Button, Text, StyleSheet, View, Platform, ActivityIndicator } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as courseActions from '../../store/actions/courses';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';





const ProductOverviewScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const products = useSelector(state => state.courses.availableCourses);
    const studentCourses = useSelector(state => state.courses.studentCourses);

    const userId = useSelector(state => state.auth.userId);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant notifications permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
       
        return true;
    };

    useEffect(
        ()=>{
           
           //  sendNotifyToServerPrep();

            const backgroundsubscription= Notifications.addNotificationResponseReceivedListener(
                (response)=>{
                //  console.log(response);
                  if(response.notification.request.content.data.id==='Reminder'){
                    //console.log('notification');
                    //props.navigation.navigate('JoinedCourses');
                  }
                
                }
              );
          const foregroundsubscription= Notifications.addNotificationReceivedListener(
            (notification)=>{
            //  console.log(notification);
              if(notification.request.content.data.id==='Reminder'){
                //console.log('notification');
                //props.navigation.navigate('JoinedCourses');
              }
            
            }
          );
    
          return ()=>{
            foregroundsubscription.remove();
            backgroundsubscription.remove();
          }
        }
       ,[]);
     

    Notifications.setNotificationHandler({
        handleNotification: async ()=>{
        return {
         shouldShowAlert: true,
         shouldSetBadge: true,
         shouldPlaySound: true
        };
    }
    });
  

    const sendNotify = async (message) => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        
        const notId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Class Reminder',
                body: message,
                data: {id: 'Reminder'}
            },
            trigger: {
                seconds: 10
            }
        });

        console.log(message, notId, new Date().toISOString());
    };

  
    const loadCourses = useCallback(async () => {
        //  console.log('Kreirana LoadProducts');
        setIsLoading(true);
        try {
            await dispatch(courseActions.fetchCourses());
        }
        catch (err) {
            setError(err.message);
        }
        setIsLoading(false); 
     
    }, [dispatch]);

    const localNotify = async ()=>{
        const message = studentCourses.map(c=>"Course " + c.title + ", time: " + c.schedule+ "h").join(', ');
        console.log(message, 'poruka');
        if(message!=="" && message !== null) await sendNotify(message);
        
    };
    const joinTheCourse = async (id) => {
        // console.log('join course');
        setIsJoining(true);
        try {
            await dispatch(courseActions.joinCourse(id));
        }
        catch (err) {
            setError(err.message);
        }
        setIsJoining(false);
    };

    useEffect(() => {
        //console.log('lp ref1', loadCourses);
        
        loadCourses();
        localNotify();  
       
        // const unsub = props.navigation.addListener('focus', loadCourses);
        // return () => {
        //     unsub(); //console.log('When'); 
        // };

    }, [dispatch,loadCourses]);

    const allreadyJoined = course => {

        const disable = course.studentIds.split('/').findIndex(element => element === userId) !== -1;

        return disable;
    }
    if (!error) {
        if (isLoading) {
            return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>;
        }

        if (!isLoading && products.length === 0) {
            return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ textAlign: 'center' }}>No Products found. Maybe start addding one!</Text>
            </View>;
        }
    }
    else {
        return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{ textAlign: 'center' }}>There is some error: {error}! Please try again.</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button title={'Load App Again'} color={Colors.primary} onPress={() => props.navigation.replace('Courses')} />
            </View>
        </View>;
    }

    return <View style={styles.screen}>
        <FlatList
            data={products}
            onRefresh={loadCourses}
            refreshing={isLoading}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.professor}
                onSelect={() => props.navigation.navigate('CoursesDetail', { productId: itemData.item.id, title: itemData.item.title, disabled: allreadyJoined(itemData.item) })}>

                <Button title="VIEW DETAILS" color={Colors.primary} onPress={() => props.navigation.navigate('CoursesDetail', { productId: itemData.item.id, title: itemData.item.title, disabled: allreadyJoined(itemData.item) })} />
                {isJoining ? <ActivityIndicator size='small' color={Colors.accent} /> : <Button title="JOIN" color={Colors.primary} disabled={allreadyJoined(itemData.item)} onPress={() => joinTheCourse(itemData.item.id)} />}

            </ProductItem>} />
    </View>;
}
const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

//ProductOverviewScreen.navigationOptions
export const screenOptions = navData => {
    return {
        headerTitle: "All available courses",
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-contacts' : 'ios-contacts'}
                onPress={() => navData.navigation.navigate('JoinedCourses')} />
        </HeaderButtons>,
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navData.navigation.toggleDrawer()} />
        </HeaderButtons>

    };
};
export default ProductOverviewScreen;
