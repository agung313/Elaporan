import { ScrollView, StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Absensi, AbsensiKurang, Agenda, BgApp, CloseIcont, ExFoto, JmlNotif, LgBappeda, NotifIcont, OffAbsensi, SakitIzin, SettIcont, TidakHadir, WarningIcont, offAgenda } from '../../assets/images';
import ReactNativeModal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const MainApp = ({ navigation}) => {

    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    const base_url ="http:10.0.2.2:8000/api";

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
    const [lat2, setLat2] = useState(0.515712);
    const [lon2, setLon2] = useState(101.534796);

    const [distance, setDistance] = useState('');

    const [namaUser, setNamaUser] = useState('-')
    const [jabatanUser, setJabatanUser] = useState('-')
    const [history, setHistory] = useState([]);

    // modal
    const [isModalVisible, setModalVisible] = useState(false);
    const [izinSakit, setIzinSakit] = useState(0)

    useEffect(()=>{
        console.log(cekTgl.getHours(),"<--- tanggal")
        requestLocationPermission(),
        calculateDistance(),
        getMyProfile(),
        getMyHistory()
        
    },[])

    const getMyProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${base_url}/user/profile`,{headers:{
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
    const getMyHistory = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${base_url}/absen/`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
    
            if (response.status == 200) {
                setHistory(response.data);
            }

        } catch (error) {
            console.log(error, "error get my history")   
        }
    }
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
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

            // ambil lokasi
            Geolocation.getCurrentPosition(
                //Will give you the current location
                (position) => {
                    //getting the Latitude from the location json
                    const currentLatitude =
                    JSON.stringify(position.coords.latitude);
                    //getting the Longitude from the location json
                    const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                    setLat2(currentLatitude)
                    setLon2(currentLongitude)
                    
                    }, (error) => alert(error.message), { 
                    enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
                    }
                );
            } else {
            console.log('Lokasi gagal di akses');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const calculateDistance = () => {

        const R = 6371; // radius bumi dalam kilometer
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const calculatedDistance = R * c;
        setDistance(calculatedDistance.toFixed(2)); // jarak diambil dengan 2 desimal

        // Fungsi konversi derajat ke radian
        function toRad(Value) {
        return (Value * Math.PI) / 180;
        }
    };
    // picker
    const [kehadiran, setKehadiran] = useState()

    // showcontent
    const [showContent, setShowContent] = useState(1)
    const toggleContent = (e)=>{
      setShowContent(e);
    }



    const statusHadir = () =>{
        return(
            <TouchableOpacity  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>

                <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                <View style={{marginLeft:10, width:"75%"}}>
                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Senin, 26 Juni 2023</Text>
                    <Text style={{ color:"black",  fontSize:10}}>Terimakasih, anda telah melakukan absensi lengkap</Text>
                </View>                
            </TouchableOpacity>            
            
        )
    }

    const statusTelat = () =>{
        return(
            
            <TouchableOpacity  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
                <Image source={AbsensiKurang} style={{width:40,height:40, marginLeft:15}}/>
                <View style={{marginLeft:10, width:"75%"}}>
                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Senin, 26 Juni 2023</Text>
                    <Text style={{ color:"black",  fontSize:10}}>Maaf ! Absensi Anda Kurang / Telat </Text>
                </View>
            </TouchableOpacity>
                        
        )
    }    

    const statusAlfa = () =>{
        return(
            <TouchableOpacity  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
                <Image source={TidakHadir} style={{width:40,height:40, marginLeft:15}}/>            
                <View style={{marginLeft:10, width:"75%"}}>
                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Kamis, 23 Juni 2023</Text>
                <Text style={{ color:"black",  fontSize:10}}>Anda tidak hadir</Text>
                </View>
             </TouchableOpacity>
        )
    }        
        

    const rowHistory = (item, index) =>{

        if (item.ket_hadir === 'Datang Tepat Waktu' && item.ket_pulang === 'Pulang Tepat Waktu') {

            return(statusHadir()) 

        } else if(item.ket_hadir ==="Tidak Hadir"){

            return (statusAlfa())
        
        }else{
            return (statusTelat())
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
                        <Image source={ExFoto} style={{width:80, height:80, borderRadius:50,}} resizeMode='cover'/>
                        <View style={{marginLeft:15, alignItems:"center"}}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>{ namaUser }</Text>
                            <Text style={{ fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginTop:5}}>Jabatan : {jabatanUser}</Text>
                        </View>
                    </View>
                   {/* End Profile */}                    
                </View>

                <View style={{backgroundColor:"#f3f3f3", width:WindowWidth, minHeight:500, borderTopRightRadius:40, borderTopLeftRadius:40, alignItems:"center" }}>

                    <View style={{width:WindowWidth*0.7, height:200, backgroundColor:"white", borderRadius:15, marginTop:20, elevation:10, alignItems:"center"}}>
                        <Text style={{ color:"black", fontSize:14, marginTop:10, fontWeight:'600'}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>

                        <View style={{flexDirection:'row', marginTop:15}}>
                            <TouchableOpacity style={{ width:100, height:100, alignItems:'center', justifyContent:'center', marginRight:15 }} onPress={() => toggleContent(1)}>
                                {/* <Image source={OffAbsensi} style={{width:80,height:80}}/> */}
                                <Image source={Agenda} style={{width:80,height:80}}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width:100, height:100, alignItems:'center', justifyContent:'center'}} onPress={() => toggleContent(2)}>
                                <Image source={Absensi} style={{width:80,height:80}}/>
                                {/* <Image source={offAgenda} style={{width:80,height:80}}/> */}
                            </TouchableOpacity>
                        </View>

                        {/* <View style={showContent==1 ? { width:WindowWidth*0.7, height:30, marginTop:10, alignItems:"center", justifyContent:"center"} : {display:"none"}} onPress={toggleModal}>
                            <Text style={{fontWeight:'500', color:"black", fontSize:12}}>
                                Harap Menunggu Waktu Absensi Selanjutnya
                            </Text>
                        </View> */}
                        <TouchableOpacity style={showContent==1?{backgroundColor:"#39a339", width:200, height:30, borderRadius:15, marginTop:10, alignItems:"center", justifyContent:"center"} : {display:"none"}} onPress={toggleModal}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>
                                Absensi Masuk
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={showContent==2?{backgroundColor:"#0060cb", width:200, height:30, borderRadius:15, marginTop:10, alignItems:"center", justifyContent:"center"} : {display:"none"}} onPress={() => navigation.navigate('Agenda')}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>
                                Agenda
                            </Text>
                        </TouchableOpacity>

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
                                    <TouchableOpacity style={kehadiran>0 ? {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15} : {display:"none"}} onPress={()=> navigation.navigate('Absensi', {kehadiran:kehadiran})}>
                                        <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ReactNativeModal>
                    </View>

                    <View style={{width:WindowWidth*0.9, minHeight:100, marginTop:40, alignItems:"center"}}>
                        <View style={{width:WindowWidth*0.9, marginBottom:10}}><Text style={{fontWeight:'700', color:"black",  fontSize:14}}>
                        Riwayat Absensi</Text>
                        </View>
                        {
                            history.length > 0 &&
                            history.map((item, index) =>(
                                rowHistory(item,index)
                            ))
                        }
                        
                        {/* <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
                            <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                            <View style={{marginLeft:10, width:"75%"}}>
                                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Senin, 26 Juni 2023</Text>
                                <Text style={{ color:"black",  fontSize:10}}>Terimakasih, anda telah melakukan absensi lengkap</Text>
                            </View>
                            <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
                            <Image source={AbsensiKurang} style={{width:40,height:40, marginLeft:15}}/>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Jumat, 23 Juni 2023</Text>
                                <Text style={{ color:"black",  fontSize:10}}>Maaf, anda belum melakukan absensi sore</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
                            <Image source={TidakHadir} style={{width:40,height:40, marginLeft:15}}/>
                            <View style={{marginLeft:10, width:"75%"}}>
                                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Kamis, 23 Juni 2023</Text>
                                <Text style={{ color:"black",  fontSize:10}}>Anda tidak hadir</Text>
                            </View>
                        </TouchableOpacity> */}

                        
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