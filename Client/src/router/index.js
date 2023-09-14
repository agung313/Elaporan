import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Absensi, AbsensiPulang, Admin, Agenda, AllPengajuan, Allabsensi, DataAsn, DataKehadiran, DataPengajuan, Detail, DetailAsn, DetailDataPengajuan, DetailKehadiran, DetailKehadiranKasum, DetailLaporanKasum, DetailPengajuan, DetailThlIt, Edit, EditCatatan, HariLibur, Kasum, KehadiranBulanan, Laporan, LaporanKasum, LoginSide, MainApp, MainSplash, MainUser, Notif, PassUsr, Pendahuluan, Pengajuan, PengajuanHadir, ProfileAdmin, ProfileKasum, Rekap, SplashLogin, Tambah, TambahCatatan, TambahHariLibur, ThlIt } from '../pages'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomNavigation from '../components/BottomNavigation'
import TambahLingkup from '../pages/mainUser/TambahLingkup'
import EditLingkup from '../pages/mainUser/EditLingkup'
import TambahKendala from '../pages/mainUser/TambahKendala'
import EditKendala from '../pages/mainUser/EditKendala'
import Preview from '../pages/mainUser/Prewiew'
import RegisterSide from '../pages/splashScreen/Register'
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
            <Stack.Screen name='AbsensiPulang' component={AbsensiPulang} options={{headerShown:false}}/>
            <Stack.Screen name='PengajuanHadir' component={PengajuanHadir} options={{headerShown:false}}/>

        </Stack.Navigator>
    )
}

const AcountScreen  = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='MainUser' component={MainUser} options={{headerShown:false}}/>
            <Stack.Screen name='PassUsr' component={PassUsr} options={{headerShown:false}}/>
            <Stack.Screen name='Pendahuluan' component={Pendahuluan} options={{headerShown:false}}/>
            <Stack.Screen name='TambahLingkup' component={TambahLingkup} options={{headerShown:false}}/>
            <Stack.Screen name='EditLingkup' component={EditLingkup} options={{headerShown:false}}/>            
            <Stack.Screen name='Laporan' component={Laporan} options={{headerShown:false}}/>
            <Stack.Screen name='TambahKendala' component={TambahKendala} options={{headerShown:false}}/>            
            <Stack.Screen name='EditKendala' component={EditKendala} options={{headerShown:false}}/>            
            <Stack.Screen name='Preview' component={Preview} options={{headerShown:false}}/>            
            
            
        </Stack.Navigator>
    )
}

// kasum screen

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
            <Stack.Screen name='Preview' component={Preview} options={{headerShown:false}}/>            
            <Stack.Screen name='AllPengajuan' component={AllPengajuan} options={{headerShown:false}}/>
            <Stack.Screen name='TambahCatatan' component={TambahCatatan} options={{headerShown:false}}/>
            <Stack.Screen name='EditCatatan' component={EditCatatan} options={{headerShown:false}}/>
            <Stack.Screen name='Rekap' component={Rekap} options={{headerShown:false}}/>
            <Stack.Screen name='DetailKehadiranKasum' component={DetailKehadiranKasum} options={{headerShown:false}}/>
            <Stack.Screen name='KehadiranBulanan' component={KehadiranBulanan} options={{headerShown:false}}/>
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

// admin

const HomeAdmin = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='MainAdmin' component={Admin} options={{headerShown:false}}/>
            <Stack.Screen name='DataAsn' component={DataAsn} options={{headerShown:false}}/>
            <Stack.Screen name='DetailAsn' component={DetailAsn} options={{headerShown:false}}/>
            <Stack.Screen name='DataPengajuan' component={DataPengajuan} options={{headerShown:false}}/>
            <Stack.Screen name='DetailDataPengajuan' component={DetailDataPengajuan} options={{headerShown:false}}/>
            <Stack.Screen name='HariLibur' component={HariLibur} options={{headerShown:false}}/>
            <Stack.Screen name='TambahHariLibur' component={TambahHariLibur} options={{headerShown:false}}/>
            <Stack.Screen name='DataKehadiran' component={DataKehadiran} options={{headerShown:false}}/>
            <Stack.Screen name='DetailKehadiran' component={DetailKehadiran} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

const AcountAdminScreen = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='ProfileAdmin' component={ProfileAdmin} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}


// app system
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
            <Tab.Screen name=' ' component={HomeKasum} options={{headerShown:false}}/>
            <Tab.Screen name='AcountScreen' component={AcountKasumScreen} options={{headerShown:false}}/>
        </Tab.Navigator>
    )
}

const AdminScreen = () => {
    return(
        <Tab.Navigator tabBar={props => <BottomNavigation {...props} />} options={{ showIcon: true }}>
            <Tab.Screen name='HomeScreen' component={HomeAdmin} options={{headerShown:false}}/>
            <Tab.Screen name=' ' component={HomeAdmin} options={{headerShown:false}}/>
            <Tab.Screen name='AcountScreen' component={AcountAdminScreen} options={{headerShown:false}}/>
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
            <Stack.Screen name='AdminScreen' component={AdminScreen} options={{headerShown:false}}/>
            <Stack.Screen name='LoginSide' component={LoginSide} options={{headerShown:false}}/>
            <Stack.Screen name='RegisterSide' component={RegisterSide} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})