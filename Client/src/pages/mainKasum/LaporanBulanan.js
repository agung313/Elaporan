import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import { BackIcon, DownBarIcont, LgBappeda, PasFoto, UpBarIcont } from '../../assets/images'


const LaporanBulanan = ({navigation}) => {
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
    const [isTelahDilapor, setTelahDilapor] = useState(true);
    console.log(isTelahDilapor, "<<<<< telah dilaporkan");
    const toggleModal = () => {
        setTelahDilapor(!isTelahDilapor);
    }

    const [isBelumDilapor, setBelumDilapor] = useState(true);
    console.log(isBelumDilapor, "<<<<< Belum dilaporkan");
    const toggleModalBelum = () => {
        setBelumDilapor(!isBelumDilapor);
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>DATA REKAP</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Laporan Bulanan</Text>
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
                    <Text style={{ color: "#000", fontSize: 15, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Rekap Laporan bulan {getStrMonth} {getYear}</Text>

                    <View style={{width:"100%", alignItems:"center", marginTop:5, marginBottom:50}}>
                        <TouchableOpacity style={{width:"95%", height:30, flexDirection:"row", alignItems:"center", borderBottomWidth:0.5}} onPress={toggleModal}>
                            <Text style={{ color: "#000", fontSize: 12, fontFamily: "Spartan", }}>Telah Melaporkan Laporan</Text>
                            <View style={{alignItems:"flex-end", width:"50%",}}>
                                <Image source={isTelahDilapor?DownBarIcont:UpBarIcont} style={{width:20, height:20}}/>
                            </View>
                        </TouchableOpacity>

                        <View style={isTelahDilapor?{marginTop:20}:{display:"none"}}>
                            <TouchableOpacity style={{width:WindowWidth*0.90, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20}}>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2, marginVertical:5}}/>
                                    <View style={{marginLeft:10, marginVertical:5}}>
                                        <Text style={{fontWeight:'900', color:"black",  fontSize:12, marginBottom:5,}}>Muhammad Agung Sholihhudin, S.T</Text>
                                        <Text style={{ color:"black",  fontSize:10, fontWeight:"500"}}>Laporan Diajukan : Bulan September 2023</Text>
                                    </View>
                                </View>
                                
                                <View style={{marginTop:-60, alignItems:"flex-end"}}>
                                    {/* <Text style={{fontSize:11, color:'black', fontWeight:'600', backgroundColor:'#f5c542', borderTopLeftRadius:5, borderBottomLeftRadius:5, padding:5}}>{namaBulan[item.bulan]+' '+item.tahun}</Text> */}
                                    {/* <Text style={{fontSize:11,color:'white', fontWeight:'600', backgroundColor:'#d742f5', borderTopRightRadius:5, borderBottomRightRadius:5, padding:5, textTransform:"capitalize"}}>{item.status}</Text> */}
                                    <Text style={{fontSize:11,color:'white', fontWeight:'600', backgroundColor:'#39a339', borderTopRightRadius:5, borderBottomRightRadius:5, padding:5, textTransform:"capitalize"}}>Diterima</Text>
                                </View>
                            </TouchableOpacity> 
                        </View>

                        {/* belum diterima */}
                        <TouchableOpacity style={{width:"95%", height:30, flexDirection:"row", alignItems:"center", borderBottomWidth:0.5, marginTop:20}} onPress={toggleModalBelum}>
                            <Text style={{ color: "#000", fontSize: 12, fontFamily: "Spartan", }}>Telah Melaporkan Laporan</Text>
                            <View style={{alignItems:"flex-end", width:"50%",}}>
                                <Image source={isBelumDilapor?DownBarIcont:UpBarIcont} style={{width:20, height:20}}/>
                            </View>
                        </TouchableOpacity>

                        <View style={isBelumDilapor?{marginTop:20}:{display:"none"}}>
                            <TouchableOpacity style={{width:WindowWidth*0.90, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20}}>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2, marginVertical:5}}/>
                                    <View style={{marginLeft:10, marginVertical:5}}>
                                        <Text style={{fontWeight:'900', color:"black",  fontSize:12, marginBottom:5,}}>Muhammad Agung Sholihhudin, S.T</Text>
                                        <Text style={{ color:"black",  fontSize:10, fontWeight:"500"}}>Laporan Diajukan : Bulan September 2023</Text>
                                    </View>
                                </View>
                                
                                <View style={{marginTop:-60, alignItems:"flex-end"}}>
                                    <Text style={{fontSize:11,color:'white', fontWeight:'600', backgroundColor:'#d742f5', borderTopRightRadius:5, borderBottomRightRadius:5, padding:5, textTransform:"capitalize"}}>Diajukan</Text>
                                </View>
                            </TouchableOpacity> 
                            <TouchableOpacity style={{width:WindowWidth*0.90, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20}}>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2, marginVertical:5}}/>
                                    <View style={{marginLeft:10, marginVertical:5}}>
                                        <Text style={{fontWeight:'900', color:"black",  fontSize:12, marginBottom:5,}}>Muhammad Agung Sholihhudin, S.T</Text>
                                        <Text style={{ color:"black",  fontSize:10, fontWeight:"500"}}>Laporan Diajukan : Bulan September 2023</Text>
                                    </View>
                                </View>
                                
                                <View style={{marginTop:-60, alignItems:"flex-end"}}>
                                    <Text style={{fontSize:11,color:'white', fontWeight:'600', backgroundColor:'#F00', borderTopRightRadius:5, borderBottomRightRadius:5, padding:5, textTransform:"capitalize"}}>Ditolak</Text>
                                </View>
                            </TouchableOpacity> 
                        </View>
                        
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default LaporanBulanan

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