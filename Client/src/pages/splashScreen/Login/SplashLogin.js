import { StyleSheet, Text, View, ImageBackground, Alert} from 'react-native'
import React, { useEffect } from 'react'
import { BgMain } from '../../../assets/images'
import { Bounce } from 'react-native-animated-spinkit'
import axios from 'axios'
import ApiLink from '../../../assets/ApiHelper/ApiLink'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashLogin = ({route, navigation}) => {
    const {username, password} = route.params

    console.log(username, "<=== username")
    console.log(password, "<=== password")
    useEffect(() => {
        handlerLogin()
    }, [])

    const handlerLogin = async data =>{

        try {
            let dataLogin ={
                email: username,
                password: password 
            }

            let response = await axios.post(ApiLink+'/api/auth/login', dataLogin)

            console.log(response.data.data.token,"<--- response login");

            await AsyncStorage.setItem('AccessToken', response.data.data.token)
            await AsyncStorage.setItem('RoleAcces', response.data.data.role)
            
            let myToken = await AsyncStorage.getItem('AccessToken')
            console.log(myToken, "<---- my token")

            if (response.data.data.role === 'kasum') {

                navigation.replace('KasumScreen'); 

            }
            else if (response.data.data.role === 'admin') {
                // console.log('as', 'thl ---')

                navigation.replace('AdminScreen');
            }
            else{

                navigation.replace('AppScreen');
            }
        } catch (error) {
            navigation.replace('LoginSide', {errorValue:1})
            return Alert.alert("Login", "Username atau Password Anda Salah")
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