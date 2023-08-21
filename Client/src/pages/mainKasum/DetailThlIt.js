import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState} from 'react'
import { BackIcon, CloseIcont, ExFoto, ExSakit, LgBappeda } from '../../assets/images';
import { PieChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import ReactNativeModal from 'react-native-modal';
import Pdf from 'react-native-pdf';

const DetailThlIt = ({route, navigation}) => {

    const {idUser} =route.params

    const [bulan, setBulan] = useState()
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

    const [isModalVisible2, setModalVisible2] = useState(false);

    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    }

    const [isModalVisible3, setModalVisible3] = useState(false);

    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    }

    // bar persentase
    const dataaa = [
        {
            name: "Hadir",
            population: 20,
            color: "#39a339",
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Sakit & Izin",
            population: 8,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Tidak Hadir",
            population: 2,
            color: "#F00",
            legendFontColor: "#000",
            legendFontSize: 12
        },
    ];

    const chartConfigg = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>DETAIL ASN</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran dan Laporan</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>
            <View style={{alignItems:"center", marginBottom:30}}>
                <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10 }}>

                    <View style={{justifyContent:"flex-end", marginBottom:10, flexDirection:"row" }}>
                        <TouchableOpacity style={{width:100, height:20, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginRight:10}} onPress={toggleModal}>
                            <Text style={{color:"#fff", fontSize:12, fontWeight:"600"}}>Bulan : {getStrMonth}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15}} onPress={toggleModal2}>
                            <Text style={{color:"#fff", fontSize:12, fontWeight:"600"}}>Laporan</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ color: "#000", fontSize: 18, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Detail Kehadiran Bulan {getStrMonth} {getYear}</Text>

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
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Hadir :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>20 Hari</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Sakit & Izin :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>8 Hari</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Tidak Hadir :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>2 Hari</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Persentase Kehadiran :</Text>
                    </View>
                    <PieChart
                        data={dataaa}
                        width={WindowWidth*0.8}
                        height={220}
                        chartConfig={chartConfigg}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 0]}
                        // absolute
                    />

                    <View style={{width:"100%",marginBottom:15}}>
                        <View style={{flexDirection:"row", backgroundColor:"#d9dcdf"}}>
                            <View style={{width:"35%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Hari/Tanggal</Text>
                            </View>
                            <View style={{width:"40%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Kegiatan</Text>
                            </View>
                            <View style={{width:"25%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Detail</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row", backgroundColor:"#FFF"}}>
                            <View style={{width:"35%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000",  padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                            </View>
                            <View style={{width:"40%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"500", textAlign:"justify"}}>Kehadiran</Text>
                            </View>
                            <View style={{width:"25%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <TouchableOpacity style={{width:60, height:20, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15}} onPress={toggleModal3}>
                                    <Text style={{fontWeight:'700', color:"white", fontSize:12}}>Detail</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <ReactNativeModal isVisible={isModalVisible} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalVisible(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Silakan Pilih Bulan Laporan</Text>
                    </View>
                    <View style={{alignItems:"center", width:"100%"}}>
                        <Picker
                            selectedValue={bulan}
                            onValueChange={(itemValue, itemIndex) => 
                                setBulan(itemValue)
                            }
                            style={{ width:"90%", height:20, borderRadius: 50,  fontWeight: "bold", color:"#000", backgroundColor: "#f3f3f3"}}
                            selectionColor={"#000"}
                            // dropdownIconRippleColor={"transparent"}
                            // dropdownIconColor={"transparent"}
                        >
                            <Picker.Item label="-" value="0"/>
                            <Picker.Item label="Januari" value="1"/>
                            <Picker.Item label="Februari" value="2"/>
                            <Picker.Item label="Maret" value="3"/>
                            <Picker.Item label="April" value="4"/>
                            <Picker.Item label="Mei" value="5"/>
                            <Picker.Item label="Juni" value="6"/>
                            <Picker.Item label="Juli" value="7"/>
                            <Picker.Item label="Agustus" value="8"/>
                            <Picker.Item label="September" value="9"/>
                            <Picker.Item label="Oktober" value="10"/>
                            <Picker.Item label="November" value="11"/>
                            <Picker.Item label="Desember" value="12"/>
                        </Picker>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:55,}}>
                        <TouchableOpacity style={bulan>0 ?  {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15} : {display:"none"}} onPress={()=> navigation.navigate('MainKasum')}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Cek Kehadiran</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={isModalVisible2} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalVisible(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "95%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal2}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Laporan Bulan {getStrMonth} {getYear}</Text>
                    </View>
                    <View>
                        <Pdf
                            trustAllCerts={false}
                            source={require('../../assets/file/exFile.pdf')}
                            style={{width:"100%", height:450}}
                            // renderActivityIndicator={loadSpinner}
                        />
                    </View>
                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={isModalVisible3} style={{ alignItems: 'center',  }} onBackdropPress={() => setModalVisible(false)} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "95%", minHeight: "35%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>
                    <TouchableOpacity style={{alignItems:'flex-end'}} onPress={toggleModal3}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:15, alignItems:"center", marginBottom:20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Detail Kegiatan</Text>
                    </View>

                    <View>
                        <View style={{marginBottom:20}}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Kegiatan:</Text>
                            <View style={{alignItems:"center"}}>
                                <View style={{width:"90%", minHeight:30, borderColor:"black", borderBottomWidth:0.5, }}>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textAlign:"justify"}}>Kehadiran</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Uraian Kegiatan:</Text>
                            <View style={{alignItems:"center"}}>
                                <View style={{width:"90%", minHeight:100, borderBottomWidth:0.5, borderColor:"black", }}>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500", textAlign:"justify"}}>Kehadiran</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginBottom:20}}>
                            <View style={{flexDirection:"row", marginBottom:10,  }}>
                                <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Foto Kegiatan :</Text>
                                <TouchableOpacity style={{width:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:100}}>
                                    <Text style={{fontWeight:'700', color:"white", fontSize:12}}>Download</Text>
                                </TouchableOpacity>
                                
                            </View>
                            <View style={{alignItems:"center"}}>
                                <View style={{width:"90%", height:150, borderWidth:0.5, borderColor:"black", alignItems:"center", justifyContent:"center", borderRadius:15}}>
                                    <Image source={ExSakit} style={{width:"100%", height:"100%"}}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ReactNativeModal>
        </ScrollView>
    )
}

export default DetailThlIt

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