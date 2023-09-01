import { ScrollView, StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AddLibur, AddKegiatan, BgApp,  DataThl, EmailIcon,  LogOut, Pengajuan, SettIcont, CloseIcont,  } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { Circle } from 'react-native-animated-spinkit';
import ReactNativeModal from 'react-native-modal';

const Admin = ({navigation}) => {
    const base_url =ApiLink+"/api";
    const isFocused = useIsFocused();
    useEffect(()=>{

        if (isFocused) {
            getMyProfile(),
            handlerGetPengajuan()
            // getKegiatan()        
        }
        
    },[navigation, isFocused])

    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // get tanggal
    const cekTgl = new Date
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
    const getStrDay = namaHari[cekTgl.getDay()]
    const getDay = cekTgl.getDate()

    const [monthUsed, setMonthUsed] = useState(cekTgl.getMonth()+1)
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "November", "Desember"]
    const getStrMonth = namaBulan[monthUsed]

    const getYear = cekTgl.getFullYear()

    // profilie
    const [fileFoto, setFileFoto] = useState()
    const [imgFoto, setImgFoto] = useState()
    const [profile, setProfile] = useState()
    const [namaUser, setNamaUser] = useState()
    const [jabatanUser, setJabatanUser] = useState()
    const [emailUser, setEmailUser] = useState()
    // const [imgTtd, setImgTtd] = useState()

    const getMyProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${base_url}/user/profile`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        


            if (response.status == 200) {

                setProfile(response.data)
                setNamaUser(response.data.nama)
                setJabatanUser(response.data.jabatan)
                setEmailUser(response.data.email)
                setImgFoto(response.data.URL)
                setImgTtd(response.data.ttd)

            }

        } catch (error) {
            console.log(error, "error get my profile")   
        }
    }
    const imgFileFoto = {uri: imgFoto}

    // api get pengajuan
    const [countPengajuan, setCountPengajuan] = useState()
    
    const handlerGetPengajuan = async ()=>{
        // setLoadHistory(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =`${base_url}/absen?izinSakit=true`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {

                setCountPengajuan(response.data.length)
            }

        } catch (error) {
            console.log(error, "error get my profile")   
        }        
    }

    // logout
    const [modalLogout, setModalLogout] = useState()
    const [modalLoad, setModalLoad] = useState()

    const HeandleLogout = async () => {
        setModalLoad(true)
        try {
          const dataToken = await AsyncStorage.getItem('AccessToken');
      
          if (!dataToken) {
            // Token tidak ditemukan, mungkin pengguna belum login atau sudah logout sebelumnya
            navigation.replace('MainSplash');
            setModalLoad(false)
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
            setModalLoad(false)
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
        <ImageBackground source={BgApp} style={{flex:1}}>
            <View style={{ width:WindowWidth, height:200,}}>
                <View style={{ width:WindowWidth, marginTop:15, alignItems:'center' }}>
                        
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("AcountScreen")}><Image source={SettIcont} style={{width:30, height:30}}/></TouchableOpacity>

                        <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:20, marginLeft:100, marginRight:60}}>E - Laporan</Text>

                        {/* <TouchableOpacity style={{flexDirection:"row"}} onPress={() => navigation.navigate("AllPengajuan")}>
                            <Image source={NotifIcont} style={{width:28, height:28}}/>
                            <View style={{marginLeft:-15, marginRight:-7}}>
                                <Image source={WarningIcont} style={{width:20, height:20,}}/>
                            </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}} onPress={() => setModalLogout(true)}>
                            <Image source={LogOut} style={{width:20, height:20}}/>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700", marginLeft:5}}>LogOut</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop:10, marginLeft:15, alignItems:"center",}}>
                    {imgFoto?<Image source={imgFileFoto} style={{width:80, height:80, borderRadius:50,}} resizeMode='cover'/>:<Image source={EmailIcon} style={{width:80, height:80, borderRadius:50,}} resizeMode='cover'/>}
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>{namaUser}</Text>
                        <Text style={{ fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginTop:5}}>Jabatan : {jabatanUser}</Text>
                    </View>
                </View>
            </View>

            <View style={{backgroundColor:"#f3f3f3", width:WindowWidth, height:WindowHeight, borderTopRightRadius:40, borderTopLeftRadius:40, alignItems:"center"}}>
                <View style={{marginVertical:10, width:200, alignItems:"center", marginTop:30}}>
                    <Text style={{color:"#000", fontSize: 15, fontWeight:"bold", textAlign:"center"}}>Silakan Pilih Menu Yang Tersedia Di Bawah Ini</Text>
                </View>
                
                <View style={styles.barMenu}>
                    <TouchableOpacity style={styles.menuBar1} onPress={() => navigation.navigate("DataPengajuan")}>
                        <Image source={Pengajuan} style={styles.menuImage}/>
                        <Text style={styles.labelMenu}>Pengajuan</Text>
                        <View style={countPengajuan?{width:30, height:30, alignItems:"center", justifyContent:"center", backgroundColor:"red", borderRadius:50, marginTop:-110, marginLeft:70}:{width:30, height:30, marginTop:-110,}}>
                            {countPengajuan>0?<Text style={{color:"#fff", fontWeight:"bold", fontSize:14, textAlign:"center"}}>{countPengajuan}</Text>:<Text style={{color:"#fff", fontWeight:"bold", fontSize:14, textAlign:"center"}}></Text>}
                        </View>
                    </TouchableOpacity>
                    <View style={{width:20}}></View>
                    <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('DataAsn')}>
                        <Image source={DataThl} style={styles.menuImage}/>
                        <Text style={styles.labelMenu}>Data ASN</Text>
                    </TouchableOpacity>
                    <View style={{width:20}}></View>
                    
                </View>
                <View style={styles.barMenu}>
                    <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('DataKehadiran')}>
                        <Image source={AddKegiatan} style={styles.menuImage}/>
                        <Text style={styles.labelMenu}>Kehadiran</Text>
                    </TouchableOpacity>
                    <View style={{width:20}}></View>
                    <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('HariLibur')}>
                        <Image source={AddLibur} style={styles.menuImage}/>
                        <Text style={styles.labelMenu}>Hari Libur</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* modal */}
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

                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={HeandleLogout}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Keluar</Text>
                            </TouchableOpacity>
                        </View>     
                    </View>
                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <Circle size={100} color="white"/>
            </ReactNativeModal>

        </ImageBackground>
    )
}

export default Admin

const styles = StyleSheet.create({
    barMenu: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:"center",
        marginBottom:0
    },
    menuBar: {
        alignItems: 'center',
        margin: 15,
        minHeight:75,
        width: 75,
        // backgroundColor: "#ffff",
        borderRadius: 15,
        padding: 5,
        margin:20
        // borderWidth: 0.5
    },
    menuBar1: {
        alignItems: 'center',
        margin: 15,
        minHeight:75,
        width: 75,
        // backgroundColor: "#ffff",
        borderRadius: 15,
        padding: 5,
        margin:20,
        marginTop:-40
        
    },
    labelMenu:{
        fontSize: 12,
        fontWeight: 'bold',
        color: "#000",
        textAlign: 'center'
      },
      menuImage: {
        height: 100,
        width: 100,
        marginBottom:5
    },
})