import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import React, { useEffect,useState } from 'react'
import { AddImg, BackIcon, ExFoto, LgBappeda, CloseIcont } from '../../../assets/images'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import ReactNativeModal from 'react-native-modal'
import axios from 'axios'
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApiLink from '../../../assets/ApiHelper/ApiLink'
import { Circle } from 'react-native-animated-spinkit'


const Absensi = ({route, navigation}) => {
    const {kehadiran, latit, longtit, jarak, idAbsensi} = route.params
    console.log(jarak, "<==============jaraka meter")
    
    // const kehadiran=2
     const [cekStatus, setCekStatus] = useState(kehadiran)


    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // lokasi default user
    const myLa = Number(latit);
    const myLo = Number(longtit)

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
    const [modalStoreSakit, setModalStoreSakit] = useState(false)
    const [modalStoreIzin, setModalStoreIzin] = useState(false)


    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalLoad, setModalLoad] = useState(false)

    const [namaUser, setNamaUser] = useState('-')
    const [jabatanUser, setJabatanUser] = useState('-')

    useEffect(() => {
      
        getMyProfile()

    }, [navigation])


    
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
    const handlerHadir = async data =>{

        
        // setModalLoad(true)
        setModalStore(false)
        setModalStoreSakit(false)
        setModalStoreIzin(false)
        setModalLoad(true)

        try {
            const dataHadir ={
                status:'hadir',
                longitude: longtit,
                latitude: latit
            }

            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.post(base_url+"/absen/store", dataHadir,{headers:{
                Authorization: `Bearer ${myToken}`
            }})            
            setModalLoad(false)
            setModalSuccess(true)
        } catch (error) {
            console.log(error,"<--- error handler hadir")            
        }
    }

    
    const handlerKegiatan = async ()=>{

        setModalLoad(true)
        try{
            var formData = new FormData()

            if(kehadiran == 2){
                formData.append('foto',{ uri: fileKeterangan.uri, name: fileKeterangan.name, type: fileKeterangan.type })
                formData.append('status','hadir kegiatan')
                formData.append('keterangan_hadir',detail) 
                formData.append('longitude',myLo) 
                formData.append('latitude',myLa) 
            }
            else if(kehadiran == 3){
                formData.append('foto',{ uri: fileKeterangan.uri, name: fileKeterangan.name, type: fileKeterangan.type })
                formData.append('status','Sakit')
                formData.append('keterangan_hadir',detail) 
            }
            else {
                formData.append('status','Izin')
                formData.append('keterangan_hadir',detail) 
            }           
                       

            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.post(base_url+"/absen/store", formData,{headers:{
                Authorization: `Bearer ${myToken}`,
                Accept: 'application/json',
                'Content-Type': `multipart/form-data`
            }})            
        
            console.log(response.data,"<--- post ")
            
            setModalLoad(false)
            setModalSuccess(true)

        } catch(error){
            console.log(error, "<= eroro")
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
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran</Text>
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
                            <Image source={ExFoto} style={{width:"100%", height:190}}/>
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
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>
                                        {kehadiran==1 ? "Hadir" : ""}
                                        {kehadiran==2 ? "Hadir Kegiatan" : ""}
                                        {kehadiran==3 ? "Sakit" : ""}
                                        {kehadiran==4 ? "Izin" : ""}
                                    </Text>
                                </View>
                                {/* <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Lokasi Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Kantor Walikota Pekanbaru</Text>
                                </View> */}
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Masuk :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{localeTime} wib</Text>
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

                    

                    <View style={kehadiran==1 ? {alignItems:"center"} : {display:"none"}}>
                        {jarak > 200 ? 
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#fcc419", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={()=>navigation.navigate('MainApp')}>
                                <Text style={{fontWeight:'700', color:"black",  fontSize:15, }}>Harap Absensi Di Ruangan Kerja</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={handlerHadir}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                            </TouchableOpacity>
                        }
                    </View>

                    
                    <View style={kehadiran==2 ? {display:"flex"} : {display:"none"}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto Kegiatan :</Text>
                        <View style={{alignItems:"center", marginBottom:20}}>
                            <TouchableOpacity style={{width:"90%", height:200, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}} onPress={selectImage}>
                                {imgKeterangan ? <Image source={gambarKeterangan} style={{width:"100%", height:"100%", borderRadius:15}}/> : <Image source={AddImg} style={{width:100, height:100}}/>}
                                
                            </TouchableOpacity>
                        </View>

                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail Kegiatan :</Text>
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
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={() => { setModalStore(true)}}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={kehadiran==3 ? {display:"flex"} : {display:"none"}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto Surat Keterangan Sakit :</Text>
                        <View style={{alignItems:"center", marginBottom:20}}>
                            <TouchableOpacity style={{width:"90%", height:200, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}} onPress={selectImage}>
                                {imgKeterangan ? <Image source={gambarKeterangan} style={{width:"100%", height:"100%", borderRadius:15}}/> : <Image source={AddImg} style={{width:100, height:100}}/>}
                            </TouchableOpacity>
                        </View>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail Sakit :</Text>
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
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={() => { setModalStore(true)}}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={kehadiran==4 ? {display:"flex"} : {display:"none"}}>

                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail Izin :</Text>
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
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={() => { setModalStoreIzin(true)}}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* response absen store*/}

                    <ReactNativeModal isVisible={modalStore} onBackdropPress={() => setModalStore(false)}   style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                        <View style={{ width: "90%", height: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10, }}>

                            <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={()=>{setModalStore(false)}} >
                                <Image source={CloseIcont} style={{width:30, height:30}}/>
                            </TouchableOpacity>

                            {fileKeterangan||detail ?
                                <View>
                                    <View style={{width:"100%", marginTop:10, alignItems:"center",}}>
                                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Lanjut Absensi ?</Text>
                                        <Text>Pastikan Data Sudah Benar</Text>
                                    </View>
                                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={handlerKegiatan}>
                                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ya ! Lanjutkan</Text>                                        
                                        </TouchableOpacity>
                                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#d9dedb", marginTop:10, alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={()=>{setModalStore(false)}} >
                                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Batal</Text>                                        
                                        </TouchableOpacity>                                    
                                    </View>
                                </View>
                            :
                                <View style={{marginTop:30}}>
                                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Data Anda Tidak Lengkap</Text>
                                        <Text>Harap Lengkapi Semua Data Kehadiran</Text>
                                    </View>
                                    <View style={{width:"100%", alignItems:"center",  marginTop:5,}}>
                                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#fcc419", marginTop:10, alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={()=>{setModalStore(false)}} >
                                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Lengkapi</Text>                                        
                                        </TouchableOpacity>                                    
                                    </View>
                                </View>
                            }

                            
                        </View>
                    </ReactNativeModal>

                    {/* response absen sakit*/}

                    <ReactNativeModal isVisible={modalStoreSakit} onBackdropPress={() => setModalStoreSakit(false)}   style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                        <View style={{ width: "90%", height: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10, }}>

                            <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={()=>{setModalStoreSakit(false)}} >
                                <Image source={CloseIcont} style={{width:30, height:30}}/>
                            </TouchableOpacity>

                            {fileKeterangan||detail ?
                                <View>
                                    <View style={{width:"100%", marginTop:10, alignItems:"center",}}>
                                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Lanjut Absensi ?</Text>
                                        <Text>Pastikan Data Sudah Benar</Text>
                                    </View>
                                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={handlerKegiatan}>
                                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ya ! Lanjutkan</Text>                                        
                                        </TouchableOpacity>
                                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#d9dedb", marginTop:10, alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={()=>{setModalStoreSakit(false)}} >
                                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Batal</Text>                                        
                                        </TouchableOpacity>                                    
                                    </View>
                                </View>
                            :
                                <View style={{marginTop:30}}>
                                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Data Anda Tidak Lengkap</Text>
                                        <Text>Harap Lengkapi Semua Data Kehadiran</Text>
                                    </View>
                                    <View style={{width:"100%", alignItems:"center",  marginTop:5,}}>
                                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#fcc419", marginTop:10, alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={()=>{setModalStoreSakit(false)}} >
                                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Lengkapi</Text>                                        
                                        </TouchableOpacity>                                    
                                    </View>
                                </View>
                            }

                            
                        </View>
                    </ReactNativeModal>

                    {/* response absen IZIN*/}

                    <ReactNativeModal isVisible={modalStoreIzin} onBackdropPress={() => setModalStoreIzin(false)}   style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                        <View style={{ width: "90%", height: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10, }}>

                            <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={()=>{setModalStoreIzin(false)}} >
                                <Image source={CloseIcont} style={{width:30, height:30}}/>
                            </TouchableOpacity>

                            {detail ?
                                <View>
                                    <View style={{width:"100%", marginTop:10, alignItems:"center",}}>
                                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Lanjut Absensi ?</Text>
                                        <Text>Pastikan Data Sudah Benar</Text>
                                    </View>
                                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={handlerKegiatan}>
                                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ya ! Lanjutkan</Text>                                        
                                        </TouchableOpacity>
                                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#d9dedb", marginTop:10, alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={()=>{setModalStoreIzin(false)}} >
                                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Batal</Text>                                        
                                        </TouchableOpacity>                                    
                                    </View>
                                </View>
                            :
                                <View style={{marginTop:30}}>
                                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Data Anda Tidak Lengkap</Text>
                                        <Text>Harap Lengkapi Semua Data Kehadiran</Text>
                                    </View>
                                    <View style={{width:"100%", alignItems:"center",  marginTop:5,}}>
                                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#fcc419", marginTop:10, alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={()=>{setModalStoreIzin(false)}} >
                                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Lengkapi</Text>                                        
                                        </TouchableOpacity>                                    
                                    </View>
                                </View>
                            }

                            
                        </View>
                    </ReactNativeModal>

                    {/* modal succes */}
                    <ReactNativeModal isVisible={modalSuccess} onBackdropPress={() => setModalSuccess(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                        <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, alignItems:"center", justifyContent:"center" }}>

                            {/* <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => navigation.navigate('MainApp', {agendaValue:1})}>
                                <Image source={CloseIcont} style={{width:30, height:30}}/>
                            </TouchableOpacity> */}
                            <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Selamat ! Absensi Anda Berhasil.</Text>
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

export default Absensi

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