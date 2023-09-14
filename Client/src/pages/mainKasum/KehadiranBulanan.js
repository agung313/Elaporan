import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import { BackIcon, LgBappeda, PasFoto } from '../../assets/images'


const KehadiranBulanan = ({navigation}) => {
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
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran Bulanan</Text>
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
                    <Text style={{ color: "#000", fontSize: 15, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Rekap Kehadiran bulan {getStrMonth} {getYear}</Text>

                    <View style={{width:"100%", alignItems:"center", marginTop:5, marginBottom:50}}>
                        {/* <View style={{width:"100%", marginBottom:15}}>
                            <TouchableOpacity style={{width:100, height:30, borderRadius:15, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center"}}>
                                <Text style={{fontWeight:'900', color:"#fff",  fontSize:12}}>Download File</Text>
                            </TouchableOpacity>
                        </View> */}
                        <TouchableOpacity style={{width:WindowWidth*0.9, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                            <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                
                                <View style={{justifyContent:"center",}}>
                                    <View style={{flexDirection:"row", alignItems:"center", width:"100%"}}>
                                        <View style={{padding:5, borderRadius:5, backgroundColor:"#39a339", marginRight:5}}>
                                            <Text style={{ color:"#fff",  fontSize:10, fontWeight:"600",}}>Hadir : 30</Text>
                                        </View>
                                        <View style={{padding:5, borderRadius:5, backgroundColor:"rgb(0, 0, 255)", marginRight:5}}>
                                            <Text style={{ color:"#fff",  fontSize:10, fontWeight:"600",}}>Sakit : 30</Text>
                                        </View>
                                        <View style={{padding:5, borderRadius:5, backgroundColor:"#0060cb", marginRight:5}}>
                                            <Text style={{ color:"#fff",  fontSize:10, fontWeight:"600",}}>Izin : 30</Text>
                                        </View>
                                        <View style={{padding:5, borderRadius:5, backgroundColor:"#F00", marginRight:0}}>
                                            <Text style={{ color:"#fff",  fontSize:10, fontWeight:"600",}}>Tidak Hadir : 30</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity> 

                        <TouchableOpacity style={{width:WindowWidth*0.9, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                            <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                
                                <View style={{justifyContent:"center",}}>
                                    <View style={{flexDirection:"row", alignItems:"center", width:"100%"}}>
                                        <View style={{padding:5, borderRadius:5, backgroundColor:"#39a339", marginRight:5}}>
                                            <Text style={{ color:"#fff",  fontSize:10, fontWeight:"600",}}>Hadir : 30</Text>
                                        </View>
                                        <View style={{padding:5, borderRadius:5, backgroundColor:"rgb(0, 0, 255)", marginRight:5}}>
                                            <Text style={{ color:"#fff",  fontSize:10, fontWeight:"600",}}>Sakit : 30</Text>
                                        </View>
                                        <View style={{padding:5, borderRadius:5, backgroundColor:"#0060cb", marginRight:5}}>
                                            <Text style={{ color:"#fff",  fontSize:10, fontWeight:"600",}}>Izin : 30</Text>
                                        </View>
                                        <View style={{padding:5, borderRadius:5, backgroundColor:"#F00", marginRight:0}}>
                                            <Text style={{ color:"#fff",  fontSize:10, fontWeight:"600",}}>Tidak Hadir : 30</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default KehadiranBulanan

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