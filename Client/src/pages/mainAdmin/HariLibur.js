import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BackIcon, CloseIcont, LgBappeda } from '../../assets/images'
import { Picker } from '@react-native-picker/picker';
import ReactNativeModal from 'react-native-modal';

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
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "November", "Desember"]
    const getStrMonth = namaBulan[monthUsed]

    const getYear = cekTgl.getFullYear()

    // modal
    const [dataBln, setDataBln] = useState()
    const [modalBln, setModalBln] = useState(false)
    const [modalOption, setModalOption] = useState(false)

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
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15}}>{dataBln? dataBln : getStrMonth} </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{width:"50%", alignItems:"flex-end", justifyContent:"center" }}>
                            <TouchableOpacity style={{width:100, height:30, borderRadius:15, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center"}} onPress={()=>navigation.navigate("TambahHariLibur")}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Tambah</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center", }}>Berikut Data Hari Libur Bulan Agustus</Text>

                    <View style={{width:"100%", marginTop:10, flexDirection:"row"}}>
                        <View style={{marginLeft:"5%",}}>
                            <View style={{width:50, backgroundColor:"#e82a39", borderRadius:50, height:50, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>17</Text>
                            </View>
                            
                            <View style={{width:50, alignItems:"center"}}>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                            </View>
                        </View>
                        <View style={{justifyContent:"center", marginLeft:25}}>
                            <TouchableOpacity style={{width:WindowWidth*0.6, height:50, backgroundColor:"white", borderRadius:10, elevation:10, alignItems:"center", justifyContent:"center", padding:5}} onPress={() => setModalOption(true)}>
                                <Text style={{ color: "#000", fontWeight: "500", fontSize: 10, fontFamily: "Spartan", textTransform:"capitalize", textAlign:"center"}}>Hari Kemerdekaan republik indonesia ke 78</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{width:"100%", marginTop:10, flexDirection:"row"}}>
                        <View style={{marginLeft:"5%",}}>
                            <View style={{width:50, backgroundColor:"#e82a39", borderRadius:50, height:50, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>17</Text>
                            </View>
                            
                            <View style={{width:50, alignItems:"center"}}>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                            </View>
                        </View>
                        <View style={{justifyContent:"center", marginLeft:25}}>
                            <TouchableOpacity style={{width:WindowWidth*0.6, height:50, backgroundColor:"white", borderRadius:10, elevation:10, alignItems:"center", justifyContent:"center", padding:5}} onPress={() => setModalOption(true)}>
                                <Text style={{ color: "#000", fontWeight: "500", fontSize: 10, fontFamily: "Spartan", textTransform:"capitalize", textAlign:"center"}}>Hari Kemerdekaan republik indonesia ke 78</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{width:"100%", marginTop:10, flexDirection:"row"}}>
                        <View style={{marginLeft:"5%",}}>
                            <View style={{width:50, backgroundColor:"#e82a39", borderRadius:50, height:50, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>17</Text>
                            </View>
                            
                            <View style={{width:50, alignItems:"center"}}>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                            </View>
                        </View>
                        <View style={{justifyContent:"center", marginLeft:25}}>
                            <TouchableOpacity style={{width:WindowWidth*0.6, height:50, backgroundColor:"white", borderRadius:10, elevation:10, alignItems:"center", justifyContent:"center", padding:5}} onPress={() => setModalOption(true)}>
                                <Text style={{ color: "#000", fontWeight: "500", fontSize: 10, fontFamily: "Spartan", textTransform:"capitalize", textAlign:"center"}}>Hari Kemerdekaan republik indonesia ke 78</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{width:"100%", marginTop:10, flexDirection:"row"}}>
                        <View style={{marginLeft:"5%",}}>
                            <View style={{width:50, backgroundColor:"#e82a39", borderRadius:50, height:50, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>17</Text>
                            </View>
                            
                            <View style={{width:50, alignItems:"center"}}>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                                <Text style={{ color: "#000", fontWeight: "900", fontSize: 8, fontFamily: "Spartan" }}>|</Text>
                            </View>
                        </View>
                        <View style={{justifyContent:"center", marginLeft:25}}>
                            <TouchableOpacity style={{width:WindowWidth*0.6, height:50, backgroundColor:"white", borderRadius:10, elevation:10, alignItems:"center", justifyContent:"center", padding:5}} onPress={() => setModalOption(true)}>
                                <Text style={{ color: "#000", fontWeight: "500", fontSize: 10, fontFamily: "Spartan", textTransform:"capitalize", textAlign:"center"}}>Hari Kemerdekaan republik indonesia ke 78</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

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
                    <View style={{alignItems:"center", width:"100%"}}>
                        
                        <Picker
                            selectedValue={dataBln}
                            onValueChange={(itemValue, itemIndex) => 
                                setDataBln(itemValue)
                            }
                            style={{ width:"90%", height:20, borderRadius: 50,  fontWeight: "bold", color:"#000", backgroundColor: "#f3f3f3"}}
                            selectionColor={"#000"}
                            // dropdownIconRippleColor={"transparent"}
                            // dropdownIconColor={"transparent"}
                        >
                            <Picker.Item label="-" value="-"/>
                            <Picker.Item label="Januari" value="Januari"/>
                            <Picker.Item label="Februari" value="Februari"/>
                            <Picker.Item label="Maret" value="Maret"/>
                            <Picker.Item label="April" value="April"/>
                            <Picker.Item label="Mei" value="Mei"/>
                            <Picker.Item label="Juni" value="Juni"/>
                            <Picker.Item label="Juli" value="Juli"/>
                            <Picker.Item label="Agustus" value="Agustus"/>
                            <Picker.Item label="September" value="September"/>
                            <Picker.Item label="Oktober" value="Oktober"/>
                            <Picker.Item label="November" value="November"/>
                            <Picker.Item label="Desember" value="Desember"/>
                        </Picker>
                        

                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:55,}}>
                        <TouchableOpacity style={{width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15}} onPress={()=>setModalBln(false)}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Cek Hari Libur</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>

            {/* edit / hapus */}
            <ReactNativeModal isVisible={modalOption} onBackdropPress={() => setModalOption(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalOption(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}> 17 Agustus 2023</Text>
                        <Text style={{ color: "#000", fontWeight: "500", fontSize: 10, fontFamily: "Spartan", textTransform:"capitalize", textAlign:"center", marginTop:15}}>Hari Kemerdekaan republik indonesia ke 78</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#fcc419", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={() => setModalOption(false)}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center",}} onPress={() => setModalOption(false)}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Hapus</Text>
                            </TouchableOpacity>
                        </View>     
                    </View>
                </View>
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