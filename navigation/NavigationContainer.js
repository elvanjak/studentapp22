import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import StartupScreen from '../screens/StartupScreen';
import { CompleteNavigator, AuthNavigator } from './AllNavigations';


const NavigationContainerCustom = props => {

  const isAuth = useSelector(state => state.auth.userId);
  const didSUP = useSelector(state => state.auth.didLI);
 



  console.log(isAuth, didSUP);


  return (<NavigationContainer>
    {(isAuth && didSUP) ? <CompleteNavigator /> : null}
    {(!isAuth && didSUP) ? <AuthNavigator /> : null}
    {(!isAuth && !didSUP) ? <StartupScreen /> : null}
  </NavigationContainer>);
};

export default NavigationContainerCustom;
