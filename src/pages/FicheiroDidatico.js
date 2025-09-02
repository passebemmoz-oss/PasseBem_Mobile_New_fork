import React ,{useEffect, useMemo, useState}from "react";
import { View, StatusBar,Image, TouchableOpacity, FlatList, ScrollView, Dimensions, SafeAreaView} from "react-native";
import Svg, { Circle,G } from 'react-native-svg';
import {Text, Divider, LinearProgress } from "react-native-elements";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRoute, useIsFocused} from "@react-navigation/native";
import {errorDefault} from '../components/ToastInf'
import api from '../services/api'


const { width, height} = Dimensions.get("screen")


const FicheirosPage = ({navigation}) => {

    const Route = useRoute();
    const IsFocused = useIsFocused()
    
    const item = Route?.params?.item


    const [ficheiros, setFicheiros] = useState([])

    async function GravarProva(){

        try{
            const response = await api.get(`/appmaterial/${item.nome}`)

            console.log(response?.data)

            setFicheiros(response?.data?.value)
        }catch(error){ errorDefault()}
     }


    useEffect(() => {

        if(IsFocused){

            GravarProva()
        }
        
    }, [IsFocused])


    

    return(
        <SafeAreaView style={{flex:1, backgroundColor:"#f0f4fd"}}>

            <ScrollView
                style={{marginHorizontal:width*0.05}}
            >
                {
                    ficheiros.map((item, index) =>(
                    
                        <TouchableOpacity key={item?.id} onPress={()=> navigation.navigate('PDF_Reader', {item})}
                            style={{ backgroundColor:"#fff", paddingHorizontal:width*0.03, paddingVertical:height*0.01,flexDirection:'row',
                                borderRadius:8, width:width*0.9, marginTop:height*0.02, justifyContent:'space-between' }}
                        >
                            <Image style={{width:"20%", height:'100%'}} source={{uri:item.link}} />

                            <View style={{justifyContent:'space-between'}}>
                                <Text style={{fontWeight:"700", color:"#607d8b", fontSize:16, }}>{item?.name}</Text>
                                <Text style={{fontWeight:"700", color:"#ffa000", fontSize:14, }}>{item?.pages} Paginas</Text>
                                <Text style={{fontWeight:"700", color:"#607d8b", fontSize:12, }}>{item?.data}</Text>
                            </View>
                            
                        </TouchableOpacity>
                    ))

                }
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default FicheirosPage;