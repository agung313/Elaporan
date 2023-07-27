import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackIcon, BgApp, CloseIcont, EmailIcon, ExFoto, LaporProfile, LgBappeda, NextIcont, PassProfile, Pendahuluan } from '../../assets/images';
import ReactNativeModal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ApiLink from '../../assets/ApiHelper/ApiLink';

const MainUser = ({navigation}) => {
    useEffect(()=>{
        getMyProfile()
    })

    const [bulan, setBulan] = useState()
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


    // profile api
    const [namaUser, setNamaUser] = useState()
    const [jabatanUser, setJabatanUser] = useState()

    const getMyProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${ApiLink}/api/user/profile`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
    
            if (response.status == 200) {
                setNamaUser(response.data.nama)
                setJabatanUser(response.data.jabatan)
            }

        } catch (error) {
            console.log(error, "error get my profile")   
        }
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
                        <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                    </View>
                </View>
                <View style={{alignItems:"center", width:WindowWidth, height:200, }}>
                    <View style={{alignItems:"center", marginTop:20}}>
                        <Image source={ExFoto} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>
                        <View style={{marginLeft:15, alignItems:"center", marginTop:15}}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>{namaUser}</Text>
                            <Text style={{ fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginTop:5}}>Jabatan : {jabatanUser}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <View style={{marginTop:20, width:WindowWidth, alignItems:"center"}}>
                <View style={{width:"90%", minHeight:100,}}>
                
                    <TouchableOpacity style={{flexDirection:"row", marginBottom:25, width:"100%", minHeight:50, backgroundColor:"white", borderRadius:15, padding:10, elevation:10}} onPress={() => navigation.navigate("PassUsr")}>
                        <View style={{justifyContent:"center"}}>
                            <Image source={PassProfile} style={{width:60, height:60}} />
                        </View>
                        <View style={{marginLeft:8, justifyContent:"center", width:"70%"}}>
                            {/* <Text style={{color:"#c3c4c5", fontSize:14, fontWeight:"bold"}}>Username</Text> */}
                            <Text style={{color:"#000", fontSize:16, fontWeight:"600"}}>Username & Password</Text>
                        </View>
                        <View style={{justifyContent:"center"}}>
                            <Image source={NextIcont} style={{width:25, height:25}} />
                        </View>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={{flexDirection:"row", marginBottom:25, width:"100%", minHeight:50, backgroundColor:"white", borderRadius:15, padding:10, elevation:10}} onPress={() => navigation.navigate("Pendahuluan")}>
                        <View style={{justifyContent:"center"}}>
                            <Image source={Pendahuluan} style={{width:60, height:60}} />
                        </View>
                        <View style={{marginLeft:8, justifyContent:"center", width:"70%"}}>
                            {/* <Text style={{color:"#c3c4c5", fontSize:14, fontWeight:"bold"}}>Username</Text> */}
                            <Text style={{color:"#000", fontSize:16, fontWeight:"600"}}>Pendahuluan Laporan</Text>
                        </View>
                        <View style={{justifyContent:"center"}}>
                            <Image source={NextIcont} style={{width:25, height:25}} />
                        </View>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={{flexDirection:"row", marginBottom:25, width:"100%", minHeight:50, backgroundColor:"white", borderRadius:15, padding:10, elevation:10}} onPress={toggleModal}>
                        <View style={{justifyContent:"center"}}>
                            <Image source={LaporProfile} style={{width:60, height:60}} />
                        </View>
                        <View style={{marginLeft:8, justifyContent:"center", width:"70%"}}>
                            {/* <Text style={{color:"#c3c4c5", fontSize:14, fontWeight:"bold"}}>Username</Text> */}
                            <Text style={{color:"#000", fontSize:16, fontWeight:"600"}}>Laporan Anda</Text>
                        </View>
                        <View style={{justifyContent:"center"}}>
                            <Image source={NextIcont} style={{width:25, height:25}} />
                        </View>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={{flexDirection:"row", marginBottom:50, width:"100%", minHeight:50, backgroundColor:"#39a339", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center"}} onPress={HeandleLogout}>
                        <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16, marginTop:5}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* modal bulan */}
            <ReactNativeModal isVisible={isModalVisible} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalVisible(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Silakan Pilih Bulan Laporan Anda</Text>
                    </View>
                    <View style={{alignItems:"center", width:"100%"}}>
                        <Picker
                            selectedValue={bulan}
                            onValueChange={(itemValue, itemIndex) => 
                                setBulan(itemValue)
                            }
                            style={{ width:"90%", height:20, borderRadius: 50,  fontWeight: "bold", color:"#000", backgroundColor: "#f3f3f3"}}
                            selectionColor={"#000"}
                            // dropdownIconRippleColor={"transparent"}
                            // dropdownIconColor={"transparent"}
                        >
                            <Picker.Item label="-" value="0"/>
                            <Picker.Item label="Januari" value="1"/>
                            <Picker.Item label="Februari" value="2"/>
                            <Picker.Item label="Maret" value="3"/>
                            <Picker.Item label="April" value="4"/>
                            <Picker.Item label="Mei" value="5"/>
                            <Picker.Item label="Juni" value="6"/>
                            <Picker.Item label="Juli" value="7"/>
                            <Picker.Item label="Agustus" value="8"/>
                            <Picker.Item label="September" value="9"/>
                            <Picker.Item label="Oktober" value="10"/>
                            <Picker.Item label="November" value="11"/>
                            <Picker.Item label="Desember" value="12"/>
                        </Picker>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:55,}}>
                        <TouchableOpacity style={bulan>0 ?  {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15} : {display:"none"}} onPress={()=> navigation.navigate('Laporan', {bulan:bulan})}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>
        </ScrollView>
    )
}

export default MainUser

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