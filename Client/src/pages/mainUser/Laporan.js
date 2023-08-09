import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BackIcon, LgBappeda } from '../../assets/images';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';


const Laporan = ({route, navigation}) => {

    const {bulan, tahun} = route.params
    const [cekBulan, setCekBulan] = useState(bulan)

    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // input
    const [detail, setDetail] = useState()

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

    const base_url =ApiLink+"/api";
    const isFocused = useIsFocused();
    const [arrKegiatan, setArrKegiatan] = useState([])
    const [arrKendala, setArrKendala] = useState([])
    const [adaDokumen, setAdaDokumen] = useState(false)
    useEffect(() => {

        if (isFocused) {
            myLaporan()
        }

    }, [navigation, isFocused])
    
    const myLaporan = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    


            const target_url = `${base_url}/laporan?tahun=${tahun}&bulan=${bulan}`
            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }})

            if (response.status === 200) {

                if (response.data.length > 0) {
                    
                }else{

                    setAdaDokumen(false)
                    getMyKegiatan()
                }
                // if (response.data.ruang_lingkup) {
                //     setArrRuangLingkup(JSON.parse(response.data.ruang_lingkup))
                // }

                var checkKendala = await AsyncStorage.getItem('tmpKendala')

                if (!checkKendala && !arrRuangLingkup) {

                    await AsyncStorage.setItem('tmpRuangLingkup','')

                }else if (!checkKendala && arrRuangLingkup) {

                    await AsyncStorage.setItem('tmpRuangLingkup',JSON.parse(response.data.ruang_lingkup).join("%ry%"))                    

                } else{
                    setArrRuangLingkup(checkKendala.split("%ry%"))
                }
            }        


        } catch (error) {
            console.log(error, "error get my profile")   
        }
    }        
    const getMyKegiatan = async data =>{

        try {

            const myToken = await AsyncStorage.getItem('AccessToken');    
            const target_url = `${base_url}/laporan?bulanan=true&bulan=${bulan}`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {
                setArrKegiatan(response.data)
            }

        } catch (error) {
            console.log(error, "error get my kegiatan")   
        }
    }       
   

    const rowKegiatan = (item,index)=>{

        return(
            <View style={{flexDirection:"row", backgroundColor:"#FFF"}}>
                <View style={{width:"7%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{index+10}</Text>
                </View>
                <View style={{width:"20%", minHeight:25, justifyContent:'center', borderWidth:0.5, borderColor:"#000", alignItems:'center'}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{item.hari}</Text>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{item.tanggal}</Text>                    
                </View>
                <View style={{width:"33%", minHeight:25, borderWidth:0.5, borderColor:"#000", padding:8 }}>
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
                <View style={{width:"40%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", paddingVertical:5, }}>
                <View style={{flexDirection:'row', paddingLeft:3, flexDirection:'column' }}>
                    {
                        item.kegiatan.map((item2, index2)=>(
                            <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}>{index2+1}.</Text>
                                </View>
                                <View>
                                    <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}>{item2.uraian_kegiatan}</Text>
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
                </View>                
            </View>    
        )
    
    }

    const tabelKegiatan = data =>{

        return(
            <View>
                <View style={{flexDirection:"row", backgroundColor:"#d9dcdf"}}>
                    <View style={{width:"7%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>#</Text>
                    </View>
                    <View style={{width:"20%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Hari/Tanggal</Text>
                    </View>
                    <View style={{width:"33%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Jenis Kegiatan</Text>
                    </View>
                    <View style={{width:"40%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Uraian</Text>
                    </View>
                </View>
                <ScrollView style={{maxHeight:WindowHeight*0.3}}>
                    <FlatList
                        data={arrKegiatan}
                        renderItem={({ item,index }) => (
                            rowKegiatan(item,index)
                        )}
                    />                            
                </ScrollView>
            </View>            
        )
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={{ width: "60%" }}>
                    <TouchableOpacity onPress={()=> navigation.navigate('MainUser')} style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent:"center" }}>
                            <Image source={BackIcon} style={{ width: 20, height: 20 }}/>
                        </View>
                        <View style={{ justifyContent:"center", marginHorizontal:10 }}>
                            <Image source={LgBappeda} style={styles.lgHead}/>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PROFILE</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Laporan Bulanan</Text>
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

                    <View style={{width:"100%", flexDirection:"row", justifyContent:"flex-end", marginTop:10}}>
                        <TouchableOpacity style={{width:100, height:30, borderRadius:10, backgroundColor:"#39a339", marginBottom:15, alignItems:"center", justifyContent:"center", }}>
                            <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Download</Text>
                        </TouchableOpacity>
                        <View style={{width:10}}></View>
                        <TouchableOpacity style={{width:100, height:30, borderRadius:10, backgroundColor:"#0060cb", marginBottom:15, alignItems:"center", justifyContent:"center"}}>
                            <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Laporkan</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:"100%", alignItems:"center"}}>
                        <View style={{width:"100%"}}>
                            <Text style={{ color: "#000", fontSize: 15, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Berikut Kegiatan Anda Pada Bulan {namaBulan[cekBulan]}</Text>
                        </View>
                    </View>

                    <View style={{width:"100%",marginBottom:15}}>
                    {
                        !adaDokumen &&
                            tabelKegiatan()
                    }

                    </View>
                    
                    <View style={{marginTop:10}} >
                        <View style={{flexDirection:'row', display:'flex',  justifyContent:'space-between'}}>
                            <Text style={{ color: "#000", fontSize: 15, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, }}> Kendala & Solusi</Text>

                            <TouchableOpacity style={{width:100, height:30, borderRadius:10, backgroundColor:"#cfc925", marginTop:6, alignItems:"center", justifyContent:"center"}} onPress={()=> navigation.navigate('TambahKendala', {bulan:bulan, tahun:tahun})} >
                            <Text style={{ fontWeight:'900', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Tambah</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", backgroundColor:"#d9dcdf"}}>
                            <View style={{width:"8%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>#</Text>
                            </View>
                            <View style={{width:"46%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Kendala</Text>
                            </View>
                            <View style={{width:"46%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Solusi</Text>
                            </View>
                        </View>

                </View>
            </View>

        </ScrollView>
    )
}

export default Laporan

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