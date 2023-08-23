import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { AddImg, BackIcon, CloseIcont, DeletedIcont, DotAksi, EditIcont, ExFoto, ExSakit, LgBappeda, PasFoto } from '../../assets/images';
import ReactNativeModal from 'react-native-modal';
import Pdf from 'react-native-pdf';
import { Circle } from 'react-native-animated-spinkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { Grid  } from 'react-native-animated-spinkit'
import { FlatList } from 'react-native';


const DetailLaporanKasum = ({route, navigation}) => {
    const {params} =route.params

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
    const [modalLoad, setModalLoad] = useState(false)

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const [isModalVisible2, setModalVisible2] = useState(false);

    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    }

    const [isModalVisible3, setModalVisible3] = useState(false);

    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    }

    const [showContent, setShowContent] = useState(0)
    const toggleContent = (e)=>{
        setShowContent(e);
    }

    const [modaAlertPengajuan, setModaAlertPengajuan] = useState(false)
    const UpdatePengajuan = () => {
        setModalLoad(true)
        setModalLoad(false)
        navigation.navigate("MainKasum")
    }

    
    const [myProfile, setMyProfile] = useState({
        nama:null,
        jabatan:null,
        foto:null,        
    })
    const [myDetail, setMyDetail] = useState([]);

    const [fileDoc, setFileDoc] = useState()
    const [myCatatan, setMyCatatan] = useState([])

    const isFocused = useIsFocused();
    const base_url = ApiLink+'/api'
    
    useEffect(() => {
      
        if (isFocused) {
            handlerGetKegiatan()
            handlerGetProfile()
            handlerGetDocument()
        }

    }, [navigation, isFocused])


    const handlerGetProfile = async ()=>{
        // setLoadHistory(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    
            const target_url =`${base_url}/user/profile?id=${params.id_user}`


            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {
                    setMyProfile({
                        nama:response.data.nama,
                        jabatan: response.data.jabatan,
                        foto: response.data.URL
                    })
            }

        } catch (error) {
            console.log(error, "error get my profile")   
        }        
    }        
    const handlerGetKegiatan = async ()=>{
        // setLoadHistory(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');  

            const target_url =`${base_url}/laporan/listKegiatan`            
            const params_url =JSON.stringify(params).replace(/:/g,'=').replace(/,/g,'&').replace(/"|{|}/g,'')

            const final_url = target_url+'?'+params_url

            const response = await axios.get(final_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {

                setMyDetail(response.data)
            }

        } catch (error) {
            console.log(error, "error get kegiatan")   
        }        
    }    

    const handlerGetDocument = async ()=>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');  

            const target_url =`${base_url}/document?id_dokument=${params.id_dokumen}`            

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {

                if (response.data.catatan) {
                    setMyCatatan(JSON.parse(response.data.catatan))
                }else{

                    var checkCatatan = await AsyncStorage.getItem('tmpCatatan')

                    if (!checkCatatan && myCatatan.length == 0) {
    
                        let tmp = JSON.parse(response.data.catatan).join("%ry%")
                        await AsyncStorage.setItem('tmpCatatan',tmp)  

                    } else{
                        setMyCatatan(checkCatatan.split("%ry%"))
                    }                    
                }

            }

        } catch (error) {
            console.log(error, "error get kegiatan")   
        }        
    }    
    const deleteItemArr = async (id)=>{
        toggleContent(0)

        let tmpData = myCatatan
        tmpData.splice(id,1)
        let saveNew = await AsyncStorage.setItem('tmpCatatan', tmpData.join("(%ry%)"))

        
    }
    const rowCatatan = (item, index) =>{

        return(
            <View style={{width:"90%", borderBottomWidth:0.5, borderBottomColor:"black"}}>
            <View style={{flexDirection:"row", backgroundColor:"#fff", marginTop:10, minHeight:50, marginBottom:15}}>
                <View style={{width:"10%", minHeight:25,  alignItems:"center"}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{index+1}.</Text>
                </View>
                <View style={{width:"80%", minHeight:25,}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textAlign:"justify"}}>{item}</Text>
                </View>
                <View style={{width:"10%", minHeight:25, alignItems:"center",}}>
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
                                <TouchableOpacity style={{width:50, height:20, backgroundColor:"#fcc419", borderRadius:10, marginBottom:5, alignItems:"center", justifyContent:"center"}} onPress={ () => navigation.navigate("EditCatatan", {indexData:index}) }>
                                    <Text style={{fontWeight:'700', color:"black", fontSize:10}}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:50, height:20, backgroundColor:"red", borderRadius:10, alignItems:"center", justifyContent:"center"}} onPress={()=>{ deleteItemArr(index)}}>
                                    <Text style={{fontWeight:'700', color:"white", fontSize:10}}>Hapus</Text>
                                </TouchableOpacity>
                            </View>
                </View>
            </View>
            </View>            
        )
    }

    const tabelKegiatan = () =>{

        return(
            <View>
                <View style={{flexDirection:"row", backgroundColor:"#d9dcdf"}}>
                    <View style={{width:"27%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Hari/Tanggal</Text>
                    </View>
                    <View style={{width:"40%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Kegiatan</Text>
                    </View>
                    <View style={{width:"33%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Detail</Text>
                    </View>
                </View>
                <View style={{maxHeight:WindowHeight*0.3}}>
                    <FlatList
                        data={myDetail}
                        renderItem={({ item,index }) => (
                            rowKegiatan(item,index)
                        )}

                        nestedScrollEnabled
                    />                            
                </View>
            </View>            
        )
    }

    const [formView, setFormView] = useState({
        kegiatan:null,
        uraian:null,
        foto:null
    })
    const handlerViewDetail =(data)=>{
        setModalVisible2(true)
        setFormView({
            kegiatan:data.kegiatan[0].judul_kegiatan,
            uraian:data.kegiatan[0].uraian_kegiatan,
            foto: data.kegiatan[0].foto
        })
    }

    const rowKegiatan = (item,index)=>{

        return(
            <View style={{flexDirection:"row", backgroundColor:"#FFF"}}>

                <View style={{width:"27%", minHeight:25, justifyContent:'center', borderWidth:0.5, borderColor:"#000", alignItems:'center'}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{item.hari}</Text>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{item.tanggal}</Text>                    
                </View>
                <View style={{width:"40%", minHeight:25, borderWidth:0.5, borderColor:"#000", padding:8 }}>
                    {
                        item.kegiatan.length > 0 &&
                            item.kegiatan.map((item2, index2)=>(

                                <View style={{flexDirection:'row'}}>
                                    <View>
                                        <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}>{index2+1}.</Text>
                                    </View>
                                    <View>
                                        <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}>{item2.judul_kegiatan}</Text>
                                    </View>
                                </View>


                            ))                        
                    }
                    {
                        item.kegiatan.length == 0 &&
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}> -</Text>
                        </View>
                    }
                </View>
                <View style={{width:"33%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", paddingVertical:5, }}>
                <View style={{flexDirection:'row', paddingLeft:3, flexDirection:'column' }}>

                            <View style={{flexDirection:'row', alignSelf:'center'}}>

                                <TouchableOpacity style={{width:60, height:20, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15}} onPress={()=>{handlerViewDetail(item)}}>
                                    <Text style={{fontWeight:'700', color:"white", fontSize:12}}>Detail</Text>
                                </TouchableOpacity>

                            </View>                            

                    {
                        item.kegiatan.length == 0 &&
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}> -</Text>
                        </View>
                    }                    
                    </View>
                </View>                
            </View>    
        )
    
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>LAPORAN</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Pengajuan Laporan THL-IT</Text>
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
                    <Text style={{ color: "#000", fontSize: 18, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Pengajuan Laporan {getStrMonth} {getYear}</Text>

                    <View style={{alignItems:"center"}}>
                        <View style={{flexDirection:"row", marginBottom:15}}>
                            <View style={{width:"35%", minHeight:25, justifyContent:"center", marginRight:10}}>
                            <Image source={myProfile.foto ? {uri:myProfile.foto}:PasFoto} style={{width:"100%", height:190}}/>
                            </View>
                            <View style={{width:"55%", minHeight:25,}}>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Nama :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{myProfile.nama}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Jabatan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{myProfile.jabatan}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Hadir :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>20 Hari</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Sakit & Izin :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>8 Hari</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Tidak Hadir :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>2 Hari</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:"row", marginBottom:5}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail Kegiatan :</Text>
                        <TouchableOpacity style={{width:100, height:20, backgroundColor:"#c21532", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:120}} onPress={toggleModal}>
                            <Text style={{fontWeight:'700', color:"white", fontSize:12}}>PDF</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:"100%",marginBottom:15}}>
                        {
                            tabelKegiatan()
                        }
                    </View>

                    {/* {
                        myDetail.dokumen == '' ?<Text style={{alignSelf:'center', color:'red', fontWeight:'600'}}>Laporan Belum Diupload</Text>:readLaporan()
                    } */}

                    <View style={{flexDirection:"row", marginBottom:10, marginTop:20 }}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Catatan :</Text>
                        <TouchableOpacity style={{width:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:160}} onPress={() => navigation.navigate('TambahCatatan')}>
                            <Text style={{fontWeight:'700', color:"white", fontSize:12}}>Tambah</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{width:"100%", marginBottom:5, alignItems:"center", }}>
                        
                        {
                            myCatatan.length > 0 &&
                            myCatatan.map((item,index)=>(
                                rowCatatan(item, index)
                            ))
                        }
                    </View>
                    
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={() => setModaAlertPengajuan(true)}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Terima Laporan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#a8323c", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={() => setModaAlertPengajuan(true)}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Tolak Laporan</Text>
                        </TouchableOpacity>
                    </View>                    
                </View>

                <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <Circle size={100} color="white"/>
                </ReactNativeModal>

                <ReactNativeModal isVisible={isModalVisible} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalVisible(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <View style={{ width: "95%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                        <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal}>
                            <Image source={CloseIcont} style={{width:30, height:30}}/>
                        </TouchableOpacity>
                        <View style={{width:"100%", marginTop:-10, alignItems:"center", marginBottom:20,}}>
                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Laporan Bulan {getStrMonth} {getYear}</Text>
                        </View>
                        <View>
                            <Pdf
                                trustAllCerts={false}
                                source={require('../../assets/file/exFile.pdf')}
                                style={{width:"100%", height:450}}
                                // renderActivityIndicator={loadSpinner}
                            />
                        </View>
                    </View>
                </ReactNativeModal>

                <ReactNativeModal isVisible={isModalVisible2} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalVisible(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <View style={{ width: "95%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                        <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal2}>
                            <Image source={CloseIcont} style={{width:30, height:30}}/>
                        </TouchableOpacity>
                        <View style={{width:"100%", marginTop:-10, alignItems:"center", marginBottom:20}}>
                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Detail Kegiatan</Text>
                        </View>

                        <View>
                            <View style={{marginBottom:20}}>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Kegiatan:</Text>
                                <View style={{alignItems:"center"}}>
                                    <View style={{width:"90%", minHeight:30, borderColor:"black", borderBottomWidth:0.5, }}>
                                        <Text style={{color:"#000", fontSize:10, fontWeight:"500", textAlign:"justify"}}>{formView.kegiatan}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{marginBottom:20}}>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Uraian Kegiatan:</Text>
                                <View style={{alignItems:"center"}}>
                                    <View style={{width:"90%", minHeight:100, borderBottomWidth:0.5, borderColor:"black", }}>
                                        <Text style={{color:"#000", fontSize:10, fontWeight:"500", textAlign:"justify"}}>{formView.uraian}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{marginBottom:20}}>
                                <View style={{flexDirection:"row", marginBottom:10,  }}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto Kegiatan :</Text>
                                    <TouchableOpacity style={{width:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:100}}>
                                        <Text style={{fontWeight:'700', color:"white", fontSize:12}}>Download</Text>
                                    </TouchableOpacity>
                                    
                                </View>
                                <View style={{alignItems:"center"}}>
                                    <View style={{width:"90%", height:180, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}}>
                                        <Image source={formView.foto !== null ? {uri:formView.foto}:AddImg} style={{width:"100%", height:170}}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ReactNativeModal>

                {/* modal hapus */}
                <ReactNativeModal isVisible={isModalVisible3} style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <View style={{ width: "90%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                        <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal3}>
                            <Image source={CloseIcont} style={{width:30, height:30}}/>
                        </TouchableOpacity>
                        <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Detail Catatan Anda</Text>
                        </View>
                        
                        <View style={{marginBottom:20, borderBottomWidth:0.5, borderColor:"black"}}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:10}}>Catatan :</Text>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginBottom:10, marginLeft:20,}}>Kehadiran</Text>
                        </View>

                        <View style={{flexDirection:"row",justifyContent:"center"}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={toggleModal3}>
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={toggleModal3}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Hapus</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ReactNativeModal>

                {/* modal confirm aksi */}
                <ReactNativeModal isVisible={modaAlertPengajuan} onBackdropPress={() => setModaAlertPengajuan(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                        <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModaAlertPengajuan(false)}>
                            <Image source={CloseIcont} style={{width:30, height:30}}/>
                        </TouchableOpacity>
                        <View style={{width:"100%", marginTop:-10, alignItems:"center"}}>
                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Terima Laporan ?</Text>
                        </View>
                        <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                            <View style={{flexDirection:"row"}}>
                                <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={() => setModaAlertPengajuan(false)}>
                                    <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{width:120, height:40, backgroundColor:"#39a339", borderRadius:10, justifyContent:"center", alignItems:"center",}} onPress={UpdatePengajuan}>
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

export default DetailLaporanKasum

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