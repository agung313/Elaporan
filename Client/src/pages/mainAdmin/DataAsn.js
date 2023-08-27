import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackIcon, ExFoto, LgBappeda, PasFoto } from '../../assets/images';
import SearchBar from 'react-native-dynamic-search-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';



const DataAsn = ({navigation}) => {
    const isFocused = useIsFocused();
    useEffect(()=>{
        if (isFocused) {
            getAllAsn()        
        }
    }, [navigation, isFocused])
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

    // api get all data asn
    const base_url =ApiLink+"/api";
    const [dataAsn, setDataAsn] = useState()


    const [rawHistory, setRawHistory] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState();
    const [loadData, setLoadData] = useState(false)



    const getAllAsn = async data=>{
        setLoadData(true)
        try{
            const myToken = await AsyncStorage.getItem("AccessToken")
            const response = await axios.get(`${base_url}/user/profile?getAll=true`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});

            if (response.status == 200) {

                setRawHistory(response.data)
                setFilteredData(response.data)

            }
            setLoadData(false)            
        }
        catch (error){
            console.log(error, "error get data asn")  
        }
    }

    const rowData = (item,index)=>{


        return(
            <TouchableOpacity key={index} style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate('DetailAsn', {idUser:item.id})}>
                <Image source={item.URL?{uri:item.URL}: PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                <View style={{marginLeft:10}}>
                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.nama}</Text>
                    <Text style={{ color:"black",  fontSize:10}}>Jabatan : {item.jabatan}</Text>
                </View>
            </TouchableOpacity>            
        )
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

                setFilteredData(newData);
                setSearch(text);

            } else {

                setFilteredData(rawHistory);
                setSearch(text);
            }
    };    
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>DATA ASN</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Seluruh Data ASN</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>

            <View style={{alignItems:"center"}}>
                <View style={{width:WindowWidth*0.9, minHeight:100, marginTop:0, alignItems:"center"}}>
                    <SearchBar
                        placeholder='Search here'
                        style={{marginBottom:15, width:"100%"}}
                        onChangeText={(text)=>{searchFilterFunction(text)}}
                    />

                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Berikut Data THL-IT</Text>


                    {loadData?
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
                                    filteredData.length >0 &&
                                    filteredData.map((item,index)=>(
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

export default DataAsn

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