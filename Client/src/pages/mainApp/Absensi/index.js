import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AddImg, BackIcon, ExFoto, LgBappeda } from '../../../assets/images'


const Absensi = ({route, navigation}) => {
    const {kehadiran} = route.params
    console.log(kehadiran, "<====  status kehadiran")
    const [cekStatus, setCekStatus] = useState(kehadiran)

    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // input
    const [detail, setDetail] = useState()

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
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                {/* <View style={{ width: "35%", alignItems: 'flex-end' }}>
                    <Menu >
                        <MenuTrigger><Image source={Tab} style={styles.lgHead}/></MenuTrigger>
                        <MenuOptions style={{ padding: 10 }}>
                            <ModalSide/>
                        </MenuOptions>
                    </Menu>
                </View> */}
            </View>
            <View style={{alignItems:"center", marginBottom:30}}>
                <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10 }}>
                    <Text style={{ color: "#000", fontSize: 18, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Detail Kehadiran</Text>

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
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>
                                        {kehadiran==1 ? "Hadir" : ""}
                                        {kehadiran==2 ? "Hadir Kegiatan" : ""}
                                        {kehadiran==3 ? "Sakit" : ""}
                                        {kehadiran==4 ? "Izin" : ""}
                                    </Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Lokasi Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Kantor Walikota Pekanbaru</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Waktu Kehadiran :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>08:00 wib</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={kehadiran==1 ? {alignItems:"center"} : {display:"none"}}>
                        <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={kehadiran==2 ? {display:"flex"} : {display:"none"}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto Kegiatan :</Text>
                        <View style={{alignItems:"center", marginBottom:20}}>
                            <TouchableOpacity style={{width:"90%", height:150, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}}>
                                <Image source={AddImg} style={{width:100, height:100}}/>
                            </TouchableOpacity>
                        </View>

                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail Kegiatan :</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", height:100, borderWidth:0.5, borderColor:"black",borderRadius:15}}>
                                <TextInput
                                        placeholder=''
                                        placeholderTextColor={"#000"}
                                        value={detail}
                                        keyboardType= "default"
                                        onChangeText={(text) => setDetail(text)}
                                        style={{ color: "#000" }}
                                        multiline
                                    />
                            </View>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={kehadiran==3 ? {display:"flex"} : {display:"none"}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto Surat Keterangan Sakit :</Text>
                        <View style={{alignItems:"center", marginBottom:20}}>
                            <TouchableOpacity style={{width:"90%", height:150, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}}>
                                <Image source={AddImg} style={{width:100, height:100}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={kehadiran==4 ? {display:"flex"} : {display:"none"}}>

                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Detail Izin :</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", height:100, borderWidth:0.5, borderColor:"black",borderRadius:15}}>
                                <TextInput
                                        placeholder=''
                                        placeholderTextColor={"#000"}
                                        value={detail}
                                        keyboardType= "default"
                                        onChangeText={(text) => setDetail(text)}
                                        style={{ color: "#000" }}
                                        multiline
                                    />
                            </View>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Buat Absensi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    

                </View>
            </View>
        </ScrollView>
    )
}

export default Absensi

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