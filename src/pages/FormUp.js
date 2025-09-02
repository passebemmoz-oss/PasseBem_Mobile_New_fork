import React ,{useState, useEffect}from "react";
import {View, TextInput,Text, SafeAreaView, ScrollView, Dimensions, Image, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


const {height, width} = Dimensions.get("screen");


const FormUP = ({navigation}) =>{

    const [email, setemail] = useState("")
    const [senha, setsenha] = useState("")
    const [confsenha, setconfsenha] = useState("")

    function SendData (){
        const data = {senha, email}

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if(reg.test(email) == false){
            Alert.alert(
                "Email Invalido",
                "Digite exemplo: delciopluis@gmail.com"
            )
        }
        else if((email.trim(), senha.trim()) ==""){
            Alert.alert(
                "Dados Invalidos",
                "Nenhum dos campos pode mermacer vasio"
            )
            return
        }
        else if(senha.trim() !== confsenha.trim("")){
            Alert.alert(
                "Confirme sua senha",
                "A senha deve ser a mesma ao confirmar"
            )
            return
        }

        else{
             navigation.navigate("Home")
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
                <ActivityIndicator size={'large'}/>
            </View>

            <View style={{width:width*0.86, alignSelf:"center"}}>

                <Input
                    placeholder=''
                    style={{ borderWidth:2, borderRadius:5, borderColor:"#fff", paddingHorizontal:width*0.03}}
                    label="Nome"
                    labelStyle={{color:"#fff"}}
                    value={email}
                    onChangeText={text => setemail(text)}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    maxLength={9}
                    textAlign="center"
                    autoCorrect={true}
                />
                
                <View style={{flexDirection:"row", width:width*0.43}}>
                    <Input
                        placeholder=''
                        style={{ borderWidth:2, borderRadius:5, borderColor:"#fff", paddingHorizontal:width*0.03, width:width*0.1}}
                        label="Idade"
                        labelStyle={{color:"#fff"}}
                        textAlign="center"
                        keyboardType="number-pad"
                    />
                    <Input
                        placeholder=''
                        style={{ borderWidth:2, borderRadius:5, borderColor:"#fff", paddingHorizontal:width*0.03}}
                        label="Sexo"
                        secureTextEntry={true}
                        labelStyle={{color:"#fff"}}
                        value={senha}
                        onChangeText={text => setsenha(text)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        textAlign="center"
                    />
                </View>
                

                <Input
                    placeholder=''
                    style={{ borderWidth:2, borderRadius:5, borderColor:"#fff", paddingHorizontal:width*0.03}}
                    label="Confirmar senha"
                    secureTextEntry={true}
                    labelStyle={{color:"#fff"}}
                    value={confsenha}
                    onChangeText={text => setconfsenha(text)}
                    autoCorrect={true}
                    autoCapitalize="none"
                    textAlign="center"
                    
                />
            </View>

            <View style={{alignItems:"center",marginTop:height*0}}>
    
                <TouchableOpacity onPress={() => SendData()}
                 style={{ marginTop:height*0.01, backgroundColor:"#28405a",elevation:0,borderWidth:0.4,borderColor:"#fff",borderRadius:8, 
                width:width*0.8, height:height*0.06,alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontWeight:"700", color:"#FFF", fontSize:20}}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <View style={{marginTop:height*0.03,justifyContent:"center", alignItems:"center", flexDirection:"row",}}>
                <Text>Ja tenho conta.</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{fontWeight:"700", color:"#28405a", marginLeft:5}}>Entrar</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
} 

export default FormUP;