import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { BackIcon, CloseIcont, FilterIcont, LgBappeda, CheckBlue, PasFoto } from '../../assets/images';
import SearchBar from 'react-native-dynamic-search-bar';
import ReactNativeModal from 'react-native-modal';

const DetailKehadiran = ({route, navigation}) => {
    const {strDay, numDay, strMonth, numYear, strStatus} = route.params
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

    // api
    const isFocused = useIsFocused();
    const base_url = ApiLink+'/api'  

    useEffect(() => {
    
    }, [navigation, isFocused])

    // filter 
    const [modalFilter, setModalFilter] = useState(false)
    const [valueJabatan, setValueJabatan] = useState("ASN")
    const [valueCheck, setValueCheck] = useState("ASN")
    const [chechkList, setChechkList] = useState(0)

    const asnValue = ()=>{
        setValueJabatan(valueCheck)
        setModalFilter(false)
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>DETAIL</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran Harian THL-IT</Text>
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
                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Berikut Detail Kehadiran ({strStatus})</Text>
                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:15, textAlign:"center"}}>{strDay}, {numDay} {strMonth} {numYear}</Text>

                    <View style={{width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"center", marginVertical:20}}>
                        <SearchBar
                            placeholder={'Search '}
                            style={{width:"80%", }}
                        />
                        <TouchableOpacity style={{width:"15%", height:40, backgroundColor:"#d9dedb", borderRadius:15, marginLeft:10, alignItems:"center", justifyContent:"center"}} onPress={()=> setModalFilter(true)}>
                            <Image source={FilterIcont} style={{width:35, height:35}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:"100%", alignItems:"center", marginTop:15,}}>
                        <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                            <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                
                                <View style={{justifyContent:"center",}}>
                                    <View style={{flexDirection:"row", alignItems:"center", width:190,marginRight:10}}>
                                        <Text style={{ color:"black",  fontSize:10}}>Status Kehadiran :</Text>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#39a339"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>Hadir</Text>
                                        </View>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#39a339"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>08:00:00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity> 

                        <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                            <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                
                                <View style={{justifyContent:"center",}}>
                                    <View style={{flexDirection:"row", alignItems:"center", width:190,marginRight:10}}>
                                        <Text style={{ color:"black",  fontSize:10}}>Status Kehadiran :</Text>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#FF7F00"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>Hadir Terlambat</Text>
                                        </View>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#FF7F00"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>08:50:00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity> 

                        <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                            <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                
                                <View style={{justifyContent:"center",}}>
                                    <View style={{flexDirection:"row", alignItems:"center", width:190,marginRight:10}}>
                                        <Text style={{ color:"black",  fontSize:10}}>Status Kehadiran :</Text>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#0060cb"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>Sakit</Text>
                                        </View>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#0060cb"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>08:50:00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity> 

                        <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                            <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                
                                <View style={{justifyContent:"center",}}>
                                    <View style={{flexDirection:"row", alignItems:"center", width:190,marginRight:10}}>
                                        <Text style={{ color:"black",  fontSize:10}}>Status Kehadiran :</Text>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#0060cb"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>Izin</Text>
                                        </View>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#0060cb"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>08:50:00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity> 

                        <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                            <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                
                                <View style={{justifyContent:"center",}}>
                                    <View style={{flexDirection:"row", alignItems:"center", width:190,marginRight:10}}>
                                        <Text style={{ color:"black",  fontSize:10}}>Status Kehadiran :</Text>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#CE2029"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>Izin</Text>
                                        </View>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#CE2029"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>08:50:00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity> 
                    </View>
                </View>

                
            </View>

            {/* modal filter */}
            <ReactNativeModal isVisible={modalFilter} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "60%", backgroundColor: "#fff", borderRadius: 10,  padding:10,}}>
                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={()=>{setModalFilter(false)}} >
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    
                    <View style={{width:"100%", alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:18}}>Filter Option Jabatan</Text>

                        <View style={{width:"90%", marginTop:20}}>
                            <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginBottom:10}} onPress={()=>{setChechkList(0),setValueCheck("ASN")}}>
                                {chechkList==0? 
                                    <Image source={CheckBlue} style={{width:20, height:20}}/>
                                :
                                    <View style={{width:20, height:20, borderWidth:1,}}></View>
                                }
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Seluruh ASN</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginBottom:10}} onPress={()=>{setChechkList(1),setValueCheck("Tenaga Operator Komputer ")}}>
                                {chechkList==1? 
                                    <Image source={CheckBlue} style={{width:20, height:20}}/>
                                :
                                    <View style={{width:20, height:20, borderWidth:1,}}></View>
                                }
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Tenaga Operator Komputer </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginBottom:10}} onPress={()=>{setChechkList(2),setValueCheck("Operator Multimedia")}}>
                                {chechkList==2? 
                                    <Image source={CheckBlue} style={{width:20, height:20}}/>
                                :
                                    <View style={{width:20, height:20, borderWidth:1,}}></View>
                                }
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Operator Multimedia</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginBottom:10}} onPress={()=>{setChechkList(3),setValueCheck("Operator Website")}}>
                                {chechkList==3? 
                                    <Image source={CheckBlue} style={{width:20, height:20}}/>
                                :
                                    <View style={{width:20, height:20, borderWidth:1,}}></View>
                                }
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Operator Website</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginBottom:10}} onPress={()=>{setChechkList(4),setValueCheck("Tenaga Supir")}}>
                                {chechkList==4? 
                                    <Image source={CheckBlue} style={{width:20, height:20}}/>
                                :
                                    <View style={{width:20, height:20, borderWidth:1,}}></View>
                                }
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Tenaga Supir</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginBottom:10}} onPress={()=>{setChechkList(5),setValueCheck("Tenaga Kebersihan")}}>
                                {chechkList==5? 
                                    <Image source={CheckBlue} style={{width:20, height:20}}/>
                                :
                                    <View style={{width:20, height:20, borderWidth:1,}}></View>
                                }
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Tenaga Kebersihan</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginBottom:10}} onPress={()=>{setChechkList(6),setValueCheck("Tenaga IT Jaringan")}}>
                                {chechkList==6? 
                                    <Image source={CheckBlue} style={{width:20, height:20}}/>
                                :
                                    <View style={{width:20, height:20, borderWidth:1,}}></View>
                                }
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Tenaga IT Jaringan</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginBottom:10}} onPress={()=>{setChechkList(7),setValueCheck("Tenaga IT Multimedia")}}>
                                {chechkList==7? 
                                    <Image source={CheckBlue} style={{width:20, height:20}}/>
                                :
                                    <View style={{width:20, height:20, borderWidth:1,}}></View>
                                }
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Tenaga IT Multimedia</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginBottom:10}} onPress={()=>{setChechkList(8),setValueCheck("Tenaga IT Programer")}}>
                                {chechkList==8? 
                                    <Image source={CheckBlue} style={{width:20, height:20}}/>
                                :
                                    <View style={{width:20, height:20, borderWidth:1,}}></View>
                                }
                                <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Tenaga IT Programer</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:"100%", height:30, alignItems:"center", justifyContent:"center", borderRadius:15, backgroundColor:"#39a339", marginTop:10}} onPress={asnValue}>
                                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>Check Kehadiran</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ReactNativeModal>
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