import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AddImg, BackIcon, CloseIcont, DeletedIcont, EditIcont, ExFoto, LgBappeda } from '../../assets/images'
import ReactNativeModal from 'react-native-modal'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { Circle } from 'react-native-animated-spinkit'

const TambahKendala = ({route, navigation}) => {
    const {bulan, tahun} = route.params

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

    // modal
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false)
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    // state New Ruang Lingkup
    const isFocused = useIsFocused();
    const [myForm, setMyForm] = useState({
        kendala:'',
        solusi:''
    })
    const [tmpArr, setTmpArr] = useState([])

    useEffect(() => {

        if (isFocused) {
            setFormStore()   
        }

    }, [navigation])
    
    const setFormStore = async data =>{

        var kendalaOld = await AsyncStorage.getItem('tmpKendala')    

        if (kendalaOld) {
            setTmpArr(kendalaOld.split("(%ry%)"))            
        }


    }    

    const [modalLoad, setModalLoad] = useState(false)
    const [modalForm, setModalForm] = useState(false)
    const [modalFormSucces, setModalFormSucces] = useState(false)

    console.log(myForm.kendala, "<==== kendala")

    const saveItemArray = async ()=>{
        if(myForm.kendala == "" || myForm.solusi == ""){
            setModalForm(true)
        }else{
            setModalLoad(true)

            let tmpString=`${myForm.kendala}(^*^)${myForm.solusi}`

            var tmpData = tmpArr

            tmpData.push(tmpString)   

            await AsyncStorage.setItem('tmpKendala', tmpData.join("(%ry%)"))

            setModalLoad(false)
            setModalFormSucces(true)
        }
        
    }

    const GoLaporan = () => {
        setModalFormSucces(false)
        navigation.navigate('Laporan', {bulan:bulan, tahun:tahun})
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
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Tambah Kendala & Solusi</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>
            <View style={{alignItems:"center", marginBottom:30}}>
                <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10, }}>
                    <Text style={{ color: "#000", fontSize: 18, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Kendala & Solusi</Text>
                    <View style={{marginBottom:20}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Kendala:</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", minHeight:100, borderBottomWidth:0.5, borderColor:"black", }}>
                                <TextInput
                                    placeholder='-'
                                    placeholderTextColor={"#000"}
                                    value={myForm.kendala}
                                    keyboardType= "default"
                                    onChangeText={(text) => setMyForm({...myForm, ['kendala']:text})}
                                    style={{ color: "#000" }}
                                    multiline
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{marginBottom:20}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Solusi:</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", minHeight:100, borderBottomWidth:0.5, borderColor:"black", }}>
                                <TextInput
                                    placeholder='-'
                                    placeholderTextColor={"#000"}
                                    value={myForm.solusi}
                                    keyboardType= "default"
                                    onChangeText={(text) => setMyForm({...myForm, ['solusi']:text}) }
                                    style={{ color: "#000" }}
                                    multiline
                                />
                            </View>
                        </View>
                    </View>                    
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={{width:"90%", height:40, backgroundColor:"#39a339", marginBottom:20, borderRadius:15, alignItems:"center", justifyContent:"center" }} onPress={saveItemArray}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tambah</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:"90%", height:40, backgroundColor:"#d9dcdf", marginBottom:20, borderRadius:15, alignItems:"center", justifyContent:"center" }} onPress={()=>{navigation.goBack()}} >
                            <Text style={{fontWeight:'700', color:"#000", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Batal</Text>
                        </TouchableOpacity>                        
                    </View>
                </View>
                
            </View>

            <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <Circle size={100} color="white"/>
            </ReactNativeModal>

            {/* modal Jika form tidak di isi */}
            <ReactNativeModal isVisible={modalForm} onBackdropPress={() => setModalForm(false)} style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalForm(false)} >
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Silakan lengkapi seluruh form yang ada</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={() => setModalForm(false)} >
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
                        </TouchableOpacity>      
                    </View>
                </View>
            </ReactNativeModal> 

            {/* modal Jika form tidak di isi */}
            <ReactNativeModal isVisible={modalFormSucces} onBackdropPress={() => setModalFormSucces(false)} style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalFormSucces(false)} >
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Selamat kendala anda berhasil ditambah</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={GoLaporan} >
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
                        </TouchableOpacity>      
                    </View>
                </View>
            </ReactNativeModal> 

        </ScrollView>
    )
}

export default TambahKendala

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