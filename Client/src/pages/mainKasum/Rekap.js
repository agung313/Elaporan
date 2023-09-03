import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackIcon, CloseIcont, LgBappeda } from '../../assets/images';
import { Picker } from '@react-native-picker/picker';
import ReactNativeModal from 'react-native-modal';
import { useIsFocused } from '@react-navigation/native';

const Rekap = ({navigation}) => {
    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    const isFocused = useIsFocused()
    useEffect(()=>{
        if(isFocused){
            hitungPersen()
        }
    },[navigation, isFocused])

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

    // showcontent
    const [showContent, setShowContent] = useState(1)
    const toggleContent = (e)=>{
        setShowContent(e);
    }

    // modal
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    // get bulan
    const [aktifBulan, setAktifBulan] = useState(monthUsed)
    const [aktifTahun, setAktifTahun] = useState(getYear)

    // progress bar
    const [allValue, setAllValue] = useState(38)
    const [progressValue, setProgressValue] = useState(10)
    const [nilaiPersen, setNilaiPersen] = useState()
    console.log(nilaiPersen, "<<<< nilai persen");


    const hitungPersen = () =>{
        const hasilBagi = progressValue/allValue
        const hasilKali = hasilBagi*100
        const pembulatan = hasilKali.toFixed(0)
        setNilaiPersen(`${pembulatan}%`)
    }



    return (
        <View>
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>DATA REKAP</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran dan Laporan</Text>
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
 
                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:15, textAlign:"center"}}>Berikut Rekap Kehadiran dan Laporan</Text>

                    <View style={{flexDirection:"row", marginBottom:10}}>
                        <TouchableOpacity style={showContent===1? {backgroundColor:"#39a339", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"} : {backgroundColor:"#d9dcdf", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center", }} onPress={() => toggleContent(1)}>
                                
                            <Text style={showContent===1?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Kehadiran</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={showContent===2?{backgroundColor:"#39a339", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}:{backgroundColor:"#d9dcdf", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}} onPress={() => toggleContent(2)}>
                                
                            <Text style={showContent===2?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Laporan</Text>
                            
                        </TouchableOpacity>
                    </View>

                    <View style={showContent==1?{display:"flex", width:"100%"}:{display:"none"}}>
                        <View style={{flexDirection:"row", width:"100%", justifyContent:"center", alignItems:"center"}}>
                            <View style={{ justifyContent:"center"}}>
                                <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Rekap Kehadiran Bulan</Text>
                            </View>
                            <View style={{justifyContent:"center"}}>
                                <TouchableOpacity style={{width:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:10}} onPress={toggleModal}>
                                    <Text style={{color:"#fff", fontSize:12, fontWeight:"600"}}>{namaBulan[aktifBulan]}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView style={{width:"100%", marginTop:20, marginBottom:10, height:WindowHeight*0.45}}>
                            <View style={{width:"100%", alignItems:"center"}}>
                                <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                    <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Agus Supriyadin, S.T</Text>
                                </View>
                                <View style={{width:"90%", flexDirection:"row"}}>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Hadir : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Izin : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Sakit : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Alfa : 50</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:"100%", alignItems:"center"}}>
                                <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                    <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Ondri Nurdiansyah, S.T</Text>
                                </View>
                                <View style={{width:"90%", flexDirection:"row"}}>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Hadir : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Izin : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Sakit : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Alfa : 50</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:"100%", alignItems:"center"}}>
                                <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                    <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>M. Azhwan, S.T</Text>
                                </View>
                                <View style={{width:"90%", flexDirection:"row"}}>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Hadir : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Izin : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Sakit : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Alfa : 50</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:"100%", alignItems:"center"}}>
                                <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                    <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Muhammad Agung Sholihhudin, S.T</Text>
                                </View>
                                <View style={{width:"90%", flexDirection:"row"}}>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Hadir : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Izin : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Sakit : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Alfa : 50</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:"100%", alignItems:"center"}}>
                                <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                    <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Elisa Wahyuli</Text>
                                </View>
                                <View style={{width:"90%", flexDirection:"row"}}>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Hadir : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Izin : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Sakit : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Alfa : 50</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:"100%", alignItems:"center"}}>
                                <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                    <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Aulia Thamrin</Text>
                                </View>
                                <View style={{width:"90%", flexDirection:"row"}}>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Hadir : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Izin : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Sakit : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Alfa : 50</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:"100%", alignItems:"center"}}>
                                <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                    <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Fadia Herman</Text>
                                </View>
                                <View style={{width:"90%", flexDirection:"row"}}>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Hadir : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Izin : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Sakit : 50</Text>
                                    </View>
                                    <View style={{width:"25%", borderWidth:0.5, borderColor:"#000", alignItems:"center",justifyContent:"center"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0, textAlign:"center"}}>Alfa : 50</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>

                        <View style={{width:"100%", alignItems:"center"}}>
                            <TouchableOpacity style={{width:"70%", height:40, borderRadius:15, backgroundColor:"#39a339", elevation:10, alignItems:"center", justifyContent:"center"}}>
                                <Text style={{color:"#fff", fontSize:14, fontWeight:"600"}}>Download Rekap Kehadiran</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={showContent==2?{display:"flex", width:"100%"}:{display:"none"}}>
                        <View style={{width:"100%", alignItems:"center"}}>
                            <View style={{width:"90%", marginBottom:10, flexDirection:"row", marginTop:10, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0}}>Pengumpulan Laporan Bulan </Text>
                                <View style={{justifyContent:"center"}}>
                                <TouchableOpacity style={{width:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:10}} onPress={toggleModal}>
                                    <Text style={{color:"#fff", fontSize:12, fontWeight:"600"}}>{namaBulan[aktifBulan]}</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                            <View style={{width:"90%", height:25, borderRadius:20, backgroundColor:"#d9dcdf"}}>
                                <View style={{width:nilaiPersen, height:"100%", borderRadius:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{ color: "#fff", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>{nilaiPersen}</Text>
                                </View>
                            </View>
                            <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:5, marginBottom:0}}>{progressValue} dari {allValue} Orang</Text>
                            <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:10, marginBottom:0}}>Berikut ASN Belum Melaporkan Laporan :</Text>

                            <ScrollView style={{width:"100%", marginTop:5, marginBottom:10, height:WindowHeight*0.35}}>
                                <View style={{width:"100%", alignItems:"center"}}>
                                    <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Agus Supriyadin, S.T</Text>
                                    </View>
                                    <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Agus Supriyadin, S.T</Text>
                                    </View>
                                    <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Agus Supriyadin, S.T</Text>
                                    </View>
                                    <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Agus Supriyadin, S.T</Text>
                                    </View>
                                    <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Agus Supriyadin, S.T</Text>
                                    </View>
                                    <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Agus Supriyadin, S.T</Text>
                                    </View>
                                    <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Agus Supriyadin, S.T</Text>
                                    </View>
                                    <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Agus Supriyadin, S.T</Text>
                                    </View>
                                    <View style={{width:"90%", height:30, borderWidth:0.5, borderColor:"#000", justifyContent:"center", backgroundColor:"#d9dcdf"}}>
                                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Agus Supriyadin, S.T</Text>
                                    </View>
                                </View>
                            </ScrollView>

                            <View style={{width:"100%", alignItems:"center"}}>
                                <TouchableOpacity style={{width:"70%", height:40, borderRadius:15, backgroundColor:"#39a339", elevation:10, alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{color:"#fff", fontSize:14, fontWeight:"600"}}>Download Rekap Laporan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* pilih bulan aktif */}
            <ReactNativeModal isVisible={isModalVisible} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalVisible(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Silakan Pilih Bulan Kehadiran</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignItems:"center", width:"50%"}}>
                            <Picker
                                selectedValue={aktifBulan}
                                onValueChange={(itemValue, itemIndex) => 
                                    setAktifBulan(itemValue)
                                    // console.log(itemValue)
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
                                selectedValue={aktifTahun}
                                onValueChange={(itemValue, itemIndex) => 
                                    setAktifTahun(itemValue)
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
                        <TouchableOpacity style={aktifBulan>0 ?  {width:"90%", height:40, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15} : {display:"none"}} onPress={toggleModal}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Cek Kehadiran</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>
        </View>
    )
}

export default Rekap

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