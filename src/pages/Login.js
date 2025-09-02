import React, { useState,} from "react";
import {View, TextInput,Text, SafeAreaView, ScrollView, Dimensions, Image, TouchableOpacity, Alert, ActivityIndicator, Platform} from "react-native";
import { Input } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import {useAuth} from "../context/auth";

import api from "../services/api";


const {height, width} = Dimensions.get("screen");


const LoginScreen = ({navigation}) =>{


    const {signed, login} = useAuth()

    const [numero, setnumero] = useState("")
    const [senha, setsenha] = useState("")
    const [loading, setLoading] = useState(false)


    async function SendData (){
        setLoading(true);
   
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if(numero.length < 9){
            setLoading(false);
            Alert.alert(
                "Telefone invalido",
                "No minimo 9 digitos"
            )
            return
        }
        else if(numero.trim() === "" || senha.trim() === ""){
            setLoading(false);
            Alert.alert(
                "Dados Invalidos",
                "Nenhum dos campos pode permanecer vazio"
            )
            return
        }
        
        try {
            await login({numero: numero.trim(), senha: senha.trim()});
        } catch (error) {
            console.log('Login error in component:', error);
        } finally {
            setLoading(false);
        }
    }


    return(
        
        <SafeAreaView style={{flex:1, justifyContent:"center", backgroundColor:"#ffa000"}}>

            <TouchableOpacity onPress={() => navigation.goBack()}
             style={{flexDirection:"row", alignItems:"center", position:"absolute", top:height*0.07, left:width*0.05}}>
                <Ionicons name="arrow-back-circle-outline" size={24} color="#fff" />
                <Text style={{color:"#fff", fontWeight:"700", marginLeft:10}}>Voltar</Text>
            </TouchableOpacity>

            
            <View style={{width:width*0.8, justifyContent:"center", alignItems:"center", alignSelf:"center", marginTop:height*0.0}}>
                {
                    Platform.OS == 'web'?
                    <ActivityIndicator size={'large'}/>
                    :
                    <LottieView
                        autoPlay={true}
                        style={{height:height*0.31}}
                        source={require('../img/login.json')}
                    />
                }
            </View>

            <View style={{width:width*0.86, alignSelf:"center"}}>

                <Input
                    placeholder=''
                    style={{ borderWidth:2, borderRadius:5, borderColor:"#fff", paddingHorizontal:width*0.03,}}
                    label="Telefone"
                    labelStyle={{color:"#fff"}}
                    textAlign="center"
                    value={numero}
                    onChangeText={text => setnumero(text)}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    maxLength={9}
                    autoCorrect={true}
                    
                />

                <Input
                    placeholder=''
                    style={{ borderWidth:2, borderRadius:5, borderColor:"#fff", paddingHorizontal:width*0.03}}
                    label="Senha"
                    secureTextEntry={true}
                    labelStyle={{color:"#fff"}}
                    value={senha}
                    textAlign="center"
                    onChangeText={text => setsenha(text)}
                />
                <TouchableOpacity style={{position:"absolute", right:10,bottom:-5}}>
                    <Text style={{fontWeight:"700", color:"#607d8b"}}>Esqueceu senha ?</Text>
                </TouchableOpacity>
            </View>

            <View style={{alignItems:"center",marginTop:height*0.02}}>
    
                <TouchableOpacity 
                    onPress={() => SendData()}
                    disabled={loading}
                    style={{ 
                        marginTop:height*0.01, 
                        backgroundColor: loading ? "#9e9e9e" : "#607d8b",
                        elevation:0,
                        borderWidth:0.4,
                        borderColor:"#fff",
                        borderRadius:8, 
                        width:width*0.8, 
                        height:height*0.06,
                        alignItems:"center", 
                        justifyContent:"center",
                        flexDirection: "row"
                    }}>
                    {loading && <ActivityIndicator size="small" color="#fff" style={{marginRight: 10}} />}
                    <Text style={{fontWeight:"700", color:"#FFF", fontSize:20}}>
                        {loading ? "Entrando..." : "Entrar"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop:height*0.03,justifyContent:"center", alignItems:"center", flexDirection:"row",}}>
                <Text>Sou um novo utilizador.</Text>
                <TouchableOpacity onPress={() => navigation.navigate("LogUP")}>
                    <Text style={{fontWeight:"700", color:"#607d8b", marginLeft:5}}>Cadastrar-se</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
} 

export default LoginScreen;