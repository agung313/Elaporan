import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BackIcon, CloseIcont, LgBappeda } from '../../assets/images'
import { Picker } from '@react-native-picker/picker';
import ReactNativeModal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { Circle } from 'react-native-animated-spinkit';

const HariLibur = ({navigation}) => {
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

    // modal
    const [dataBln, setDataBln] = useState(monthUsed)
    const [dataTahun, setDataTahun] = useState(getYear)
    
    const [modalBln, setModalBln] = useState(false)
    const [modalOption, setModalOption] = useState(false)
    const [modalLoad, setModalLoad] = useState(false)    
    const [modalConfirm, setModalConfirm] = useState(false)

    const [arrLibur, setArrLibur] = useState([])
    const [modalForm, setModalForm] = useState({
        tanggal:null,
        keterangan:null
    })

    const base_url =ApiLink+"/api";
    const isFocused = useIsFocused();

    

    useEffect(() => {
        if (isFocused) {
            handlerGetLibur()
        }
    }, [navigation, isFocused])   
    


    const handlerGetLibur = async data=>{

        setModalBln(false)
        setModalLoad(true)
        try{
            const myToken = await AsyncStorage.getItem("AccessToken")

            const target_url = `${base_url}/absen/listLibur?bulan=${dataBln}&tahun=${dataTahun}`
            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});

            if (response.status == 200) {

                console.log(response.data)
                setArrLibur(response.data)

            }
            setModalLoad(false)            
        }
        catch (error){
            console.log(error, "error get data asn")  
        }
    }

    const handlerHapusLibur = async()=>{
        
        setModalConfirm(false)

    }
    const rowData = (item,index)=>{

        return(
            <View key={index} style={{width:"100%", marginTop:10, flexDirection:"row"}}>
                <View style={{marginLeft:"5%",}}>
                    <View style={{width:50, backgroundColor:"#e82a39", borderRadius:50, height:50, justifyContent:"center", alignItems:"center"}}>
                        <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>{item.tanggal}</Text>
                    </View>
                    
                    <View style={{width:50, alignItems:"center"}}>
                        <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                        <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                        <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                        <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                    </View>
                </View>
                <View style={{justifyContent:"center", marginLeft:25}}>
                    <TouchableOpacity style={{width:WindowWidth*0.6, height:50, backgroundColor:"white", borderRadius:10, elevation:10, alignItems:"center", justifyContent:"center", padding:5}} onPress={() => {
                        setModalForm({
                            tanggal: item.hari+', '+ item.tanggal,
                            keterangan: item.keterangan
                        })
                        setModalOption(true)
                    }}>
                        <Text style={{ color: "#000", fontWeight: "500", fontSize: 10, fontFamily: "Spartan", textTransform:"capitalize", textAlign:"center"}}>{item.keterangan}</Text>
                    </TouchableOpacity>
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>HARI LIBUR</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Data Hari Libur</Text>
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

                    <View style={{width:"100%", minHeight:20, marginTop:10, flexDirection:"row", marginBottom:20}}>
                        <TouchableOpacity style={{flexDirection:"row", width:"50%", borderStyle:"dotted" }} onPress={()=>setModalBln(true)}>
                            <View style={{justifyContent:"center", borderBottomWidth:0.5, borderBottomColor:"black"}}>
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15}}>Bulan : </Text>
                            </View>
                            <View style={{justifyContent:"center", borderBottomWidth:0.5, borderBottomColor:"black"}}>
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15}}>{dataBln? namaBulan[dataBln] : getStrMonth} {dataTahun} </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center" }}>
                            <TouchableOpacity style={{width:100, height:30, borderRadius:15, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center"}} onPress={()=>navigation.navigate("TambahHariLibur")}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Tambah</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center", }}> Hari Libur {namaBulan[dataBln]} {dataTahun}</Text>

                    {
                        arrLibur.length > 0 ?
                        arrLibur.map((item,index)=>(
                            rowData(item,index)
                        ))
                        :
                        <Text>Tidak Ada Data</Text>
                    }

                </View>
            </View>

            {/* modal */}
            <ReactNativeModal isVisible={modalBln} onBackdropPress={() => setModalBln(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={() => setModalBln(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Silahkan Pilih Bulan</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignItems:"center", width:"50%"}}>                        
                            <Picker
                                selectedValue={dataBln}
                                onValueChange={(itemValue, itemIndex) => 
                                    setDataBln(itemValue)
                                }
                                style={{ width:"90%", height:20, borderRadius: 50,  fontWeight: "bold", color:"#000", backgroundColor: "#f3f3f3"}}
                                selectionColor={"#000"}
                            >
                            {
                                namaBulan.map((item,index)=>(
                                    <Picker.Item label={item} value={index}/>
                                ))
                            }
                            </Picker>
                            

                        </View>
                        <View style={{alignItems:"center", width:"50%"}}>                        
                            <Picker
                                selectedValue={dataBln}
                                onValueChange={(itemValue, itemIndex) => 
                                    setDataTahun(itemValue)
                                }
                                style={{ width:"90%", height:20, borderRadius: 50,  fontWeight: "bold", color:"#000", backgroundColor: "#f3f3f3"}}
                                selectionColor={"#000"}
                            >
                                    <Picker.Item label="2023" value="2023"/>
                                    <Picker.Item label="2024" value="2024"/>
                                    <Picker.Item label="2025" value="2025"/>                                
                            </Picker>
                            

                        </View>
                    </View>                    
                    <View style={{width:"100%", alignItems:"center",  marginTop:55,}}>
                        {
                            dataBln ?
                            <TouchableOpacity style={{width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15}} onPress={handlerGetLibur}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Cek Hari Libur</Text>
                        </TouchableOpacity>
                        :
                        <></> 
                        }
                    </View>
                </View>
            </ReactNativeModal>

            {/*  hapus */}
            <ReactNativeModal isVisible={modalOption} onBackdropPress={() => setModalOption(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalOption(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}> {modalForm.tanggal}</Text>
                        <Text style={{ color: "#000", fontWeight: "500", fontSize: 10, fontFamily: "Spartan", textTransform:"capitalize", textAlign:"center", marginTop:15}}>{modalForm.keterangan}</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9d8d7", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={() => setModalOption(false)}>
                                <Text style={{fontWeight:'700', color:"black", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Batal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center",}} onPress={() => {
                                setModalOption(false)
                                setModalConfirm(true)
                                }}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Hapus</Text>
                            </TouchableOpacity>
                        </View>     
                    </View>
                </View>
            </ReactNativeModal>

            {/*  confirm hapus */}
            <ReactNativeModal isVisible={modalConfirm} onBackdropPress={() => setModalConfirm(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalConfirm(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}> Lanjut Hapus Data ?</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9d8d7", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={() => setModalConfirm(false)}>
                                <Text style={{fontWeight:'700', color:"black", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center",}} onPress={handlerHapusLibur}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Ya</Text>
                            </TouchableOpacity>
                        </View>     
                    </View>
                </View>
            </ReactNativeModal>            

            {/* modal loading */}
            <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <Circle size={100} color="white"/>
            </ReactNativeModal>            
        </ScrollView>
    )
}

export default HariLibur

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