import { ScrollView, StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Absensi, AbsensiKurang, Agenda, BgApp, CekLaporan, CloseIcont, DataThl, EmailIcon, ExFoto, JmlNotif, LgBappeda, NotifIcont, OffAbsensi, Pengajuan, ProfileKasum, Rekap, SakitIzin, SettIcont, TidakHadir, WarningIcont, offAgenda } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';


const Kasum = ({ navigation}) => {
    const isFocused = useIsFocused();
    
    useEffect(() => {
      
        if (isFocused) {
            handlerGetPengajuan()
            handlerGetProfile()
            handlerNewLaporan()
        }

    }, [navigation, isFocused])

    const base_url = ApiLink+'/api'


    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // get tanggal
    const cekTgl = new Date
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
    const getStrDay = namaHari[cekTgl.getDay()]
    const getDay = cekTgl.getDate()

    const [monthUsed, setMonthUsed] = useState(cekTgl.getMonth()+1)
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September","Oktober", "November", "Desember"]
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

    const [countLaporanNew, setCountLaporanNew] = useState(0)
    const handlerNewLaporan = async ()=>{
        // setLoadHistory(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =`${base_url}/document?countNew=true`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {

                setCountLaporanNew(response.data.jumlah)

            }

        } catch (error) {
            console.log(error, "error get my profile")   
        }        
    }    
    const [myProfil, setMyProfil] = useState({
        nama:null,
        jabatan:null,
        foto:null
    })    
    const handlerGetProfile = async ()=>{
        // setLoadHistory(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =`${base_url}/user/profile`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {

                setMyProfil({
                    nama: response.data.nama,
                    jabatan: response.data.jabatan,
                    foto: response.data.URL
                })
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
                    <Image source={myProfil.foto ? {uri:myProfil.foto}:EmailIcon} style={{width:80, height:80, borderRadius:50,}} resizeMode='cover'/>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>{myProfil.nama}</Text>
                        <Text style={{ fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginTop:5}}>Jabatan : {myProfil.jabatan}</Text>
                    </View>
                </View>
            </View>

            <View style={{backgroundColor:"#f3f3f3", width:WindowWidth, height:WindowHeight, borderTopRightRadius:40, borderTopLeftRadius:40, alignItems:"center"}}>

                <View style={{marginVertical:10, width:200, alignItems:"center", marginTop:30}}>
                    <Text style={{color:"#000", fontSize: 15, fontWeight:"bold", textAlign:"center"}}>Silahkan Pilih Menu Yang Tersedia Di Bawah Ini</Text>
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
                        <View style={countLaporanNew?{width:30, height:30, alignItems:"center", justifyContent:"center", backgroundColor:"red", borderRadius:50, marginTop:-110, marginLeft:70}:{width:30, height:30, marginTop:-110,}}>
                            {countLaporanNew>0?<Text style={{color:"#fff", fontWeight:"bold", fontSize:14, textAlign:"center"}}>{countLaporanNew}</Text>:<Text style={{color:"#fff", fontWeight:"bold", fontSize:14, textAlign:"center"}}></Text>}
                        </View>
                    </TouchableOpacity>
                    
                    
                </View>

                <View style={styles.barMenu}>
                    <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('ThlIt')}>
                        <Image source={DataThl} style={styles.menuImage}/>
                        <Text style={styles.labelMenu}>Data ASN</Text>
                    </TouchableOpacity>
                    <View style={{width:20}}></View>
                    <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate("Rekap")}>
                        <Image source={Rekap} style={styles.menuImage}/>
                        <Text style={styles.labelMenu}>Rekap</Text>
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