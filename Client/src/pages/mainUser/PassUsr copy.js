import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image, TextInput  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackIcon, EmailIcon, LgBappeda, PasswordIcon } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { useIsFocused } from '@react-navigation/native';

const PassUsr = ({navigation}) => {
    const isFocused = useIsFocused();
    useEffect(()=>{

        if (isFocused) {
            getMyProfile()        
        }
        
    },[navigation, isFocused])

    const [password, setPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // input
    const [detail, setDetail] = useState()

    // date time tanggal
    const cekTgl = new Date
    const localeTime = cekTgl.toLocaleTimeString()
    
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
    const getStrDay = namaHari[cekTgl.getDay()]
    const getDay = cekTgl.getDate()

    const [monthUsed, setMonthUsed] = useState(cekTgl.getMonth()+1)
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "November", "Desember"]
    const getStrMonth = namaBulan[monthUsed]

    const getYear = cekTgl.getFullYear()

    // my data
    const [namaUser, setNamaUser] = useState('')
    const [jabatanUser, setJabatanUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const base_url =ApiLink+"/api";
    const getMyProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${base_url}/user/profile`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
            console.log(response.data, "<==== my profile")
            if (response.status == 200) {
                setNamaUser(response.data.nama)
                setJabatanUser(response.data.jabatan)
                setEmailUser(response.data.email)
            }

        } catch (error) {
            console.log(error, "error get my profile")   
        }
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={{ width: "60%" }}>
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent:"center" }}>
                            <Image source={BackIcon} style={{ width: 20, height: 20 }}/>
                        </View>
                        <View style={{ justifyContent:"center", marginHorizontal:10 }}>
                            <Image source={LgBappeda} style={styles.lgHead}/>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PROFILE</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Profile Pengguna</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>
            <View>
                <View style={{alignItems:"center",}}>
                    <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10, }}>

                        <Text style={{ color: "#000", fontSize: 15, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Data Pengguna</Text>

                        <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                            <View style={{justifyContent:"center"}}>
                                <Image source={EmailIcon} style={{width:35, height:35}} />
                            </View>
                            
                            <View style={{marginLeft:8, justifyContent:"center"}}>
                                <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Nama</Text>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"600", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", paddingBottom:0, width:238,}}>{namaUser}</Text>
                            </View>

                        </View>

                        <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                            <View style={{justifyContent:"center"}}>
                                <Image source={EmailIcon} style={{width:35, height:35}} />
                            </View>

                            <View style={{marginLeft:8, justifyContent:"center"}}>
                                <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Jabatan</Text>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"600", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", paddingBottom:0, width:238,}}>{jabatanUser}</Text>
                            </View>
                        </View>

                        <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                            <View style={{justifyContent:"center"}}>
                                <Image source={EmailIcon} style={{width:35, height:35}} />
                            </View>

                            <View style={{marginLeft:8, justifyContent:"center"}}>
                                <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Email</Text>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"600", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", paddingBottom:0, width:238,}}>{emailUser}</Text>
                            </View>
                        </View>
                    

                        <Text style={{ color: "#000", fontSize: 15, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Update Password</Text>

                        <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                            <View style={{justifyContent:"center"}}>
                                <Image source={PasswordIcon} style={{width:35, height:35}} />
                            </View>
                            <View style={{marginLeft:8, justifyContent:"center"}}>
                                <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900", marginBottom:-15}}>Password Lama</Text>
                                {/* <Text style={{color:"#000", fontSize:12, fontWeight:"600"}}>Muhammad Agung Sholihhudin, S.T</Text> */}
                                <TextInput
                                    placeholder='*******'
                                    placeholderTextColor={"#000"}
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                    textContentType={'password'}
                                    secureTextEntry
                                    // multiline
                                />
                            </View>
                        </View>
    
                        <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                            <View style={{justifyContent:"center"}}>
                                <Image source={PasswordIcon} style={{width:35, height:35}} />
                            </View>
                            <View style={{marginLeft:8, justifyContent:"center"}}>
                                <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900", marginBottom:-15}}>New Password</Text>
                                {/* <Text style={{color:"#000", fontSize:12, fontWeight:"600"}}>Muhammad Agung Sholihhudin, S.T</Text> */}
                                <TextInput
                                    placeholder='*******'
                                    placeholderTextColor={"#000"}
                                    value={newPassword}
                                    onChangeText={(text) => setNewPassword(text)}
                                    style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                    textContentType={'password'}
                                    secureTextEntry
                                    // multiline
                                />
                            </View>
                        </View>
    
                        <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                            <View style={{justifyContent:"center"}}>
                                <Image source={PasswordIcon} style={{width:35, height:35}} />
                            </View>
                            <View style={{marginLeft:8, justifyContent:"center"}}>
                                <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900", marginBottom:-15}}>Confirm New Password</Text>
                                {/* <Text style={{color:"#000", fontSize:12, fontWeight:"600"}}>Muhammad Agung Sholihhudin, S.T</Text> */}
                                <TextInput
                                    placeholder='*******'
                                    placeholderTextColor={"#000"}
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                    style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                    textContentType={'password'}
                                    secureTextEntry
                                    // multiline
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{width:WindowWidth,marginBottom:15, padding:10, alignItems:"center" }}>
                    <TouchableOpacity style={{flexDirection:"row", marginBottom:25, width:"95%", minHeight:50, backgroundColor:"#39a339", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center"}} onPress={() => navigation.navigate("MainUser")}>
                        <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16, marginTop:5}}>Update</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ScrollView>
    )
}

export default PassUsr

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#39a339",
        height: 65,
        padding: 10,
        marginBottom: 30,
        flexDirection: 'row'
    },
    lgHead: {
        height: 45,
        width: 45
    },
})