import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { BackIcon, LgBappeda, SakitIcont, SakitIzin } from '../../assets/images'
import SearchBar from 'react-native-dynamic-search-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Pengajuan = ({navigation}) => {

    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;
    const isFocused = useIsFocused();
    const base_url = ApiLink+'/api'
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
    useEffect(() => {
      
        if (isFocused) {
            handlerGetPengajuan()
        }

    }, [navigation, isFocused])

    const [rawHistory, setRawHistory] = useState([])
    const [filtereHistory, setFilteredHistory] = useState([])
    const [search, setSearch] = useState();
    const [loadHistory, setLoadHistory] = useState(false)

    const handlerGetPengajuan = async ()=>{
        setLoadHistory(true)
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =`${base_url}/absen?izinSakit=true`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            console.log(response.data)
            if (response.status == 200) {

                setRawHistory(response.data);
                setFilteredHistory(response.data)                
                setLoadHistory(false)
            }

        } catch (error) {
            console.log(error, "error get my profile")   
        }        
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
            if (text) {

                const newData = rawHistory.filter(
                    
                    function (params) {

                        const arrObject = Object.values(params) 
                        arrObject.splice(-1,1)
                        const tmpStr =arrObject.join(' ') 

                        //ambil objek yang dijadikan objek tempat pencarian
                        const itemData = tmpStr
                        ?  tmpStr.toUpperCase() 
                        : ''.toUpperCase();

                        // ambil nilai yg dicari
                        const textData = text.toUpperCase();

                        // ambil/ cek index dari data yg ditemukan. Jika data tidak ditemukan maka akan bernilai -1. Jika nilai tidak -1 maka true.

                        // jika hasil true maka item array dari rawHistory akan dimasukkan ke array baru 'newData'
                        return itemData.indexOf(textData) > -1;
                    
                    }
                );

                setFilteredHistory(newData);
                setSearch(text);
            } else {

                setFilteredHistory(rawHistory);
                setSearch(text);
            }
    };

    const rowData = (item, index)=>{

        return(
                <>
                    <TouchableOpacity key={index} style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("DetailPengajuan", {idPengajuan:item.id, idUser:item.id_user})}>
                        <Image source={item.status =='izin' ? SakitIzin:SakitIcont} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.nama}</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Pengajuan : {item.hari+", "+item.tanggal}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("DetailPengajuan")}>
                        <Image source={SakitIzin} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Pengajuan : Rabu, 22 Juni 2023</Text>
                        </View>
                    </TouchableOpacity>             */}
                </>            
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
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Sakit dan Izin</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>

            <View style={{alignItems:"center"}}>
                <View style={{width:WindowWidth*0.9, minHeight:100, marginTop:0, alignItems:"center", marginBottom:30}}>
                    <SearchBar
                        placeholder='Search Data Pengajuan'
                        style={{marginBottom:20, width:"100%"}}
                        onChangeText={(text) => searchFilterFunction(text)}
                    />

                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>{filtereHistory.length?"Berikut Data Pengajuan Kehadiran THL-IT":"Tidak Ada Data Pengajuan"}</Text>

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
                                    filtereHistory.length >0 &&
                                    filtereHistory.map((item,index)=>(
                                        rowData(item,index)
                                    ))
                                }
                            </View>
                        }
                </View>
            </View>
        </ScrollView>
    )
}

export default Pengajuan

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