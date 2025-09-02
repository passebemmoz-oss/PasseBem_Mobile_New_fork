import React, {useEffect, useState} from 'react';
import {StatusBar} from "expo-status-bar";
import { View, Text, ScrollView, SafeAreaView, Dimensions, Image, TouchableOpacity, ActivityIndicator, Alert} from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
import {  MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import { useRoute, useIsFocused} from "@react-navigation/native";
import { useAuth } from '../context/auth';

import api from "../services/api"


const { width, height} = Dimensions.get("screen")

function PlayerList({navigation}) {

    const {user} = useAuth()

    

    const Route = useRoute();

    const {modulo } = Route.params;

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({})
    const [videos, setvideos] = useState(null)

    const [detalhes, setdetalhes]= useState(false)

    const [videoPlay, setVideoPlay] = useState('')

    const [perguntas, setperguntas] = useState(null)

    
    useEffect(() => {

        if(!user?.user_inf){
            Alert.alert(
                "Passe-Bem Informa",
                "Você precisa completar seu registo para ter aceso ao conteúdo multimédia ",
                [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "Finalizar", onPress: () => navigation.navigate("EditPerfil") }
                  ]
            )
            navigation.goBack()
        }

        api.get(`/appmodulos/${modulo._id}`)
            .then(res => {
                setvideos(res?.data?.videos),
                setVideoPlay(res?.data?.videos[0]),
                setperguntas(res?.data?.perguntas)
               
            })
                
            .catch(err => console.error(err))

    }, [modulo]);

    if(!videos){

        return(
            <View style={{flex:1,backgroundColor:"#fff", justifyContent:"center", alignItems:"center",}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    
    return (
        <SafeAreaView style={{flex:1,marginTop:height*0.03, backgroundColor:"#f0f4fd"}}>
            <StatusBar backgroundColor="#ffc107" barStyle="light-content" />
          
            <View>
                <Video
                    ref={video}
                    style={{width:width, height:height*0.32, alignSelf:"center"}}
                    source={{
                        uri: videoPlay.video_url,
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    isTVSelectable
                    shouldPlay={true}
                    
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                    
                />
            </View>

            <View style={{ borderRadius:5, width:width*0.9, alignSelf:"center", marginTop:height*0.02}}>

                <Text style={{fontWeight:"700", fontSize:18, color:"#607d8b", textTransform:'capitalize'}}>{videoPlay.titulo} </Text>
                <Text style={{fontWeight:"700", fontSize:13, opacity:0.2, marginVertical:height*0.01, textTransform:'capitalize'}}>{videoPlay.descricao}</Text>

                <View
                    style={{flexDirection:"row"}}
                >
                    <TouchableOpacity onPress={()=> setdetalhes(false)}
                    style={{marginTop:height*0.02, marginRight:width*0.09, }}>
                        <Text style={{fontWeight:"700", fontSize:18, color:!detalhes?'#ffa000':'#000'}}>Aulas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> setdetalhes(true)} style={{marginTop:height*0.02,}}>
                        <Text style={{fontWeight:"700", fontSize:18,color:detalhes?'#ffa000':'#000'}}>Mais</Text>
                    </TouchableOpacity>
                </View>

                <View  style={{ borderRadius:5, width:width*0.88, alignSelf:"center", marginTop:height*0.02}}>


                    {detalhes?
                        <View>
                        <TouchableOpacity onPress={() => {Alert.alert(
                                'Sobre o Modulo',
                                `${modulo.descricao}`
                            )}}
                        style={{flexDirection:'row', marginVertical:height*0.02}}>

                            <MaterialCommunityIcons name="dots-horizontal" size={30} color="black" />
                            <Text style={{fontSize:18}}> Sobre este módulo </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection:'row',}} 
                        onPress={() => perguntas.length < 25?Alert.alert("Teste indisponível"): navigation.navigate("QuizModular",{perguntas, modulo})}>

                            <MaterialCommunityIcons name="certificate" size={30} color="black" />   
                            <Text style={{fontSize:18}}> Fazer a prova </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Recursos')}
                        style={{flexDirection:'row', marginVertical:height*0.02}}>

                            <MaterialCommunityIcons name="file-document-edit-outline" size={24} color="black" />
                            <Text style={{fontSize:18}}> Recursos </Text>
                        </TouchableOpacity>

                        
                    </View>:
                    <>

                        <Text style={{fontWeight:"700",fontSize:14, color:"#607d8b", marginVertical:height*0.015}}>Modulo - {modulo.nome} </Text>

                        {
                            videos.map((items, index) => (
                                
                                <TouchableOpacity key={items._id}
                                onPress={() => setVideoPlay(items)}

                                style={{flexDirection:"row", alignItems:"center", 
                                marginBottom:height*0.02, marginHorizontal:width*0.01,
                                backgroundColor: items == videoPlay ? "#fff":"rgba(0,0,0,0.02)", 
                                }}>

                                    <Text style={{fontWeight:"700", fontSize:18}}>{index}</Text>

                                    <View>
                                        <View style={{flexDirection:"row", alignItems:"center", marginLeft:width*0.04}}>
                                            <MaterialIcons name="check-circle" size={15} color="#607d8b" />
                                            <Text style={{fontWeight:"700", fontSize:16,}}> {items.titulo}</Text>
                                        </View>

                                        <View style={{flexDirection:"row", alignItems:"center", marginLeft:width*0.04}}>
                                            <MaterialIcons name="video-library" size={15} color="#607d8b" />
                                            <Text> Video - 10:08 minutos - Recursos</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            ))
                        }


                    </>}

            

                </View>
            </View>
          

      </SafeAreaView>
  )
}

export default PlayerList;