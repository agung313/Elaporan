import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { AddImg, BackIcon, CloseIcont, DeletedIcont, EditIcont, ExFoto, LgBappeda } from '../../../assets/images'
import ReactNativeModal from 'react-native-modal'

const Detail = ({navigation}) => {

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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>ABSENSI</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Detail Absensi</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>
            <View style={{alignItems:"center", marginBottom:30}}>
                <View style={{width:WindowWidth*0.9, minHeight:200, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10 }}>
                    <Text style={{ color: "#000", fontSize: 18, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Detail Absensi</Text>

                    <View style={{alignItems:"center"}}>
                        <View style={{flexDirection:"row", marginBottom:15}}>
                            <View style={{width:"35%", minHeight:25, justifyContent:"center", marginRight:10}}>
                            <Image source={ExFoto} style={{width:"100%", height:190}}/>
                            </View>
                            <View style={{width:"55%", minHeight:25,}}>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Nama :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Muhammad Agung Sholihhudin, S.T</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Jabatan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Programmer</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Status Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Hadir</Text>
                                </View>
                                {/* <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Lokasi Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Kantor Walikota Pekanbaru</Text>
                                </View> */}
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Masuk :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{localeTime} wib</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Pulang :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{localeTime} wib</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto Kegiatan :</Text>
                        <View style={{alignItems:"center", marginBottom:20}}>
                            <View style={{width:"90%", height:150, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}}>
                                <Image source={AddImg} style={{width:100, height:100}}/>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail Kegiatan :</Text>
                        <View style={{alignItems:"center", marginBottom:20}}>
                            <View style={{width:"90%", minHeight:10, borderBottomWidth:0.5, borderColor:"black"}}>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginLeft:10, marginBottom:5}}>Kehadiran</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:"row", marginBottom:10, marginTop:20 }}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Kegiatan Hari Ini :</Text>
                        <TouchableOpacity style={{width:120, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:20}} onPress={() => navigation.navigate("Tambah")}>
                            <Text style={{fontWeight:'700', color:"white", fontSize:12}}>
                                Tambah Kegiatan
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{width:"100%",marginBottom:15}}>
                        <View style={{flexDirection:"row", backgroundColor:"#d9dcdf"}}>
                            <View style={{width:"10%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>No</Text>
                            </View>
                            <View style={{width:"60%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Kegiatan</Text>
                            </View>
                            <View style={{width:"30%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Aksi</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row", backgroundColor:"#fff"}}>
                            <View style={{width:"10%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>1</Text>
                            </View>
                            <View style={{width:"60%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Kehadiran</Text>
                            </View>
                            <View style={{width:"30%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center", flexDirection:"row"}}>
                                <TouchableOpacity style={{width:"40%", justifyContent:"center", alignItems:"center"}} onPress={() => navigation.navigate("Edit")}>
                                    <Image source={EditIcont} style={{width:25, height:25}} />
                                </TouchableOpacity>

                                <TouchableOpacity style={{width:"40%", justifyContent:"center", alignItems:"center"}} onPress={toggleModal}>
                                    <Image source={DeletedIcont} style={{width:30, height:30}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                </View>

            </View>
            <ReactNativeModal isVisible={isModalVisible} style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Detail Kegiatan Anda</Text>
                    </View>
                    
                    <View style={{marginBottom:20, borderBottomWidth:0.5, borderColor:"black"}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:10}}>Kegiatan :</Text>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginBottom:10, marginLeft:20,}}>Kehadiran</Text>
                    </View>
                    <View style={{marginBottom:20, borderBottomWidth:0.5, borderColor:"black"}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:10}}>Uraian Kegiatan :</Text>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"500", marginBottom:10, marginLeft:20,}}>80.00.00 wib</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                        <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={toggleModal}>
                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={toggleModal}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Hapus</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>
        </ScrollView>
    )
}

export default Detail

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