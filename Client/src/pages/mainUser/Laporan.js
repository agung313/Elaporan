import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BackIcon, LgBappeda } from '../../assets/images';

const Laporan = ({route, navigation}) => {
    const {bulan} = route.params

    const [cekBulan, setCekBulan] = useState(bulan)
    console.log(cekBulan, "<== cekBulan laporan")

    const strBulan = () => {
        if(cekBulan==1){
            return("Januari")
        }
        else if(cekBulan==2){
            return("Februari")
        }
        else if(cekBulan==3){
            return("Maret")
        }
        else if(cekBulan==4){
            return("April")
        }
        else if(cekBulan==5){
            return("Mei")
        }
        else if(cekBulan==6){
            return("Juni")
        }
        else if(cekBulan==7){
            return("Juli")
        }
        else if(cekBulan==8){
            return("Agustus")
        }
        else if(cekBulan==9){
            return("September")
        }
        else if(cekBulan==10){
            return("Oktober")
        }
        else if(cekBulan==11){
            return("November")
        }
        else if(cekBulan==12){
            return("Desember")
        }
        else {
            return null
        }

    }

    const cekBln = strBulan()
    console.log(cekBln, "<===== nama bulan")
    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // input
    const [detail, setDetail] = useState()

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

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={{ width: "60%" }}>
                    <TouchableOpacity onPress={()=> navigation.navigate('MainUser')} style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent:"center" }}>
                            <Image source={BackIcon} style={{ width: 20, height: 20 }}/>
                        </View>
                        <View style={{ justifyContent:"center", marginHorizontal:10 }}>
                            <Image source={LgBappeda} style={styles.lgHead}/>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PROFILE</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Laporan Bulanan</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>
            <View style={{alignItems:"center", marginBottom:30}}>
                <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10, }}>

                    <View style={{width:"100%", flexDirection:"row", justifyContent:"flex-end", marginTop:10}}>
                        <TouchableOpacity style={{width:100, height:30, borderRadius:10, backgroundColor:"#39a339", marginBottom:15, alignItems:"center", justifyContent:"center", }}>
                            <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Download</Text>
                        </TouchableOpacity>
                        <View style={{width:10}}></View>
                        <TouchableOpacity style={{width:100, height:30, borderRadius:10, backgroundColor:"#0060cb", marginBottom:15, alignItems:"center", justifyContent:"center"}}>
                            <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Laporkan</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:"100%", alignItems:"center"}}>
                        <View style={{width:"100%"}}>
                            <Text style={{ color: "#000", fontSize: 15, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Berikut Kegiatan Anda Pada Bulan {cekBln}</Text>
                        </View>
                    </View>

                    <View style={{width:"100%",marginBottom:15}}>
                        <View style={{flexDirection:"row", backgroundColor:"#d9dcdf"}}>
                            <View style={{width:"10%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>No</Text>
                            </View>
                            <View style={{width:"40%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Hari/Tanggal</Text>
                            </View>
                            <View style={{width:"50%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Kegiatan</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row", backgroundColor:"#FFF"}}>
                            <View style={{width:"10%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>1.</Text>
                            </View>
                            <View style={{width:"40%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                            </View>
                            <View style={{width:"50%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5}}>
                                <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>Kehadiran</Text>
                            </View>
                        </View>
                    </View>
                    
                </View>
            </View>
        </ScrollView>
    )
}

export default Laporan

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