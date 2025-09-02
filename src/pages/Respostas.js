import React from "react";
import {StatusBar} from "expo-status-bar";
import {View, SafeAreaView,ScrollView, Dimensions, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons,  SimpleLineIcons} from '@expo/vector-icons';
import {Avatar} from "react-native-paper";



const {width, height} = Dimensions.get("screen");



const QPScreen = ({navigation}) => {

    return(
        <SafeAreaView
        style={{flex:1,alignItems:"center", backgroundColor:"#f0f4fd"}}
        >
            <StatusBar backgroundColor="#ffc107" />
            <View
                style={{
                    height:56, marginTop:24, width:width, backgroundColor:"#607d8b", justifyContent:"center",alignItems:"center" 
                }}
            >   
                <View style={{ width:Math.round(width*0.9), flexDirection:"row"}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="keyboard-backspace" size={24} color="#fff" />
                    </TouchableOpacity>
                    
                    <Text style={{color:"#fff", fontWeight:"700", marginLeft:10, fontSize:16}}>A visão em túnel manifesta-se de que modo?</Text>
                </View>
                
            </View>

                <View style={{width:Math.round(width*0.9), marginTop:16}}>
                    <Text>Tema</Text>

                    <Text style={{fontWeight:"700", fontSize:16}}> A visão em túnel manifesta-se de que modo?</Text>
                </View>

                <View style={{width:Math.round(width*0.9), marginTop:16, backgroundColor:"#607D8B", padding:Math.round(width*0.03), borderRadius:4}}>

                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity style={{elevation:1, padding:2,backgroundColor:"#fff", borderRadius:50}}
                        >
                            <Avatar.Image size={50} source={{uri:"https://www.politize.com.br/wp-content/uploads/2016/08/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg"}}/>
                        </TouchableOpacity>

                        <View style={{marginLeft:Math.round(width*0.03)}}>
                            <Text>Nome</Text>
                            <Text  style={{color:"#ddd"}}>Janeiro 22, 2021</Text>
                        </View>
                    </View>

                    <View style={{marginTop:24, borderBottomWidth:0.4, paddingBottom:16}}>
                        <Text style={{textAlign:"auto", fontSize:16}}> Estas são as regras básicas dos comentários, todos os comentários que não cumpram estas regras serão removidos.
Antes de colocar a sua dúvida deve consultar a explicação e material de estudo que disponibilizamos na questão e ainda todos os comentários já presentes;
Dúvidas não relacionadas com a questão devem ser colocadas através do nosso formulário de contacto;
As afirmações devem ser fundamentadas com o código da estrada ou outros documentos oficiais para evitar que possa induzir em erro os restantes utilizadores;
Reservamos o direito de apenas aprovar e responder a comentários que achamos relevantes para a discussão da questão.</Text>
                    </View>

                    <View style={{alignItems:"center", marginTop:24}}>
                        <Text style={{fontWeight:"700", fontSize:18}}>Essa resposta foi útil?</Text>

                        <View style={{flexDirection:"row", width:Math.round(width*0.7), justifyContent:"space-between", marginTop:16}}>

                            <TouchableOpacity style={{flexDirection:"row",justifyContent:"center",padding:Math.round(width*0.01), 
                            borderWidth:0.6, width:Math.round(width*0.3), alignItems:"center", borderRadius:50, backgroundColor:"#fff"}}>
                                <SimpleLineIcons name="dislike" size={24} color="black" />
                                <Text style={{fontWeight:"700", marginLeft:10}}>Não</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection:"row",justifyContent:"center",padding:Math.round(width*0.01), 
                            borderWidth:0.6, width:Math.round(width*0.3), alignItems:"center", borderRadius:50, backgroundColor:"#fff"}}>
                                <SimpleLineIcons name="like" size={24} color="black" />
                                <Text style={{fontWeight:"700", marginLeft:10}}>Sim</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>


        </SafeAreaView>
    )
}

export default QPScreen;