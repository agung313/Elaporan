import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AddImg, BackIcon, CloseIcont, DeletedIcont, DotAksi, EditIcont,  LgBappeda } from '../../../assets/images'
import ReactNativeModal from 'react-native-modal'
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Circle } from 'react-native-animated-spinkit';


const Detail = ({route, navigation}) => {

    const {idAbsensi} = route.params
    const isFocused = useIsFocused();

    const base_url ="http:10.0.2.2:8000/api"
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
        status:'-',
        waktuMasuk:'00:00:00',
        waktuPulang:'00:00:00',
        fotoAbsensi:'-',
        keteranganAbsensin:'-',

    })
    const [modalValue, setModalValue] = useState({
        id:0,
        judulKegiatan:'-',
        uraianKegiatan:'-'
    })
    const [arrKegiatan, setArrKegiatan] = useState([])

    useEffect(() => {

        if (isFocused) {
            getProfile(),
            getAbsensi(),
            getKegiatan()
        }
    
    }, [navigation, isFocused])
    
    const [imgFoto, setImgFoto] = useState()
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
                // console.log(res.data[0].foto, "<==== lokasi foto")       
                console.log(res.data[0], "<===== data absensi")    
                setAbsen({
                    status:res.data[0].status,
                    waktuMasuk: res.data[0].waktu_hadir,
                    waktuPulang:res.data[0].waktu_pulang,
                    fotoAbsensi:res.data[0].foto,
                    keteranganAbsensin:res.data[0].keterangan_hadir,                    
                })
            }) 
            


        } catch (error) {
            console.log(error, "error get absensi")   
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
        console.log(data,"<---")

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
            console.log(response,"<--- delete")

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
                        <View style={{flexDirection:"row", marginBottom:15}}>
                            <View style={{width:"35%", minHeight:25, justifyContent:"center", marginRight:10}}>
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
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Status Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textTransform:"capitalize"}}>{absen.status}</Text>
                                </View>
                                {/* <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Lokasi Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textTransform:"capitalize"}}>Kantor Walikota Pekanbaru</Text>
                                </View> */}
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Masuk :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textTransform:"capitalize"}}>{absen.waktuMasuk} WIB</Text>
                                </View>
                                <View style={{marginBottom:10}}>
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
                                <Image source={AddImg} style={{width:100, height:100}}/>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail Kegiatan :</Text>
                        <View style={{alignItems:"center", marginBottom:20}}>
                            <View style={{width:"90%", minHeight:10, borderBottomWidth:0.5, borderColor:"black"}}>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginLeft:10, marginBottom:5}}>Kehadiran</Text>
                            </View>
                        </View>
                    </View>                            
                        </View>
                    }


                    <View style={absen.status == "Izin" || absen.status == "Sakit" ? {display:"none"} : {display:"flex"}}>
                        <View style={{flexDirection:"row", marginBottom:10, marginTop:20 }}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Kegiatan Hari Ini :</Text>
                            <TouchableOpacity style={{width:120, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:20}} onPress={() => navigation.navigate("Tambah", {idAbsensi:idAbsensi, backNavigation:"Detail"})}>
                                <Text style={{fontWeight:'700', color:"white", fontSize:12}}>
                                    Tambah Kegiatan
                                </Text>
                            </TouchableOpacity>
                            
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
                        <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:12, marginTop:10, textTransform:"capitalize"}}>Terimakasih anda telah mengajukan {absen.status}</Text>
                        <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:12, textTransform:"capitalize"}}>Status pengajuan {absen.status} anda telah disetujui kasubag umum</Text>
                        <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:12, textTransform:"capitalize"}}>Selamat beraktifitas</Text>
                    </View>


                </View>

            </View>
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