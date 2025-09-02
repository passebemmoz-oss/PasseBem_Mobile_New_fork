import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{createContext, useState, useEffect, useContext} from 'react';
import { Alert } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';


const AuthConteext = createContext({});

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem("@PBAuth:user")
            const storageToken =  await AsyncStorage.getItem("@PBAuth:token")


            if(storageUser && storageToken){
                setUser(JSON.parse(storageUser))
                setLoading(false)

                api.defaults.headers.Authorization = storageToken;
            }
            else setLoading(false)
        }

        loadStorage()
    }, [])

    function MergeData(update){

        
        setUser(update)
        AsyncStorage.mergeItem("@PBAuth:user", JSON.stringify(update))
    }

    function LogOut(){
        AsyncStorage.clear().then(
            setUser(null)
        )

    }
    
    async function login({numero, senha}){

        try{
            const {data} = await api.get("/appuser", {
                headers:{
                    numero:numero,
                    senha:senha,
                },
                timeout: 10000 // 10 segundos timeout
            })

            setUser(data)
            await AsyncStorage.setItem("@PBAuth:user", JSON.stringify(data))
            await AsyncStorage.setItem("@PBAuth:token", (data.id))

            api.defaults.headers.Authorization = data.id;
            
        }catch(err){
            let errorMessage = "Erro desconhecido";
            
            if (err.response) {
                // O servidor respondeu com um código de erro
                switch(err.response.status) {
                    case 401:
                        errorMessage = "Credenciais inválidas. Verifique seu telefone e senha.";
                        break;
                    case 404:
                        errorMessage = "Usuário não encontrado.";
                        break;
                    case 500:
                        errorMessage = "Erro no servidor. Tente novamente mais tarde.";
                        break;
                    default:
                        errorMessage = `Erro do servidor: ${err.response.status}`;
                }
            } else if (err.request) {
                // A requisição foi feita mas não houve resposta
                errorMessage = "Sem conexão com o servidor. Verifique sua internet e tente novamente.";
            } else {
                // Algum erro na configuração da requisição
                errorMessage = "Erro na requisição. Tente novamente.";
            }
            
            Alert.alert("PassBem Informa", errorMessage);
            console.log('Login error:', err);
        }
    }


    return(
        <AuthConteext.Provider value={{signed:!!user ,user, login, loading, LogOut, MergeData}}>
        {children}
        </AuthConteext.Provider>
    )
    
};

export function useAuth(){
    const context = useContext(AuthConteext)

    return context;
}