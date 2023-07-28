import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, ImageBackground, TextInput } from 'react-native'
import React, { useState } from 'react'
import { BackIcon, BgApp, CloseIcont, EmailIcon, ExFoto, LaporProfile, LgBappeda, LogOut, NextIcont, PassProfile, PasswordIcon, Pendahuluan } from '../../assets/images';
import ReactNativeModal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ApiManager from '../../assets/ApiHelper/ApiManager';
import ApiLink from '../../assets/ApiHelper/ApiLink';

const ProfileKasum = ({navigation}) => {
    const [userName, setUserName] = useState('IwanKurniawan')
    const [password, setPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    // console.log(bulan, "<==== bulan")
    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

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

    // modal
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const HeandleLogout = async () => {
        try {
          const dataToken = await AsyncStorage.getItem('AccessToken');
      
          if (!dataToken) {
            // Token tidak ditemukan, mungkin pengguna belum login atau sudah logout sebelumnya
            navigation.replace('MainSplash');
            return;
          }
      
          // Kirim permintaan logout dengan header otorisasi, {} bertujuan untuk mengecek logout sudah berhasil atau belum, jika sudah hapus token
          const response = await axios.post(ApiLink+'/api/auth/logout',{},{
              headers: {
                Authorization: `Bearer ${dataToken}`,
              },
            }
          );
      
          if (response.status === 200) {
            // Berhasil logout, hapus token dari AsyncStorage dan arahkan ke halaman login atau splash screen
            await AsyncStorage.removeItem('AccessToken');
            navigation.replace('MainSplash');
          } else {
            // Tangani respons yang tidak diharapkan jika diperlukan
            console.log('Logout tidak berhasil.');
          }
        } catch (error) {
          // Tangani error yang terjadi saat melakukan permintaan logout
          console.log(error, '<= error logout');
        }
    };

    return (
        <ScrollView>
            <ImageBackground source={BgApp} style={{width:WindowWidth, height:265}}>
                <View style={styles.header}>
                    <View style={{ width: "60%" }}>
                        <TouchableOpacity onPress={()=> navigation.goBack()} style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent:"center" }}>
                                <Image source={BackIcon} style={{ width: 20, height: 20 }}/>
                            </View>
                            <View style={{ justifyContent:"center", marginHorizontal:10 }}>
                                <Image source={LgBappeda} style={styles.lgHead}/>
                            </View>
                            <View style={{justifyContent:"center"}}>
                                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PROFILE</Text>
                                {/* <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran</Text> */}
                            </View>
                        </TouchableOpacity>
                        {/* <SearchBar placeholder="Type Here..." /> */}
                    </View>
                    <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                        {/* <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text> */}
                        <TouchableOpacity style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}} onPress={HeandleLogout}>
                            <Image source={LogOut} style={{width:20, height:20}}/>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700", marginLeft:5}}>LogOut</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems:"center", width:WindowWidth, height:200, }}>
                    <View style={{alignItems:"center", marginTop:20}}>
                        <Image source={EmailIcon} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>
                        <View style={{marginLeft:15, alignItems:"center", marginTop:15}}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Iwan Kurniawan, S.E</Text>
                            <Text style={{ fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginTop:5}}>Jabatan : Kasubag Umum</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <View style={{marginTop:20, width:WindowWidth, alignItems:"center"}}>
                <View style={{width:"90%", minHeight:100,}}>

                    <Text style={{ color: "#000", fontSize: 15, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Update Password & Username</Text>

                    <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                        <View style={{justifyContent:"center"}}>
                            <Image source={EmailIcon} style={{width:35, height:35}} />
                        </View>
                        <View style={{marginLeft:8, justifyContent:"center"}}>
                            <Text style={{color:"#c3c4c5", fontSize:10, fontWeight:"bold", marginBottom:-15}}>Username</Text>
                            {/* <Text style={{color:"#000", fontSize:12, fontWeight:"600"}}>Muhammad Agung Sholihhudin, S.T</Text> */}
                            <TextInput
                                placeholder='Input Username'
                                placeholderTextColor={"#000"}
                                value={userName}
                                onChangeText={(text) => setUserName(text)}
                                style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                textContentType={'name'}
                                // multiline
                            />
                        </View>
                    </View>

                    <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                        <View style={{justifyContent:"center"}}>
                            <Image source={PasswordIcon} style={{width:35, height:35}} />
                        </View>
                        <View style={{marginLeft:8, justifyContent:"center"}}>
                            <Text style={{color:"#c3c4c5", fontSize:10, fontWeight:"bold", marginBottom:-15}}>Password</Text>
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
                            <Text style={{color:"#c3c4c5", fontSize:10, fontWeight:"bold", marginBottom:-15}}>New Password</Text>
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
                    
                
                    <TouchableOpacity style={{flexDirection:"row", marginBottom:25, width:"100%", minHeight:50, backgroundColor:"#39a339", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center"}}>
                        <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16, marginTop:5}}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>

            
        </ScrollView>
    )
}

export default ProfileKasum

const styles = StyleSheet.create({
    header: {
        // backgroundColor: "#39a339",
        height: 65,
        padding: 10,
        flexDirection: 'row'
    },
    lgHead: {
        height: 45,
        width: 45
    },
})