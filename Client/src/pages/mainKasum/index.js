import { ScrollView, StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Absensi, AbsensiKurang, Agenda, BgApp, CekLaporan, CloseIcont, DataThl, EmailIcon, ExFoto, JmlNotif, LgBappeda, NotifIcont, OffAbsensi, Pengajuan, ProfileKasum, SakitIzin, SettIcont, TidakHadir, WarningIcont, offAgenda } from '../../assets/images';
import ReactNativeModal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';


const Kasum = ({ navigation}) => {

    useEffect(() => {
      
        if (isFocused) {
            handlerGetPengajuan()
        }

    }, [navigation, isFocused])

    const base_url = ApiLink+'/api'
    const isFocused = useIsFocused();

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

    
    // modal
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    // showcontent
    const [showContent, setShowContent] = useState(1)
    const toggleContent = (e)=>{
      setShowContent(e);
    }

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
    
    return (
        <ImageBackground source={BgApp} style={{flex:1}}>
        
            <View style={{ width:WindowWidth, height:200,}}>
                <View style={{ width:WindowWidth, marginTop:15, alignItems:'center' }}>
                        
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("AcountScreen")}><Image source={SettIcont} style={{width:30, height:30}}/></TouchableOpacity>

                        <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:20, marginHorizontal:100}}>E - Laporan</Text>

                        <TouchableOpacity style={{flexDirection:"row"}} onPress={() => navigation.navigate("AllPengajuan")}>
                            <Image source={NotifIcont} style={{width:28, height:28}}/>
                            <View style={{marginLeft:-15, marginRight:-7}}>
                                <Image source={WarningIcont} style={{width:20, height:20,}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop:10, marginLeft:15, alignItems:"center",}}>
                    <Image source={EmailIcon} style={{width:80, height:80, borderRadius:50,}} resizeMode='cover'/>
                    <View style={{marginLeft:15, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Iwan Kurniawan, S.E</Text>
                        <Text style={{ fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginTop:5}}>Jabatan : Kasubag Umum</Text>
                    </View>
                </View>
            </View>

            <View style={{backgroundColor:"#f3f3f3", width:WindowWidth, minHeight:500, borderTopRightRadius:40, borderTopLeftRadius:40, alignItems:"center"}}>

                <View style={{marginVertical:10, width:200, alignItems:"center", marginTop:30}}>
                    <Text style={{color:"#000", fontSize: 15, fontWeight:"bold", textAlign:"center"}}>Silakan Pilih Menu Yang Tersedia Di Bawah Ini</Text>
                </View>

                <View style={styles.barMenu}>
                    <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate("PengajuanKasum")}>
                        <Image source={Pengajuan} style={styles.menuImage}/>
                        <Text style={styles.labelMenu}>Pengajuan</Text>
                        <View style={countPengajuan?{width:30, height:30, alignItems:"center", justifyContent:"center", backgroundColor:"red", borderRadius:50, marginTop:-110, marginLeft:70}:{width:30, height:30, marginTop:-110,}}>
                            {countPengajuan>0?<Text style={{color:"#fff", fontWeight:"bold", fontSize:14, textAlign:"center"}}>{countPengajuan}</Text>:<Text style={{color:"#fff", fontWeight:"bold", fontSize:14, textAlign:"center"}}></Text>}
                        </View>
                    </TouchableOpacity>
                    <View style={{width:20}}></View>
                    <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate("LaporanKasum")}>
                        <Image source={CekLaporan} style={styles.menuImage}/>
                        <Text style={styles.labelMenu}>Laporan</Text>
                        <View style={{width:30, height:30, alignItems:"center", justifyContent:"center", backgroundColor:"red", borderRadius:50, marginTop:-110, marginLeft:70}}>
                            <Text style={{color:"#fff", fontWeight:"bold", fontSize:14, textAlign:"center"}}>10</Text>
                        </View>
                    </TouchableOpacity>
                    
                    
                </View>

                <View style={styles.barMenu}>
                    <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('ThlIt')}>
                        <Image source={DataThl} style={styles.menuImage}/>
                        <Text style={styles.labelMenu}>Data ASN</Text>
                    </TouchableOpacity>
                    <View style={{width:20}}></View>
                    <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate("AcountScreen")}>
                        <Image source={ProfileKasum} style={styles.menuImage}/>
                        <Text style={styles.labelMenu}>Profile</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
                            
        </ImageBackground>
    )
}

export default Kasum

const styles = StyleSheet.create({
    barMenu: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:50
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