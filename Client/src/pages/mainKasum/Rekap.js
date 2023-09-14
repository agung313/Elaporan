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
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September","Oktober", "November", "Desember"]
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

    // progress bar laporan bulanan
    const [allValue, setAllValue] = useState(38)
    const [progressValue, setProgressValue] = useState(10)
    const [nilaiPersen, setNilaiPersen] = useState()
    console.log(nilaiPersen, "<<<< nilai persen");

    // progress bar kehadiran harian
    const [progressHadir, setProgressHadir] = useState(20)
    const [progressKegiatan, setProgressKegiatan] = useState(3)
    const [progressSakit, setProgressSakit] = useState(2)
    const [progressIzin, setProgressIzin] = useState(3)
    const [progressBelumAbsen, setProgressBelumAbsen] = useState(10)

    // persen 
    const [nilaiPersenHadir, setNilaiPersenHadir] = useState()
    const [nilaiPersenHadirKegiatan, setNilaiPersenHadirKegiatan] = useState()
    const [nilaiPersenSakit, setNilaiPersenSakit] = useState()
    const [nilaiPersenIzin, setNilaiPersenIzin] = useState()
    const [nilaiPersenBelumAbsen, setNilaiPersenBelumAbsen] = useState()

    const hitungPersen = () =>{
        const pembulatanLaporan = ((progressValue/allValue)*100).toFixed(0)
        setNilaiPersen(`${pembulatanLaporan}%`)

        const pembulatanHadir = ((progressHadir/allValue)*100).toFixed(0)
        setNilaiPersenHadir(`${pembulatanHadir}%`)

        const pembulatanKegiatan = ((progressKegiatan/allValue)*100).toFixed(0)
        setNilaiPersenHadirKegiatan(`${pembulatanKegiatan}%`)

        const pembulatanSakit = ((progressSakit/allValue)*100).toFixed(0)
        setNilaiPersenSakit(`${pembulatanSakit}%`)

        const pembulatanIzin = ((progressIzin/allValue)*100).toFixed(0)
        setNilaiPersenIzin(`${pembulatanIzin}%`)

        const pembulatanBelumAbsen = ((progressBelumAbsen/allValue)*100).toFixed(0)
        setNilaiPersenBelumAbsen(`${pembulatanBelumAbsen}%`)
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
        'Oktober',
        'November',
        'Desember',
        ],
        dayNames: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        today: 'Hari Ini',
        year: '', // letter behind year number -> 2020{year}
    }

    const [startCal, setStartCal] = useState()
    const [endCal, setEndCal] = useState()

    const dataKehadiran=[
        {
            name: "Hadir",
            population: 700,
            color: "#39a339",
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Sakit",
            population: 50,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Izin",
            population: 20,
            color: "#0060cb",
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Tidak Hadir",
            population:  10,
            color: "#F00",
            legendFontColor: "#000",
            legendFontSize: 12
        },
    ]

    const dataLaporan=[
        {
            name: "Telah Dilaporkan",
            population: 30,
            color: "#39a339",
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Belum Dilaporkan",
            population:  8,
            color: "#F00",
            legendFontColor: "#000",
            legendFontSize: 12
        },
    ]

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

                    <View style={{flexDirection:"row", marginBottom:0}}>
                        <TouchableOpacity style={showContent===1? {backgroundColor:"#39a339", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"} : {backgroundColor:"#d9dcdf", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center", }} onPress={() => toggleContent(1)}>
                                
                            <Text style={showContent==1?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Harian</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={showContent==2?{backgroundColor:"#39a339", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}:{backgroundColor:"#d9dcdf", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}} onPress={() => toggleContent(2)}>
                                
                            <Text style={showContent===2?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Bulanan</Text>
                            
                        </TouchableOpacity>
                    </View>

                    <View style={showContent==1?{display:"flex", width:"100%", alignItems:"center", marginBottom:50}:{display:"none"}}>
                        <View style={{flexDirection:"row", width:"100%", justifyContent:"center", alignItems:"center", marginTop:20}}>
                            <View style={{ justifyContent:"center"}}>
                                <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Rekap Kehadiran :</Text>
                            </View>
                            <View style={{justifyContent:"center", alignItems:"center", marginLeft:10}}>
                                <TouchableOpacity style={{minWidth:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:0}} onPress={()=>setModaCalendar(true)}>
                                    <Text style={{color:"#fff", fontSize:12, fontWeight:"600", marginHorizontal:5}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:10, marginBottom:0}}>Jumlah ASN Telah Melakukan Absensi {progressHadir+progressKegiatan+progressSakit+progressIzin} dari {allValue} Orang</Text>

                        <View style={{width:"100%", alignItems:"center", marginTop:20}}>
                        {/* {getStrDay}, {getDay} {getStrMonth} {getYear} */}
                            <TouchableOpacity style={{width:"95%", height:70, alignItems:"center", justifyContent:"center", backgroundColor:"#fff", borderRadius:15, elevation:5, padding:10, flexDirection:"row", marginBottom:15}} onPress={()=>navigation.navigate('DetailKehadiranKasum',{strDay:getStrDay, numDay:getDay, strMonth:getStrMonth, numYear:getYear, strStatus:"Hadir"})}>
                                <View style={{width:"80%", height:"100%", justifyContent:"center"}}>
                                    <Text style={{ color: "#000", fontSize: 11,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:10}}>Status Kehadiran : Hadir</Text>

                                    <View style={{width:"100%", height:15, borderRadius:15, backgroundColor:"#d9dcdf"}}>
                                        <View style={{height:"100%", width:nilaiPersenHadir, backgroundColor:"#39a339", borderRadius:15}}>

                                        </View>
                                    </View>

                                    <Text style={{ color: "grey", fontSize: 10,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>Status Hadir {progressHadir} dari {allValue} orang</Text>
                                </View>
                                <View style={{width:"20%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{ color: "#000", fontSize: 25,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>{nilaiPersenHadir}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:"95%", height:70, alignItems:"center", justifyContent:"center", backgroundColor:"#fff", borderRadius:15, elevation:5, padding:10, flexDirection:"row", marginBottom:15}}>
                                <View style={{width:"80%", height:"100%", justifyContent:"center"}}>
                                    <Text style={{ color: "#000", fontSize: 11,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:10}}>Status Kehadiran : Hadir Kegiatan</Text>

                                    <View style={{width:"100%", height:15, borderRadius:15, backgroundColor:"#d9dcdf"}}>
                                        <View style={{height:"100%", width:nilaiPersenHadirKegiatan, backgroundColor:"#39a339", borderRadius:15}}>

                                        </View>
                                    </View>

                                    <Text style={{ color: "grey", fontSize: 10,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>Status Hadir Kegiatan {progressKegiatan} Dari {allValue} Orang</Text>
                                </View>
                                <View style={{width:"20%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{ color: "#000", fontSize: 25,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>{nilaiPersenHadirKegiatan}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:"95%", height:70, alignItems:"center", justifyContent:"center", backgroundColor:"#fff", borderRadius:15, elevation:5, padding:10, flexDirection:"row", marginBottom:15}}>
                                <View style={{width:"80%", height:"100%", justifyContent:"center"}}>
                                    <Text style={{ color: "#000", fontSize: 11,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:10}}>Status Kehadiran : Sakit</Text>

                                    <View style={{width:"100%", height:15, borderRadius:15, backgroundColor:"#d9dcdf"}}>
                                        <View style={{height:"100%", width:nilaiPersenSakit, backgroundColor:"#0060cb", borderRadius:15}}>

                                        </View>
                                    </View>

                                    <Text style={{ color: "grey", fontSize: 10,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>Status Sakit {progressSakit} Dari {allValue} Orang</Text>
                                </View>
                                <View style={{width:"20%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{ color: "#000", fontSize: 25,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>{nilaiPersenSakit}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:"95%", height:70, alignItems:"center", justifyContent:"center", backgroundColor:"#fff", borderRadius:15, elevation:5, padding:10, flexDirection:"row", marginBottom:15}}>
                                <View style={{width:"80%", height:"100%", justifyContent:"center"}}>
                                    <Text style={{ color: "#000", fontSize: 11,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:10}}>Status Kehadiran : Izin</Text>

                                    <View style={{width:"100%", height:15, borderRadius:15, backgroundColor:"#d9dcdf"}}>
                                        <View style={{height:"100%", width:nilaiPersenIzin, backgroundColor:"#0060cb", borderRadius:15}}>

                                        </View>
                                    </View>

                                    <Text style={{ color: "grey", fontSize: 10,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>Status Izin {progressIzin} Dari {allValue} Orang</Text>
                                </View>
                                <View style={{width:"20%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{ color: "#000", fontSize: 25,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>{nilaiPersenIzin}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:"95%", height:70, alignItems:"center", justifyContent:"center", backgroundColor:"#fff", borderRadius:15, elevation:5, padding:10, flexDirection:"row", marginBottom:15}}>
                                <View style={{width:"80%", height:"100%", justifyContent:"center"}}>
                                    <Text style={{ color: "#000", fontSize: 11,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:10}}>Status Kehadiran : Belum Absen</Text>

                                    <View style={{width:"100%", height:15, borderRadius:15, backgroundColor:"#d9dcdf"}}>
                                        <View style={{height:"100%", width:nilaiPersenBelumAbsen, backgroundColor:"#CE2029", borderRadius:15}}>

                                        </View>
                                    </View>

                                    <Text style={{ color: "grey", fontSize: 10,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>Status Belum Absen {progressBelumAbsen} Dari {allValue} Orang</Text>
                                </View>
                                <View style={{width:"20%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{ color: "#000", fontSize: 25,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0}}>{nilaiPersenBelumAbsen}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        

                    </View>

                    <View style={showContent==2?{display:"flex", width:"100%", marginBottom:50}:{display:"none"}}>
                        <View style={{width:"100%", alignItems:"center"}}>
                            <View style={{width:"95%", marginBottom:20, flexDirection:"row", marginTop:20, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:0, textAlign:"center"}}>Rekap Bulan :</Text>
                                <View style={{justifyContent:"center"}}>
                                    <TouchableOpacity style={{minWidth:100, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:10}} onPress={toggleModal}>
                                        <Text style={{color:"#fff", fontSize:12, fontWeight:"600", marginHorizontal:5}}>{namaBulan[aktifBulan]} {aktifTahun}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{width:"95%", justifyContent:"center"}}>
                                <View style={{flexDirection:"row", alignItems:"center",  marginBottom:5,}}>
                                    <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:10,}}>Rekap Kehadiran : </Text>
                                    <View style={{width:"70%", alignItems:"flex-end"}}>
                                        <TouchableOpacity style={{width:100, height:20, backgroundColor:"#39a339", borderRadius:15, marginLeft:5, marginTop:10, alignItems:"center", justifyContent:"center"}}>
                                            <Text style={{fontWeight:'900', color:"#fff",  fontSize:10}}>Download File</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity style={{width:"100%", minHeight:50, borderBottomWidth:0.5, marginBottom:10}} onPress={()=>navigation.navigate('KehadiranBulanan')}>
                                    <PieChart
                                        data={dataKehadiran}
                                        width={WindowWidth*0.9}
                                        height={220}
                                        chartConfig={chartConfigg}
                                        accessor={"population"}
                                        backgroundColor={"transparent"}
                                        paddingLeft={"0"}
                                        center={[0, 0]}
                                        key={showContent}
                                        // absolute
                                    />
                                </TouchableOpacity>

                                <View style={{flexDirection:"row", alignItems:"center",  marginBottom:5,}}>
                                    <Text style={{ color: "#000", fontSize: 12,  fontFamily: "Spartan", fontWeight: "600", marginTop:10,}}>Rekap Laporan :     </Text>
                                    <View style={{width:"70%", alignItems:"flex-end"}}>
                                        <TouchableOpacity style={{width:100, height:20, backgroundColor:"#39a339", borderRadius:15, marginLeft:5, marginTop:10, alignItems:"center", justifyContent:"center"}}>
                                            <Text style={{fontWeight:'900', color:"#fff",  fontSize:10}}>Download File</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity style={{width:"100%", minHeight:50, borderBottomWidth:0.5, marginBottom:10}} onPress={()=>navigation.navigate('LaporanBulanan')}>
                                    <PieChart
                                        data={dataLaporan}
                                        width={WindowWidth*0.9}
                                        height={220}
                                        chartConfig={chartConfigg}
                                        accessor={"population"}
                                        backgroundColor={"transparent"}
                                        paddingLeft={"0"}
                                        center={[0, 0]}
                                        key={showContent}
                                        // absolute
                                    />
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