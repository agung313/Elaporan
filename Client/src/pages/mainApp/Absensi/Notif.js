import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Agenda, BackIcon, DangerIcont, LgBappeda, SakitIcont, SakitIzin, SakitIzinDanger, WarningIcont } from '../../../assets/images';
import { useIsFocused } from '@react-navigation/native';
import ApiLink from '../../../assets/ApiHelper/ApiLink';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Notif = ({route, navigation}) => {
    useEffect(()=>{

        if (isFocused) {
            getMyHistory()          
        }
        
    },[navigation, isFocused])
        
    // },[navigation, isFocused])

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

    // api
    const [history, setHistory] = useState([])
    console.log(history, "<=== cek data")

    const isFocused = useIsFocused();
    const base_url =ApiLink+"/api"



    // console.log(history, "<====== history notif ")

    const [loadHistory, setLoadHistory] = useState(false)

    const getMyHistory = async data =>{
        // setLoadHistory(true)
        setLoadHistory(true)

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${base_url}/absen/`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
    
            if (response.status == 200) {
                setHistory(response.data)
                setLoadHistory(false)
            }

        } catch (error) {
            console.log(error, "error get my history")   
        }
    }

    const rowHistory = (item, index) =>{

        // if (item.ket_hadir === 'Datang Tepat Waktu' && item.ket_pulang === 'Pulang Tepat Waktu') {
        console.log(item.ket_hadir)
        if (item.ket_hadir === 'Absen Tepat Waktu') {
            
            if(item.laporan == false){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, Anda belum membuat agenda</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else if(item.ket_pulang == "Tidak Absen Pulang"){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum absen pulang</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            

        } 
        else if(item.ket_hadir ==="Absen Terlambat"){
            if(item.laporan == false ){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum membuat agenda</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else if(item.ket_pulang == "Tidak Absen Pulang"){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum belum absen pulang</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
        }
        else if(item.ket_hadir === "Sakit"){
            const setStSakit = ()=>{
                if(item.isApprove=="diajukan"){
                    return("Menunggu Persetujuan Kasubag Umum")
                }else if(item.isApprove=="diterima"){
                    return("Anda Mengajukan Keterangan Sakit")
                }else if(item.isApprove=="ditolak"){
                    return("Pengajuan Ditolak Kasubag Umum")
                }
            }

            const stSakit = setStSakit()

            const IcontSet = ()=> {
                if(item.isApprove=="ditolak"){
                    return(
                        <>
                            <Image source={DangerIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />
                        </>
                    )
                }else if(item.isApprove=="diajukan"){
                    return(
                        <>
                            <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />
                        </>
                    )
                }else{
                    return(
                        <>
                            <View></View>
                        </>
                    )
                }
            }
            return(
                <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
                    <Image source={SakitIcont} style={{width:40,height:40, marginLeft:15}}/>
                    <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                        <Text style={item.isApprove=="ditolak"?{ color:"red",  fontSize:10, textTransform:"capitalize"}:{ color:"black",  fontSize:10, textTransform:"capitalize"}}>{stSakit}</Text>
                    </View>
                    <IcontSet/>
                </TouchableOpacity>
            )
        }
        else if(item.ket_hadir === "Izin"){
            const setStIzin = ()=>{
                if(item.isApprove=="diajukan"){
                    return("Menunggu Persetujuan Kasubag Umum")
                }else if(item.isApprove=="diterima"){
                    return("Anda mengajukan keterangan izin")
                }else if(item.isApprove=="ditolak"){
                    return("Pengajuan Ditolak Kasubag Umum")
                }
            }

            const stIzin = setStIzin()

            const IcontSet = ()=> {
                if(item.isApprove=="ditolak"){
                    return(
                        <>
                            <Image source={DangerIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />
                        </>
                    )
                }else if(item.isApprove=="diajukan"){
                    return(
                        <>
                            <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />
                        </>
                    )
                }else{
                    return(
                        <>
                            <View></View>
                        </>
                    )
                }
            }

            return(
                <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
                    <Image source={SakitIzin}  style={{width:40,height:40, marginLeft:15}}/>
                    <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                        <Text style={item.isApprove=="ditolak"?{ color:"red",  fontSize:10, textTransform:"capitalize"}:{ color:"black",  fontSize:10, textTransform:"capitalize"}}>{stIzin}</Text>
                    </View>
                    <IcontSet/>
                </TouchableOpacity>
            )
        }
        else{
            if(item.laporan == false ){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, Anda belum membuat agenda</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else if(item.ket_pulang == "Tidak Absen Pulang"){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum absen pulang</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>NOTIFIKASI</Text>
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

                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Berikut Absensi Anda Yang Tidak Lengkap </Text>

                    <View>
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
                                    history.map((item,index)=>(
                                        rowHistory(item,index)
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

export default Notif

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