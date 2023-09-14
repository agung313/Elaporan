import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { BackIcon,AddImg, CloseIcont, ExFoto, ExSakit, LgBappeda, PasFoto } from '../../assets/images';
import { PieChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import ReactNativeModal from 'react-native-modal';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { Grid  } from 'react-native-animated-spinkit'
import { FlatList } from 'react-native';
import { Circle } from 'react-native-animated-spinkit';

const DetailThlIt = ({route, navigation}) => {

    const {idUser} =route.params


    const [bulan, setBulan] = useState()
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

    const [isModalVisible2, setModalVisible2] = useState(false);

    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    }

    const [isModalVisible3, setModalVisible3] = useState(false);

    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    }

    const isFocused = useIsFocused();
    const base_url = ApiLink+'/api'  
    
    const [myDetail, setMyDetail] = useState([])


    const [aktifBulan, setAktifBulan] = useState(monthUsed)
    const getStrAktifMonth = namaBulan[aktifBulan]

    const [aktifTahun, setAktifTahun] = useState(getYear)
    const [myProfile, setMyProfile] = useState({
        nama:null,
        jabatan:null,
        foto:null,
        hadir:0,
        izinSakit:0,
        izin:0,
        sakit:0,
        alfa:0
    })    

    const [modalLoad, setModalLoad] = useState(false)


    useEffect(() => {
        handlerGetProfile()
        handlerGetKegiatan()
        handlerGetDocument()
    
    }, [navigation, isFocused])
    
    const [fileDoc, setFileDoc] = useState()

    const handlerGetDocument = async ()=>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');  

            const target_url =`${base_url}/document?id_user=${idUser}&bulan=${aktifBulan}&tahun=${aktifTahun}`            

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
            // console.log(response.data, "<<<<< dataaaa");

            if (response.status == 200) {
                if (response.data.length >0) {
                    setFileDoc(response.data[0].URL)                    
                }
            }

        } catch (error) {
            console.log(error, "error get document")   
        }        
    }    

    const handlerGetProfile = async ()=>{
        // setLoadHistory(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    
            const target_url =`${base_url}/user/profile?id=${idUser}&bulan=${aktifBulan}&tahun=${aktifTahun}`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
            console.log(target_url);
            if (response.status == 200) {

                    setMyProfile({
                        nama:response.data.nama,
                        jabatan: response.data.jabatan,
                        foto: response.data.URL,
                        hadir: response.data.totalHadir,
                        izinSakit: response.data.totalIzin+response.data.totalSakit,
                        izin:response.data.totalIzin,
                        sakit: response.data.totalSakit,
                        alfa: response.data.totalTidakHadir
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
            const params_url = `bulan=${aktifBulan}&tahun=${aktifTahun}&id_user=${idUser}`
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
    
    const rowKegiatan = (item,index)=>{

        return(
            <View style={{flexDirection:"row", backgroundColor:"#FFF"}}>

                <View style={{width:"27%", minHeight:25, justifyContent:'center', borderWidth:0.5, borderColor:"#000", alignItems:'center'}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textAlign:"center"}}>{item.hari}</Text>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textAlign:"center"}}>{item.tanggal}</Text>                    
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

    const [formView, setFormView] = useState({
        kegiatan:null,
        uraian:null,
        foto:null
    })
    const [modalDetail, setModalDetail] = useState(false)
    const handlerViewDetail =(data)=>{
        setModalDetail(true)
        setFormView({
            kegiatan:data.kegiatan[0].judul_kegiatan,
            uraian:data.kegiatan[0].uraian_kegiatan,
            foto: data.kegiatan[0].foto
        })
    }

    // bar persentase
    const dataaa = [
        {
            name: "Hadir",
            population: myProfile.hadir,
            color: "#39a339",
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Sakit",
            population: myProfile.sakit,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Izin",
            population: myProfile.izin,
            color: "#0060cb",
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Tidak Hadir",
            population:  myProfile.alfa,
            color: "#F00",
            legendFontColor: "#000",
            legendFontSize: 12
        },
    ];

    const chartConfigg = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>DETAIL ASN</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran dan Laporan</Text>
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

                    <View style={{justifyContent:"flex-end", marginBottom:10, flexDirection:"row" }}>
                        <TouchableOpacity style={{width:100, height:20, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginRight:10}} onPress={toggleModal}>
                            <Text style={{color:"#fff", fontSize:12, fontWeight:"600"}}>{namaBulan[aktifBulan]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15}} onPress={toggleModal2}>
                            <Text style={{color:"#fff", fontSize:12, fontWeight:"600"}}>Laporan</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ color: "#000", fontSize: 16, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Detail Kehadiran Bulan {getStrAktifMonth} {aktifTahun}</Text>

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
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{myProfile.hadir} Hari</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Sakit & Izin :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{myProfile.sakit} Hari Sakit / {myProfile.izin} Hari Izin</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Tidak Hadir :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{myProfile.alfa} Hari</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Persentase Kehadiran :</Text>
                    </View>
                    <PieChart
                        data={dataaa}
                        width={WindowWidth*0.8}
                        height={220}
                        chartConfig={chartConfigg}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 0]}
                        // absolute
                    />

                    <View style={{width:"100%",marginBottom:15}}>
                        {
                            tabelKegiatan()
                        }
                    </View>
                </View>
            </View>
            {/* pilih bulan aktif */}
            <ReactNativeModal isVisible={isModalVisible} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalVisible(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Silakan Pilih Bulan Laporan</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignItems:"center", width:"50%"}}>
                            <Picker
                                selectedValue={aktifBulan}
                                onValueChange={(itemValue, itemIndex) => 
                                    setAktifBulan(itemValue)
                                    // console.log(itemValue)
                                }
                                style={{ width:"90%", height:20, borderRadius: 50,  fontWeight: "bold", color:"#000", backgroundColor: "#f3f3f3"}}
                                selectionColor={"#000"}
                            >
                                {
                                    namaBulan.map((item,index)=>(
                                        <Picker.Item label={item} value={index}/>
                                    ))
                                }
                            </Picker>
                        </View>
                        <View style={{alignItems:"center", width:"50%"}}>                        
                            <Picker
                                selectedValue={aktifTahun}
                                onValueChange={(itemValue, itemIndex) => 
                                    setAktifTahun(itemValue)
                                }
                                style={{ width:"90%", height:20, borderRadius: 50,  fontWeight: "bold", color:"#000", backgroundColor: "#f3f3f3"}}
                                selectionColor={"#000"}
                            >
                            
                                <Picker.Item label="2023" value="2023"/>
                                <Picker.Item label="2024" value="2024"/>
                                <Picker.Item label="2025" value="2025"/>
                            </Picker>                        
                        </View>
                    </View>

                    <View style={{width:"100%", alignItems:"center",  marginTop:55,}}>
                        <TouchableOpacity style={aktifBulan>0 ?  {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15} : {display:"none"}} onPress={()=>{
                            setModalVisible(false)
                            setModalLoad(true)
                            handlerGetKegiatan()
                            handlerGetProfile()
                            handlerGetDocument()
                            setModalLoad(false)
                         }}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Cek Kehadiran</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={isModalVisible2} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalVisible(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "95%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal2}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Laporan Bulan {namaBulan[aktifBulan]} {aktifTahun}</Text>
                    </View>
                    <View>
                        {
                            fileDoc ?
                                <Pdf
                                trustAllCerts={false}
                                source={{uri:fileDoc}}
                                style={{width:"100%", height:450}}
                                // renderActivityIndicator={loadSpinner}
                                />
                                :
                                <Text style={{textAlign:'center', color:'red'}}>Laporan Belum Diupload</Text>
                        }
                    </View>
                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={isModalVisible3} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalVisible(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "95%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal3}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Detail Kegiatan</Text>
                    </View>

                    <View>
                        <View style={{marginBottom:20}}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Kegiatan:</Text>
                            <View style={{alignItems:"center"}}>
                                <View style={{width:"90%", minHeight:30, borderColor:"black", borderBottomWidth:0.5, }}>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textAlign:"justify"}}>Kehadiran</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Uraian Kegiatan:</Text>
                            <View style={{alignItems:"center"}}>
                                <View style={{width:"90%", minHeight:100, borderBottomWidth:0.5, borderColor:"black", }}>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textAlign:"justify"}}>Kehadiran</Text>
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
                                <View style={{width:"90%", height:150, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}}>
                                    <Image source={ExSakit} style={{width:"100%", height:"100%"}}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={modalDetail} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalDetail(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <View style={{ width: "95%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                        <TouchableOpacity style={{alignItems:'flex-end'}} onPress={()=>{setModalDetail()}}>
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

            <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <Circle size={100} color="white"/>
            </ReactNativeModal>         
        </ScrollView>
    )
}

export default DetailThlIt

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