import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AddImg, BackIcon, CloseIcont, DeletedIcont, DotAksi, EditIcont,  LgBappeda } from '../../../assets/images'
import ReactNativeModal from 'react-native-modal'
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Circle } from 'react-native-animated-spinkit';
import ApiLink from '../../../assets/ApiHelper/ApiLink';

import Geolocation from 'react-native-geolocation-service';
import { Picker } from '@react-native-picker/picker';


const Detail = ({route, navigation}) => {

    const {idAbsensi} = route.params
    const isFocused = useIsFocused();

    const base_url =ApiLink+"/api";
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
    const [modalLoad, setModalLoad] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const [profile, setProfile] = useState({
        nama:'-',
        jabatan:'-'
    })
    const [absen, setAbsen] = useState({
        id:null,
        status:'-',
        waktuMasuk:'00:00:00',
        waktuPulang:'00:00:00',
        tanggal:null,
        fotoAbsensi:'-',
        keteranganAbsensi:'-',
        isApprove:"",
        approveAdmin:null,
        catatanKasum:""

    })
    const [modalValue, setModalValue] = useState({
        id:0,
        judulKegiatan:'-',
        uraianKegiatan:'-'
    })
    const [arrKegiatan, setArrKegiatan] = useState([])

    useEffect(() => {

        if (isFocused) {
            requestLocationPermission(),
            getProfile(),
            getAbsensi(),
            getKegiatan(),
            checkDocument()
            
        }
    
    }, [navigation, isFocused])
    
    const [imgFoto, setImgFoto] = useState()
    
    const [docDiajukan, setDocDiajukan] = useState()
    console.log(docDiajukan,"<===== dooooooc");
    const [periodDoc, setPeriodDoc] = useState({
        bulan:null,
        tahun:null
    })

    const getProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url = `${base_url}/user/profile`

            await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{
                setProfile({
                    nama:res.data.nama,
                    jabatan:res.data.jabatan
                })
                setImgFoto(res.data.URL)
            }) 
    

        } catch (error) {
            console.log(error, "error get kegiatan")   
        }
    }
    const imgFileFoto = {uri: imgFoto}
    
    const getAbsensi = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url = `${base_url}/absen?detail=true&id=${idAbsensi}`

            await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{     
                // console.log(res.data.data, "<<<<<<<< detaillll")

                const arrTgl = res.data.data.realTanggal.split('-');

                setPeriodDoc({
                    tahun:arrTgl[0],
                    bulan: parseInt(arrTgl[1], 10) 
                })


                setAbsen({  
                    id: res.data.data.id,
                    status:res.data.data.status,
                    waktuMasuk: res.data.data.waktu_hadir,
                    waktuPulang:res.data.data.waktu_pulang,
                    fotoAbsensi:res.data.data.foto,
                    keteranganAbsensi:res.data.data.keterangan_hadir,      
                    isApprove:res.data.data.isApprove,
                    approveAdmin: res.data.data.approveAdmin,
                    tanggal: res.data.data.tanggal,
                    catatanKasum: res.data.data.catatan_kasum           
                })
            }) 
            


        } catch (error) {
            console.log(error, "error get absensi")   
        }
    }

    const fotoKeterangan = {uri: absen.fotoAbsensi}


    const checkDocument = async() =>{

        try {

            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url = `${base_url}/document/laporanDiajukan?`
            const params_url  = `bulan=${periodDoc.bulan}&tahun=${periodDoc.tahun}`
            const final_url = target_url+''+params_url
            
            const response =await axios.get(final_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }})
            
            setDocDiajukan(response.data.data)       
        
        } catch (error) {
            console.log(error.response.data, "error check pengajuan ")   
        }
    }
    const getKegiatan = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url = `${base_url}/laporan?&id_absensi=${idAbsensi}`

            await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{
                setArrKegiatan(res.data)
            }) 
    

        } catch (error) {
            console.log(error, "error get kegiatan")   
        }
    }

    const modalDelete =  (data) =>{
        toggleContent(0)

        setModalValue({
            id:data.id,
            judulKegiatan: data.judul_kegiatan,
            uraianKegiatan: data.uraian_kegiatan
        })

        toggleModal()

    }

    const handlerDelete = async (id) =>{
        setModalVisible(false)
        setModalLoad(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.delete(`${base_url}/laporan/${id}`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            getKegiatan()
            setModalLoad(false)
            setModalSuccess(true)

        } catch (error) {
            console.log(error, "error get my profile")   
        }        
    }

    // showcontent
    const [showContent, setShowContent] = useState(0)
    const toggleContent = (e)=>{
        setShowContent(e);
    }

    
    const rowKegiatan = (item, index)=>{
        const GotoEdit = () => {
            toggleContent(0)
            navigation.navigate("Edit",{idKegiatan:item.id, backNavigation:"Detail", idAbsensi:idAbsensi,})
        }

        return( 
            <View key={index} style={{flexDirection:"row", backgroundColor:"#fff"}}>
                <View style={{width:"10%", minHeight:50, borderColor:"#000", padding:5, alignItems:"center"}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>
                        {index+1}
                    </Text>
                </View>
                <View style={{width:"80%", minHeight:50, borderColor:"#000", padding:5}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>
                        {item.judul_kegiatan}
                    </Text>
                </View>
                <View style={{width:"10%", minHeight:50, borderColor:"#000", alignItems:"center"}}>
                    {showContent==index+1?
                        <TouchableOpacity onPress={() => toggleContent(0)}>
                            <Image source={DotAksi} style={{width:20, height:20}} />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={() => toggleContent(index+1)}>
                            <Image source={DotAksi} style={{width:20, height:20}} />
                        </TouchableOpacity>
                    }
                    
                    <View style={showContent==index+1?{width:50, height:50, marginTop:-20, marginLeft:-70, alignItems:"center"}:{display:"none"}}>
                        <TouchableOpacity style={{width:50, height:20, backgroundColor:"#fcc419", borderRadius:10, marginBottom:5, alignItems:"center", justifyContent:"center"}} onPress={GotoEdit}>
                            <Text style={{fontWeight:'700', color:"black", fontSize:10}}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:50, height:20, backgroundColor:"red", borderRadius:10, alignItems:"center", justifyContent:"center"}} onPress={()=>modalDelete(item)}>
                            <Text style={{fontWeight:'700', color:"white", fontSize:10}}>Hapus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }    

    // status pengajuan
    const setStPengajuan = () =>{
        if(absen.isApprove=="diajukan"){
            return("Menunggu Persetujuan Kasubag Umum")
        }else if(absen.isApprove=="diterima"){

            if (absen.approveAdmin) {
                return("Pengajuan Selesai")                
            }else{
                return("Diproses Admin")
            }

        }else if(absen.isApprove=="ditolak"){
            return("Pengajuan Ditolak Kasubag Umum")
        }
    }
    const stPengajuan = setStPengajuan()

    // get location
    const [distance, setDistance] = useState('');
    const [lat2, setLat2] = useState();
    const [lon2, setLon2] = useState();
    const [lat1, setLat1] = useState(0.517096);
    const [lon1, setLon1] = useState(101.540887);
    const [kehadiran, setKehadiran] = useState()

    const [isModalVisible2, setModalVisible2] = useState(false);

    const toggleModal2 = () => {
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
        setModalVisible2(!isModalVisible2);

    }

    // buat absensi
    const jarakMeter = distance*1000
    
    const buatAbsensi = () => {
        setModalVisible(false)
        navigation.navigate('Absensi', {idAbsensi:absen.id, kehadiran:kehadiran, latit:lat2, longtit:lon2, jarak:jarakMeter})
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>ABSENSI</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Detail Absensi</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>

            <View style={{alignItems:"center", marginBottom:30}}>
                <View style={{width:WindowWidth*0.9, minHeight:200, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10 }}>
                    <Text style={{ color: "#000", fontSize: 18, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Detail Absensi</Text>

                    <View style={{alignItems:"center"}}>
                        <View style={{flexDirection:"row", marginBottom:15, alignItems:"center"}}>
                            <View style={{width:"35%", marginTop:-40, minHeight:25, justifyContent:"center", marginRight:10}}>
                            {imgFoto ? <Image source={imgFileFoto} style={{width:"100%", height:190}}/>:<Image source={AddImg} style={{width:"100%", height:190}}/>}
                            </View>
                            <View style={{width:"55%", minHeight:25,}}>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Nama :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textTransform:"capitalize"}}>{ profile.nama }</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Jabatan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textTransform:"capitalize"}}>{profile.jabatan}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Tanggal :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textTransform:"capitalize"}}>{absen.tanggal}</Text>
                                </View>                                
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Status Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textTransform:"capitalize"}}>{absen.status}</Text>
                                </View>

                                <View style={absen.status == "Izin" || absen.status == "Sakit" ?{marginBottom:10}:{display:"none"}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Status Pengajuan :</Text>
                                    <Text style={absen.isApprove=="ditolak"?{color:"red", fontSize:10, fontWeight:"900", textTransform:"capitalize"}:{color:"#000", fontSize:10, fontWeight:"500", textTransform:"capitalize"}}>{stPengajuan}</Text>
                                </View> 

                                <View style={absen.status == "Izin" || absen.status == "Sakit" ?{display:"none"}:{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Masuk :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textTransform:"capitalize"}}>{absen.waktuMasuk} WIB</Text>
                                </View>
                                <View style={absen.status == "Izin" || absen.status == "Sakit" ?{display:"none"}:{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Pulang :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textTransform:"capitalize"}}>{absen.waktuPulang? absen.waktuPulang+" WIB":'Anda Belum Absen Pulang' }</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {
                        absen.status == 'hadir kegiatan' &&
                        <View>
                            <View>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto Kegiatan :</Text>
                                <View style={{alignItems:"center", marginBottom:20}}>
                                    <View style={{width:"90%", height:150, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}}>
                                        <Image source={fotoKeterangan} style={{width:"100%", height:"100%", borderRadius:15}}/>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail Kegiatan :</Text>
                                <View style={{alignItems:"center", marginBottom:20}}>
                                    <View style={{width:"90%", minHeight:100, }}>
                                        <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginLeft:10, marginBottom:5}}>{absen.keteranganAbsensi}</Text>
                                    </View>
                                </View>
                            </View>                            
                        </View>
                    }


                    <View style={absen.status == "Izin" || absen.status == "Sakit" ? {display:"none"} : {display:"flex"}}>
                        <View style={{flexDirection:"row", marginBottom:10, marginTop:20 }}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Kegiatan Saya :</Text>
                            {
                                docDiajukan == null || docDiajukan == 'draft' ? 
                                <TouchableOpacity style={{width:120, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:20}} onPress={() => navigation.navigate("Tambah", {idAbsensi:idAbsensi, backNavigation:"Detail"})}>
                                <Text style={{fontWeight:'700', color:"white", fontSize:12}}>
                                    Tambah Kegiatan
                                </Text>
                                </TouchableOpacity>
                                :
                                <></>
                            }

                            
                        </View>
                        <View style={{width:"100%",marginBottom:15, marginTop:10}}>
                            {/* <View style={{flexDirection:"row", backgroundColor:"#d9dcdf"}}>
                                <View style={{width:"10%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>No</Text>
                                </View>
                                <View style={{width:"60%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Kegiatan</Text>
                                </View>
                                <View style={{width:"30%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Aksi</Text>
                                </View>
                            </View> */}
                            {
                                arrKegiatan.length > 0 &&
                                arrKegiatan.map((item,index)=>(
                                    rowKegiatan(item, index)
                                ))
                            }
                            {
                                arrKegiatan.length == 0 &&
                                (
                                    <View style={{flexDirection:"row", backgroundColor:"#fff"}}>
                                    <View style={{width:"100%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Belum Ada Data</Text>
                                    </View>
                                </View>                                
                                )
                            }
                        </View>
                    </View>

                    <View style={absen.status == "Izin" || absen.status == "Sakit" ? {display:"flex", alignItems:"center"} : {display:"none"}}>
                        <View style={{alignItems:"center"}}>
                            
                            {/* diajukan */}
                            <Text style={absen.isApprove=="diajukan"?{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:12, marginTop:10, textTransform:"capitalize"}:{display:"none"}}>Terimakasih anda telah mengajukan {absen.status}</Text>

                            {/* diterima */}
                            <Text style={absen.isApprove=="diterima"?{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:12, marginTop:10, textTransform:"capitalize"}:{display:"none"}}>selamat pengajuan {absen.status} anda telah disetujui kasubag umum</Text>

                            {/* ditolak */}
                            <Text style={absen.isApprove=="ditolak"?{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:12, marginTop:10, textTransform:"capitalize"}:{display:"none"}}>maaf pengajuan {absen.status} anda ditolak kasubag umum</Text>


                            <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:12, marginTop:10, textTransform:"capitalize", marginBottom:30}}>Berikut detail pengajuan anda</Text>

                        </View>

                        <View style={absen.status == "Sakit" ?{display:"flex", width:"100%"}: {display:"none"} }>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto {absen.status} :</Text>
                            <View style={{alignItems:"center", marginBottom:20}}>
                                <View style={{width:"90%", height:150, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}}>
                                    <Image source={fotoKeterangan} style={{width:"100%", height:"100%", borderRadius:15}}/>
                                </View>
                            </View>
                        </View>

                        <View style={{width:"100%"}}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail {absen.status} :</Text>
                            <View style={{alignItems:"center", marginBottom:20, }}>
                                <View style={{width:"90%", minHeight:100, borderBottomWidth:0.5, borderBottomColor:"black"}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginLeft:10, marginBottom:5}}>{absen.keteranganAbsensi}</Text>
                                </View>
                            </View>
                        </View> 

                        <View style={{width:"100%"}}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Catatan {absen.status} Kasubag Umum:</Text>
                            <View style={{alignItems:"center", marginBottom:20, }}>
                                <View style={{width:"90%", minHeight:100, borderBottomWidth:0.5, borderBottomColor:"black"}}>
                                    {absen.catatanKasum?
                                        <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginLeft:10, marginBottom:5, textTransform:"capitalize"}}>{absen.catatanKasum}</Text>
                                    :
                                        <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginLeft:10, marginBottom:5, textTransform:"capitalize"}}>Belum Ada Catatan Dari Kasubag Umum</Text>
                                    }
                                </View>
                            </View>
                        </View> 
                        {
                            absen.isApprove == 'ditolak' ?
                            <View style={{width:"100%", alignItems:"center"}}>
                                <TouchableOpacity style={{width:"95%", height:40, backgroundColor:'#39a339', borderRadius:15, elevation:5,alignItems:"center", justifyContent:"center"}} onPress={toggleModal2}>
                                    <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Perbarui Absensi</Text>
                                </TouchableOpacity>
                            </View>
                            :
                                !absen.isApprove || !absen.approveAdmin &&
                                    <View style={{ marginVertical:10, alignItems:'center'}}>
                                        <Text style={{color:'red', fontWeight:'800'}}>Pengajuan Anda Masih Diproses</Text>
                                        <Text style={{fontSize:10, color:'black'}}>Mohon Cek Secara Berkala</Text>
                                    </View>
                        }

                    </View>


                </View>

            </View>

            {/* modal if sakit izin perbarui */}
            <ReactNativeModal isVisible={isModalVisible2} onBackdropPress={() => setModalVisible2(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal2}>
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

            {/* modal hapus */}
            <ReactNativeModal isVisible={isModalVisible} style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Detail Kegiatan Anda</Text>
                    </View>
                    
                    <View style={{marginBottom:20, borderBottomWidth:0.5, borderColor:"black"}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:10}}>Kegiatan :</Text>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginBottom:10, marginLeft:20,}}>
                            {modalValue.judulKegiatan}
                        </Text>
                    </View>
                    <View style={{marginBottom:20, borderBottomWidth:0.5, borderColor:"black"}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:10}}>Uraian Kegiatan :</Text>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginBottom:10, marginLeft:20,}}>
                            {
                                modalValue.uraianKegiatan
                            }
                        </Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                        <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={toggleModal}>
                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={()=> handlerDelete(modalValue.id)}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Hapus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={modalSuccess} style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalSuccess(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Kegiatan / Agenda Berhasil Dihapus.</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={() => setModalSuccess(false)}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
                        </TouchableOpacity>      
                    </View>
                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <Circle size={100} color="white"/>
            </ReactNativeModal>
        </ScrollView>
    )
}

export default Detail

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