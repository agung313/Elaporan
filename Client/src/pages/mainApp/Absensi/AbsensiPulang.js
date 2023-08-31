import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import React, { useEffect,useState } from 'react'
import { AddImg, BackIcon, ExFoto, LgBappeda, CloseIcont, PasFoto } from '../../../assets/images'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import ReactNativeModal from 'react-native-modal'
import axios from 'axios'
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApiLink from '../../../assets/ApiHelper/ApiLink'
import { Circle } from 'react-native-animated-spinkit'
import { useIsFocused } from '@react-navigation/native'


const AbsensiPulang = ({route, navigation}) => {

    const {idAbsensi, kehadiran, latit, longtit, jarak} = route.params

    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // input
    const [detail, setDetail] = useState('')

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
    const [posisi, setPosisi] = useState()

    const base_url =ApiLink+"/api"
    const [fileKeterangan, setFileKeterangan] = useState()
    const [imgKeterangan, setImgKeterangan] = useState()
    const [modalStore, setModalStore] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalLoad, setModalLoad] = useState(false)

    const [namaUser, setNamaUser] = useState('-')
    const [jabatanUser, setJabatanUser] = useState('-')

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

    const [imgFoto, setImgFoto] = useState()

    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            getMyProfile(),
            getAbsensi()
        }

    }, [navigation, isFocused])


    
    const getMyProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${base_url}/user/profile`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
            // console.log(response.data,"<<<<< ini rressss");
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

    const getAbsensi = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url = `${base_url}/absen?detail=true&id=${idAbsensi}`

            await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{     

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
            console.log(error, "error get absensi cuy")   
        }
    }

    const handlerHadir = async data =>{
        setModalLoad(true)

        try {
            const dataHadir ={
                keterangan_pulang : detail
            }

            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.post(base_url+"/absen/store", dataHadir,{headers:{
                Authorization: `Bearer ${myToken}`
            }})
            setModalLoad(false)
            setModalSuccess(true)
            // console.log(response.data, "<===== ini komeng")
        } catch (error) {
            console.log(error,"<--- error handler hadir")            
        }
    } 

    const selectImage = async () => {
        try{

            const doc =  await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            })

            setFileKeterangan(doc)
            setImgKeterangan(doc.uri)

        }catch(err){
            if(DocumentPicker.isCancel(e)){
                console.log(e, "<---- user canceled file")
            }else{
                console.log(err)
            }
        }
    } 
    
    const gambarKeterangan = {uri: imgKeterangan}

    // lokasi default user
    const myLa = Number(latit);
    const myLo = Number(longtit)

    const initialRegion = {
        latitude: myLa,
        longitude: myLo,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const markerCoordinate = {
        latitude: myLa,
        longitude: myLo,
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
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Absensi Pulang</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>

            <View style={{alignItems:"center", marginBottom:30}}>
                <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10 }}>
                    <Text style={{ color: "#000", fontSize: 18, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Detail Kehadiran</Text>

                    <View style={{alignItems:"center"}}>
                        <View style={{flexDirection:"row", marginBottom:15}}>
                            <View style={{width:"35%", minHeight:25, justifyContent:"center", marginRight:10}}>
                            
                                {imgFoto ? <Image source={imgFileFoto} style={{width:"100%", height:190}}/>:<Image source={PasFoto} style={{width:"100%", height:190}}/>}
                            </View>
                            <View style={{width:"55%", minHeight:25,}}>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Nama :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{namaUser}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Jabatan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{jabatanUser}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Status Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{absen.status}</Text>
                                </View>
                                {/* <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Lokasi Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Kantor Walikota Pekanbaru</Text>
                                </View> */}
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Masuk :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{absen.waktuMasuk} wib</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Pulang :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Anda Belum Absen Pulang</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginBottom:20}}>
                        <MapView
                            style={{width:"100%", height:300}}
                            initialRegion={initialRegion}
                            loadingEnabled={true}
                        >
                            <Marker
                                coordinate={markerCoordinate}
                                title="Marker Title"
                                description="Marker Description"
                            />
                        </MapView>
                    </View>
                    
                    <View >

                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginLeft:15}}>Keterangan Pulang :</Text>
                        <Text style={{color:"#b5b5b5", fontSize:9,  fontWeight:"900", marginBottom:10, marginLeft:15}}>Silakan Isi Jika Anda Pulang Cepat Sebelum Waktunya</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", height:100, borderBottomWidth:0.5, borderColor:"black",}}>
                                <TextInput
                                        placeholder='-'
                                        placeholderTextColor={"#000"}
                                        value={detail}
                                        keyboardType= "default"
                                        onChangeText={(text) => setDetail(text)}
                                        style={{ color: "#000" }}
                                        multiline
                                    />
                            </View>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={handlerHadir}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    

                    <ReactNativeModal isVisible={modalSuccess} onBackdropPress={() => setModalSuccess(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                        <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, alignItems:"center", justifyContent:"center" }}>

                            {/* <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => navigation.navigate('MainApp', {agendaValue:1})}>
                                <Image source={CloseIcont} style={{width:30, height:30}}/>
                            </TouchableOpacity> */}
                            <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Selamat ! Absensi Pulang Anda Berhasil.</Text>
                            </View>
                            <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                                <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={() => navigation.navigate('MainApp', {agendaValue:1})}>
                                    <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
                                </TouchableOpacity>      
                            </View>
                        </View>
                    </ReactNativeModal>

                    {/* modal Loading */}
                    <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                        <Circle size={100} color="white"/>
                    </ReactNativeModal>

                </View>
            </View>
        </ScrollView>
    )
}

export default AbsensiPulang

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