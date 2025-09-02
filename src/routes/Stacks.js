import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../routes/Tab';
import ReportScreean from '../pages/Respostas';
import QPCategoria from '../pages/QPCategoria';
import Mododetalhe from '../pages/Mododetalhe';
import VideoPlayer from '../pages/VideoPlayer';
import PlayerList from '../pages/PlayerList';
import QuizScreen from '../pages/QuizScreen';
import EditPerfil from '../pages/EditPerfil';
import Vitoria from '../pages/Vitoria';
import Derrota from '../pages/Derrota';
import HistProva from '../pages/HitoricosProva';
import HistQuiz from '../pages/HistQuizScreen';
import FicheirosPage from '../pages/FicheiroDidatico';
import CategoriaDidatica from '../pages/CategoriaDidatica';
import HistQuizModular from '../pages/HistQuizScreenModular'
import QuizScreenModular from '../pages/QuizScreenModular';
import Recursos from '../pages/Recursos'
import HistPymentScreen from '../pages/HistCompras';
import SupportScreen from '../pages/Support';
import PDF_Reader from '../components/LeitorPDF';


const Stack = createStackNavigator();



const RootStackScreen = ({navigation}) => (

    
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="Home" component={HomeScreen}/> 
        <Stack.Screen name="ReportScreean" component={ReportScreean}/>
        <Stack.Screen name="QPCategoria" component={QPCategoria}/>
        <Stack.Screen name="Mododetalhe" component={Mododetalhe}/>
        <Stack.Screen name="PlayerList" component={PlayerList}/>
        <Stack.Screen name="VideoPlayer" component={VideoPlayer}/> 
        <Stack.Screen name="QuizScreen" component={QuizScreen}/>
        <Stack.Screen name="EditPerfil" component={EditPerfil}/>
        <Stack.Screen name="Vitoria" component={Vitoria}/>
        <Stack.Screen name="Derrota" component={Derrota}/>
        <Stack.Screen name="HistProva" component={HistProva}/>
        <Stack.Screen name="HistQuiz" component={HistQuiz}/>
        <Stack.Screen name="CategoriaPage" component={CategoriaDidatica}/>
        <Stack.Screen name="FicheiroPage" component={FicheirosPage} />
        <Stack.Screen name="QuizModular" component={QuizScreenModular} />
        <Stack.Screen name="HisQuizModular" component={HistQuizModular} />
        <Stack.Screen name="Recursos" component={Recursos} />
        <Stack.Screen name="HistPymentScreen" component={HistPymentScreen} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
        <Stack.Screen name="PDF_Reader" component={PDF_Reader} />
    </Stack.Navigator>
    
);

export default RootStackScreen;

