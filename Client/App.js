import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/router'

import messaging from '@react-native-firebase/messaging';
import { getToken, notificationListener, requestUserPermission } from './src/utils/commonUtils';


const App = () => {

  // useEffect(() => {


  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    requestUserPermission()
    notificationListener()
    getToken()

  }, [])
  

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})