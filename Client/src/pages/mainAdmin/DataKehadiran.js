import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BackIcon, LgBappeda } from '../../assets/images';
import { SelectList } from 'react-native-dropdown-select-list'
import Calendar from "react-native-calendar-range-picker";

const DataKehadiran = ({navigation}) => {
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

    // selectsearch
    const [selected, setSelected] = useState()
    console.log(selected)
    const data = [
        {key:'1', value:'Muhammad Agung Sholihhudin'},
        {key:'2', value:'Ondri Nurdiansyah'},
        {key:'3', value:'M.Azhwan'},
        {key:'4', value:'Agus Supriyadin'},
    ];

    // calendar
    const [startCal, setStartCal] = useState()
    const [endCal, setEndCal] = useState()
    const [blnStart, setBlnStart] = useState()
    const [dayStart, setDayStart] = useState()
    const [yearStart, setYearStart] = useState()

    const [blnEnd, setBlnEnd] = useState()
    const [dayEnd, setDayEnd] = useState()
    const [yearEnd, setYearEnd] = useState()

    console.log(blnStart, "<<<<< bln start")
    console.log(blnEnd, "<<<<< bln end")
    // start bulan
    const stringStartCal = ()=>{
        if(startCal){
            const splitStrCal = startCal.split("-")
            const splitBulan = splitStrCal[1]
            setDayStart(splitStrCal[2])
            setYearStart(splitStrCal[0])

            if(splitBulan=="01"){
                setBlnStart("Januari")
            }
            else if(splitBulan=="02"){
                setBlnStart("Februari")
            }
            else if(splitBulan=="03"){
                setBlnStart("Maret")
            }
            else if(splitBulan=="04"){
                setBlnStart("April")
            }
            else if(splitBulan=="05"){
                setBlnStart("Mei")
            }
            else if(splitBulan=="06"){
                setBlnStart("Juni")
            }
            else if(splitBulan=="07"){
                setBlnStart("Juli")
            }
            else if(splitBulan=="08"){
                setBlnStart("Agustus")
            }
            else if(splitBulan=="09"){
                setBlnStart("September")
            }
            else if(splitBulan=="10"){
                setBlnStart("Oktober")
            }
            else if(splitBulan=="11"){
                setBlnStart("November")
            }
            else if(splitBulan=="12"){
                setBlnStart("Desember")
            }else{
                setBlnStart("-")
            }
        }else{
            setBlnStart("-")
        }
    }    

    const stringEndCal = ()=>{
        if(endCal){
            const splitEndCal = endCal.split("-")
            const splitEndBulan = splitEndCal[1]
            setDayEnd(splitEndCal[2])
            setYearEnd(splitEndCal[0])

            if(splitEndBulan=="01"){
                setBlnEnd("Januari")
            }
            else if(splitEndBulan=="02"){
                setBlnEnd("Februari")
            }
            else if(splitEndBulan=="03"){
                setBlnEnd("Maret")
            }
            else if(splitEndBulan=="04"){
                setBlnEnd("April")
            }
            else if(splitEndBulan=="05"){
                setBlnEnd("Mei")
            }
            else if(splitEndBulan=="06"){
                setBlnEnd("Juni")
            }
            else if(splitEndBulan=="07"){
                setBlnEnd("Juli")
            }
            else if(splitEndBulan=="08"){
                setBlnEnd("Agustus")
            }
            else if(splitEndBulan=="09"){
                setBlnEnd("September")
            }
            else if(splitEndBulan=="10"){
                setBlnEnd("Oktober")
            }
            else if(splitEndBulan=="11"){
                setBlnEnd("November")
            }
            else if(splitEndBulan=="12"){
                setBlnEnd("Desember")
            }else{
                setBlnEnd("-")
            }
        }else{
            setBlnEnd("-")
        }
    }

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

    return (
        <View>
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
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran ASN</Text>
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
                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center", textTransform:"capitalize",}}>Silakan Perbarui Kehadiran</Text>

                    <View style={{width:"90%", marginBottom:15}}>
                        <SelectList 
                            setSelected={setSelected}
                            data={data} 
                            notFoundText='Data tidak ditemukan'
                            placeholder='Select Nama ASN'
                            searchPlaceholder='Select Nama ASN'
                            maxHeight={200}
                        />
                    </View>

                    <View style={{width:"100%", height:350, elevation:10}}>
                        <Calendar
                            locale={CUSTOM_LOCALE}
                            startDate=""
                            endDate=""
                            onChange={({ startDate, endDate }) => {setStartCal(startDate), setEndCal(endDate)}}
                        />
                    </View>

                    <View style={{alignItems:"center", width:"100%"}}>
                        <TouchableOpacity style={ {width:"90%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:15, marginBottom:20, borderWidth:0.5, borderColor:"black"}} onPress={()=>navigation.navigate("DetailKehadiran")}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Proses Kehadiran</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DataKehadiran

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