import { StyleSheet, Text, View, ImageBackground, Alert} from 'react-native'
import React, { useEffect } from 'react'
import { BgMain } from '../../../assets/images'
import { Bounce } from 'react-native-animated-spinkit'
import axios from 'axios'
import ApiLink from '../../../assets/ApiHelper/ApiLink'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DeviceInfo from 'react-native-device-info';
import { err } from 'react-native-svg/lib/typescript/xml'

const SplashLogin = ({route, navigation}) => {
    const {username, password} = route.params

    useEffect(() => {
        handlerLogin()
    }, [])

    const handlerLogin = async data =>{

        const deviceId = DeviceInfo.getUniqueId();
        const token_fb = await AsyncStorage.getItem('tokenDeviceFB')

        try {
            let dataLogin ={
                email: username,
                password: password ,
                device: deviceId._z,
                token_fb: token_fb
            }

            let response = await axios.post(ApiLink+'/api/auth/login', dataLogin)

            if (response.data.error) {
                const tmpArr =[]
                Object.keys(response.data.error).forEach(key => {
                    tmpArr.push(response.data.error[key])
                })

                navigation.replace('LoginSide', {errorValue: tmpArr[0]})
                
            }else{

                await AsyncStorage.setItem('AccessToken', response.data.data.token)
                await AsyncStorage.setItem('RoleAcces', response.data.data.role)
                
                let myToken = await AsyncStorage.getItem('AccessToken')                

                if (response.data.data.role === 'kasum') {

                    navigation.replace('KasumScreen'); 
    
                }else if (response.data.data.role === 'admin') {
    
                    navigation.replace('AdminScreen');
                }else{
    
                    navigation.replace('AppScreen');
                }

            }

        } catch (error) {
            console.log(error.response.data,"<--- data")
            navigation.replace('LoginSide', {errorValue:error.response.data.messages})

        }

    }
    return (
        <ImageBackground source={BgMain} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{ alignItems:"center", justifyContent:"center", alignItems:"center"}}>
                <Bounce size={200} color="#39a339"/>
                <Text style={{ color:"#000", fontFamily:"Spartan", marginTop:30, fontSize:20, fontWeight:"bold" }}>Loading ......</Text>
            </View>
        </ImageBackground>
    )
}

export default SplashLogin

const styles = StyleSheet.create({})