import {ToastAndroid} from "react-native";


const errorDefault = () =>
    ToastAndroid.showWithGravityAndOffset(
        "Opss! Não foi possivel carregar o conteudo desejado.",
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        50
    );
        
  export{
    errorDefault,
  }