import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/auth';
import api from '../services/api';
import { socket } from '../services/socket';

const SimpleChatScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const flatListRef = useRef();
  const initialized = useRef(false);

  useEffect(() => {
    if (!user?.id || initialized.current) return;
    
    initialized.current = true;
    loadMessages();
    setupSocket();
    
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  const loadMessages = async () => {
    try {
      const response = await api.get('chatall');
      setMessages(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupSocket = () => {
    if (socket.connected) return;
    
    socket.io.opts.query = { Authorization: user.id };
    socket.connect();
    
    socket.on('chatall', (data) => {
      setMessages(data || []);
    });
  };

  const sendMessage = async () => {
    if (!inputText.trim() || sending) return;
    
    setSending(true);
    
    try {
      const messageData = {
        text: inputText.trim(),
        name: user?.user_inf?.nome || 'user',
        avatar: user?.user_inf?.perfil_url || 'https://oolhar.com.br/wp-content/uploads/2020/09/perfil-candidatos.jpg',
      };
      
      // Adicionar mensagem localmente primeiro
      const tempMessage = {
        _id: Date.now().toString(),
        text: inputText.trim(),
        createdAt: new Date(),
        user: {
          _id: user.id,
          name: user?.user_inf?.nome || 'user',
          avatar: user?.user_inf?.perfil_url || 'https://oolhar.com.br/wp-content/uploads/2020/09/perfil-candidatos.jpg',
        },
      };
      
      setMessages(prev => [tempMessage, ...prev]);
      setInputText('');
      
      await api.post('/chattext', messageData, {
        headers: { user: user.id },
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      Alert.alert('Erro', 'Não foi possível enviar a mensagem');
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isMyMessage = item.user?._id === user.id;
    
    return (
      <View style={[
        styles.messageContainer,
        isMyMessage ? styles.myMessage : styles.otherMessage
      ]}>
        <Text style={[
          styles.messageText,
          isMyMessage ? styles.myMessageText : styles.otherMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(item.createdAt).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffa000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}
        inverted
        style={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#999"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || sending) && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim() || sending}
        >
          {sending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <MaterialCommunityIcons name="send" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  messagesList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginVertical: 4,
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffa000',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#ffa000',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default SimpleChatScreen;
