import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BackIcon, ExFoto, LgBappeda, PasFoto, SakitIcont, SakitIzin } from '../../assets/images';
import SearchBar from 'react-native-dynamic-search-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const DataPengajuan = ({navigation}) => {

    const isFocused = useIsFocused();
    const base_url = ApiLink+'/api'

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

    const [loadingData, setLoadingData] = useState(false)
    useEffect(() => {
      
        if (isFocused) {
            handlerGetPengajuan()
        }

    }, [navigation, isFocused])

    const [arrPengajuan, setArrPengajuan] = useState([])

    const handlerGetPengajuan = async ()=>{

        setLoadingData(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =`${base_url}/absen?izinSakit=true`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {
                setLoadingData(false)
                setArrPengajuan(response.data)
            }

        } catch (error) {
            console.log(error.response.data, "error get my profile")   
        }        
    }

    const rowPengajuan = (item,index)=>{

        return(
            <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("DetailDataPengajuan", {idUser:item.id_user, idAbsen:item.id})}>
            <Image source={item.status ==='sakit' ? SakitIcont: SakitIzin } style={{width:40,height:40, marginLeft:15}}/>
            <View style={{marginLeft:10}}>
                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.nama}</Text>
                <Text style={{ color:"black",  fontSize:10}}>Pengajuan : {item.tanggal}</Text>
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
                        <View>
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PENGAJUAN</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Seluruh Data Pengajuan</Text>
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

                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Berikut Data Pengajuan</Text>


                    {loadingData?
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

                            arrPengajuan.length > 0 ? 
                            arrPengajuan.map((item,index)=> rowPengajuan(item,index)): <Text>Belum Ada Data</Text>

                        }

                </View>
            </View>
            
        </ScrollView>
    )
}

export default DataPengajuan

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