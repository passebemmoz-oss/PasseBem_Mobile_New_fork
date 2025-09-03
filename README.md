# 📱 PasseBem Mobile - Documentação para Replicação em Flutter

## 🎯 **VISÃO GERAL DO APLICATIVO**

O **PasseBem** é um aplicativo educacional de preparação para exames de condução em Moçambique. O app oferece testes temáticos, aulas em vídeo, chat comunitário e sistema de pontuação com gamificação.

---

## 🎨 **PALETA DE CORES**

### **Cores Principais:**
- **Laranja Principal**: `#ffa000` (cor de destaque e botões)
- **Azul Acinzentado**: `#607d8b` (cor secundária, textos, ícones)
- **Fundo Principal**: `#f0f4fd` (cor de fundo das telas)
- **Branco**: `#ffffff` (cards, modais)
- **Amarelo Claro**: `#ffecb3` (elementos de destaque secundários)
- **Laranja Claro**: `#ffc107` (detalhes, moedas)

### **Cores de Estados:**
- **Sucesso**: `rgba(0, 230, 64, 1)` (verde)
- **Erro**: `rgba(207, 0, 15, 1)` (vermelho)
- **Cinza Claro**: `#ddd`, `#f5f5f5` (desabilitado)
- **Texto Principal**: `#212121` (preto)
- **Texto Secundário**: `#757575`, `#999` (cinza)

---

## 🔗 **DOCUMENTAÇÃO COMPLETA DAS APIs**

### 🌐 **CONFIGURAÇÃO BASE**

#### **URLs do Servidor:**
- **Desenvolvimento**: `http://192.168.5.242:3333/`
- **Produção**: `https://api.passebem.co.mz/`

#### **Configuração HTTP:**
- **Timeout**: 15 segundos
- **Content-Type**: `application/json`
- **Headers**: `Authorization: {user.id}` (para rotas autenticadas)

---

## 🔐 **AUTENTICAÇÃO**

### **1. Login**
- **Endpoint**: `GET /appuser`
- **Headers**: 
  - `numero: {telefone}`
  - `senha: {senha}`
- **Timeout**: 10 segundos
- **Resposta**: Dados do usuário + token
- **Códigos de Erro**:
  - `401`: Credenciais inválidas
  - `404`: Usuário não encontrado
  - `500`: Erro no servidor

### **2. Registro**
- **Endpoint**: `POST /appuser`
- **Body**:
```json
{
  "numero": "string", // 9 dígitos
  "senha": "string"
}
```
- **Resposta**: Mensagem de confirmação

---

## 👤 **PERFIL DO USUÁRIO**

### **3. Atualizar Perfil**
- **Endpoint**: `POST /appuserinf`
- **Tipo**: `multipart/form-data`
- **Campos**:
```json
{
  "imagem": "file", // Opcional
  "nome": "string",
  "provincia": "string",
  "distrito": "string", 
  "telefone": "string",
  "email": "string",
  "idade": "number",
  "genero": "string",
  "categoria": "string", // A, A1, B, C, C1
  "escola": "string",
  "viatura": "string", // sim/nao
  "datacomprar": "string", // Opcional
  "classecaro": "string", // Opcional
  "notificacao": "boolean",
  "nivelacademico": "string"
}
```

### **4. Listar Escolas**
- **Endpoint**: `GET /escolas`
- **Resposta**: Array de escolas de condução

---

## 🏠 **TELA PRINCIPAL**

### **5. Carregar Temas**
- **Endpoint**: `GET /apptemas`
- **Resposta**:
```json
{
  "temas": [
    {
      "_id": "string",
      "nome": "string",
      "descricao": "string"
    }
  ],
  "creditos": {
    "atividade": "number"
  }
}
```

### **6. Push Token**
- **Endpoint**: `POST /updatePushToken`
- **Body**:
```json
{
  "pushToken": "string",
  "phoneNumber": "number"
}
```

---

## 📚 **SISTEMA DE QUIZ**

### **7. Obter Questões**
- **Endpoint**: `POST /apptemas`
- **Body**:
```json
{
  "item": "object", // Tema selecionado ou 'geral'
  "tipo": "string"  // 'Tematica' ou 'Geral'
}
```
- **Resposta**:
```json
{
  "results": [
    {
      "_id": "string",
      "questao": "string",
      "alternativa_correta": "string",
      "incorecta_alternativas": ["string"],
      "imagem_url": "string"
    }
  ],
  "prova": {
    "_id": "string"
  }
}
```

### **8. Submeter Prova Geral**
- **Endpoint**: `POST /fazerprova`
- **Body**:
```json
{
  "ProvaFeita": [
    {
      "prova": "string",
      "userOption": "string",
      "numero": "number",
      "questao": "string"
    }
  ],
  "prova": "object",
  "pts": "number"
}
```

### **9. Submeter Prova Modular**
- **Endpoint**: `POST /fazerprovamodular`
- **Body**:
```json
{
  "ProvaFeita": "array",
  "modulo": "object",
  "pts": "number"
}
```

---

## 📖 **HISTÓRICOS**

### **10. Histórico de Provas**
- **Endpoint**: `GET /provasuser`
- **Resposta**: Lista de provas realizadas pelo usuário

### **11. Respostas da Prova**
- **Endpoint**: `GET /respstaprova/{prova_id}`
- **Parâmetros**: `{item}` no body
- **Resposta**: Detalhes das respostas da prova

### **12. Respostas da Prova Modular**
- **Endpoint**: `GET /respstaprovamodular/{prova_id}`
- **Parâmetros**: `{item}` no body

### **13. Histórico de Compras**
- **Endpoint**: `GET /histypyments`
- **Resposta**:
```json
{
  "value": [
    {
      "_id": "string",
      "pacote": "string",
      "valor": "number",
      "status": "boolean",
      "inscricao": "string"
    }
  ]
}
```

---

## 🎓 **SISTEMA DE AULAS**

### **14. Listar Módulos**
- **Endpoint**: `GET /appmodulos`
- **Resposta**:
```json
{
  "data": {
    "modulos": [
      {
        "_id": "string",
        "nome": "string"
      }
    ],
    "videosaulas": [
      {
        "_id": "string",
        "titulo": "string",
        "video_url": "string",
        "modulo_id": "string"
      }
    ]
  }
}
```

### **15. Módulo Específico**
- **Endpoint**: `GET /appmodulos/{modulo_id}`
- **Resposta**: Vídeos de um módulo específico

---

## 💬 **SISTEMA DE CHAT**

### **16. Carregar Mensagens**
- **Endpoint**: `GET /chatall`
- **Resposta**: Array de mensagens do chat

### **17. Enviar Mensagem de Texto**
- **Endpoint**: `POST /chattext`
- **Headers**: `user: {user.id}`
- **Body**:
```json
{
  "text": "string",
  "name": "string",
  "avatar": "string"
}
```

### **18. Enviar Imagem no Chat**
- **Endpoint**: `POST /chatimagem`
- **Tipo**: `multipart/form-data`
- **Campos**:
  - `imagem`: file
  - `name`: string
  - `avatar`: string

### **19. Enviar Vídeo no Chat**
- **Endpoint**: `POST /chatvideo`
- **Tipo**: `multipart/form-data`
- **Campos**:
  - `video`: file
  - `name`: string
  - `avatar`: string

---

## 💰 **SISTEMA DE PAGAMENTOS**

### **20. Recarregar Créditos**
- **Endpoint**: `POST /recaregarmais`
- **Body**:
```json
{
  "pacote": "string", // "Diario", "Semanal", "Mensal"
  "numero": "string"  // Número M-Pesa (84xxxxxxx ou 85xxxxxxx)
}
```
- **Referência M-Pesa**: `900215`

---

## 📄 **MATERIAL DIDÁTICO**

### **21. Material por Categoria**
- **Endpoint**: `GET /appmaterial/{categoria}`
- **Parâmetros**: `categoria` = nome da categoria (A, A1, B, C, C1)
- **Resposta**:
```json
{
  "value": [
    {
      "id": "string",
      "name": "string",
      "pages": "number",
      "data": "string",
      "link": "string" // URL do arquivo
    }
  ]
}
```

---

## 🔍 **ESTRUTURA PADRÃO DE RESPOSTA**

### **Sucesso:**
```json
{
  "data": "object/array",
  "message": "string"
}
```

### **Erro:**
```json
{
  "error": "string",
  "status": "number"
}
```

---

## 🚀 **IMPLEMENTAÇÃO EM FLUTTER**

### **1. Dependências Necessárias:**

Adicione no `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  dio: ^5.3.2                    # HTTP Client
  socket_io_client: ^2.0.3      # WebSocket para chat
  shared_preferences: ^2.2.2    # Armazenamento local
  provider: ^6.1.1              # Gerenciamento de estado
  video_player: ^2.8.1          # Player de vídeo
  firebase_messaging: ^14.7.9   # Notificações
  image_picker: ^1.0.4          # Seleção de imagens
  file_picker: ^6.1.1           # Seleção de arquivos
  pdf_viewer_plugin: ^2.0.1     # Visualizador de PDF
  lottie: ^2.7.0               # Animações
  cached_network_image: ^3.3.0  # Cache de imagens
```

### **2. Configuração HTTP Client:**

```dart
import 'package:dio/dio.dart';

class ApiService {
  static const String baseUrlDev = 'http://192.168.5.242:3333/';
  static const String baseUrlProd = 'https://api.passebem.co.mz/';
  
  final Dio _dio = Dio(BaseOptions(
    baseUrl: baseUrlDev,
    connectTimeout: Duration(seconds: 15),
    receiveTimeout: Duration(seconds: 15),
    headers: {
      'Content-Type': 'application/json',
    },
  ));

  ApiService() {
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        print('Request: ${options.method} ${options.path}');
        handler.next(options);
      },
      onError: (error, handler) {
        print('Error: ${error.response?.statusCode} ${error.message}');
        handler.next(error);
      },
    ));
  }
}
```

### **3. Exemplo de Implementação (Login):**

```dart
class AuthService {
  final ApiService _apiService = ApiService();

  Future<User> login(String numero, String senha) async {
    try {
      final response = await _apiService._dio.get('/appuser', 
        options: Options(headers: {
          'numero': numero,
          'senha': senha,
        }),
      );
      return User.fromJson(response.data);
    } catch (e) {
      if (e is DioError) {
        switch (e.response?.statusCode) {
          case 401:
            throw 'Credenciais inválidas. Verifique seu telefone e senha.';
          case 404:
            throw 'Usuário não encontrado.';
          case 500:
            throw 'Erro no servidor. Tente novamente mais tarde.';
          default:
            throw 'Sem conexão com o servidor. Verifique sua internet.';
        }
      }
      throw 'Erro desconhecido';
    }
  }

  Future<void> register(String numero, String senha) async {
    final data = {'numero': numero, 'senha': senha};
    await _apiService._dio.post('/appuser', data: data);
  }
}
```

### **4. WebSocket para Chat:**

```dart
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  late IO.Socket socket;
  
  void connect(String userId) {
    socket = IO.io('http://192.168.5.242:3333/', 
      IO.OptionBuilder()
        .setQuery({'Authorization': userId})
        .build()
    );
    
    socket.on('connect', (_) {
      print('Connected to socket');
    });
    
    socket.on('chatall', (data) {
      // Atualizar lista de mensagens
      print('New messages: $data');
    });
    
    socket.connect();
  }
  
  void sendMessage(Map<String, dynamic> message) {
    socket.emit('message', message);
  }
  
  void disconnect() {
    socket.disconnect();
  }
}
```

### **5. Upload de Arquivos:**

```dart
Future<void> updateProfile(Map<String, dynamic> data, File? image) async {
  FormData formData = FormData();
  
  if (image != null) {
    formData.files.add(MapEntry(
      'imagem',
      await MultipartFile.fromFile(image.path, filename: 'perfil.jpg')
    ));
  }
  
  data.forEach((key, value) {
    formData.fields.add(MapEntry(key, value.toString()));
  });
  
  await _dio.post('/appuserinf', data: formData);
}
```

### **6. Sistema de Quiz:**

```dart
class QuizService {
  final ApiService _apiService = ApiService();

  Future<QuizData> getQuestions(dynamic item, String tipo) async {
    final response = await _apiService._dio.post('/apptemas', data: {
      'item': item,
      'tipo': tipo,
    });
    return QuizData.fromJson(response.data);
  }

  Future<QuizResult> submitQuiz(List<Answer> answers, dynamic prova, int points) async {
    final response = await _apiService._dio.post('/fazerprova', data: {
      'ProvaFeita': answers.map((a) => a.toJson()).toList(),
      'prova': prova,
      'pts': points,
    });
    return QuizResult.fromJson(response.data);
  }
}
```

### **7. Armazenamento Local:**

```dart
import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
  static const String userKey = '@PBAuth:user';
  static const String tokenKey = '@PBAuth:token';

  static Future<void> saveUser(User user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(userKey, jsonEncode(user.toJson()));
  }

  static Future<User?> getUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userData = prefs.getString(userKey);
    if (userData != null) {
      return User.fromJson(jsonDecode(userData));
    }
    return null;
  }

  static Future<void> clearData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
  }
}
```

### **8. Modelos de Dados:**

```dart
class User {
  final String id;
  final String numero;
  final UserInfo? userInfo;

  User({required this.id, required this.numero, this.userInfo});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      numero: json['numero'],
      userInfo: json['user_inf'] != null 
        ? UserInfo.fromJson(json['user_inf']) 
        : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'numero': numero,
      'user_inf': userInfo?.toJson(),
    };
  }
}

class Question {
  final String id;
  final String questao;
  final String alternativaCorreta;
  final List<String> alternativasIncorretas;
  final String imagemUrl;

  Question({
    required this.id,
    required this.questao,
    required this.alternativaCorreta,
    required this.alternativasIncorretas,
    required this.imagemUrl,
  });

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
      id: json['_id'],
      questao: json['questao'],
      alternativaCorreta: json['alternativa_correta'],
      alternativasIncorretas: List<String>.from(json['incorecta_alternativas']),
      imagemUrl: json['imagem_url'],
    );
  }
}
```

---

## 📱 **ESTRUTURA DE NAVEGAÇÃO**

### **Bottom Navigation:**
1. **🏁 Partida** - Tela principal com testes
2. **💬 Chat** - Chat comunitário
3. **📺 Aulas** - Vídeo aulas  
4. **❓ P&F** - Perguntas frequentes
5. **👤 Perfil** - Perfil do usuário

### **Fluxos Principais:**
1. **Splash → Auth → Home**
2. **Home → Quiz → Resultado**
3. **Home → Loja → Pagamento M-Pesa**
4. **Perfil → Históricos/Configurações**

---

## 🎮 **SISTEMA DE GAMIFICAÇÃO**

- **Aprovação**: 20+ acertos em 25 questões
- **Moedas**: +2 moedas por teste aprovado  
- **Créditos**: Sistema de pagamento para acessar testes
- **Pacotes M-Pesa**: Diário (28 MZN), Semanal (70 MZN), Mensal (215 MZN)

---

## 🔧 **CONFIGURAÇÕES ESPECÍFICAS**

### **Android:**
- **Package**: `mz.co.passebem.passebem`
- **Permissions**: Internet, Camera, Storage
- **Firebase**: Configurar para notificações

### **iOS:**
- **Bundle ID**: `mz.co.passebem.passebem`
- **Capabilities**: Push Notifications

---

Esta documentação fornece **tudo** o que você precisa para replicar o aplicativo PasseBem Mobile em Flutter, incluindo todas as rotas de API, estruturas de dados, e exemplos de implementação! 🚀

Para começar:
1. Configure o projeto Flutter
2. Adicione as dependências listadas
3. Implemente o ApiService
4. Crie os modelos de dados
5. Desenvolva as telas seguindo a estrutura de navegação
6. Integre as APIs uma por uma
7. Teste cada funcionalidade

Boa sorte com a replicação! 💪
