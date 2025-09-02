import React ,{useEffect, useMemo, useState}from "react";
import { View, StatusBar,Image, TouchableOpacity, FlatList, ScrollView, Dimensions, SafeAreaView} from "react-native";
import Svg, { Circle,G } from 'react-native-svg';
import {Text, Divider, LinearProgress } from "react-native-elements";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';



const { width, height} = Dimensions.get("screen")

const size = height*0.12;
const strokeWidth =4;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;

const circumference = 2 * Math.PI * radius;



const HistPymentScreen = ({navigation}) => {

    const [type, setType] = useState(false)
    const [provatematica, setProvaTema] = useState([])


    useEffect(() => {
        api.get('/histypyments')
            .then(res => {
                console.log(res)
                setProvaTema(res.data.value)
            })
            .catch(err => console.error(err))
    }, [])

    

    
    return(
        <SafeAreaView style={{flex:1, backgroundColor:"#f0f4fd"}}>

            <ScrollView
            showsVerticalScrollIndicator={false}
                style={{marginHorizontal:width*0.05}}
            >
                {
                    provatematica.map((item, index) =>(
                    
                        <TouchableOpacity key={item._id} 
                            style={{ backgroundColor:"#fff", paddingHorizontal:width*0.03, paddingVertical:height*0.01,flexDirection:'row',
                                borderRadius:8, width:width*0.9, marginTop:height*0.02, justifyContent:'space-between' }}
                        >
                            <Svg width={size} height={size} style={{position:"relative"}}>
                                <G rotation="-90" origin={center}>
                                    <Circle cx={center} cy={center} r={radius} stroke="#E6E7E8" strokeWidth={strokeWidth}  />

                                    <Circle cx={center} cy={center} r={radius} strokeDasharray={circumference} 
                                    stroke= {item.status  ? "#607d8b":'red'} strokeWidth={strokeWidth} strokeDashoffset={circumference - (circumference * item.resultado / item.numero)}  />
                                    <Text style={{position:"absolute", alignSelf:"center", top:height*0.04, color:"#607d8b", fontWeight:"700", fontSize:16}}>{Intl.NumberFormat("pt-MZ",{style:"currency",currency:"MZN"}).format(item.valor)}</Text>
                                </G>
                            </Svg>

                            <View style={{justifyContent:'space-between'}}>
                                <Text style={{fontWeight:"700", color:"#607d8b", fontSize:16, }}>{item.pacote?.slice(0,29)}</Text>
                                {/* <Text style={{fontWeight:"700", color:"#ffa000", fontSize:14, }}>Avaliação {item.tipo}</Text> */}
                                <Text style={{fontWeight:"700", color:"#607d8b", fontSize:12, }}>{item.inscricao}</Text>
                            </View>
                            
                        </TouchableOpacity>

                    ))
                }
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default HistPymentScreen;