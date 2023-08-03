import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AbsensiKurang, Agenda, BackIcon, LgBappeda, SakitIcont, SakitIzin, TidakHadir, WarningIcont } from '../../../assets/images'
import SearchBar from 'react-native-dynamic-search-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../../assets/ApiHelper/ApiLink';


const Allabsensi = ({navigation}) => {

    const isFocused = useIsFocused();
    const base_url =ApiLink+"/api"

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
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "November", "Desember"]
    const getStrMonth = namaBulan[monthUsed]

    const getYear = cekTgl.getFullYear()
    
    const [rawHistory, setRawHistory] = useState([])
    const [filtereHistory, setFilteredHistory] = useState([])
    const [search, setSearch] = useState();


    useEffect(()=>{

        if (isFocused) {
            getMyHistory()          
        }
        
    },[navigation, isFocused])

    const getMyHistory = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${base_url}/absen/`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
    
            if (response.status == 200) {
                setRawHistory(response.data);
                setFilteredHistory(response.data)

            }

        } catch (error) {
            console.log(error, "error get my history")   
        }
    }

    const rowHistory = (item, index) =>{

        // if (item.ket_hadir === 'Datang Tepat Waktu' && item.ket_pulang === 'Pulang Tepat Waktu') {
        console.log(item.ket_hadir)
        if (item.ket_hadir === 'Absen Tepat Waktu') {
            
            if(item.laporan == false){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, Anda belum membuat agenda</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else if(item.ket_pulang == "Tidak Absen Pulang"){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum absen pulang</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else{
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Terimakasih, anda telah melakukan absensi</Text>
                        </View>          
                    </TouchableOpacity>            
                    
                ) 
            }
            

        } 
        else if(item.ket_hadir ==="tidak absen pergi"){

            return(
                <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
                    <Image source={TidakHadir} style={{width:40,height:40, marginLeft:15}}/>            
                    <View style={{marginLeft:10, width:"75%"}}>
                    <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                    <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Anda tidak hadir</Text>
                    </View>
                 </TouchableOpacity>
            )
        
        }
        else if(item.ket_hadir ==="Absen Terlambat"){
            if(item.laporan == false ){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum membuat agenda</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else if(item.ket_pulang == "Tidak Absen Pulang"){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum belum absen pulang</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else{
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Terimakasih, anda telah melakukan absensi</Text>
                        </View>          
                    </TouchableOpacity>            
                    
                ) 
            }
        }
        else if(item.ket_hadir === "Sakit"){
            return(
                <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
                    <Image source={SakitIcont} style={{width:40,height:40, marginLeft:15}}/>
                    <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                        <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Anda mengajukan keterangan sakit</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        else if(item.ket_hadir === "Izin"){
            return(
                <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
                    <Image source={SakitIzin} style={{width:40,height:40, marginLeft:15}}/>
                    <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                        <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Anda mengajukan keterangan izin</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        else{
            if(item.laporan == false ){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, Anda belum membuat agenda</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else if(item.ket_pulang == "Tidak Absen Pulang"){
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Maaf, anda belum absen pulang</Text>
                        </View>     
                        <Image source={WarningIcont} style={{width:25, height:25, marginTop:-30, marginLeft:-15}} />           
                    </TouchableOpacity>            
                    
                ) 
            }
            else{
                return(
                    <TouchableOpacity key={index}  style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail",{idAbsensi:item.id})}>
        
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10, width:"75%"}}>
                        <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>{item.hari+", "+item.tanggal}</Text>
                            <Text style={{ color:"black",  fontSize:10, textTransform:"capitalize"}}>Terimakasih, anda telah melakukan absensi</Text>
                        </View>          
                    </TouchableOpacity>            
                    
                ) 
            }
        }

    }       

    // console.log(rawHistory, "<======= raw history")
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
            if (text) {
                // Inserted text is not blank
                // Filter the masterDataSource and update FilteredDataSource
                const newData = rawHistory.filter(
                function (params) {
                    
                    
                    const itemData = params.tanggal
                    ?  params.tanggal.toUpperCase() 
                    : ''.toUpperCase();

                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                   
                }
                );
                setFilteredHistory(newData);
                setSearch(text);
            } else {
                // Inserted text is blank
                // Update FilteredDataSource with plan
                // const masterDataSource = plan
                setFilteredHistory(rawHistory);
                setSearch(text);
            }
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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>ABSENSI</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran</Text>
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
                        placeholder='Search tanggal absensi'
                        style={{marginBottom:20, width:"100%"}}
                        onChangeText={(text) => searchFilterFunction(text)}
                    />
                    <Text style={{ color: "#000", fontSize: 15,  fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Berikut Merupakan Riwayat Absensi Anda</Text>

                    {
                        filtereHistory.length >0 &&
                        filtereHistory.map((item,index)=>(
                            rowHistory(item,index)
                        ))
                    }

                    {/* <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
                        <Image source={Agenda} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Senin, 26 Juni 2023</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Terimakasih, anda telah melakukan absensi lengkap</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
                        <Image source={AbsensiKurang} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Jumat, 23 Juni 2023</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Maaf, anda belum melakukan absensi sore</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
                        <Image source={TidakHadir} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Kamis, 23 Juni 2023</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Anda tidak hadir</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
                        <Image source={SakitIcont} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Rabu, 22 Juni 2023</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Anda sedang sakit</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:WindowWidth*0.85, height:70, backgroundColor:'white', borderRadius:15, elevation:5, marginBottom:20, alignItems:"center", flexDirection:'row'}} onPress={() => navigation.navigate("Detail")}>
                        <Image source={SakitIzin} style={{width:40,height:40, marginLeft:15}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'500', color:"black",  fontSize:14, marginBottom:5}}>Selasa, 21 Juni 2023</Text>
                            <Text style={{ color:"black",  fontSize:10}}>Anda mengajukan izin</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            </View>
        </ScrollView>
    )
}

export default Allabsensi

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