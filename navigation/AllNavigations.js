import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as actionsAuth from '../store/actions/auth';
import CoursesOverviewScreen, { screenOptions as CoursesOverviewSO } from '../screens/courses/CoursesOverviewScreen';
import CourseDetailScreen, { screenOptions as CourseDetailSO } from '../screens/courses/CourseDetailScreen';
import AttendanceDataScreen, { screenOptions as ADSO } from '../screens/attendanceData/AttendanceDataScreen';
import {
    Platform,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerItemList
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import StudentCoursesScreen, { screenOptions as StudentSO } from '../screens/courses/StudentCoursesScreen';
import ProfileScreen, { screenOptions as ProfileSO } from '../screens/student/ProfileScreen';
import MapScreen, { screenOptions as MapSO } from '../screens/student/MapScreen';
import Auth, { screenOptions as AuthSO } from '../screens/student/AuthScreen';
import MessageScreen, { screenOptions as MSSO } from '../screens/student/MessageScreen';
import StartClassScreen, { screenOptions as SCSSO } from '../screens/classroom/StartClassScreen';
import OnlineVideosScreen, { screenOptions as OLVSO } from '../screens/classroom/OnlineVideosScreen';
import * as actionsProfile from '../store/actions/profile';



const defNavOptionsStack = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerTitleStyle: {
        fontFamily: 'lato-regular',
        fontSize: 22
    },
    headerBackTitleStyle: {
        fontFamily: 'lato-regular',
        fontSize: 22
    }

};
const CourseStackNavigator = createStackNavigator();

const CoursesNavigator = () => {

    return (<CourseStackNavigator.Navigator screenOptions={defNavOptionsStack}>
        <CourseStackNavigator.Screen
            name="Courses"
            component={CoursesOverviewScreen}
            options={CoursesOverviewSO} />
        <CourseStackNavigator.Screen
            name="CoursesDetail"
            component={CourseDetailScreen}
            options={CourseDetailSO} />
        <CourseStackNavigator.Screen
            name="JoinedCourses"
            component={StudentCoursesScreen}
            options={StudentSO} />
        <CourseStackNavigator.Screen
            name="Message"
            component={MessageScreen}
            options={MSSO} />
    </CourseStackNavigator.Navigator>);
};


const ClassStackNavigator = createStackNavigator();
const ClassNavigator = () => {

    return (<ClassStackNavigator.Navigator screenOptions={defNavOptionsStack}>
        <ClassStackNavigator.Screen
            name="OnlineVideos"
            component={OnlineVideosScreen}
            options={OLVSO} />
        <ClassStackNavigator.Screen
            name="StartClass"
            options={SCSSO} >
            {props => <StartClassScreen {...props} />}
        </ClassStackNavigator.Screen>
    </ClassStackNavigator.Navigator>);
};

const StudentProfileStackNavigator = createStackNavigator();

const StudentProfileNavigator = () => {
    return (<StudentProfileStackNavigator.Navigator screenOptions={defNavOptionsStack}>
        <StudentProfileStackNavigator.Screen
            name="Profile"
            component={ProfileScreen}
            options={ProfileSO} />
        <StudentProfileStackNavigator.Screen
            name="Map"
            component={MapScreen}
            options={MapSO} />
    </StudentProfileStackNavigator.Navigator>);
};



const CompleteDrawerNavigator = createDrawerNavigator();

export const CompleteNavigator = (props) => {

    const dispatch = useDispatch();


    const profile = useSelector(state => state.profile.profile);

    let windowWidth=Dimensions.get('window').width;
    let windowHeight=Dimensions.get('window').height;


    const setWH =()=>{
        windowWidth=Dimensions.get('window').width;
        windowHeight=Dimensions.get('window').height;
    };

    useEffect(() => {
        const loadP= async ()=>{
            await dispatch(actionsProfile.gProfile());
        };
console.log('gdje puca..');
        loadP();
         
        Dimensions.addEventListener('change', setWH);

        return () => { Dimensions.removeEventListener('change', setWH); }
    }, [dispatch]);


    return (<CompleteDrawerNavigator.Navigator initialRouteName="Courses"
        drawerContentOptions={
            {
                activeTintColor: Colors.primary,
                inactiveTintColor: 'white',
                activeBackgroundColor: 'white',
                inactiveBackgroundColor: Colors.primary,
                contentContainerStyle: {
                    paddingTop: 30,
                    overflow: 'hidden',
                },
                itemStyle: {
                    fontFamily: 'lato-regular',
                    fontSize: 16,
                    marginTop: 0,
                    paddingHorizontal: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.textY
                }

            }}
        drawerStyle={{
            backgroundColor: Colors.primary,
            width: windowWidth > windowHeight ?  windowWidth*0.45 : windowWidth* 0.65,
        }}
        drawerContent={(props) => {
            //console.log('drawer component render');


            const styles = StyleSheet.create({
                image: {
                    marginBottom: 20,
                    width: '100%',
                    height: 200,
                    resizeMode: 'contain',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                card: {
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    borderStyle: 'solid',
                    borderColor: Colors.accent,
                    borderWidth: 1,
                    backgroundColor: 'transparent'

                }
            });
            return (<View style={{ flex: 1 }}>
                <ScrollView>
                    <SafeAreaView forceInset={{ top: 20, horizontal: 'never' }}>
                        <ImageBackground source={require('../assets/profile.jpg')} style={styles.image}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: 160, marginTop: 30 }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={{ color: 'white', fontFamily: 'lato-regular', textAlign: 'center' }}>Student: {profile ? profile.full_name : ""}</Text>
                                </View>
                                <Image
                                    source={{ uri: profile ? profile.imageUrl : null }}
                                    style={{ width: 140, height: 140, borderRadius: 65, marginVertical: 15, marginLeft: 0 }} />

                            </View>
                        </ImageBackground>
                        <DrawerItemList  {...props} />
                        <TouchableOpacity onPress={() => { dispatch(actionsAuth.logOut()); }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 22, marginTop: 5 }}>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
                                    size={23}
                                    color={Colors.accent} />
                                <Text style={{ color: 'white', marginLeft: 35 }}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>
            </View >);
        }}>
        <CompleteDrawerNavigator.Screen
            name="Profile"
            component={StudentProfileNavigator}
            options={{
                drawerLabel: 'Edit profile data',
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'}
                        size={23}
                        color={Colors.accent} />
                )
            }} />
        <CompleteDrawerNavigator.Screen
            name="Courses"
            component={CoursesNavigator}
            options={{
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-book' : 'ios-book'}
                        size={23}
                        color={Colors.accent} />
                )
            }} />
        <CompleteDrawerNavigator.Screen
            name="Data"
            component={AttendanceNavigator}
            options={{
                drawerLabel: 'Attention data',
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-done-all' : 'ios-done-all'}
                        size={23}
                        color={Colors.accent} />
                )
            }} />
        <CompleteDrawerNavigator.Screen

            name="Class"

            options={{
                drawerLabel: 'Start class ',
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-eye' : 'ios-eye'}
                        size={23}
                        color={Colors.accent} />
                )
            }} >
            {props => <ClassNavigator {...props} />}
        </CompleteDrawerNavigator.Screen>
    </CompleteDrawerNavigator.Navigator >);
}


const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
    return (<AuthStackNavigator.Navigator screenOptions={defNavOptionsStack} >
        <AuthStackNavigator.Screen
            name="Auth"
            component={Auth}
            options={AuthSO} />
    </AuthStackNavigator.Navigator>);
};

const AttendanceStackNavigator = createStackNavigator();

export const AttendanceNavigator = () => {
    return (<AttendanceStackNavigator.Navigator screenOptions={defNavOptionsStack} >
        <AttendanceStackNavigator.Screen
            name="Attendance"
            component={AttendanceDataScreen}
            options={ADSO} />
    </AttendanceStackNavigator.Navigator>);
};




// const MainNavigator = createSwitchNavigator({
//     StartUp: StartupScreen,
//     Auth: AuthNavigator,
//     Admin: CompleteDrawer

// });
// export default createAppContainer(MainNavigator);