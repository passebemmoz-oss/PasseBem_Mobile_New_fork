import React, {useState, useEffect, useCallback, useRef, useMemo} from "react";
import {Dimensions, View, TextInput, ActivityIndicator} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Bubble, GiftedChat, Send, Actions } from 'react-native-gifted-chat';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import {sendData, socket} from '../services/socket'
import { useAuth } from "../context/auth";

import api from '../services/api'

const {width, height} = Dimensions.get("screen")

const ChatScreen = ({navigation}) => {
  const {user} = useAuth()
  const mountedRef = useRef(false)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  // UseEffect único para inicialização
  useEffect(() => {
    if (!user?.id || mountedRef.current) return
    
    mountedRef.current = true

    const initializeChat = async () => {
      try {
        // Carregar mensagens
        const {data} = await api.get('chatall')
        setMessages(data || [])
        
        // Configurar socket
        socket.io.opts.query = { Authorization: user.id }
        
        if (!socket.connected) {
          socket.connect()
        }
        
        const handleChatAll = (data) => {
          setMessages(data || [])
        }

        socket.on('chatall', handleChatAll)

        // Cleanup será executado quando o componente desmontar
        return () => {
          socket.off('chatall', handleChatAll)
          if (socket.connected) {
            socket.disconnect()
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar chat:', error)
        setMessages([])
      } finally {
        setLoading(false)
      }
    }

    initializeChat()

    return () => {
      mountedRef.current = false
    }
  }, []) // Array vazio - executa apenas uma vez

  // Função para enviar imagens
  const handleImageSend = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.cancelled || !result.assets) return;

      const foto = result.assets[0];
      const formData = new FormData();

      formData.append('imagem', {
        uri: foto.uri,
        name: `chat_image_${Date.now()}.jpg`,
        type: "image/jpeg",
      });

      formData.append("name", user?.user_inf?.nome || "user")
      formData.append("avatar", user?.user_inf?.perfil_url || "https://oolhar.com.br/wp-content/uploads/2020/09/perfil-candidatos.jpg")

      const newMessage = {
        _id: Math.random().toString(),
        image: foto.uri,
        user: { _id: user.id, name: user?.user_inf?.nome || "user" },
        createdAt: new Date(),
      }

      setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]))
      await api.post('chatimagem', formData)
    } catch (error) {
      console.error('Erro ao enviar imagem:', error)
    }
  }, [user?.id, user?.user_inf?.nome, user?.user_inf?.perfil_url])

  // Função para enviar vídeos
  const handleVideoSend = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
      });

      if (result.cancelled || !result.assets) return;

      const video = result.assets[0];
      const formData = new FormData();

      formData.append('imagem', {
        uri: video.uri,
        name: `chat_video_${Date.now()}.mp4`,
        type: "video/mp4",
      });

      formData.append("name", user?.user_inf?.nome || "user")
      formData.append("avatar", user?.user_inf?.perfil_url || "https://oolhar.com.br/wp-content/uploads/2020/09/perfil-candidatos.jpg")

      const newMessage = {
        _id: Math.random().toString(),
        video: video.uri,
        user: { _id: user.id, name: user?.user_inf?.nome || "user" },
        createdAt: new Date(),
      }

      setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]))
      await api.post('chatvideo', formData)
    } catch (error) {
      console.error('Erro ao enviar vídeo:', error)
    }
  }, [user?.id, user?.user_inf?.nome, user?.user_inf?.perfil_url])

  // Função para enviar mensagens de texto
  const handleSend = useCallback(async (newMessages = []) => {
    try {
      if (!newMessages[0]) return;

      const data = {
        text: newMessages[0].text,
        name: user?.user_inf?.nome || "user",
        avatar: user?.user_inf?.perfil_url || "https://oolhar.com.br/wp-content/uploads/2020/09/perfil-candidatos.jpg",
      }
      
      await api.post('/chattext', data, {
        headers: {
          user: newMessages[0].user._id,
        }
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  }, [user?.user_inf?.nome, user?.user_inf?.perfil_url])

  // Componentes de renderização
  const renderActions = useCallback((props) => (
    <Actions
      {...props}
      options={{
        ['Enviar Imagem']: handleImageSend,
        ['Enviar Video']: handleVideoSend,
      }}
      icon={() => (
        <View style={{ width: width * 0.06, elevation: 6, backgroundColor: "#ffa000", borderRadius: 50 }}>
          <MaterialCommunityIcons name="paperclip" size={24} color="#fff" />
        </View>
      )}
    />
  ), [handleImageSend, handleVideoSend])

  const renderSend = useCallback((props) => (
    <Send {...props}>
      <View>
        <MaterialCommunityIcons 
          style={{ marginBottom: 5, marginRight: 10 }} 
          name="send-circle" 
          size={32} 
          color="#ffa000" 
        />
      </View>
    </Send>
  ), [])

  const renderBubble = useCallback((props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#ffa000" }
      }}
    />
  ), [])

  const renderMessageVideo = useCallback((props) => {
    const { currentMessage } = props;
    return (
      <View style={{ padding: 20 }}>
        <Video
          resizeMode="contain"
          useNativeControls
          shouldPlay={false}
          source={{ uri: currentMessage.video }}
          style={{ height: 140, width: 250 }}
        />
      </View>
    );
  }, [])

  const scrollToBottomComponent = useCallback(() => (
    <View>
      <FontAwesome name="angle-double-down" size={24} color="black" />
    </View>
  ), [])

  // Memoized user object para evitar re-renders - usar apenas ID do user
  const userMemo = useMemo(() => {
    if (!user?.id) return null
    return {
      _id: user.id,
      name: user?.user_inf?.nome || "user",
      avatar: user?.user_inf?.perfil_url || "https://oolhar.com.br/wp-content/uploads/2020/09/perfil-candidatos.jpg",
    }
  }, [user?.id]) // Apenas user.id como dependência

  if (loading || !user?.id || !userMemo) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      {/* GiftedChat temporariamente desabilitado para debug */}
      {/* <GiftedChat
        messages={messages}
        onSend={(newMessages) => {
          setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
          handleSend(newMessages)
        }}
        user={userMemo}
        placeholder="Post, a tua primeira experiência de condução depois de tirar a carta"
        renderMessageVideo={renderMessageVideo}
        renderBubble={renderBubble}
        alwaysShowSend={true}
        renderSend={renderSend}
        imageStyle={{ width: 100, height: 100 }}
        renderActions={renderActions}
        scrollToBottom={true}
        scrollToBottomComponent={scrollToBottomComponent}
      /> */}
    </View>
  )
}

export default ChatScreen;