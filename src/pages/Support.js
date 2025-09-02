import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View , ScrollView,TouchableOpacity,Linking, Platform, Dimensions, SafeAreaView} from 'react-native';
import {  NavigationContainer, useRoute, useIsFocused } from "@react-navigation/native";
import { Ionicons, MaterialIcons, MaterialCommunityIcons ,EvilIcons, AntDesign,SimpleLineIcons,FontAwesome, Entypo} from '@expo/vector-icons';
import * as MailComposer from "expo-mail-composer";


import styles from "../styles/styles";


const { width, heigth } = Dimensions.get('window')



// Conteudo da paggina========================================================
const SupportScreen = ({navigation}) => { 

  const messagem = "Preciso de Apoio Tecnico em :"

  function sendMail(){
    MailComposer.composeAsync({
      subject:"Usurio do Aplicativo Passe-Bem",
      recipients:["delciohg@gmail.com"],
      body:messagem
    })
  }

  function Whats(){
  
   Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
    if (supported) {
      return Linking.openURL(
        "whatsapp://send?phone=258876701253&text=Preciso de Apoio Tecnico em :"
      );
    } else {
      return Linking.openURL(
        "https://api.whatsapp.com/send?phone=258876701253&text=Preciso de Apoio Tecnico em :"
      );
    }
  })
    
  }


  return(
    <SafeAreaView style={styles.SafeConteiner}>
        <View style={styles.topbar}>
        <View style={styles.itembar}>
            <Ionicons name="ios-arrow-back" size={28} style={styles.itembarIcon} onPress = {() => {navigation.goBack()}} /> 
            <Text style={{color:"#607d8b",fontSize:20,fontWeight:"bold"}}>Contacte-nos</Text>
            <MaterialIcons name= "live-help" style={styles.itembarIcon}  size={28}  />              
        </View>
      </View>
      <ScrollView>
        <View style={{justifyContent:"center", alignItems:"center"}}>
          <View style={{width:width, alignItems:"center"}}>
            <View style={styles.principal}>
              
              <View style={styles.CgeralmenteT}>
                <TouchableOpacity onPress ={()=> Whats()}>
                  <FontAwesome name="whatsapp" size={60} color="#ddd"/>
                  <Text>Whatsapp</Text>
                </TouchableOpacity>
              </View>
              <View style={ styles.CgeralmenteT}>
                <TouchableOpacity onPress ={()=> sendMail()}>
                  <MaterialIcons name="email" size={60} color="#ddd"/>
                  <Text>E-mail</Text>
                </TouchableOpacity>
              </View>
              <View style={ styles.CgeralmenteT}>
                <TouchableOpacity onPress ={()=> Linking.openURL(`tel:${258876701253}`)}>
                  <Ionicons name="ios-call" size={60} color="#ddd"/>
                  <Text>Chamada</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
          <View style={{width:width, alignItems:"center"}}>
            <View style={styles.principal}>
              
              <View style={styles.CgeralmenteT}>
                <TouchableOpacity onPress ={()=> Linking.openURL(`sms:258876701253?body=Preciso de Apoio Tecnico em :`)}>
                  <MaterialIcons name="sms" size={60} color="#ddd"/>
                  <Text>SMS</Text>
                </TouchableOpacity>
              </View>
              <View style={ styles.CgeralmenteT}>
                <TouchableOpacity disabled onPress ={()=> Linking.openURL(`https://www.linkedin.com/in/delcio-luis-7860861a4`)}>
                  <Entypo name="network" size={60} color="#ddd"/>
                  <Text>WebSite</Text>
                </TouchableOpacity>
              </View>
              <View style={ styles.CgeralmenteT}>
                <TouchableOpacity onPress ={()=> Linking.openURL('https://www.linkedin.com/in/delcio-luis-7860861a4')}>
                  <Entypo name="linkedin" size={60} color="#ddd"/>
                  <Text>LinkedIn</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
            
        </View>
        
      </ScrollView>

      
    </SafeAreaView>
  )
};

//=====================================================================

  export default SupportScreen;

  /* const styles = StyleSheet.create({
    

    C
})
 */
