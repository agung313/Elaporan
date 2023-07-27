import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Absensi, Agenda, AllPengajuan, Allabsensi, Detail, DetailLaporanKasum, DetailPengajuan, DetailThlIt, Edit, EditCatatan, Kasum, Laporan, LaporanKasum, LoginSide, MainApp, MainSplash, MainUser, Notif, PassUsr, Pendahuluan, Pengajuan, ProfileKasum, SplashLogin, Tambah, TambahCatatan, ThlIt } from '../pages'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomNavigation from '../components/BottomNavigation'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeScreen = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name='MainApp' component={MainApp} options={{headerShown:false}}/>
            <Stack.Screen name='Absensi' component={Absensi} options={{headerShown:false}}/>
            <Stack.Screen name='Allabsensi' component={Allabsensi} options={{headerShown:false}}/>
            <Stack.Screen name='Agenda' component={Agenda} options={{headerShown:false}}/>
            <Stack.Screen name='Tambah' component={Tambah} options={{headerShown:false}}/>
            <Stack.Screen name='Edit' component={Edit} options={{headerShown:false}}/>
            <Stack.Screen name='Detail' component={Detail} options={{headerShown:false}}/>
            <Stack.Screen name='Notif' component={Notif} options={{headerShown:false}}/>

            {/* kasum */}
            <Stack.Screen name='Kasum' component={Kasum} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

const HomeKasum = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='MainKasum' component={Kasum} options={{headerShown:false}}/>
            <Stack.Screen name='PengajuanKasum' component={Pengajuan} options={{headerShown:false}}/>
            <Stack.Screen name='DetailPengajuan' component={DetailPengajuan} options={{headerShown:false}}/>
            <Stack.Screen name='LaporanKasum' component={LaporanKasum} options={{headerShown:false}}/>
            <Stack.Screen name='ThlIt' component={ThlIt} options={{headerShown:false}}/>
            <Stack.Screen name='DetailThlIt' component={DetailThlIt} options={{headerShown:false}}/>
            <Stack.Screen name='DetailLaporanKasum' component={DetailLaporanKasum} options={{headerShown:false}}/>
            <Stack.Screen name='AllPengajuan' component={AllPengajuan} options={{headerShown:false}}/>
            <Stack.Screen name='TambahCatatan' component={TambahCatatan} options={{headerShown:false}}/>
            <Stack.Screen name='EditCatatan' component={EditCatatan} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

const AcountScreen  = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='MainUser' component={MainUser} options={{headerShown:false}}/>
            <Stack.Screen name='PassUsr' component={PassUsr} options={{headerShown:false}}/>
            <Stack.Screen name='Pendahuluan' component={Pendahuluan} options={{headerShown:false}}/>
            <Stack.Screen name='Laporan' component={Laporan} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

const AcountKasumScreen  = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='ProfileKasum' component={ProfileKasum} options={{headerShown:false}}/>
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

const KasumScreen = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigation {...props} />} options={{ showIcon: true }}>
            <Tab.Screen name='HomeScreen' component={HomeKasum} options={{headerShown:false}}/>
            <Tab.Screen name=' ' component={HomeScreen} options={{headerShown:false}}/>
            <Tab.Screen name='AcountScreen' component={AcountKasumScreen} options={{headerShown:false}}/>
        </Tab.Navigator>
    )
}


// Setting Screen yang akan muncul
const Router = () => {
    
    return (
        <Stack.Navigator>
            
            {/* stack pertama akan menjadi stack yang dipanggil saat aplikasi dibuka */}
            <Stack.Screen name='MainSplash' component={MainSplash} options={{headerShown:false}}/>            
            <Stack.Screen name='SplashLogin' component={SplashLogin} options={{headerShown:false}}/>            
            <Stack.Screen name='AppScreen' component={AppScreen} options={{headerShown:false}}/>
            <Stack.Screen name='KasumScreen' component={KasumScreen} options={{headerShown:false}}/>
            <Stack.Screen name='LoginSide' component={LoginSide} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})