import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AddImgUser, BackIcon, ExFoto, LgBappeda } from '../../assets/images';
import { SelectList } from 'react-native-dropdown-select-list';

const DetailKehadiran = ({navigation}) => {
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;
    const [waktuMasuk, setWaktuMasuk] = useState("08.00")
    const [waktuPulang, setWaktuPulang] = useState("17.00")

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

    // select kehadiran
    const [selected, setSelected] = useState()

    const data = [
        {key:'Hadir', value:'Hadir'},
        {key:'Hadir Kegiatan', value:'Hadir Kegiatan'},
        {key:'Sakit', value:'Sakit'},
        {key:'Izin', value:'Izin'},
    ];

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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>KEHADIRAN</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Detail Kehadiran ASN</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>

            <View style={{alignItems:"center", marginBottom:50}}>
                <View style={{width:WindowWidth*0.9, minHeight:100, marginTop:0, alignItems:"center"}}>
                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center", textTransform:"capitalize",}}>Berikut Detail Kehadiran</Text>

                    <View style={{alignItems:"center"}}>
                        <Image source={ExFoto} style={{width:100, height:100, borderRadius:50}} resizeMode='cover'/>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15, textAlign:"center", marginTop:20}}>Muhammad Agung Sholihhudin</Text>
                        <Text style={{ fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginTop:5,  textAlign:"center"}}>Jabatan : Programmer</Text>
                    </View>

                    
                    <View style={{width:"100%", minHeight:50, borderRadius:15, padding:15, elevation:10, backgroundColor:"white", marginTop:30, alignItems:"center"}}>
                        <View style={{width:"95%", minHeight:20, marginBottom:25}}>
                            <Text style={{ fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginBottom:10}}>Status Kehadiran</Text>
                            <SelectList 
                                setSelected={setSelected}
                                data={data} 
                                placeholder='Select Kehadiran'
                                search={false}
                                maxHeight={200}

                                // default select
                                // defaultOption={{ key:'-', value:'-' }}
                            />
                        </View>
                        <View style={{width:"95%", minHeight:20, marginBottom:25}}>
                            <Text style={{ fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginBottom:0}}>Waktu Masuk</Text>
                            <View style={{borderBottomWidth:0.5, borderBottomColor:"black"}}>
                                <TextInput
                                    placeholder='Silakan Isi Waktu Masuk'
                                    placeholderTextColor={"#000"}
                                    value={waktuMasuk}
                                    keyboardType= "default"
                                    onChangeText={(text) => setWaktuMasuk(text)}
                                    style={{ color: "#000" }}
                                />
                            </View>
                        </View>
                        <View style={{width:"95%", minHeight:20, marginBottom:15}}>
                            <Text style={{ fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:12, marginBottom:0}}>Waktu Pulang</Text>
                            <View style={{borderBottomWidth:0.5, borderBottomColor:"black"}}>
                                <TextInput
                                    placeholder='Silakan Isi Waktu Pulang'
                                    placeholderTextColor={"#000"}
                                    value={waktuPulang}
                                    keyboardType= "default"
                                    onChangeText={(text) => setWaktuPulang(text)}
                                    style={{ color: "#000" }}
                                />
                            </View>
                        </View>

                        <View style={{alignItems:"center", width:"100%"}}>
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={()=>navigation.navigate("MainAdmin")}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Proses Kehadiran</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailKehadiran

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