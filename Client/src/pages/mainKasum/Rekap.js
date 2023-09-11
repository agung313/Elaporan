import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackIcon, CheckBlue, CloseIcont, FilterIcont, LgBappeda, PasFoto } from '../../assets/images';
import { Picker } from '@react-native-picker/picker';
import ReactNativeModal from 'react-native-modal';
import { useIsFocused } from '@react-navigation/native';
import SearchBar from 'react-native-dynamic-search-bar';
import Calendar from "react-native-calendar-range-picker";
import { PieChart } from 'react-native-chart-kit';

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
    console.log(showContent,"<<<<< show conten");
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

    // filter 
    const [modalFilter, setModalFilter] = useState(false)
    const [valueJabatan, setValueJabatan] = useState("ASN")
    const [valueCheck, setValueCheck] = useState("ASN")
    const [chechkList, setChechkList] = useState(0)

    // filter status
    const [valueStatus, setValueStatus] = useState('All')
    const [statusCheck, setStatusCheck] = useState('All')
    const [listStatus, setListStatus] = useState(0)

    const asnValue = ()=>{
        setValueJabatan(valueCheck)
        setValueStatus(statusCheck)
        setModalFilter(false)
    }

    // kalendar kehadiran
    const [modalCalendar, setModaCalendar] = useState(false)
    const CUSTOM_LOCALE = {
        monthNames: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'October',
        'November',
        'Desember',
        ],
        dayNames: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        today: 'Hari Ini',
        year: '', // letter behind year number -> 2020{year}
    }

    const [startCal, setStartCal] = useState()
    const [endCal, setEndCal] = useState()

    // piechart
    const dataaa = [
        {
            name: "Hadir",
            population: 20,
            color: "#39a339",
            legendFontColor: "#000",
            legendFontSize: 10,
            
        },
        {
            name: "Sakit & Izin",
            population: 10,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#000",
            legendFontSize: 10
        },
        {
            name: "Belum Absen",
            population:  10,
            color: "#F00",
            legendFontColor: "#000",
            legendFontSize: 10
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
 
                    {/* <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:15, textAlign:"center"}}>Berikut Rekap Kehadiran dan Laporan</Text> */}

                    <View style={{flexDirection:"row", marginBottom:10}}>
                        <TouchableOpacity style={showContent===1? {backgroundColor:"#39a339", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"} : {backgroundColor:"#d9dcdf", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center", }} onPress={() => toggleContent(1)}>
                                
                            <Text style={showContent==1?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Harian</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={showContent==2?{backgroundColor:"#39a339", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}:{backgroundColor:"#d9dcdf", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}} onPress={() => toggleContent(2)}>
                                
                            <Text style={showContent===2?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Bulanan</Text>
                            
                        </TouchableOpacity>
                    </View>

                    <View style={showContent==1?{display:"flex", width:"100%", alignItems:"center", marginBottom:50}:{display:"none"}}>
                        <View style={{flexDirection:"row", width:"100%", justifyContent:"center", alignItems:"center"}}>
                            <View style={{ justifyContent:"center"}}>
                                <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Rekap Kehadiran :</Text>
                            </View>
                            <View style={{justifyContent:"center", alignItems:"center", marginLeft:10}}>
                                <TouchableOpacity style={{minWidth:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:0}} onPress={()=>setModaCalendar(true)}>
                                    <Text style={{color:"#fff", fontSize:12, fontWeight:"600", marginHorizontal:5}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"center", marginVertical:20}}>
                            <SearchBar
                                placeholder={'Search '+valueJabatan}
                                style={{width:"80%", }}
                            />
                            <TouchableOpacity style={{width:"15%", height:40, backgroundColor:"#d9dedb", borderRadius:15, marginLeft:10, alignItems:"center", justifyContent:"center"}} onPress={()=> setModalFilter(true)}>
                                <Image source={FilterIcont} style={{width:35, height:35}}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:0, marginBottom:0}}>Jumlah ASN Telah Melakukan Absensi {progressValue} dari {allValue} Orang</Text>

                        <View style={{width:"100%", alignItems:"center", marginTop:20}}>
                            <PieChart
                                data={dataaa}
                                width={WindowWidth*0.8}
                                height={150}
                                chartConfig={chartConfigg}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"5"}
                                center={[10, 0]}
                                key={showContent}
                                // absolute
                            />

                            <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                                <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                                <View style={{marginLeft:10}}>
                                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                    
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Text style={{ color:"black",  fontSize:10}}>Status Kehadiran :</Text>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#39a339"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>Hadir</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity> 

                            <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                                <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                                <View style={{marginLeft:10}}>
                                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                    
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Text style={{ color:"black",  fontSize:10}}>Status Kehadiran :</Text>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#FF7F00"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>Hadir Terlambat</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity> 

                            <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                                <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                                <View style={{marginLeft:10}}>
                                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                    
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Text style={{ color:"black",  fontSize:10}}>Status Kehadiran :</Text>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#0060cb"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>Sakit</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity> 

                            <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                                <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                                <View style={{marginLeft:10}}>
                                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                    
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Text style={{ color:"black",  fontSize:10}}>Status Kehadiran :</Text>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#0060cb"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>Izin</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity> 

                            <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} >
                                <Image source={PasFoto} style={{width:40,height:55, marginLeft:15, borderRadius:2}}/>
                                <View style={{marginLeft:10}}>
                                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Muhammad Agung Sholihhudin, S.T</Text>
                                    
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Text style={{ color:"black",  fontSize:10}}>Status Kehadiran :</Text>
                                        <View style={{minWidth:30, height:15, justifyContent:"center", alignItems:"center", borderRadius:10, marginLeft:5, backgroundColor:"#CE2029"}}>
                                            <Text style={{ color:"#fff",  fontSize:10, marginHorizontal:10, fontWeight:"600"}}>Belum Absen</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity> 
                        </View>
                        

                        {/* <View style={{width:"100%", marginTop:20, marginBottom:10, minHeight:WindowHeight*0.45}}>
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
                        </View> */}

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

                            <View style={{width:"100%", marginTop:5, marginBottom:10, minHeight:WindowHeight*0.35}}>
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
                            </View>

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

            {/* modal filter */}
            <ReactNativeModal isVisible={modalFilter} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "90%", backgroundColor: "#fff", borderRadius: 10,  padding:10,}}>
                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={()=>{setModalFilter(false)}} >
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    
                    <View style={{width:"100%", alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:18}}>Filter Option Kehadiran</Text>

                        <View style={{width:"90%", marginTop:0}}>
                            <Text style={{fontWeight:'900', color:"grey", textShadowColor:"#000", fontSize:12, marginVertical:10}}>Options Status :</Text>

                            <View style={{width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
                                <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginRight:10, marginBottom:10}} onPress={()=>{setListStatus(0),setValueStatus("All")}}>
                                    {listStatus==0? 
                                        <Image source={CheckBlue} style={{width:20, height:20}}/>
                                    :
                                        <View style={{width:20, height:20, borderWidth:1,}}></View>
                                    }
                                    <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>All Status</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
                                <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginRight:10, marginBottom:10}} onPress={()=>{setListStatus(1),setValueStatus("Hadir")}}>
                                    {listStatus==1? 
                                        <Image source={CheckBlue} style={{width:20, height:20}}/>
                                    :
                                        <View style={{width:20, height:20, borderWidth:1,}}></View>
                                    }
                                    <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Hadir</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
                                <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginRight:10, marginBottom:10}} onPress={()=>{setListStatus(2),setValueStatus("Hadir Kegiatan")}}>
                                    {listStatus==2? 
                                        <Image source={CheckBlue} style={{width:20, height:20}}/>
                                    :
                                        <View style={{width:20, height:20, borderWidth:1,}}></View>
                                    }
                                    <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Hadir Kegiatan</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
                                <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginRight:10, marginBottom:10}} onPress={()=>{setListStatus(3),setValueStatus("Sakit")}}>
                                    {listStatus==3? 
                                        <Image source={CheckBlue} style={{width:20, height:20}}/>
                                    :
                                        <View style={{width:20, height:20, borderWidth:1,}}></View>
                                    }
                                    <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Sakit</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
                                <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginRight:10, marginBottom:10}} onPress={()=>{setListStatus(4),setValueStatus("Izin")}}>
                                    {listStatus==4? 
                                        <Image source={CheckBlue} style={{width:20, height:20}}/>
                                    :
                                        <View style={{width:20, height:20, borderWidth:1,}}></View>
                                    }
                                    <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Izin</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
                                <TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginRight:10, marginBottom:10}} onPress={()=>{setListStatus(5),setValueStatus("Belum Absen")}}>
                                    {listStatus==5? 
                                        <Image source={CheckBlue} style={{width:20, height:20}}/>
                                    :
                                        <View style={{width:20, height:20, borderWidth:1,}}></View>
                                    }
                                    <Text style={{fontWeight:'500', color:"black", textShadowColor:"#000", fontSize:15, marginLeft:10}}>Belum Absen</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <Text style={{fontWeight:'900', color:"grey", textShadowColor:"#000", fontSize:12, marginVertical:10}}>Options Jabatan :</Text>
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

            {/* modal kalender */}
            <ReactNativeModal isVisible={modalCalendar} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "70%", backgroundColor: "#fff", borderRadius: 10,  padding:10,}}>
                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={()=>{setModaCalendar(false)}} >
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:18}}>Kalender Kehadiran</Text>
                    </View>
                    <View style={{width:"100%", height:350}}>
                        <Calendar
                            locale={CUSTOM_LOCALE}
                            startDate=""
                            endDate=""
                            // onChange={({ startDate, endDate }) => {setStartCal(startDate), setEndCal(endDate)}}
                            onChange={({ startDate}) => {setStartCal(startDate)}}
                            singleSelectMode
                            
                        />
                    </View>

                    <View style={{width:"100%", alignItems:"center"}}>
                        <TouchableOpacity style={{width:"90%", height:30, alignItems:"center", justifyContent:"center", borderRadius:15, backgroundColor:"#39a339", marginTop:10}} >
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>Check Kehadiran</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ReactNativeModal>
        </ScrollView>
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