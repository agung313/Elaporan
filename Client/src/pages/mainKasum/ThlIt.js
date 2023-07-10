import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { BackIcon, ExFoto, LgBappeda, PasFoto } from '../../assets/images';
import SearchBar from 'react-native-dynamic-search-bar';

const ThlIt = ({navigation}) => {
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>THL-IT</Text>
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
                    <SearchBar
                        placeholder='Search here'
                        style={{marginBottom:20, width:"100%"}}
                    />

                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Berikut Data THL-IT</Text>

                    <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate('DetailThlIt')}>
                        <Image source={ExFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Jabatan : IT Programmer</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}}>
                        <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Ondri Nurdiansyah, S.T</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Jabatan : IT Programmer</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}}>
                        <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>M. Azhwan, S.T</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Jabatan : IT Programmer</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default ThlIt

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