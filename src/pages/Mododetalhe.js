import React from "react";
import {StatusBar} from "expo-status-bar";
import {View, SafeAreaView,ScrollView, Dimensions, Text, Image, TouchableOpacity} from "react-native";
import {  MaterialIcons,} from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-elements';
import { useRoute, useIsFocused} from "@react-navigation/native";

const { width, height} = Dimensions.get("screen")




const ModuloDetalhe = ({navigation}) => {

    const Route = useRoute();

    const {modulo ,videos } = Route.params;


    return(
        <SafeAreaView style={{flex:1,  backgroundColor:"#f0f4fd"}}>

            <StatusBar backgroundColor="#ffc107" />
            <View
                style={{
                    height:height*0.07,marginTop:height*0.03, width:width, justifyContent:"center",alignItems:"center" 
                }}
            >   
                <View style={{ width:width*0.9, flexDirection:"row", justifyContent:"space-between"}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="keyboard-backspace" size={24} color="#607d8b" />
                    </TouchableOpacity>

                    <View style={{flexDirection:"row", justifyContent:"space-between", width:width*0.2}}>
                        <TouchableOpacity>
                            <MaterialIcons name="share" size={24} color="#607d8b" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <MaterialIcons name="shopping-cart" size={24} color="#607d8b" />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{width:width*0.9, alignSelf:"center",}}>
                <Text style={{fontWeight:"700", fontSize:18,}}>{}</Text>
                <Text style={{fontWeight:"700", fontSize:13, opacity:0.2, marginVertical:height*0.01}}>Subintitulo ou breve descrição do módulo vai aparecer aqui</Text>

                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Text style={{fontWeight:"700"}}>5.0</Text>
                    <AirbnbRating
                        count={5}
                        defaultRating={5}
                        size={height*0.021}
                        isDisabled={true}
                        showRating={false}
                    />
                </View>
                <Text style={{marginVertical:height*0.01}}>( 7 228 Classificações ) 15 937 Alunos</Text>
                
                <View style={{flexDirection:"row"}}>
                    <Text>Criado por </Text>
                    <Text style={{fontWeight:"700", color:"#607d8b"}}>Marcos Santana</Text>
                    <Text> e </Text>
                    <Text style={{fontWeight:"700", color:"#607d8b"}}>Gabriel Pinto</Text>
                </View>

                <View style={{flexDirection:"row", alignItems:"center", marginVertical:height*0.01}}>
                    <MaterialIcons name="update" size={24} color="#607d8b" />
                    <Text> Ultima actualização em 20/05/2021</Text>
                </View>

                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <MaterialIcons name="language" size={24} color="#607d8b" />
                    <Text> Português</Text>
                </View>
                
            </View>

            <View>
                <View style={{ borderRadius:5,position:"relative", width:width*0.9, height:height*0.23, alignSelf:"center", marginTop:height*0.02}}>
                    <Image style={{width:width*0.9, height:height*0.23,borderRadius:5,}} source={require("../img/foto.png")} />

                    <View style={{position:"absolute", borderRadius:5, width:width*0.9, height:height*0.23,backgroundColor:"rgba(0,0,0,0.5)", justifyContent:"center",alignItems:"center"}}>
                        <TouchableOpacity>
                            <MaterialIcons name="play-arrow" size={height*0.15} color="#fff" />
                        </TouchableOpacity>
                        
                        <Text style={{color:"#fff",fontWeight:"700"}}>Pré-visualizar este módulo</Text>
                    </View>
                </View>

                <View style={{marginTop:height*0.016,alignSelf:"center",width:width*0.9,}}>

                    <Text style={{fontWeight:"700", color:"#000", fontSize:16}}>390.00 Mt</Text>

                    <TouchableOpacity style={{marginTop:height*0.016,alignSelf:"center", borderRadius:5,
                        backgroundColor:"#607d8b",width:width*0.9, height:height*0.047, justifyContent:"center", alignItems:"center"}}>
                        <Text style={{fontWeight:"700", color:"#fff", fontSize:16}}> Comprar agora</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection:"row", justifyContent:"space-between",marginTop:height*0.016,alignSelf:"center",width:width*0.83,}}>
                        <TouchableOpacity>
                            <Text style={{fontWeight:"700", color:"#607d8b",}}>Adicionar ao carinho</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={{fontWeight:"700", color:"#607d8b",}}>Adicionar a lista de desejos</Text>
                        </TouchableOpacity>

                    </View>
                    
                    <View style={{marginTop:height*0.07, width:width*0.9,}}>
                        <Text style={{fontWeight:"700", fontSize:18}}>Este módulo inclui</Text>

                        <View style={{flexDirection:"row", alignItems:"center", marginVertical:height*0.01}}>
                            <MaterialIcons name="live-tv" size={24} color="#607d8b" />
                            <Text> 28,5 horas no total vídeo sob demanda</Text>
                        </View>

                        <View style={{flexDirection:"row", alignItems:"center",}}>
                            <MaterialIcons name="file-present" size={24} color="#607d8b" />
                            <Text> Arquivos de apoio</Text>
                        </View>

                        <View style={{flexDirection:"row", alignItems:"center", marginVertical:height*0.01}}>
                            <MaterialIcons name="menu-book" size={24} color="#607d8b" />
                            <Text> 21 Artigos</Text>
                        </View>

                        <View style={{flexDirection:"row", alignItems:"center", }}>
                            <MaterialIcons name="accessibility" size={24} color="#607d8b" />
                            <Text> Acesso vitalício total</Text>
                        </View>

                        <View style={{flexDirection:"row", alignItems:"center", marginVertical:height*0.01 }}>
                            <MaterialIcons name="devices-other" size={24} color="#607d8b" />
                            <Text> Acesso pelo celuar, pelo desktop e pela TV</Text>
                        </View>
                    </View>

                    <View style={{marginTop:height*0.03, width:width*0.9, }}>
                        <Text style={{fontWeight:"700", fontSize:18}}>O que você aprendera</Text>

                        <View style={{flexDirection:"row", alignSelf:"center", alignItems:"center", marginVertical:height*0.01, width:width*0.85,}}>
                            <MaterialIcons name="check" size={24} color="#607d8b" />
                            <Text> Aqui poderam aparecer os topicos que seram abordados</Text>
                        </View>
                        <View style={{flexDirection:"row", alignSelf:"center", alignItems:"center", marginVertical:height*0.01, width:width*0.85,}}>
                            <MaterialIcons name="check" size={24} color="#607d8b" />
                            <Text> Aqui poderam aparecer os topicos que seram abordados</Text>
                        </View>

                        
                    </View>
                    
                </View>
                
                
            </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default ModuloDetalhe;