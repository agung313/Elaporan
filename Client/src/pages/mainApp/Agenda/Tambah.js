import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AddImg, BackIcon, CloseIcont, DeletedIcont, EditIcont, ExFoto, LgBappeda } from '../../../assets/images'
import ReactNativeModal from 'react-native-modal'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Circle } from 'react-native-animated-spinkit'
import ApiLink from '../../../assets/ApiHelper/ApiLink'

const Tambah = ({route, navigation}) => {

    const {idAbsensi, backNavigation} = route.params

    const base_url =ApiLink+"/api"
    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // input
    const [detail, setDetail] = useState()
    const [uraian, setUraian] = useState()

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
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalLoad, setModalLoad] = useState(false)
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handlerStore = async data =>{
        setModalLoad(true)
        try {

            const myToken = await AsyncStorage.getItem('AccessToken');    
            const params ={
                judul_kegiatan: detail,
                uraian_kegiatan: uraian,
                id_absensi: idAbsensi
            }
            const response = await axios.post(base_url+"/laporan/store",params,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{
                setModalLoad(false)
                setModalSuccess(true)
            })



        } catch (error) {
            console.log(error,"<--- error handler hadir")            
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>AGENDA</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Tambah Kegiatan</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>
            <View style={{alignItems:"center", marginBottom:30}}>
                <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10, }}>
                    <Text style={{ color: "#000", fontSize: 18, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Tambah Kegiatan</Text>
                    <View style={{marginBottom:20}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Kegiatan:</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", minHeight:30, borderColor:"black", borderBottomWidth:0.5, }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    value={detail}
                                    keyboardType= "default"
                                    onChangeText={(text) => setDetail(text)}
                                    style={{ color: "#000" }}
                                    multiline
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{marginBottom:20}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Uraian Kegiatan:</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", minHeight:100, borderBottomWidth:0.5, borderColor:"black", }}>
                                <TextInput
                                    placeholder=''
                                    placeholderTextColor={"#000"}
                                    value={uraian}
                                    keyboardType= "default"
                                    onChangeText={(text) => setUraian(text)}
                                    style={{ color: "#000" }}
                                    multiline
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={{width:"90%", height:40, backgroundColor:"#0060cb", marginBottom:20, borderRadius:15, alignItems:"center", justifyContent:"center"}} onPress={handlerStore}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tambah Kegiatan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ReactNativeModal isVisible={modalSuccess} style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                    
                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={backNavigation=="Agenda" ? () => navigation.navigate("Agenda", {idAbsensi:idAbsensi}):() => navigation.navigate("Detail", {idAbsensi:idAbsensi})}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Selamat ! Kegiatan / Agenda Berhasil Ditambahkan.</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={backNavigation=="Agenda" ? () => navigation.navigate("Agenda", {idAbsensi:idAbsensi}):() => navigation.navigate("Detail", {idAbsensi:idAbsensi})}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
                        </TouchableOpacity>
                             
                    </View>
                </View>
            </ReactNativeModal>   

            {/* modal Loading */}
            <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <Circle size={100} color="white"/>
            </ReactNativeModal>
        </ScrollView>
    )
}

export default Tambah

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#0060cb",
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