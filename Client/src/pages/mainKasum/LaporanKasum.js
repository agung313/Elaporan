import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { BackIcon, ExFoto, LgBappeda, PasFoto } from '../../assets/images'
import SearchBar from 'react-native-dynamic-search-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';

const LaporanKasum = ({navigation}) => {

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
    const isFocused = useIsFocused();
    const base_url = ApiLink+'/api'
    // modal
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    useEffect(() => {
      
        if (isFocused) {
            handlerGetLaporan()
        }

    }, [navigation, isFocused])

    const [rawLaporan, setRawLaporan] = useState([])
    const [filteredLaporan, setFilteredLaporan] = useState([])
    const [search, setSearch] = useState();
    const [loadLaporan, setLoadLaporan] = useState(false)

    const handlerGetLaporan = async ()=>{

        setLoadLaporan(true)

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url =`${base_url}/document?bulan=${monthUsed}&tahun=${getYear}`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {
                setRawLaporan(response.data)
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


    const rowLaporan = (item,index) =>{

        return(
            <TouchableOpacity key={index} style={{width:WindowWidth*0.90, height:70, backgroundColor:'white', borderRadius:5, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate('DetailLaporanKasum',{ idDokumen:item.id})}>
                <Image source={ item.fotoProfile == '' ? PasFoto : {uri:item.fotoProfile} } style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                <View style={{marginLeft:10}}>
                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.nama}</Text>
                    <Text style={{ color:"black",  fontSize:10}}>Jabatan : {item.jabatan} Programmer</Text>
                </View>
                <View style={{flexDirection:'row', marginLeft:35, marginTop:-40,}}>
                    <Text style={{fontSize:11, color:'black', fontWeight:'600', backgroundColor:'#f5c542', borderTopLeftRadius:5, borderBottomLeftRadius:5, padding:5}}>{item.bulan+' '+item.tahun}</Text>
                    <Text style={{fontSize:11,color:'white', fontWeight:'600', backgroundColor:'#d742f5', borderTopRightRadius:5, borderBottomRightRadius:5, padding:5}}>{item.status}</Text>
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>LAPORAN</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Pengajuan Laporan</Text>
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

                    <View style={{width:"70%"}}>
                        <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Berikut Pengajuan Laporan THL-IT Bulan {getStrMonth} {getYear}</Text>
                    </View>

                    {
                        rawLaporan.length > 0 &&
                        rawLaporan.map((item,index)=>(
                            rowLaporan(item,index)
                        ))

                    }
                    {/* <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}}>
                        <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Ondri Nurdiansyah, S.T</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Jabatan : IT Programmer</Text>
                        </View>
                    </TouchableOpacity> */}


                </View>
            </View>
        </ScrollView>
    )
}

export default LaporanKasum

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