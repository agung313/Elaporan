import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, Linking } from 'react-native'
import React, {useState, useEffect} from 'react'
import {  BackIcon, CloseIcont, ExSakit, LgBappeda, PasFoto } from '../../assets/images';
import ReactNativeModal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker'
import Calendar from "react-native-calendar-range-picker";
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApiLink from '../../assets/ApiHelper/ApiLink';


const DetailDataPengajuan = ({route, navigation}) => {

    const {idAbsen, idUser} = route.params

    const isFocused = useIsFocused();
    const base_url= ApiLink+'/api'

    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // input
    const [detail, setDetail] = useState("Saya mengalami sakit diare, sehingga disarankan dokter untuk beristirahat selama tiga hari")

    // date time tanggal
    const [startCal, setStartCal] = useState()
    // console.log(startCal, "<==== start")
    const [endCal, setEndCal] = useState()

    const cekTgl = new Date
    const localeTime = cekTgl.toLocaleTimeString()
    
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
    const getStrDay = namaHari[cekTgl.getDay()]
    const getDay = cekTgl.getDate()

    const [monthUsed, setMonthUsed] = useState(cekTgl.getMonth()+1)
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "November", "Desember"]
    const getStrMonth = namaBulan[monthUsed]

    const getYear = cekTgl.getFullYear()

    const [modalSuccess, setModalSuccess] = useState(false)

    // modal
    const [proses, setProses] = useState(false)

    // showEye
    const [showEye, setShowEye] = useState(1)
    const toggleEye = (e)=>{
        setShowEye(e);
    }

    // profile
    const [formProfile, setFormProfile] = useState({
        nama:null,
        jabatan:null,
        status:null,
        statusKasum:'Telah Disetujui Kasubag Umum',
        statusAdmin:0,
        detailIzin:null,
        catatanKasum:null,
        tanggalPengajuan:null,
        fotoProfile:null,
        fotoSakit:null
    })

    useEffect(() => {
        if (isFocused) {
            getDetail()
        }
    }, [navigation, isFocused])    
    // console.log(dataDetail.status)
    const getDetail = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url = `${base_url}/absen?detail=true&id=${idAbsen}`

            await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{     

                const data = res.data.data

                setFormProfile({
                    nama:data.nama,
                    jabatan:data.jabatan,
                    status:data.status,
                    statusKasum:'Telah Disetujui Kasubag Umum',
                    statusAdmin: data.approveAdmin,
                    detailIzin: data.keterangan_hadir,
                    catatanKasum:data.catatan_kasum,
                    tanggalPengajuan:data.tanggal,
                    fotoProfile:data.fotoProfile,
                    fotoSakit: data.foto
                })

            }) 
            

        } catch (error) {
            console.log(error, "error get absensi")   
        }
    }    

    const handlerProses = async()=>{

        setProses(false)

        try {

            const params ={
                startDate: startCal,
                endDate: endCal,
            }

            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.post(base_url+`/absen/approveAdmin/${idAbsen}`, params,{headers:{
                Authorization: `Bearer ${myToken}`
            }})            

            if (response.status == 200) {
                setModalSuccess(true)
            }

        } catch (error) {
            console.log(error,"<--- error handler hadir")            
        }        

    }

    // selectimage
    const [fileFoto,setFileFoto] = useState()
    const [imgFoto, setImgFoto] = useState()
    
    const selectImageFoto = async () => {


        try{

            const doc =  await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            })

            setFileFoto(doc)
            setImgFoto(doc.uri)


        }catch(err){
            if(DocumentPicker.isCancel(e)){

            }else{

            }
        }
    }



    // calender
    const CUSTOM_LOCALE = {
        monthNames: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'October',
        'November',
        'Desember',
        ],
        dayNames: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        today: 'Hari Ini',
        year: '', // letter behind year number -> 2020{year}
    }
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PENGAJUAN</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Detail Pengajuan</Text>
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


                    <Text style={{ color: "#000", fontSize: 18, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Detail Data Pengajuan</Text>

                    <View style={{alignItems:"center"}}>
                        <View style={{flexDirection:"row", marginBottom:15}}>
                            <View style={{width:"35%", minHeight:25, justifyContent:"center", marginRight:10}}>
                                <Image source={formProfile.fotoProfile !== null ? {uri:formProfile.fotoProfile}: PasFoto} style={{width:"100%", height:190}}/>
                            </View>
                            
                            <View style={{width:"55%", minHeight:25}}>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Nama :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{formProfile.nama}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Jabatan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{formProfile.jabatan}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Status Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{formProfile.status}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Pengajuan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{formProfile.tanggalPengajuan}</Text>
                                </View>
                                <View>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Status Pengajuan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Telah Disetujui Kasubag Umum</Text>
                                </View>
                                <View>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Acc Admin :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{formProfile.statusAdmin ? 'Disetujui Admin':'Belum Diproses'}</Text>
                                </View>                                
                            </View>
                        </View>
                    </View>

                    <View style={formProfile.status=="Sakit"?{display:"flex"}:{display:"none"}}>
                        <View style={{flexDirection:"row", marginBottom:5}}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto Surat Keterangan Sakit :</Text>
                        </View>
                        <View style={{alignItems:"center", marginBottom:20}}>
                            <View style={{width:"90%", height:200, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}}>
                                <Image source={ExSakit} style={{width:"100%", height:"100%"}}/>
                            </View>
                        </View>
                    </View>

                    <View style={{marginBottom:15}}>
                        <View style={{justifyContent:'space-between',  flexDirection:'row'}}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail {formProfile.status} :</Text>
                            <TouchableOpacity style={{ backgroundColor:'#b02749', paddingHorizontal:10, paddingVertical:5, borderRadius:5 }} onPress={()=>{ Linking.openURL(formProfile.fotoSakit) }}>
                                <Text style={{fontSize:12, fontWeight:'900', color:'white'}}>Lihat Surat</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", height:100, borderBottomWidth:0.5, borderColor:"black",}}>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"500"}}>{formProfile.detailIzin}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Catatan :</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", height:100, borderBottomWidth:0.5, borderColor:"black",}}>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"500"}}>{formProfile.catatanKasum}</Text>
                            </View>
                        </View>
                    </View>

                    {

                        formProfile.statusAdmin !== 1? 
                        <>
                        <View style={{marginTop:30}}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:0, marginLeft:15}}>Waktu Izin :</Text>
                            <View style={{width:"100%", height:350}}>
                                <Calendar
                                    locale={CUSTOM_LOCALE}
                                    startDate=""
                                    endDate=""
                                    onChange={({ startDate, endDate }) => {setStartCal(startDate), setEndCal(endDate)}}
                                />
                            </View>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={()=> setProses(true)}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Proses Pengajuan</Text>
                            </TouchableOpacity>
                        </View>
                        </>
                        :
                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#e3e3e3", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"#e3e3e3"}} onPress={()=> navigation.goBack()}>
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Kembali</Text>
                            </TouchableOpacity>
                        </View>                        
                    }

                    
                </View>
            </View>

            <ReactNativeModal isVisible={proses} onBackdropPress={() => setProses(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", minHeight: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setProses(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:-10, alignItems:"center", marginBottom:10}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Proses kehadiran</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                      <View style={{flexDirection:"row"}}>
                          <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={() => setProses(false)}>
                              <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={{width:120, height:40, backgroundColor:"#39a339", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={handlerProses}>
                              <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Ya</Text>
                          </TouchableOpacity>
                      </View>     
                    </View>
                </View>
            </ReactNativeModal>

            {/* success */}
            <ReactNativeModal isVisible={modalSuccess} onBackdropPress={() => setModalSuccess(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                        <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, alignItems:"center", justifyContent:"center" }}>

                            <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Selamat! Pengajuan Berhasil Diproses</Text>
                            </View>
                            <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                                <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={() => {
                                        navigation.goBack()
                                        setModalSuccess(false)
                                    } }>
                                    <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
                                </TouchableOpacity>      
                            </View>
                        </View>
            </ReactNativeModal>
                
        </ScrollView>
    )
}

export default DetailDataPengajuan

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