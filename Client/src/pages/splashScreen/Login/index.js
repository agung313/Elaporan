import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BgMain, EmailIcon, LgBappeda, PasswordIcon } from '../../../assets/images'
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { err } from 'react-native-svg/lib/typescript/xml';

const LoginSide = ({navigation}) => {

    const base_url = 'http://10.0.2.2:8000/api';

    const [inputs, setInputs] = useState({
        username:'',
        password:''
    })


    const handleChangeInput  = (inputName, text)=>{
        setInputs({
            ...inputs,
            [inputName]:text
        })
    }
    

    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    const handlerLogin = async data =>{

        try {
            let dataLogin ={
                email: inputs.username,
                password: inputs.password
            }

            let response = await axios.post('http://10.0.2.2:8000/api/auth/login', dataLogin)

            console.log(response.data.data.token,"<--- response login");

            await AsyncStorage.setItem('AccessToken', response.data.data.token)
            let myToken = await AsyncStorage.getItem('AccessToken')
            console.log(myToken, "<---- my token")

            // if (res.data.data.role === 'kasum') {

            //     navigation.replace('SplashLogin'); 

            // }else if (res.data.data.role === 'thl') {
            //     console.log('as', 'thl ---')

                navigation.replace('AppScreen');
            // }
        } catch (error) {
            console.log(error, "<--- error")
        }

    }
    return (
        <ImageBackground source={BgMain} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image source={LgBappeda} style={{width:200, height:200}}/>
            <Text style={{fontWeight:"900", fontSize:25, color:"#000", textShadowColor:"#FFF", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>E - LAPORAN</Text>

            <View style={{width:280, height:50, backgroundColor:"#fff", borderRadius:15, marginTop:15, flexDirection:"row", elevation:10, alignItems:"center",}}>
                <View style={{marginLeft:5}}>
                    <Image source={EmailIcon} style={{width:25, height:25}}/>
                </View>

                <View style={{marginLeft:5}}>
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor={"#000"}
                        value={inputs.username}
                        keyboardType= "default"
                        onChangeText={(text) => handleChangeInput('username',text)}
                        style={{ color: "#000" }}
                    />
                </View>

            </View>

            <View style={{width:280, height:50, backgroundColor:"#fff", borderRadius:15, marginTop:15, flexDirection:"row", elevation:10, alignItems:"center",}}>
                <View style={{marginLeft:5}}>
                    <Image source={PasswordIcon} style={{width:25, height:25}}/>
                </View>

                <View style={{marginLeft:5}}>
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor={"#000"}
                        value={inputs.password}
                        keyboardType= "default"
                        onChangeText={(text) => handleChangeInput('password',text)}
                        style={{ color: "#000" }}
                        secureTextEntry={true}
                        textContentType='password'
                    />
                </View>

            </View>
            <View style={{marginTop:8, alignItems:"flex-end", marginLeft:170}}>
                <TouchableOpacity>
                    <Text style={{color:"#000", fontSize:12, fontWeight:"bold"}}>Lupa Password ?</Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={{width:200, height:40, backgroundColor:"green", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center", marginTop:30}} onPress={() => navigation.navigate("AppScreen")}>
                <Text style={{color:"#fff", fontWeight:"bold", fontSize:18}}>THL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:200, height:40, backgroundColor:"green", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center", marginTop:30}} onPress={() => navigation.navigate("KasumScreen")}>
                <Text style={{color:"#fff", fontWeight:"bold", fontSize:18}}>KASUM</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={{width:200, height:40, backgroundColor:"green", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center", marginTop:30}} onPress={handlerLogin}>
                <Text style={{color:"#fff", fontWeight:"bold", fontSize:18}}>Login</Text>
            </TouchableOpacity>            
        </ImageBackground>
    )
}

export default LoginSide

const styles = StyleSheet.create({})