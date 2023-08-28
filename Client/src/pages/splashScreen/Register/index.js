import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BgMain, EmailIcon, EmailUser, EyeClose, EyeOpen, JabatanUser, LgBappeda, PasswordIcon } from '../../../assets/images'
import axios from 'axios';
import ReactNativeModal from 'react-native-modal'
import { Circle } from 'react-native-animated-spinkit'
import { Picker } from '@react-native-picker/picker';
import ApiLink from '../../../assets/ApiHelper/ApiLink';
import DeviceInfo from 'react-native-device-info';

const RegisterSide = ({route, navigation}) => {
    const {errorValue} = route.params

    const base_url = ApiLink+'/api';

    const [inputs, setInputs] = useState({
        username:null,
        password:null,
        re_password:null,
        nama:null,
        jabatan:null
    })


    const handleChangeInput  = (inputName, text)=>{
        setInputs({
            ...inputs,
            [inputName]:text
        })
    }
    

    const [myError, setMyError] = useState([])

    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    const [modalLoad, setModalLoad] = useState(false)
    const [modalSucces, setModalSucces] = useState(false)
    const checkPasswordValidity = value => {

        return 'Silahkan Isi Semua Form';
    };

    const handlerRegister = async() =>{
        setMyError([])
        setModalLoad(true)
        const checkPassword = checkPasswordValidity(inputs.password)

        if (inputs.username && inputs.password && inputs.nama && inputs.jabatan) {

            const deviceId = DeviceInfo.getUniqueId();

            try {
                let dataLogin ={
                    name:inputs.nama,
                    email: inputs.username,
                    password: inputs.password,
                    password_confirmation: inputs.re_password,
                    jabatan: inputs.jabatan,
                    device: deviceId._z

                }

                let response = await axios.post(ApiLink+'/api/auth/register', dataLogin)
                
                if (response.data.error) {

                    const tmpArr =[]
                    Object.keys(response.data.error).forEach(key => {
                        tmpArr.push(response.data.error[key])
                    })
                    setMyError(tmpArr)
                    setModalLoad(false)
                }else{
                    setModalLoad(false)
                    setModalSucces(true)
                }
                

    
             } catch (error) {
                if (error.response.status == 422) {
                    setModalLoad(false)
                    setMyError([error.response.data.error])

                }else{
                    setModalLoad(false)
                }
            }      
        } else {
            setModalLoad(false)
            alert(checkPassword);
            
        }

    }

    // showcontent
    const [showContent, setShowContent] = useState(1)
    const toggleContent = (e)=>{
        setShowContent(e);
    }
    const [showContent2, setShowContent2] = useState(1)
    const toggleContent2 = (e)=>{
        setShowContent2(e);
    }

    // select jabatan
    const [selectJabatan, setSelectJabatan] = useState()

    return (
        <ImageBackground source={BgMain} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image source={LgBappeda} style={{width:120, height:120}}/>
            <Text style={{fontWeight:"900", fontSize:25, color:"#000", textShadowColor:"#FFF", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>E - LAPORAN</Text>

            <View style={{width:WindowWidth*0.8, height:50, backgroundColor:"#fff", borderRadius:15, marginTop:15, flexDirection:"row", elevation:10, alignItems:"center",}}>
                <View style={{marginLeft:5}}>
                    <Image source={EmailIcon} style={{width:25, height:25}}/>
                </View>

                <View style={{marginLeft:5}}>
                    <TextInput
                        placeholder='Nama Lengkap'
                        placeholderTextColor={"#000"}
                        value={inputs.nama}
                        keyboardType= "default"
                        onChangeText={(text) => handleChangeInput('nama',text)}
                        style={{ color: "#000" }}
                    />
                </View>

            </View>

            <View style={{width:WindowWidth*0.8, height:50, backgroundColor:"#fff", borderRadius:15, marginTop:15, flexDirection:"row", elevation:10, alignItems:"center",}}>
                <View style={{marginLeft:5}}>
                    <Image source={JabatanUser} style={{width:25, height:25}}/>
                </View>

                <View style={{marginLeft:-5}}>
                    <Picker
                        selectedValue={inputs.jabatan}
                        onValueChange={(itemValue, itemIndex) => 
                            handleChangeInput("jabatan", itemValue)
                        }
                        style={{ width:280, height:20, fontWeight: "bold", color:"#000"}}
                        selectionColor={"#000"}
                        // dropdownIconRippleColor={"transparent"}
                        // dropdownIconColor={"transparent"}
                    >
                        <Picker.Item label="Silakan Pilih Jabatan" value="null"/>
                        <Picker.Item label="THL" value="THL"/>
                        <Picker.Item label="Tenaga Ahli" value="Tenaga Ahli"/>
                    </Picker>
                </View>

            </View>

            <View style={{width:WindowWidth*0.8, height:50, backgroundColor:"#fff", borderRadius:15, marginTop:15, flexDirection:"row", elevation:10, alignItems:"center",}}>
                <View style={{marginLeft:5}}>
                    <Image source={EmailUser} style={{width:25, height:25}}/>
                </View>

                <View style={{marginLeft:5}}>
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={"#000"}
                        value={inputs.username}
                        keyboardType= "default"
                        onChangeText={(text) => handleChangeInput('username',text)}
                        style={{ color: "#000" }}
                    />
                </View>

            </View>

            <View style={{width:WindowWidth*0.8, height:50, backgroundColor:"#fff", borderRadius:15, marginTop:15, flexDirection:"row", elevation:10, alignItems:"center",}}>
                <View style={{marginLeft:5}}>
                    <Image source={PasswordIcon} style={{width:25, height:25}}/>
                </View>

                {showContent==1 ? 
                    <View style={{flexDirection:"row", alignItems:"center",}}>
                        <View style={{marginLeft:5, width:"80%"}}>
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
                        <View style={{marginLeft:5, width:"80%"}}>
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

            <View style={{width:WindowWidth*0.8, height:50, backgroundColor:"#fff", borderRadius:15, marginTop:15, flexDirection:"row", elevation:10, alignItems:"center",}}>
                <View style={{marginLeft:5}}>
                    <Image source={PasswordIcon} style={{width:25, height:25}}/>
                </View>

                {showContent2==1 ? 
                    <View style={{flexDirection:"row", alignItems:"center",}}>
                        <View style={{marginLeft:5, width:"80%"}}>
                            <TextInput
                                placeholder='Ulangi Password'
                                placeholderTextColor={"#000"}
                                value={inputs.re_password}
                                keyboardType= "default"
                                onChangeText={(text) => handleChangeInput('re_password',text)}
                                style={{ color: "#000" }}
                                secureTextEntry={true}
                                textContentType='password'
                            />
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=> toggleContent2(2)}>
                                <Image source={EyeClose} style={{width:30, height:30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                :
                    <View style={{flexDirection:"row", alignItems:"center",}}>
                        <View style={{marginLeft:5, width:"80%"}}>
                            <TextInput
                                placeholder='Ulangi Password'
                                placeholderTextColor={"#000"}
                                value={inputs.re_password}
                                keyboardType= "default"
                                onChangeText={(text) => handleChangeInput('re_password',text)}
                                style={{ color: "#000" }}
                                secureTextEntry={false}
                                textContentType='password'
                            />
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=> toggleContent2(1)}>
                                <Image source={EyeOpen} style={{width:30, height:30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </View>   

            {/* modal Loading */}
            <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <Circle size={100} color="white"/>
            </ReactNativeModal>
            {/* modal succes */}
            <ReactNativeModal isVisible={modalSucces} onBackdropPress={() => setModalSuccess(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, alignItems:"center", justifyContent:"center" }}>


                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Selamat ! Registrasi Akun Berhasil.</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={() => navigation.navigate('LoginSide', {errorValue:null})}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
                        </TouchableOpacity>      
                    </View>
                </View>
            </ReactNativeModal>                    
            {
                myError.length > 0 &&
                myError.map((item,index)=>(
                    <View style={{marginTop:20, display:"flex"}}>
                    <Text style={{color:"red", fontSize:14, fontWeight:"bold", textTransform:"capitalize"}}>{item}</Text>
                    </View>
                ))

            }

            <TouchableOpacity style={{width:WindowWidth*0.8, height:40, backgroundColor:"green", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center", marginTop:30}} onPress={handlerRegister}>
                <Text style={{color:"#fff", fontWeight:"bold", fontSize:18}}>Register</Text>
            </TouchableOpacity>
            <View style={{flexDirection:"row", width:WindowWidth*0.8, minHeight:50, marginTop:35, justifyContent:"center"}}>
                <Text style={{color:"black", fontSize:14, fontWeight:"500", textTransform:"capitalize", marginRight:10}}>Sudah memiliki akun ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("LoginSide",{errorValue:0})}>
                    <Text style={{color:"#0060cb", fontSize:14, fontWeight:"900", textTransform:"capitalize"}}>silakan login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

        
    )
}

export default RegisterSide

const styles = StyleSheet.create({})