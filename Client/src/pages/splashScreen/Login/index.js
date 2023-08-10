import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BgMain, EmailIcon, EyeClose, EyeOpen, LgBappeda, PasswordIcon } from '../../../assets/images'
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { err } from 'react-native-svg/lib/typescript/xml';
import ApiLink from '../../../assets/ApiHelper/ApiLink';

const LoginSide = ({route, navigation}) => {
    const {errorValue} = route.params
    // console.log(errorValue)
    const base_url = ApiLink+'/api';

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

    const checkPasswordValidity = value => {
        // const isNonWhiteSpace = /^\S*$/;
        // if (isNonWhiteSpace.test(value)) {
        //     return 'Silakan Masukan Username dan Password Andaaaaa';
        //   }
      
        //   const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        //   if (!isContainsUppercase.test(value)) {
        //     return 'Password must have at least one Uppercase Character.';
        //   }
      
        //   const isContainsLowercase = /^(?=.*[a-z]).*$/;
        //   if (!isContainsLowercase.test(value)) {
        //     return 'Password must have at least one Lowercase Character.';
        //   }
      
        //   const isContainsNumber = /^(?=.*[0-9]).*$/;
        //   if (!isContainsNumber.test(value)) {
        //     return 'Password must contain at least one Digit.';
        //   }
      
        //   const isValidLength = /^.{8,16}$/;
        //   if (!isValidLength.test(value)) {
        //     return 'Password must be 8-16 Characters Long.';
        //   }
      
        //   const isContainsSymbol =
        //     /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        //   if (!isContainsSymbol.test(value)) {
        //     return 'Password must contain at least one Special Symbol.';
        //   }
        return 'Silakan Masukan Username dan Password Anda';
    };

    const handlerLogin = () =>{
        const checkPassword = checkPasswordValidity(inputs.password)

        if (inputs.username&&inputs.password) {
            navigation.navigate("SplashLogin", {username:inputs.username, password:inputs.password })
        } else {
            alert(checkPassword);
            
        }

    }

    // showcontent
    const [showContent, setShowContent] = useState(1)
    const toggleContent = (e)=>{
        setShowContent(e);
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

                {showContent==1 ? 
                    <View style={{flexDirection:"row", alignItems:"center",}}>
                        <View style={{marginLeft:5, width:200}}>
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
                        <View>
                            <TouchableOpacity onPress={()=> toggleContent(2)}>
                                <Image source={EyeClose} style={{width:30, height:30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                :
                    <View style={{flexDirection:"row", alignItems:"center",}}>
                        <View style={{marginLeft:5, width:200}}>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor={"#000"}
                                value={inputs.password}
                                keyboardType= "default"
                                onChangeText={(text) => handleChangeInput('password',text)}
                                style={{ color: "#000" }}
                                secureTextEntry={false}
                                textContentType='password'
                            />
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=> toggleContent(1)}>
                                <Image source={EyeOpen} style={{width:30, height:30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </View>
            <View style={errorValue==1 ? {marginTop:20, display:"flex"}:{display:"none"}}>
                <Text style={{color:"red", fontSize:14, fontWeight:"bold", textTransform:"capitalize"}}>Username atau Password anda salah !!</Text>
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