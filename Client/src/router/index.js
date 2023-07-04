import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Absensi, MainApp, MainSplash, MainUser } from '../pages'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomNavigation from '../components/BottomNavigation'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeScreen = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name='MainApp' component={MainApp} options={{headerShown:false}}/>
            <Stack.Screen name='Absensi' component={Absensi} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

const AcountScreen  = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='MainUser' component={MainUser} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

const AppScreen = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigation {...props} />} options={{ showIcon: true }}>
            <Tab.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
            <Tab.Screen name=' ' component={HomeScreen} options={{headerShown:false}}/>
            <Tab.Screen name='AcountScreen' component={AcountScreen} options={{headerShown:false}}/>
        </Tab.Navigator>
    )
}


const Router = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen name='MainSplash' component={MainSplash} options={{headerShown:false}}/>
            <Stack.Screen name='AppScreen' component={AppScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})