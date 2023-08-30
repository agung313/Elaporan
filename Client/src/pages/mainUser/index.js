import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackIcon, BgApp, CloseIcont, EmailIcon, AddImg, LaporProfile, LgBappeda, NextIcont, PassProfile, Pendahuluan, PassUsr, PasFoto } from '../../assets/images';
import ReactNativeModal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { Circle } from 'react-native-animated-spinkit';
import { useIsFocused } from '@react-navigation/native';

const MainUser = ({navigation}) => {
    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused){
            getMyProfile()
        }
    }, [navigation, isFocused])

    const [bulan, setBulan] = useState()
    const [tahun, setTahun] = useState("2023")
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
    const namaTahun = ["2023","2024","2025"];
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
    const [imgFoto, setImgFoto] = useState()
    
    const getMyProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${ApiLink}/api/user/profile`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
    
            if (response.status == 200) {
                setNamaUser(response.data.nama)
                setJabatanUser(response.data.jabatan)
                setImgFoto(response.data.URL)
            }

        } catch (error) {
            console.log(error, "error get my profile")   
        }
    }    
    const imgFileFoto = {uri: imgFoto}

    const [modalLoad, setModalLoad] = useState(false)
    const [modalLogout, setModalLogout] = useState(false)
    
    const HandlerLogout = async () => {
        setModalLogout(false)
        setModalLoad(true)
        try {
          const dataToken = await AsyncStorage.getItem('AccessToken');
      
          if (!dataToken) {
            // Token tidak ditemukan, mungkin pengguna belum login atau sudah logout sebelumnya
            navigation.replace('MainSplash');
            return;
          }
          const token_fb = await AsyncStorage.getItem('tokenDeviceFB')

          // Kirim permintaan logout dengan header otorisasi, {} bertujuan untuk mengecek logout sudah berhasil atau belum, jika sudah hapus token
          const response = await axios.post(ApiLink+'/api/auth/logout',{token_fb:token_fb},{
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
          console.log(error.response.data, '<= error logout');
        }
    };

    const GotoLaporan = () =>{

        setModalVisible(false)
        navigation.navigate('Laporan', {bulan:bulan, tahun:tahun})
        
    }

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
                        {imgFoto? <Image source={imgFileFoto} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>:<Image source={PasFoto} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>}
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
                            <Text style={{color:"#000", fontSize:16, fontWeight:"600"}}>User Settings</Text>
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
                
                    <TouchableOpacity style={{flexDirection:"row", marginBottom:50, width:"100%", minHeight:50, backgroundColor:"#39a339", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center"}} onPress={setModalLogout}>
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
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Silahkan Pilih Bulan Laporan Anda</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <View style={{alignItems:"center", width:"50%"}}>
                        <Picker
                            selectedValue={bulan}
                            onValueChange={(itemValue, itemIndex) => 
                                setBulan(itemValue)
                            }
                            style={{ width:"90%", height:20, borderRadius: 50,  fontWeight: "bold", color:"#000", backgroundColor: "#f3f3f3"}}
                            selectionColor={"#000"}

                        >
                            {
                                namaBulan.map((item, index)=>(
                                    <Picker.Item label={item} value={index} key={index}/> 
                                ))
                            }


                        </Picker>
                    </View>
                    <View style={{alignItems:"center", width:"50%"}}>
                        <Picker
                            selectedValue={tahun}
                            onValueChange={(itemValue, itemIndex) =>{ 
                                setTahun(itemValue)
                            }}
                            style={{ width:"90%", height:20, borderRadius: 50,  fontWeight: "bold", color:"#000", backgroundColor: "#f3f3f3"}}
                            selectionColor={"#000"}

                        >
                            {
                                namaTahun.map((item,index)=>(
                                    <Picker.Item label={item} value={index} key={index}/> 
                                ))
                            }

                        </Picker>
                    </View>
                    </View>                    
                    <View style={{width:"100%", alignItems:"center",  marginTop:55,}}>
                        <TouchableOpacity style={bulan>0 ?  {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15} : {display:"none"}} onPress={()=> GotoLaporan()}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Lihat Laporan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>

            
            {/* modal succes logout*/}
            <ReactNativeModal isVisible={modalLogout} onBackdropPress={() => setModalLogout(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalLogout(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Apakah anda yakin untuk keluar ?</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={() => setModalLogout(false)}>
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={HandlerLogout}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Keluar</Text>
                            </TouchableOpacity>
                        </View>     
                    </View>
                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <Circle size={100} color="white"/>
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