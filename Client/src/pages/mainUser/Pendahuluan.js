import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image, TextInput  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BackIcon, DotAksi,CloseIcont, EmailIcon, LgBappeda, PasswordIcon } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';
import ReactNativeModal from 'react-native-modal'

const Pendahuluan = ({navigation}) => {
    const [latarBelakang, setLatarBelakang] = useState('Perkembangan Teknologi Informasi (Information Technology, IT), khususnya dibidang Programming. Pemanfaatan berbagai program oleh instansi Pemerintah merupakan salah satu inovasi dengan memaksimalkan teknologi. Memacu kebutuhan akan data dan informasi lebih tertata dalam penunjang mobilitas kegiatan Bappeda Kota pekanbaru. ')
    const [maksudTujuan, setMaksudTujuan] = useState('Teknologi Informasi dalam bidang pemrograman menunjang percepatan dan maintenance dalam berbagai pekerjaan Badan Perencanaan  Pembangunan  Daerah  Kota  Pekanbaru.')

    const [ruangLingkup, setRuangLingkup] = useState()

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
    const base_url =ApiLink+"/api";
    const isFocused = useIsFocused();

    const [profile, setProfile] = useState({
        latarBelakang:'-',
        maksudTujuan:'-',
        ruangLingkup:[]
    })

    useEffect(() => {

        if (isFocused) {
            getMyProfile()            
        }

    }, [navigation, isFocused])
    

    const getMyProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            await axios.get(`${base_url}/user/profile`,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{
                setProfile({
                    latarBelakang:res.data.latar_belakang,
                    maksudTujuan:res.data.tujuan,
                    ruangLingkup:res.data.ruang_lingkup
                })
            })        
    

        } catch (error) {
            console.log(error, "error get my profile")   
        }
    }    

    const handlerChange = (key, value) => {
        setProfile(prevState => ({
            ...prevState, 
            [key]:value
        }))
    };


    const rowRuangLingkup =(data) =>{

        return(
                <View style={{width:"90%", minHeight:50 }}>
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity onPress={()=> modalAksi(data) } style={{ flexDirection: 'row' }}>
                            <Image source={DotAksi} style={{width:20, height:20, marginLeft:7}} />
                        </TouchableOpacity>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginBottom:10, marginLeft:15}} multiline>{data}</Text>
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PROFILE</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Pendahuluan Laporan</Text>
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
                    <Text style={{ color: "#000", fontSize: 15, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Update Pendahuluan Laporan</Text>

                    <View style={{marginBottom:25, marginTop:20}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Latar Belakang :</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", minHeight:50, borderBottomWidth:0.5, borderColor:"black",}}>
                                <TextInput
                                        placeholder=''
                                        placeholderTextColor={"#000"}
                                        value={profile.latarBelakang}
                                        keyboardType= "default"
                                        onChangeText={(text) => handlerChange('latarBelakang', text)}
                                        style={{ color: "#000" }}
                                        multiline
                                    />
                            </View>
                        </View>
                    </View>

                    <View style={{marginBottom:25}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Maksud dan Tujuan :</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", minHeight:50, borderBottomWidth:0.5, borderColor:"black",}}>
                                <TextInput
                                        placeholder=''
                                        placeholderTextColor={"#000"}
                                        value={profile.maksudTujuan}
                                        keyboardType= "default"
                                        onChangeText={(text) => handlerChange('maksudTujuan', text)}
                                        style={{ color: "#000" }}
                                        multiline
                                    />
                            </View>
                        </View>
                    </View>

                    <View style={{marginBottom:25}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Ruang Lingkup :</Text>
                        <View style={{flexDirection:"row", marginBottom:10, marginLeft:15, alignItems:"flex-end", marginBottom:15 }}>

                            <TouchableOpacity style={{width:70, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:10}} onPress={() => navigation.navigate("TambahLingkup")}>
                                <Text style={{fontWeight:'700', color:"white", fontSize:12}}>Tambah</Text>
                            </TouchableOpacity>                            
                        </View>
                        {
                            profile.ruangLingkup.length > 0 &&
                            profile.ruangLingkup.map((data)=>(
                              rowRuangLingkup(data)
                            ))
                        }
                        <View >

                        </View>
                    </View>
                    
                </View>

                <View style={{width:WindowWidth,marginBottom:15, padding:10, alignItems:"center" }}>
                    <TouchableOpacity style={{flexDirection:"row", marginBottom:25, width:"95%", minHeight:50, backgroundColor:"#39a339", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center"}} onPress={() => navigation.navigate("MainUser")}>
                        <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16, marginTop:5}}>Update</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ScrollView>
    )
}

export default Pendahuluan

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