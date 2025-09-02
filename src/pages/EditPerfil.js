import React, {useState, useEffect} from "react";
import {View, Text, Dimensions, SafeAreaView, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert, ToastAndroid, ActivityIndicator} from "react-native";
import {  MaterialIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useAuth } from "../context/auth";
import * as ImagePicker from 'expo-image-picker';


import api from '../services/api'

const {width, height} = Dimensions.get("screen")

const images = "data:image/jpeg;base64,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"


const EditPerfil = ({navigation}) => {


    const [image, setimages] = useState(null)
    const [isloading, setIsloading] = useState(false)

    const {user, MergeData} = useAuth();

    const [nome, setnome] = useState("");
    const [distrito, setdistrito] = useState("");
    const [ruaporta, setruaporta] = useState("");
    const [provincia, setprovincia] = useState("");
    const [email, setemail] = useState("");
    const [bairro, setbairro] = useState("");
    const [idade, setidade] = useState("");
    const [genero, setgenero] = useState("");
    const [categoria, setcategoria] = useState("");
    const [nivelacademico, setnivelacademico] = useState("");
    const [escola, setescola] = useState("");
    const [viatura, setviatura] = useState("nao");
    const [datacomprar, setdatacomprar] = useState("");
    const [classecaro, setclassecaro] = useState('< 1.000Cc');
    const [notificacao, setnotificacao] = useState(true);

    const [confclassecaro, setconfclassecaro] = useState(false);
    const [confdatacomprar, setconfdatacomprar] = useState(false);
    const [confviatura, setconfviatura] = useState(false);
    const [confnome, setconfnome] = useState(false);
    const [ confapelido, setconfapelido] = useState(false);
    const [ confempresa, setconfempresa] = useState(false);
    const [confdistrito, setconfdistrito] = useState(false);
    const [confruaporta, setconfruaporta] = useState(false);
    const [confprovincia, setconfprovincia] = useState(false);
    const [confemail, setconfemail] = useState(false);
    const [confsenha, setconfsenha] = useState(false);
    const [confbairro, setconfbairro] = useState(false);
    const [confidade, setconfidade] = useState(false);
    const [confpagamento, setconfpagamento] = useState(false);
    const [confgenero, setconfgenero] = useState(false);
    const [confcategoria, setconfcategoria] = useState(false);
    const [confacademico, setconfacademico] = useState(false);
    const [confescola, setconfescola] = useState(false);

    const [listaEscola, setlistaEscola] = useState([]);


    useEffect(() => {

        async function GetEscolas(){
        
            try{
                const response = await api.get("/escolas")

                setlistaEscola(response?.data)

            }catch(error){

                ToastAndroid.showWithGravityAndOffset(
                    "Não foi possível carregar as Escolas",
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                    25,
                    50
                );
            }  
        }
        GetEscolas()
    },[])
    

    const FotoPerfil = async () => {

        let foto = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });  

        

        if(!foto.uri) setimages(null)
        else setimages(foto.uri)
        
      }



  async function FdastrarUser(){


    let originalname='perfil'+'.jpg';
      
    const data = new FormData;

    if(image) data.append('imagem',{
        uri:image,
        name:originalname,
        type:"image/jpg",
    })

    else data.append('imagem',image)

    data.append('nome',nome)
    data.append('provincia', provincia)
    data.append('distrito', distrito)
    data.append('telefone', user.numero)
    data.append('email', email)
    data.append('idade', idade)
    data.append('genero', genero)
    data.append('categoria', categoria)
    data.append('escola', escola)
    data.append('viatura', viatura)
    data.append('datacomprar', datacomprar)
    data.append('classecaro', classecaro,)
    data.append('notificacao', notificacao)
    data.append('nivelacademico', nivelacademico)
        


    if(nome =="" || nome.trim() == "" ){
      setconfnome(true)
    }
    else if(email == "" || email.trim() == ""){
    
      setconfemail(true)
    }

    else if(categoria =="" || categoria.trim() == "" ){
        
      setconfcategoria(true)
    }
    else if(genero =="" || genero.trim() == "" ){
        
        setconfgenero(true)
    }
    else if(!idade || idade =="" || idade.trim() == "" ){
        
        setconfidade(true)
    }
    else if(provincia =="" || provincia.trim() == "" ){
      setconfprovincia(true)
    }
    else if(distrito =="" || distrito.trim() == "" ){
      setconfdistrito(true)
    }
    
    else if(nivelacademico =="" || nivelacademico.trim() == "" ){
      setconfacademico(true)
    }
    

    else{
        setconfnome(false)
        setconfgenero(false)
        setconfidade(false)
        setconfdistrito(false)
        setconfprovincia(false)
        setconfemail(false)
        setconfcategoria(false)
        setconfacademico(false)

////
        try{
            setIsloading(true)
            const response = await api.post(`appuserinf`, data);
            MergeData(response.data.appUser)

            setIsloading(false)
            Alert.alert(
                "Seus dados foram actualizados"
            )

            navigation.goBack()
        }catch (err){
            setIsloading(false)
            alert(err)
            console.log(err)
        }  
    } 
  };

  useEffect(() => {
      if(user?.user_inf){
          setnome(user.user_inf?.nome)
          setemail(user.user_inf?.email)
          setcategoria(user.user_inf?.categoria)
          setgenero(user.user_inf?.genero)
          setprovincia(user.user_inf?.provincia)
          setdistrito(user.user_inf?.distrito)
          setnivelacademico(user.user_inf?.nivelacademico)
          setviatura(user.user_inf?.viatura)
          setimages(user?.user_inf?.perfil_url)
      }
  }, [])

  if(isloading){

    return(
        <View style={{flex:1,backgroundColor:"#fff", justifyContent:"center", alignItems:"center",}}>
          <ActivityIndicator  size={'large'}/>
        </View>
      )
  }

  
    return (
        
      <SafeAreaView style={{flex:1, backgroundColor:"#f0f4fd"}}>
          <View
                style={{
                    height:height*0.07,  width:width, justifyContent:"center",alignItems:"center" 
                }}
            >   
                <View style={{ width:width*0.9, flexDirection:"row", justifyContent:"space-between"}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="keyboard-backspace" size={24} color="#607d8b" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{backgroundColor:"#ffc107", elevation:5, borderRadius:8}}
                    onPress={() => FdastrarUser()}>
                        <MaterialIcons name="check" size={24} color="#607d8b" />
                    </TouchableOpacity>
                  
                </View>
                
            </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={{alignContent:"center",justifyContent:"center", alignItems:"center",}}>
              
                <View>
                    <Image source={{uri:image || images}} style={{ height:width*0.26, width:width*0.26, borderRadius:50, resizeMode:"cover"}}/>
                    <TouchableOpacity onPress={()=> FotoPerfil()}
                     style={{position:"absolute", right:1, top:height*0.09, padding:5,backgroundColor:"#ffc107", borderRadius:50,}}>
                        <MaterialIcons name="edit" size={22} color="black" style={{alignSelf:"center"}} />
                    </TouchableOpacity>
                </View>

                <TextInput style={[styles.textInput, {borderColor: !confnome ?'#FFF':'red'}]}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setnome}
                />

                <TextInput style={[styles.textInput, {borderColor: !confemail ?'#FFF':'red'}]}
                    placeholder="Email"
                    value={email}
                    onChangeText={setemail}
                    keyboardType="email-address"
                    
                />

                <View style={{flexDirection:"row", justifyContent:"space-between",paddingHorizontal:5, 
                alignItems:"center", width:width*0.9, backgroundColor:"#fff", height:height*0.04, borderRadius:8,}}>
                    <Text style={{fontWeight:"700", fontSize:18, color: !confcategoria?'#000':'red'}}>Categoria</Text>
                    <Picker style={{width:width*0.4, marginTop:height*0,borderWidth:3, borderColor:"#fff",borderRadius:8,paddingVertical:height*0.01}}
                        selectedValue ={categoria}
                        onValueChange={(itemValue, itemIndex)  =>setcategoria(itemValue)}
                        >
                        <Picker.Item label="Selecione" />
                        <Picker.Item label="A" value="A"/>
                        <Picker.Item label="A1" value="A1"/>
                        <Picker.Item label="B" value="B"/>
                        <Picker.Item label="C" value="C"/>
                        <Picker.Item label="C1" value="C1"/>
                    </Picker>
                </View>

                <View style={{width:width*0.9, flexDirection:"row", justifyContent:"space-between"}}>

                    <Picker style={{width:width*0.6, marginTop:height*0,borderWidth:3,color:!confgenero?'#000':'red',
                        borderColor:"#fff",borderRadius:8,paddingVertical:height*0.01}}
                        selectedValue ={genero}
                        onValueChange={(itemValue, itemIndex)  =>setgenero(itemValue)}
                        >
                        <Picker.Item label="Selecione seu genero" />
                        <Picker.Item label="Masculino" value="Masculino"/>
                        <Picker.Item label="Femenino" value="Femenino"/>
                        <Picker.Item label="Outro" value="Outro"/>
                    </Picker>

                    <TextInput style={[styles.textInput, {width:width*0.2,borderColor:!confidade?'#000':'red',}]}
                        placeholder="Idade"
                        value={idade}
                        onChangeText={setidade}
                        maxLength={2}
                        keyboardType="number-pad"
                    />

                </View>

                <Picker style={{marginHorizontal:15,width:width*0.9, marginTop:height*0,borderWidth:3,color:!confprovincia?'#000':'red',
                    borderColor:"#fff",borderRadius:8,paddingVertical:height*0.01}}
                    selectedValue ={provincia}
                    onValueChange={(itemValue, itemIndex)  =>setprovincia(itemValue)}
                    >
                    <Picker.Item label="Selecione sua Província" />
                    <Picker.Item label="Cabo Delgado" value="Cabo-Delgado"/>
                    <Picker.Item label="Gaza" value="Gaza"/>
                    <Picker.Item label="Inhambane" value="Inhambane"/>
                    <Picker.Item label="Manica" value="Manica"/>
                    <Picker.Item label="Maputo_Província" value="Maputo_Província"/>
                    <Picker.Item label="Maputo_Cidade" value="Maputo_Cidade"/>
                    <Picker.Item label="Nampula" value="Nampula"/>
                    <Picker.Item label="Niassa" value="Niassa"/>
                    <Picker.Item label="Sofala" value="Sofala"/>
                    <Picker.Item label="Tete" value="Tete"/>
                    <Picker.Item label="Zambézia" value="Zambézia"/>
                </Picker>
      
                {provincia == "Cabo-Delgado" ? (
                    <Picker  style={{marginHorizontal:15, borderWidth:3, borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                    selectedValue ={distrito}
                    onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                    >
                    <Picker.Item label="Selecione seu Distrito" />
                    <Picker.Item label="Pemba" value="Pemba"/>
                    <Picker.Item label="Ancuabe" value="Ancuabe"/>
                    <Picker.Item label="Balama" value="Balama"/>
                    <Picker.Item label="Chiúre" value="Chiúre"/>
                    <Picker.Item label="Ibo" value="Ibo"/>
                    <Picker.Item label="Macomia" value="Macomia"/>
                    <Picker.Item label="Mecufi" value="Mecufi"/>
                    <Picker.Item label="Meluco" value="Meluco"/>
                    <Picker.Item label="Metuge" value="Metuge"/>
                    <Picker.Item label="Mocímboa da Praia" value="Mocímboa da Praia"/>
                    <Picker.Item label="Montepuez" value="Montepuez"/>
                    <Picker.Item label="Mueda" value="Mueda"/>
                    <Picker.Item label="Muidumbe" value="Muidumbe"/>
                    <Picker.Item label="Namuno" value="Namuno"/>
                    <Picker.Item label="Nangade" value="Nangade"/>
                    <Picker.Item label="Palma" value="Palma"/>
                    <Picker.Item label="Quissanga" value="Quissanga"/>

                    </Picker>
                ):provincia == "Gaza" ? (
                    <Picker  style={{marginHorizontal:15, borderWidth:3,color:!confdistrito?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                    selectedValue ={distrito}
                    onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                    >
                    <Picker.Item label="Selecione seu Distrito" />
                    <Picker.Item label="Xai-Xai" value="Xai-Xai"/>
                    <Picker.Item label="Bilene" value="Bilene"/>
                    <Picker.Item label="Chibuto" value="Chibuto"/>
                    <Picker.Item label="Chicualacuala" value="Chicualacuala"/>
                    <Picker.Item label="Chigubo" value="Chigubo"/>
                    <Picker.Item label="Chókwè" value="Chókwè"/>
                    <Picker.Item label="Chonguene" value="Chonguene"/>
                    <Picker.Item label="Guijá" value="Guijá"/>
                    <Picker.Item label="Limpopo" value="Limpopo"/>
                    <Picker.Item label="Mabalane" value="Mabalane"/>
                    <Picker.Item label="Manjacaze" value="Manjacaze"/>
                    <Picker.Item label="Mapai" value="Mapai"/>
                    <Picker.Item label="Massangena" value="Massangena"/>
                    <Picker.Item label="Massingir" value="Massingir"/>
                </Picker>)
                :provincia == "Inhambane" ? (
                <Picker  style={{marginHorizontal:15, borderWidth:3,color:!confdistrito?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                selectedValue ={distrito}
                onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                >
                    <Picker.Item label="Selecione seu Distrito" />
                    <Picker.Item label="Inhambane" value="Inhambane"/>
                    <Picker.Item label="Funahlouro" value="Funahlouro"/>
                    <Picker.Item label="Govuro" value="Govuro"/>
                    <Picker.Item label="Homoíne" value="Homoíne"/>
                    <Picker.Item label="Inharrime" value="Inharrime"/>
                    <Picker.Item label="Inhassoro" value="Inhassoro"/>
                    <Picker.Item label="Jangamo" value="Jangamo"/>
                    <Picker.Item label="Mabote" value="Mabote"/>
                    <Picker.Item label="Massinga" value="Massinga"/>
                    <Picker.Item label="Maxixe" value="Maxixe"/>
                    <Picker.Item label="Morrumbene" value="Morrumbene"/>
                    <Picker.Item label="Panda" value="Panda"/>
                    <Picker.Item label="Vilanculos" value="Vilanculos"/>
                    <Picker.Item label="Zavala" value="Zavala"/>
                </Picker>)
                :provincia == "Manica" ? (
                    <Picker style={{marginHorizontal:15, borderWidth:3,color:!confdistrito?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                    selectedValue ={distrito}
                    onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                    >
                        <Picker.Item label="Selecione seu Distrito" />
                        <Picker.Item label="Chimoio" value="Chimoio"/>
                        <Picker.Item label="Bárue" value="Bárue"/>
                        <Picker.Item label="Gondola" value="Gondola"/>
                        <Picker.Item label="Guro" value="Guro"/>
                        <Picker.Item label="Macate" value="Macate"/>
                        <Picker.Item label="Machaze" value="Machaze"/>
                        <Picker.Item label="Macossa" value="Macossa"/>
                        <Picker.Item label="Manica" value="Manica"/>
                        <Picker.Item label="Mossurize" value="Mossurize"/>
                        <Picker.Item label="Sussundenga" value="Sussundenga"/>
                        <Picker.Item label="Tambara" value="Tambara"/>
                        <Picker.Item label="Vanduzi" value="Vanduzi"/>
                    </Picker>)
                :provincia == "Maputo_Província" ? (
                    <Picker style={{marginHorizontal:15, borderWidth:3,color:!confdistrito?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                    selectedValue ={distrito}
                    onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                    >
                        <Picker.Item label="Selecione seu Distrito" />
                        <Picker.Item label="Matola" value="Matola"/>
                        <Picker.Item label="Boane" value="Boane"/>
                        <Picker.Item label="Magude" value="Magude"/>
                        <Picker.Item label="Manhiça" value="Manhiça"/>
                        <Picker.Item label="Marracuene" value="Marracuene"/>
                        <Picker.Item label="Matutuíne" value="Matutuíne"/>
                        <Picker.Item label="Moamba" value="Moamba"/>
                        <Picker.Item label="Namaacha" value="Namaacha"/>
                        <Picker.Item label="Maputo" value="Maputo"/>
                    </Picker>)
                :provincia == "Maputo_Cidade" ? (
                    <Picker style={{marginHorizontal:15, borderWidth:3,color:!confdistrito?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                    selectedValue ={distrito}
                    onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                    >
                        <Picker.Item label="Selecione seu Distrito" />
                        <Picker.Item label="Maputo_Cidade" value="Maputo_Cidade"/>
                    </Picker>)
                :provincia == "Nampula" ? (
                    <Picker style={{marginHorizontal:15, borderWidth:3,color:!confdistrito?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                    selectedValue ={distrito}
                    onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                    >
                        <Picker.Item label="Selecione seu Distrito" />
                        <Picker.Item label="Nampula" value="Nampula"/>
                        <Picker.Item label="Angoche" value="Angoche"/>
                        <Picker.Item label="Eráti" value="Eráti"/>
                        <Picker.Item label="Ilha de Moçambique" value="Ilha de Moçambique"/>
                        <Picker.Item label="Lalaua" value="Lalaua"/>
                        <Picker.Item label="Larde" value="Larde"/>
                        <Picker.Item label="Liúpo" value="Liúpo"/>
                        <Picker.Item label="Malema" value="Malema"/>
                        <Picker.Item label="Meconta" value="Meconta"/>
                        <Picker.Item label="Mecubúri" value="Mecubúri"/>
                        <Picker.Item label="Memba" value="Memba"/>
                        <Picker.Item label="Mogincual" value="Mogincual"/>
                        <Picker.Item label="Mogovolas" value="Mogovolas"/>
                        <Picker.Item label="Moma" value="Moma"/>
                        <Picker.Item label="Monapo" value="Monapo"/>
                        <Picker.Item label="Mossuril" value="Mossuril"/>
                        <Picker.Item label="Muecate" value="Muecate"/>
                        <Picker.Item label="Murrupula" value="Murrupula"/>
                        <Picker.Item label="Nacala-a-Velha" value="Nacala-a-Velha"/>
                        <Picker.Item label="Nacala Porto" value="Nacala Porto"/>
                        <Picker.Item label="Nacarôa" value="Nacarôa"/>
                        <Picker.Item label="Ribaué" value="Ribaué"/>
                    </Picker>)
                    :provincia == "Sofala" ? (
                    <Picker style={{marginHorizontal:15, borderWidth:3,color:!confdistrito?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}} 
                        selectedValue ={distrito}
                        onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                        >
                        <Picker.Item label="Selecione seu Distrito" />
                        <Picker.Item label="Beira" value="Beira"/>
                        <Picker.Item label="Búzi" value="Búzi"/>
                        <Picker.Item label="Caia" value="Caia"/>
                        <Picker.Item label="Chemba" value="Chemba"/>
                        <Picker.Item label="Cheringoma" value="Cheringoma"/>
                        <Picker.Item label="Chibabava" value="Chibabava"/>
                        <Picker.Item label="Dondo" value="Dondo"/>
                        <Picker.Item label="Gorongosa" value="Gorongosa"/>
                        <Picker.Item label="Machanga" value="Machanga"/>
                        <Picker.Item label="Maringué" value="Maringué"/>
                        <Picker.Item label="Marromeu" value="Marromeu"/>
                        <Picker.Item label="Muanza" value="Muanza"/>
                        <Picker.Item label="Nhamatanda" value="Nhamatanda"/>
                        </Picker>)
                    :provincia == "Tete" ? (
                    <Picker style={{marginHorizontal:15, borderWidth:3,color:!confdistrito?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                        selectedValue ={distrito}
                        onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                        >
                        <Picker.Item label="Selecione seu Distrito" />
                        <Picker.Item label="Tete" value="Tete"/>
                        <Picker.Item label="Angónia" value="Angónia"/>
                        <Picker.Item label="Cahora-Bassa" value="Cahora-Bassa"/>
                        <Picker.Item label="Changara" value="Changara"/>
                        <Picker.Item label="Chifunde" value="Chifunde"/>
                        <Picker.Item label="Chiuta" value="Chiuta"/>
                        <Picker.Item label="Dôa" value="Dôa"/>
                        <Picker.Item label="Macanga" value="Macanga"/>
                        <Picker.Item label="Magoé" value="Magoé"/>
                        <Picker.Item label="Marara" value="Marara"/>
                        <Picker.Item label="Marávia" value="Marávia"/>
                        <Picker.Item label="Moatize" value="Moatize"/>
                        <Picker.Item label="Mutarara" value="Mutarara"/>
                        <Picker.Item label="Tsangano" value="Tsangano"/>
                        <Picker.Item label="Zumbo" value="Zumbo"/>

                        </Picker>)
                    :provincia == "Zambézia" ? (
                    <Picker style={{marginHorizontal:15, borderWidth:3,color:!confdistrito?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                        selectedValue ={distrito}
                        onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                        >
                        <Picker.Item label="Selecione seu Distrito" />
                        <Picker.Item label="Quelimane" value="Quelimane"/>
                        <Picker.Item label="Alto Molócue" value="Alto Molócue"/>
                        <Picker.Item label="Chinde" value="Chinde"/>
                        <Picker.Item label="Derre" value="Derre"/>
                        <Picker.Item label="Gilé" value="Gilé"/>
                        <Picker.Item label="Gurué" value="Gurué"/>
                        <Picker.Item label="Ile" value="Ile"/>
                        <Picker.Item label="Inhassunge" value="Inhassunge"/>
                        <Picker.Item label="Luabo" value="Luabo"/>
                        <Picker.Item label="Lugela" value="Lugela"/>
                        <Picker.Item label="Maganja da Costa" value="Maganja da Costa"/>
                        <Picker.Item label="Milange" value="Milange"/>
                        <Picker.Item label="Mocuba" value="Mocuba"/>
                        <Picker.Item label="Mocubela" value="Mocubela"/>
                        <Picker.Item label="Molumbo" value="Molumbo"/>
                        <Picker.Item label="Mopeia" value="Mopeia"/>
                        <Picker.Item label="Morrumbala" value="Morrumbala"/>
                        <Picker.Item label="Mulevala" value="Mulevala"/>
                        <Picker.Item label="Namacurra" value="Namacurra"/>
                        <Picker.Item label="Namarroi" value="Namarroi"/>
                        <Picker.Item label="Nicoadala" value="Nicoadala"/>
                        <Picker.Item label="Pebane" value="Pebane"/>
                        </Picker>)
                    :provincia == "Niassa" ? (
                    <Picker style={{marginHorizontal:15, borderWidth:3,color:!confdistrito?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                        selectedValue ={distrito}
                        onValueChange={(itemValue, itemIndex)  =>setdistrito(itemValue)}
                        >
                        <Picker.Item label="Selecione seu Distrito" />
                        <Picker.Item label="Lichinga" value="Lichinga"/>
                        <Picker.Item label=" Cuamba" value=" Cuamba"/>
                        <Picker.Item label="Lago" value="Lago"/>
                        <Picker.Item label="Majune" value="Majune"/>
                        <Picker.Item label="Mandimba" value="Mandimba"/>
                        <Picker.Item label="Marrupa" value="Marrupa"/>
                        <Picker.Item label="Maúa" value="Maúa"/>
                        <Picker.Item label="Mavago" value="Mavago"/>
                        <Picker.Item label="Mecanhelas" value="Mecanhelas"/>
                        <Picker.Item label="Mecula" value="Mecula"/>
                        <Picker.Item label="Metarica" value="Metarica"/>
                        <Picker.Item label="Muembe" value="Muembe"/>
                        <Picker.Item label="N'gauma" value="N'gauma"/>
                        <Picker.Item label="Nipepe" value="Nipepe"/>
                        <Picker.Item label="Sanga" value="Sanga"/>
                    </Picker>)
                    
                :<Text/>}

                <Picker style={{marginHorizontal:15, borderWidth:3,color:!confacademico?'#000':'red', borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                        selectedValue ={nivelacademico}
                        onValueChange={(itemValue, itemIndex)  =>setnivelacademico(itemValue)}
                        >
                        <Picker.Item label="Nível académico" />
                        <Picker.Item label="Primario" value="Primario"/>
                        <Picker.Item label="Secundário" value="Secundário"/>
                        <Picker.Item label="Pré-universitário" value="Pré-universitário"/>
                        <Picker.Item label="Licenciatura" value="Licenciatura"/>
                        <Picker.Item label="Pós-graduação" value="Pós-graduação"/>
                        <Picker.Item label="Mestrado" value="Mestrado"/>
                </Picker>

                <Picker style={{marginHorizontal:15, borderWidth:3, borderColor:"#fff",borderRadius:8, paddingVertical:height*0.01, marginTop:height*0.03, width:width*0.9,}}
                        selectedValue ={escola}
                        onValueChange={(itemValue, itemIndex)  =>setescola(itemValue)}
                        >
                        <Picker.Item label="Escola de condução onde esta inscrito" />
                        {listaEscola?.map((item, index) => (
                            <Picker.Item label={item?.nome} value={item?.nome}/>
                        )
                        )}
                        
                </Picker>

                <Text style={{fontWeight:"700", fontSize:18, marginTop:height*0.03}}>Possui viatura?</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <RadioButton
                        value="sim"
                        status={ viatura === 'sim' ? 'checked' : 'unchecked' }
                        onPress={() => setviatura('sim')}
                    />
                    <Text style={{fontWeight:"700", fontSize:18}}>Sim</Text>
                    <RadioButton
                        value="nao"
                        status={ viatura === 'nao' ? 'checked' : 'unchecked' }
                        onPress={() => setviatura('nao')}
                    />
                    <Text style={{fontWeight:"700", fontSize:18}}>Não</Text>
                </View>
                {viatura =="nao" ?(
                    <React.Fragment>
                        <TextInput style={styles.textInput}
                            placeholder="Quando espera poder comprar uma?"
                            value={datacomprar}
                            onChangeText={setdatacomprar}
                        />
                        <Text style={{fontWeight:"700", fontSize:14, width:width*0.9,}}>Qual é a classe de carro que deseja em termos de eficiência de consumo de combustível (Cilindragem)</Text>

                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <RadioButton
                                value="< 1.000Cc"
                                status={ classecaro === '< 1.000Cc' ? 'checked' : 'unchecked' }
                                onPress={() => setclassecaro('< 1.000Cc')}
                            />
                            <Text style={{fontWeight:"700", fontSize:16}}> {"< 1.000Cc"}</Text>
                            <RadioButton
                                value="> 1.000 < 1.500Cc"
                                status={ classecaro === '> 1.000 < 1.500Cc' ? 'checked' : 'unchecked' }
                                onPress={() => setclassecaro('> 1.000 < 1.500Cc')}
                            />
                            <Text style={{fontWeight:"700", fontSize:16}}> {"> 1.000 < 1.500Cc"}</Text>
                        </View>

                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <RadioButton
                                value="> 1.500 < 3.000Cc"
                                status={ classecaro === '> 1.500 < 3.000Cc' ? 'checked' : 'unchecked' }
                                onPress={() => setclassecaro('> 1.500 < 3.000Cc')}
                            />
                            <Text style={{fontWeight:"700", fontSize:16}}> {"> 1.500 < 3.000Cc"}</Text>
                            <RadioButton
                                value="> 3.000Cc"
                                status={ classecaro === '> 3.000Cc' ? 'checked' : 'unchecked' }
                                onPress={() => setclassecaro('> 3.000Cc')}
                            />
                            <Text style={{fontWeight:"700", fontSize:16}}> {" > 3.000Cc"}</Text>
                        </View>
                        
                    </React.Fragment>
                ):(
                    <>
                    </>
                )}
                <View style={{flexDirection:"row", alignItems:"center", marginBottom:height*0.1,marginTop:height*0.02}}>
                    <Checkbox
                        status={notificacao ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setnotificacao(!notificacao);
                        }}
                    />
                    <Text style={{fontWeight:"700", fontSize:14, }}>Deseja receber notificações pêlo WhatsApp?</Text>
                </View>

            </View>
                
            </View>
            </ScrollView>
          </SafeAreaView>
    )
}

export default EditPerfil;

const styles = StyleSheet.create({
    textInput:{
        paddingHorizontal: width*0.04,
        marginVertical:height*0.02,
        borderColor:"#ddd",
        borderWidth:0.7,
        fontSize:18,
        borderRadius:8,
        backgroundColor:"#fff",
        width:width*0.9
        }
    }
)
