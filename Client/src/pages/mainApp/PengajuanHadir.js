import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Agenda, BackIcon, LgBappeda, SakitIcont, SakitIzin, WarningIcont } from '../../assets/images';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { useIsFocused } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PengajuanHadir = ({navigation}) => {
    const isFocused = useIsFocused();
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
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September","Oktober", "November", "Desember"]
    const getStrMonth = namaBulan[monthUsed]

    const getYear = cekTgl.getFullYear()

    // api
    useEffect(()=>{


        if (isFocused) {
            getMyHistory()       
        }
        
    },[navigation, isFocused])

    const base_url =ApiLink+"/api";
    const [history, setHistory] = useState([]);
    const [historyNotif, setHistoryNotif] = useState([]);
    const [loadHistory, setLoadHistory] = useState(false)


    const getMyHistory = async data =>{
        setLoadHistory(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${base_url}/absen?izinSakit=true`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
    
            if (response.status == 200) {
                setHistoryNotif(response.data)
                setHistory(response.data);
                setLoadHistory(false)
            }

        } catch (error) {
            console.log(error, "error get my history")   
        }
    }

    const rowHistory = (item, index) =>{

        if(item.status === "Sakit"){
            
            return(
                <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
                    <Image source={SakitIcont} style={{width:40,height:40, marginLeft:15}}/>
                    <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                        <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}> {item.isApprove == false ? "Menunggu Persetujuan Kasubag Umum" : "Anda mengajukan keterangan sakit"}</Text>
                    </View>
                    {item.isApprove == false ? <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />:<View></View>}
                </TouchableOpacity>
            )
        }
        else if(item.status === "Izin"){
            return(
                <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
                    <Image source={SakitIzin} style={{width:40,height:40, marginLeft:15}}/>
                    <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                        <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>{item.isApprove == false ? "Menunggu Persetujuan Kasubag Umum" : "Anda mengajukan keterangan izin"}</Text>
                    </View>
                    {item.isApprove == false ? <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />:<View></View>}
                </TouchableOpacity>
            )
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
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran</Text>
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

                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10,  textAlign:"center"}}>Berikut Pengajuan Anda </Text>
                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:25, textAlign:"center"}}>Belum Disetujui Kasubag Umum </Text>

                    {loadHistory?
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
                                    history.length > 0 &&
                                    history.map((item, index) =>(
                                        rowHistory(item,index)
                                    ))
                                }
                            </View>
                        }

                    
                    
                </View>
            </View>
        </ScrollView>
    )
}

export default PengajuanHadir

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