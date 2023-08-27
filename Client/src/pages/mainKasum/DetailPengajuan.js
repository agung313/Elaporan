import { StyleSheet,Linking, TextInput, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { BackIcon, CloseIcont, ExFoto, ExSakit, LgBappeda } from '../../assets/images'
import ReactNativeModal from 'react-native-modal';
import { Circle } from 'react-native-animated-spinkit';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApiLink from '../../assets/ApiHelper/ApiLink';

const DetailPengajuan = ({route ,navigation}) => {
    const {idPengajuan, idUser} = route.params

    useEffect(() => {
        if (isFocused) {
            getDetail()
        }
    }, [navigation, isFocused])

    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // input
    const [detail, setDetail] = useState("Saya mengalami sakit diare, sehingga disarankan dokter untuk beristirahat selama tiga hari")

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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalLoad, setModalLoad] = useState(false)
    const [pengajuan, setPengajuan] = useState()

    const [modaAlertPengajuan, setModaAlertPengajuan] = useState(false)

    const isFocused = useIsFocused();
    const base_url= ApiLink+'/api'
    
    

    const tolakPengajuan=()=>{
        setMyForm({...myForm, ['isApprove']:'ditolak'})
        setModaAlertPengajuan(true)
    }

    const setujuiPengajuan=()=>{
        setMyForm({...myForm, ['isApprove']:'diterima'})
        setModaAlertPengajuan(true)
    }

    const UpdatePengajuan = async () => {

            setModalLoad(true)
        // console.log(myForm)
        try {

            const myToken = await AsyncStorage.getItem('AccessToken');    
            const target_url = base_url+`/absen/acceptIzin/${idPengajuan}`

            const response = await axios.post(target_url,myForm,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{
                setModalLoad(false)
                setModalSuccess(true)
                // navigation.navigate("MainKasum")
            })

        } catch (error) {
            console.log(error.response.data,"<--- error handler update pengajuan")            
        }


    }

    const[dataDetail, setDataDetail] = useState({
        nama:'-',
        jabatan:'-',        
        statusKehadiran: "-",
        statusPengajuan:'-',
        detail:'-',
        tanggalPengajuan:"-",
        keterangan:'-',
        isApprove: 0,
        foto:'',
        fotoProfile:''
    })

    const [myForm, setMyForm] = useState({
        catatan:'-',
        isApprove:null
    })

    const getDetail = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url = `${base_url}/absen?detail=true&id=${idPengajuan}`
            console.log(target_url,"<--- url")

            await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{     

                const data = res.data.data
                setDataDetail({
                    nama:data.nama,
                    jabatan:data.jabatan,
                    statusKehadiran:data.status,
                    tanggalPengajuan:data.tanggal,
                    statusPengajuan:data.isApprove,
                    keterangan:data.keterangan_hadir,
                    foto:data.foto,
                    fotoProfile: data.fotoProfile
                })                   

                setMyForm({...myForm, ['catatan']:data.catatan_kasum})                
            }) 
            

        } catch (error) {
            console.log(error, "error get absensi")   
        }
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
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Detail Pengajuan THL-IT</Text>
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
                            <Image source={dataDetail.fotoProfile =='' ?ExFoto:{uri:dataDetail.fotoProfile}} style={{width:"100%", height:190}}/>
                            </View>
                            <View style={{width:"55%", minHeight:25,}}>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Nama :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{dataDetail.nama}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Jabatan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{dataDetail.jabatan}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Status Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{dataDetail.statusKehadiran}</Text>
                                </View>
                                {/* <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Lokasi Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Kantor Walikota Pekanbaru</Text>
                                </View> */}
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Pengajuan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{dataDetail.tanggalPengajuan}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Status Pengajuan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textTransform:'capitalize'}}>{dataDetail.statusPengajuan }</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={dataDetail.statusKehadiran=="Sakit"?{display:"flex"}:{display:"none"}}>
                            <View style={{flexDirection:"row", marginBottom:5}}>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto Surat Keterangan Sakit :</Text>
                                <TouchableOpacity style={{width:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:40}} onPress={()=>{ Linking.openURL(dataDetail.foto)}}>
                                    <Text style={{fontWeight:'700', color:"white", fontSize:12}}>Download Foto</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems:"center", marginBottom:20}}>
                                <View style={{width:"90%", height:200, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}}>
                                    <Image source={{uri:dataDetail.foto}} style={{width:"100%", height:"100%"}}/>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail {dataDetail.status} :</Text>
                            <View style={{alignItems:"center"}}>
                                <View style={{width:"90%", height:100, borderBottomWidth:0.5, borderColor:"black",}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"500"}}>{dataDetail.keterangan}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={{marginBottom:20, marginTop:20}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Catatan :</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", minHeight:100, borderBottomWidth:0.5, borderColor:"black", }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    value={myForm.catatan}
                                    keyboardType= "default"
                                    onChangeText={(text) => setMyForm({...myForm,['catatan']:text})}
                                    style={{ color: "#000" }}
                                    multiline
                                />
                            </View>
                        </View>
                        </View>

                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#d9dcdf", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:0,}} onPress={()=>{
                                tolakPengajuan()

                            }} >
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Tolak Pengajuan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={()=>{
                                        setujuiPengajuan()
                                        }}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Setujui Pengajuan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <Circle size={100} color="white"/>
                </ReactNativeModal>

                {/* modal success */}
                <ReactNativeModal isVisible={modalSuccess} onBackdropPress={() => setModalSuccess(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                        <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalSuccess(false)}>
                            <Image source={CloseIcont} style={{width:30, height:30}}/>
                        </TouchableOpacity>
                        <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Selamat !</Text>
                            <Text> Pengajuan Berhasil Diproses</Text>
                        </View>
                        <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                            <View style={{flexDirection:"row"}}>

                                <TouchableOpacity style={{width:120, height:40, backgroundColor:"#39a339", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={()=>{setModalSuccess(false), navigation.goBack()}}>
                                    <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Ok</Text>
                                </TouchableOpacity>
                            </View>     
                        </View>
                    </View>
                </ReactNativeModal>

                {/* modal approve */}
                <ReactNativeModal isVisible={modaAlertPengajuan} onBackdropPress={() => setModaAlertPengajuan(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                        <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModaAlertPengajuan(false)}>
                            <Image source={CloseIcont} style={{width:30, height:30}}/>
                        </TouchableOpacity>
                        <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>{pengajuan==false ? "Tolak" : "Setujui"} Pengajuan ?</Text>
                        </View>
                        <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                            <View style={{flexDirection:"row"}}>
                                <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={() => setModaAlertPengajuan(false)}>
                                    <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={pengajuan==false ? {width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center",}:{width:120, height:40, backgroundColor:"#39a339", borderRadius:10, justifyContent:"center", alignItems:"center",}} onPress={UpdatePengajuan}>
                                    <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Ya</Text>
                                </TouchableOpacity>
                            </View>     
                        </View>
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    )
}

export default DetailPengajuan

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