import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AbsensiKurang, Agenda, BackIcon, LgBappeda, SakitIcont, SakitIzin, TidakHadir } from '../../assets/images'
import SearchBar from 'react-native-dynamic-search-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const AllPengajuan = ({navigation}) => {
    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    const base_url = ApiLink+'/api'
    const isFocused = useIsFocused();
    useEffect(() => {
      
        if (isFocused) {
            handlerGetPengajuan(),
            handlerGetLaporan()
        }

    }, [navigation, isFocused])

    // date time tanggal
    const cekTgl = new Date
    const localeTime = cekTgl.toLocaleTimeString()
    
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
    const getStrDay = namaHari[cekTgl.getDay()]
    const getDay = cekTgl.getDate()

    const [monthUsed, setMonthUsed] = useState(cekTgl.getMonth()+1)
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September","Oktober", "November", "Desember"]
    const getStrMonth = namaBulan[monthUsed]

    const getYear = cekTgl.getFullYear()

    
    // showcontent
    const [showContent, setShowContent] = useState(1)
    const toggleContent = (e)=>{
        setShowContent(e);
    }

    // pengajuan
    const [dataPengajuan, setDataPengajuan] = useState()
    const [loadPengajuan, setloadPengajuan] = useState(false)
    const [countPengajuan, setCountPengajuan] = useState()

    const handlerGetPengajuan = async ()=>{
        setloadPengajuan(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =`${base_url}/absen?izinSakit=true`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {

                setDataPengajuan(response.data)                
                setloadPengajuan(false)
                setCountPengajuan(response.data.length)
            }

        } catch (error) {
            console.log(error, "error get my profile")   
        }        
    }

    const rowPengajuan = (item, index)=>{

        return(
                <>
                    <TouchableOpacity key={index} style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("DetailPengajuan", {idPengajuan:item.id, idUser:item.id_user})}>
                        <Image source={item.status =='izin' ? SakitIzin:SakitIcont} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.nama}</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Pengajuan : {item.hari+", "+item.tanggal}</Text>
                        </View>
                    </TouchableOpacity>
                </>            
        )
    }

    // laporan
    const [dataLaporan, setDataLaporan] = useState()
    const [loadLaporan, setloadLaporan] = useState()
    const [countLaporan, setCountLaporan] = useState()

    const handlerGetLaporan = async ()=>{

        setloadLaporan(true)

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =`${base_url}/document?bulan=${monthUsed}&tahun=${getYear}`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {
                setDataLaporan(response.data)
                setloadLaporan(false)
                setCountLaporan(response.data.length)
            }


        } catch (error) {
            console.log(error, "error get my profile")   
        }        
    }

    const rowLaporan = (item,index) =>{
        // console.log(item)
        const tmpObj = {
            id_user: item.id_user,        
            bulan: item.bulan,
            tahun: item.tahun,
            id_dokumen:item.id
        }

        return(
            <TouchableOpacity key={index} style={{width:WindowWidth*0.90, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20}} onPress={() => navigation.navigate('DetailLaporanKasum',{ params:tmpObj})}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Image source={ item.fotoProfile == null ? PasFoto : {uri:item.fotoProfile} } style={{width:40,height:55, marginLeft:15, borderRadius:2, marginVertical:5}}/>
                    <View style={{marginLeft:10, marginVertical:5}}>
                        <Text style={{fontWeight:'900', color:"black",  fontSize:14, marginBottom:5}}>{item.nama}</Text>
                        <Text style={{ color:"black",  fontSize:10, fontWeight:"500"}}>Laporan Diajukan : Bulan {namaBulan[item.bulan]+' '+item.tahun}</Text>
                    </View>
                </View>
                
                <View style={{marginTop:-60, alignItems:"flex-end"}}>
                    {/* <Text style={{fontSize:11, color:'black', fontWeight:'600', backgroundColor:'#f5c542', borderTopLeftRadius:5, borderBottomLeftRadius:5, padding:5}}>{namaBulan[item.bulan]+' '+item.tahun}</Text> */}
                    <Text style={{fontSize:11,color:'white', fontWeight:'600', backgroundColor:'#d742f5', borderTopRightRadius:5, borderBottomRightRadius:5, padding:5, textTransform:"capitalize"}}>{item.status}</Text>
                </View>
            </TouchableOpacity>            
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
                        <View style={{justifyContent:"center"}}>
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>NOTIFIKASI</Text>
                            {/* <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran</Text> */}
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>
            
            <View style={{alignItems:"center"}}>
                <View style={{width:WindowWidth*0.9, minHeight:100, marginTop:0, alignItems:"center"}}>
 
                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Berikut Data Pengajuan dan Laporan</Text>

                    {/* <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("DetailPengajuan")}>
                        <Image source={SakitIcont} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Pengajuan : Rabu, 22 Juni 2023</Text>
                        </View>
                    </TouchableOpacity> */}
                    <View style={{flexDirection:"row", marginBottom:20}}>
                        <TouchableOpacity style={showContent===1? {backgroundColor:"#39a339", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"} : {backgroundColor:"#d9dcdf", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center", }} onPress={() => toggleContent(1)}>
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                                {countPengajuan>0?
                                    <Text style={{color:"red", fontSize:20, fontFamily:"Spartan", fontWeight:"900", marginRight:10}}>{countPengajuan}</Text>
                                :
                                    null
                                }
                                
                                <Text style={showContent===1?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Pengajuan</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={showContent===2?{backgroundColor:"#39a339", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}:{backgroundColor:"#d9dcdf", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}} onPress={() => toggleContent(2)}>
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                                {countLaporan>0? 
                                    <Text style={{color:"red", fontSize:20, fontFamily:"Spartan", fontWeight:"900", marginRight:10}}>{countLaporan}</Text>
                                :
                                    null
                                }
                                
                                <Text style={showContent===2?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Laporan</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={showContent===1?{display:"flex"}:{display:"none", marginTop:15}}>
                        {loadPengajuan?
                            <View>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                            </View>
                        :
                            <View>
                                {
                                    dataPengajuan &&
                                    dataPengajuan.map((item,index)=>(
                                        rowPengajuan(item,index)
                                    ))
                                }
                            </View>
                        }
                    </View>

                    <View style={showContent===2?{display:"flex"}:{display:"none", marginTop:15}}>
                        {loadLaporan?
                            <View>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder backgroundColor='#D9DCDF' highlightColor='#fff'>
                                    <View style={{width:WindowWidth*0.85, height:70, borderRadius:15, elevation:5, marginBottom:20,}}></View>
                                </SkeletonPlaceholder>
                            </View>
                        :
                            <View>
                                {
                                    dataLaporan &&
                                    dataLaporan.map((item,index)=>(
                                        rowLaporan(item,index)
                                    ))

                                }
                            </View>
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default AllPengajuan

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