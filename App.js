import React, {useState, useEffect} from 'react';
import {createStore, combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import courseReducer from './store/reducers/courses';
import NavigationContainerCustom from './navigation/NavigationContainer';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {composeWithDevTools} from 'redux-devtools-extension';
import profileReducer from './store/reducers/profile';
import authReducer from './store/reducers/auth';
import dataReducer from './store/reducers/data';
import ReduxThunk from 'redux-thunk';
import {init} from './sqlite/db';




const fetchFonts=()=>{
  return Font.loadAsync({
    'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
    'lato-italic': require('./assets/fonts/Lato-Italic.ttf'),
    'lato-semibold': require('./assets/fonts/Lato-Semibold.ttf')
  });
}
export default function App() {

 
  const [isFontSet,setFont]=useState(false);
  console.log('db initialised.');
 
  init().then(
    console.log('db initialised.')
  )
  .catch(err=>{
    console.log('db failed');
    console.log(err);
  });

  const rootReducer=combineReducers({
    courses:courseReducer,
    profile:profileReducer,
    auth: authReducer,
    data:dataReducer
  });

  const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk)));

  if(isFontSet){
  return (
    <Provider store={store}>
      <NavigationContainerCustom/>
    </Provider>
  );
}
else {
  return (
  <AppLoading 
  startAsync={fetchFonts}
  onFinish={()=>setFont(true)}/>);
  
  
}
}


