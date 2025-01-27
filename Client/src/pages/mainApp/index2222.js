import { ScrollView, StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Absensi, AbsensiKurang, Agenda, BgApp, CloseIcont, AddImg, JmlNotif, LgBappeda, NotifIcont, OffAbsensi, SakitIcont, SakitIzin, SettIcont, TidakHadir, WarningIcont, offAgenda, DangerIcont, SakitDanger, SakitIzinDanger, PasFoto, Warning } from '../../assets/images';
import ReactNativeModal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


const MainApp = ({route, navigation}) => {

    const {agendaValue} = route.params || {}

    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    const base_url =ApiLink+"/api";

    // get tanggal
    const cekTgl = new Date
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
    const getStrDay = namaHari[cekTgl.getDay()]
    const getDay = cekTgl.getDate()

    const [monthUsed, setMonthUsed] = useState(cekTgl.getMonth()+1)
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "November", "Desember"]
    const getStrMonth = namaBulan[monthUsed]
    const getYear = cekTgl.getFullYear()

    // lokasi kantor
    const [lat1, setLat1] = useState(0.517096);
    const [lon1, setLon1] = useState(101.540887);
    // lokasi default user

    const [lat2, setLat2] = useState();
    const [lon2, setLon2] = useState();


    const [distance, setDistance] = useState('');
    const isFocused = useIsFocused();
    const [namaUser, setNamaUser] = useState('-')
    const [jabatanUser, setJabatanUser] = useState('-')
    const [idAbsensi, setIdAbsensi] = useState(0)
    const [statusAbsensi, setStatusAbsensi] = useState(true)
    const [labelStatus, setLabelStatus] = useState('Absensi Masuk')
    const [history, setHistory] = useState([]);
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [izinSakit, setIzinSakit] = useState()
    const [sakit, setSakit] = useState()
    const [pulang, SetPulang] = useState()
    const [noApprove, setNoApprove] = useState(0)
    const [menunggu, SetMenunggu] = useState()
    const [btAbsensi, SetBtAbsensi] = useState(null)
    
    useEffect(()=>{


        if (isFocused) {
            requestLocationPermission(),
            // calculateDistance(),
            getToday(),
            getMyProfile(),
            getMyHistory(),
            getMyPengajuan()          
        }
        
    },[navigation, isFocused])
    
    const [imgFoto, setImgFoto] = useState()
    const getMyProfile = async data =>{

        try {


            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =`${base_url}/user/profile`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
            console.log(response.data);
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

    const [cekApprove, setCekApprove] = useState()

    const [loadApprove, setLoadApprove] = useState(false)

    const getMyPengajuan = async data =>{
        setLoadApprove(true)

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =  `${base_url}/absen/countNoAcc`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
    
            if (response.status == 200) {
                setCekApprove(response.data.data)
                setLoadApprove(false)
            }

        } catch (error) {
            console.log(error, "error get my pengajuan")   
        }
    }    

    const ViewPengajuan = () => {
        if(loadApprove){
            return(
                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5 }}></View>
                </SkeletonPlaceholder>
            )
        }else{
            return(
                <>
                    <View style={{width:WindowWidth*0.9, marginBottom:10}}><Text style={{fontWeight:'700', color:"black",  fontSize:14}}>
                    Pengajuan kehadiran</Text>
                    </View>
                    <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'#0060cb', borderRadius:15, elevation:5, alignItems:"center", flexDirection:'row',}} onPress={() => navigation.navigate('PengajuanHadir')}>
                        <View style={{width:"30%",  height:"100%", marginLeft:20, alignItems:"center", justifyContent:"center"}}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,  fontSize:30}}>{cekApprove}</Text>
                            <Text style={{fontWeight:'500', color:"white", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,  fontSize:12, marginTop:-5}}>Pengajuan</Text>
                        </View>
                        <View style={{justifyContent:"center"}}>
                            <Text style={{fontWeight:'500', color:"white", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,  fontSize:12, textTransform:"capitalize"}}>Sedang menunggu persetujuan</Text>
                            <Text style={{fontWeight:'500', color:"white", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,  fontSize:12, textTransform:"capitalize"}}>kasubag umum</Text>
                        </View>
                    </TouchableOpacity>
                </>
            )
        }
    }


    const [statusApprove, setStatusApprove] = useState()
    const getToday = async data =>{
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url = `${base_url}/absen/cekAbsen`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

          
            var status = response.data.status
            var data = response.data.data
            var waktuPulang = data.waktu_pulang
            setStatusApprove(data.isApprove)
            var approve = data.isApprove
        
            if (data) {
                setIdAbsensi(data.id)
            }


            if (status == 'belum absen datang') {
                setStatusAbsensi(true)
            } 
            //  sakit
            else if (status == 'Anda sakit'  ) {
                setStatusAbsensi(false)
                setLabelStatus("Tidak Perlu Absen")
                setIzinSakit(1)
                setSakit(1)
            } 
            //  izin
            else if (status == 'Anda izin'  ) {
                setStatusAbsensi(false)
                setLabelStatus("Tidak Perlu Absen")
                setIzinSakit(1)
            } 
            // belum jamnya
            else if(status == 'belum bisa absen pulang'){

                setStatusAbsensi(false)
                setLabelStatus("Harap Menunggu Waktu Pulang")             
                SetMenunggu(1)
                SetPulang(1)
            }
            // memenuhi jam
            else if(status == "sudah bisa absen pulang" ){
                setStatusAbsensi(true)   
                setLabelStatus("Absensi Pulang")     
                SetPulang(1)
                SetBtAbsensi(waktuPulang)
                // setCekWaktuPulang(waktuPulang)
            }
            else{
                setStatusAbsensi(false)
                setLabelStatus("Tidak Perlu Absen")
                setIzinSakit(1)
            }

        } catch (error) {

            console.log(error, "error get today")   
        }
    }

    const [loadHistory, setLoadHistory] = useState(false)

    const getMyHistory = async data =>{
        setLoadHistory(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =`${base_url}/absen/`


            const response = await axios.get(`${base_url}/absen/`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
    
            if (response.status == 200) {
                setHistory(response.data.slice(0,3));
                setLoadHistory(false)
            }

        } catch (error) {
            console.log(error, "error get my history")   
        }
    }

    
    const toggleModal = () => {
        const R = 6371; // radius bumi dalam kilometer
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const calculatedDistance = R * c;
        setDistance(calculatedDistance.toFixed(2)); // jarak diambil dengan 2 desimal
        function toRad(Value) {
            return (Value * Math.PI) / 180;
        }
        setModalVisible(!isModalVisible);

    }

    // buat absensi
    const jarakMeter = distance*1000
    
    const buatAbsensi = () => {
        setModalVisible(false)
        navigation.navigate('Absensi', {idAbsensi:0,kehadiran:kehadiran, latit:lat2, longtit:lon2, jarak:jarakMeter})
    }

    // get location    
    const requestLocationPermission = async () => {
        try {

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Izinkan sistem mengambil data lokasi anda',
                    message:
                    'Izinkan sistem mengambil data lokasi untuk kehadiran',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            //   jika telah diberikan akses lokasi
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {

                        const currentLatitude = position.coords.latitude;
                //         //getting the Longitude from the location json
                        const currentLongitude = position.coords.longitude

                        setLat2(currentLatitude)
                        setLon2(currentLongitude)                      
                    },
                    (error) => {
                      // See error code charts below.
                      console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );                
            } else {
            console.log('Lokasi gagal di akses');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // picker
    const [kehadiran, setKehadiran] = useState()

    // showcontent
    const [showContent, setShowContent] = useState(1)
    const toggleContent = (e)=>{
      setShowContent(e);
    }
        

    const rowHistory = (item, index) =>{

        // if (item.ket_hadir === 'Datang Tepat Waktu' && item.ket_pulang === 'Pulang Tepat Waktu') {
        if (item.ket_hadir === 'Absen Tepat Waktu') {
            
            if(item.laporan == false){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, Anda belum membuat agenda</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else if(item.ket_pulang == "Tidak Absen Pulang"){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum absen pulang</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else{

                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Terimakasih, anda telah melakukan absensi</Text>
                        </View>          
                    </TouchableOpacity>            
                    
                ) 
            }
            

        } 
        else if(item.ket_hadir ==="tidak absen pergi"){

            return(
                <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
                    <Image source={TidakHadir} style={{width:40,height:40, marginLeft:15}}/>            
                    <View style={{marginLeft:10, width:"75%"}}>
                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                    <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Anda tidak hadir</Text>
                    </View>
                 </TouchableOpacity>
            )
        
        }
        else if(item.ket_hadir ==="Absen Terlambat"){
            if(item.laporan == false ){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={AbsensiKurang} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum membuat agenda</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else if(item.ket_pulang == "Tidak Absen Pulang"){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={AbsensiKurang} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum belum absen pulang</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else{
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={AbsensiKurang} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Terimakasih, anda telah melakukan absensi</Text>
                        </View>          
                    </TouchableOpacity>            
                    
                ) 
            }
        }
        else if(item.ket_hadir === "Sakit"){
            const setStSakit = ()=>{
                if(item.isApprove=="diajukan"){
                    return("Menunggu Persetujuan Kasubag Umum")
                }else if(item.isApprove=="diterima"){
                    return("Anda Mengajukan Keterangan Sakit")
                }else if(item.isApprove=="ditolak"){
                    return("Pengajuan Ditolak Kasubag Umum")
                }
            }

            const stSakit = setStSakit()

            const IcontSet = ()=> {
                if(item.isApprove=="ditolak"){
                    return(
                        <>
                            <Image source={DangerIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />
                        </>
                    )
                }else if(item.isApprove=="diajukan"){
                    return(
                        <>
                            <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />
                        </>
                    )
                }else{
                    return(
                        <>
                            <View></View>
                        </>
                    )
                }
            }
            
            return(
                <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
                    <Image source={statusApprove=="ditolak"?SakitDanger:SakitIcont} style={{width:40,height:40, marginLeft:15}}/>
                    <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                        <Text style={item.isApprove=="ditolak"?{ color:"red",  fontSize:10, textTransform:"capitalize"}:{ color:"black",  fontSize:10, textTransform:"capitalize"}}> {stSakit}</Text>
                    </View>
                    <IcontSet/>
                </TouchableOpacity>
            )
        }
        else if(item.ket_hadir === "Izin"){
            const setStIzin = ()=>{
                if(item.isApprove=="diajukan"){
                    return("Menunggu Persetujuan Kasubag Umum")
                }else if(item.isApprove=="diterima"){
                    return("Anda mengajukan keterangan izin")
                }else if(item.isApprove=="ditolak"){
                    return("Pengajuan Ditolak Kasubag Umum")
                }
            }

            const stIzin = setStIzin()

            const IcontSet = ()=> {
                if(item.isApprove=="ditolak"){
                    return(
                        <>
                            <Image source={DangerIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />
                        </>
                    )
                }else if(item.isApprove=="diajukan"){
                    return(
                        <>
                            <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />
                        </>
                    )
                }else{
                    return(
                        <>
                            <View></View>
                        </>
                    )
                }
            }

            return(
                <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
                    <Image source={statusApprove=="ditolak"?SakitIzinDanger:SakitIzin} style={{width:40,height:40, marginLeft:15}}/>
                    <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                        <Text style={item.isApprove=="ditolak"?{ color:"red",  fontSize:10, textTransform:"capitalize"}:{ color:"black",  fontSize:10, textTransform:"capitalize"}}>{stIzin}</Text>
                    </View>
                    <IcontSet/>
                </TouchableOpacity>
            )
        }
        else{
            if(item.laporan == false ){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, Anda belum membuat agenda</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else if(item.ket_pulang == "Tidak Absen Pulang"){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum absen pulang</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else{
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Terimakasih, anda telah melakukan absensi</Text>
                        </View>          
                    </TouchableOpacity>            
                    
                ) 
            }
        }

    }

    // button absen & pulang
    const BtnAbsen = () => {

        if(btAbsensi != null){
            return(
                <View style={showContent==1? {display:"flex"} : {display:"none"}}>
                    <Text style={{ color:"black", fontSize:11, marginTop:10, fontWeight:'600', textTransform:"capitalize"}}>Terimakasih anda telah mengisi absen</Text>
                    <Text style={{ color:"black", fontSize:11, fontWeight:'600', textTransform:"capitalize"}}>Silakan tambahkan agenda anda hari ini</Text>
                </View>
            )
        }
        else if(labelStatus == "Absensi Masuk"){
            return(
                <TouchableOpacity style={showContent==1?{backgroundColor:"#39a339", width:200, height:30, borderRadius:15, marginTop:10, alignItems:"center", justifyContent:"center"} : {display:"none"}} onPress={toggleModal}>
                    <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>
                    {labelStatus}
                    </Text>
                </TouchableOpacity>
            )
        }
        else{
            return(
                <TouchableOpacity style={showContent==1?{backgroundColor:"#39a339", width:200, height:30, borderRadius:15, marginTop:10, alignItems:"center", justifyContent:"center"} : {display:"none"}} onPress={() => navigation.navigate('AbsensiPulang', {idAbsensi:idAbsensi})}>
                    <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>
                    {labelStatus}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    // keterangan approve
    const KetApprove = () =>{
        if(statusApprove=="diajukan"){
            return(
                <>
                    <Text style={{ color:"black", fontSize:11, marginTop:10, fontWeight:'600', textTransform:"capitalize"}}>pengajuan {sakit? 'sakit':'izin'} anda sedang diproses</Text>
                    <Text style={{ color:"black", fontSize:11, fontWeight:'600', textTransform:"capitalize"}}>harap menunggu persetujuan kasubag umum</Text>
                </>
                
            )
        }else if(statusApprove=="diterima"){
            return(
                <>
                    <Text style={{ color:"black", fontSize:11, marginTop:10, fontWeight:'600', textTransform:"capitalize"}}>Anda telah berhasil mengajukan {sakit? 'Sakit':'Izin'}</Text>
                    <Text style={{ color:"black", fontSize:11, fontWeight:'600', textTransform:"capitalize"}}>{sakit? 'Semoga Lekas Sembuh' : 'Selamat beraktifitas'}</Text>
                </>
            )
        }else{
            return(
                <>
                    <Text style={{ color:"red", fontSize:11, marginTop:10, fontWeight:'900', textTransform:"capitalize"}}>pengajuan {sakit? 'sakit':'izin'} anda ditolak kasubag umum</Text>
                    <Text style={{ color:"black", fontSize:11, fontWeight:'600', textTransform:"capitalize"}}>Harap periksa kembali kehadiran anda</Text>
                </>
            )
        }
        
    }
    return (
        <ScrollView>
            <ImageBackground source={BgApp} style={{flex:1}}>
            
                <View style={{ width:WindowWidth, height:200,}}>
                    <View style={{ width:WindowWidth, marginTop:15, alignItems:'center' }}>
                            
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => navigation.navigate("AcountScreen")}><Image source={SettIcont} style={{width:30, height:30}}/></TouchableOpacity>

                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:20, marginHorizontal:100}}>E - Laporan</Text>

                           <TouchableOpacity style={{flexDirection:"row"}} onPress={() => navigation.navigate("Notif")}>
                                <Image source={NotifIcont} style={{width:28, height:28}}/>
                                <View style={{marginLeft:-15, marginRight:-7}}>
                                    <Image source={WarningIcont} style={{width:20, height:20,}}/>
                                </View>
                           </TouchableOpacity>
                        </View>
                    </View>
                    {/* Profile */}
                    <View style={{marginTop:10, marginLeft:15, alignItems:"center"}}>
                        {imgFoto ? <Image source={imgFileFoto} style={{width:80, height:80, borderRadius:50,}} resizeMode='cover'/>:<Image source={PasFoto} style={{width:80, height:80, borderRadius:50,}} resizeMode='cover'/>}
                        <View style={{ alignItems:"center"}}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>{ namaUser }</Text>
                            <Text style={{ fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginTop:5}}>Jabatan : {jabatanUser}</Text>
                        </View>
                    </View>
                   {/* End Profile */}                    
                </View>

                {/* card absensi */}
                <View style={{backgroundColor:"#f3f3f3", width:WindowWidth, minHeight:500, borderTopRightRadius:40, borderTopLeftRadius:40, alignItems:"center" }}>                
                    <View style={{width:WindowWidth*0.8, height:200, backgroundColor:"white", borderRadius:15, marginTop:20, elevation:10}}>

                        <View style={{flexDirection:"row", marginHorizontal:15, marginTop:15}}>
                            <View style={{width:"50%"}}>
                                <Text style={{ color:"black", fontSize:11, marginTop:10, fontWeight:'600'}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                            </View>
                            <View style={{width:"50%", alignItems:"flex-end"}}>
                                <TouchableOpacity>
                                    <Image source={Warning} style={{width:30, height:30}}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{marginHorizontal:15, marginTop:5}}>
                            {/* status */}
                            <Text style={{ color:"black", fontSize:22, marginTop:10, fontWeight:'900'}}>Status : Hadir Kegiatan</Text>

                            {/* if pengajuan izin sakit menunggu persertujuan */}
                            <View>
                                {/* <Text style={{ color:"black", fontSize:10, marginTop:10, fontWeight:'600', textTransform:"capitalize"}}>terimakasih, silakan tambahkan agenda anda hari ini</Text> */}

                                {/* <Text style={{ color:"black", fontSize:10, marginTop:10, fontWeight:'600', textTransform:"capitalize"}}>menunggu persetujuan kasubag umum</Text> */}

                                {/* <Text style={{ color:"black", fontSize:10, marginTop:10, fontWeight:'600', textTransform:"capitalize"}}>Pengajuan izin anda sedang diproses admin</Text> */}

                                <Text style={{ color:"red", fontSize:10, marginTop:10, fontWeight:'600', textTransform:"capitalize"}}>Pengajuan izin anda ditolak kasubag umum</Text>
                            </View>

                            <View style={{flexDirection:"row", marginTop:25}}>
                                <View style={{width:"50%", alignItems:"center", borderRightWidth:0.5, borderRightColor:"black"}}>
                                    <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}}>
                                        <Image source={Agenda} style={{width:30,height:30}}/>
                                        <View style={{marginLeft:10}}>
                                            <Text style={{ color:"black", fontSize:10, marginTop:0, fontWeight:'600', textTransform:"capitalize"}}>Absensi</Text>
                                            <Text style={{ color:"black", fontSize:10, marginTop:0, fontWeight:'600', textTransform:"capitalize"}}>Masuk</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{width:"50%", alignItems:"center"}}>
                                    <TouchableOpacity style={{flexDirection:"row"}}>
                                        <Image source={Absensi} style={{width:30,height:30}}/>
                                        <View style={{marginLeft:10}}>
                                            <Text style={{ color:"black", fontSize:10, marginTop:0, fontWeight:'600', textTransform:"capitalize"}}>Tambah</Text>
                                            <Text style={{ color:"black", fontSize:10, marginTop:0, fontWeight:'600', textTransform:"capitalize"}}>Agenda</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        
                            
                        

                        
                        <ReactNativeModal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                            <View style={{ width: "90%", height: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                                <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal}>
                                    <Image source={CloseIcont} style={{width:30, height:30}}/>
                                </TouchableOpacity>
                                <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                                    <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Silahkan Pilih Absensi Anda</Text>
                                </View>
                                <View style={{alignItems:"center", width:"100%"}}>
                                    
                                    <Picker
                                        selectedValue={kehadiran}
                                        onValueChange={(itemValue, itemIndex) => 
                                            setKehadiran(itemValue)
                                        }
                                        style={{ width:"90%", height:20, borderRadius: 50,  fontWeight: "bold", color:"#000", backgroundColor: "#f3f3f3"}}
                                        selectionColor={"#000"}
                                        // dropdownIconRippleColor={"transparent"}
                                        // dropdownIconColor={"transparent"}
                                    >
                                        <Picker.Item label="-" value="0"/>
                                        <Picker.Item label="Hadir" value="1"/>
                                        <Picker.Item label="Hadir Kegiatan" value="2"/>
                                        <Picker.Item label="Sakit" value="3"/>
                                        <Picker.Item label="Izin" value="4"/>
                                    </Picker>
                                    

                                </View>
                                <View style={{width:"100%", alignItems:"center",  marginTop:55,}}>
                                    <TouchableOpacity style={kehadiran>0 ? {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15} : {display:"none"}} onPress={buatAbsensi}>
                                        <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ReactNativeModal>
                    </View>

                    {cekApprove?
                        <View style={{width:WindowWidth*0.9, minHeight:100, marginTop:30, alignItems:"center"}}>
                            <ViewPengajuan/>
                        </View>
                    :
                        <View></View>
                    }

                    <View style={{width:WindowWidth*0.9, minHeight:100, marginTop:30, alignItems:"center"}}>
                        <View style={{width:WindowWidth*0.9, marginBottom:10}}><Text style={{fontWeight:'700', color:"black",  fontSize:14}}>
                        Riwayat Absensi</Text>
                        </View>
                        {loadHistory?
                            <View>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                            </View>
                        :
                            <View>
                            {
                                history.length > 0 &&
                                history.map((item, index) =>(
                                    rowHistory(item,index)
                                ))
                            }
                            </View>
                        }


                        <TouchableOpacity style={{width:"95%", height:40, backgroundColor:'#39a339', borderRadius:15, elevation:5,alignItems:"center", justifyContent:"center"}} onPress={() => navigation.navigate("Allabsensi")}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Absensi Lainnya</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{height:300, width:100}}></View> */}
                    <View style={{width:WindowWidth, height:50}}></View> 
                </View>
                               
            </ImageBackground>
        </ScrollView>
    )
}

export default MainApp

const styles = StyleSheet.create({})