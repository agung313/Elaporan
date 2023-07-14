import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BgMain, EmailIcon, LgBappeda, PasswordIcon } from '../../../assets/images'
import axios from 'axios';

const LoginSide = ({navigation}) => {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()

    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    const handlerLogin = async data =>{

        console.log(username,"<--- username asaya")

        let dataLogin = {
            username:'azwan@laporan.com',
            password:'123456'
        }


        try {
          const response =  await axios.get('http://127.0.0.1:8000/api/auth/tes');
            console.log(response)
           } catch (error) {
            console.log(error)

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
                        value={username}
                        keyboardType= "default"
                        onChangeText={(text) => setUserName(text)}
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
                        value={password}
                        keyboardType= "default"
                        onChangeText={(text) => setPassword(text)}
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
            <TouchableOpacity style={{width:200, height:40, backgroundColor:"green", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center", marginTop:30}} onPress={() => navigation.navigate("AppScreen")}>
                <Text style={{color:"#fff", fontWeight:"bold", fontSize:18}}>THL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:200, height:40, backgroundColor:"green", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center", marginTop:30}} onPress={() => navigation.navigate("KasumScreen")}>
                <Text style={{color:"#fff", fontWeight:"bold", fontSize:18}}>KASUM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:200, height:40, backgroundColor:"green", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center", marginTop:30}} onPress={handlerLogin}>
                <Text style={{color:"#fff", fontWeight:"bold", fontSize:18}}>Login</Text>
            </TouchableOpacity>            
        </ImageBackground>
    )
}

export default LoginSide

const styles = StyleSheet.create({})