import { ScrollView, StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Absensi, AbsensiKurang, Agenda, BgApp, CloseIcont, ExFoto, JmlNotif, LgBappeda, NotifIcont, OffAbsensi, SakitIzin, SettIcont, TidakHadir, WarningIcont, offAgenda } from '../../assets/images';
import ReactNativeModal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';


const MainApp = ({ navigation}) => {

    useEffect(()=>{
        requestLocationPermission(),
        calculateDistance()
    })

    const [posisi, setPosisi] = useState()
    // console.log(JSON.parse(posisi).coords.latitude, "<==== si")
    // console.log(posisi, "<==== si")

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

    // picker
    const [kehadiran, setKehadiran] = useState()
    // console.log(kehadiran, "<==== kehadiran")

    // showcontent
    const [showContent, setShowContent] = useState(1)
    const toggleContent = (e)=>{
      setShowContent(e);
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
            console.log('Lokasi berhasil di akses');
            // ambil lokasi
            Geolocation.getCurrentPosition(
                lokasi =>{
                    const posisiAwal = JSON.stringify(lokasi)
                    setPosisi(posisiAwal)
                }, 
                // error=>
                //     Alert,alert(
                //         'Posisi tidak ditemukan', 
                //         JSON.stringify(error)
                //     ),
                console.log('erorrrrrrrrrr'),
                {enableHighAccuracy: true}
                )
          } else {
            console.log('Lokasi gagal di akses');
          }
        } catch (err) {
          console.warn(err);
        }
    };
    // chat latitude
    const [lat1, setLat1] = useState(0.5156318370565821);
    const [lon1, setLon1] = useState(101.54085748175679);

    // lokasi kantor
    const [lat2, setLat2] = useState(0.5170908981315071);
    const [lon2, setLon2] = useState(101.54134025306783);
    const [distance, setDistance] = useState('');
  
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

    console.log(distance, '<===== selisih jarak')

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
                    <View style={{marginTop:10, marginLeft:15, alignItems:"center"}}>
                        <Image source={ExFoto} style={{width:80, height:80, borderRadius:50,}} resizeMode='cover'/>
                        <View style={{marginLeft:15, alignItems:"center"}}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Muhammad Agung Sholihhudin, S.T</Text>
                            <Text style={{ fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginTop:5}}>Jabatan : Programmer</Text>
                        </View>
                    </View>
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
                                    <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Silakan Pilih Absensi Anda</Text>
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
                                    <TouchableOpacity style={kehadiran>0 ? {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15} : {display:"none"}} onPress={()=> navigation.navigate('Absensi', {kehadiran:kehadiran, posisi:posisi})}>
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

                        <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
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
                        </TouchableOpacity>

                        
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