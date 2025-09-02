import React from "react";
import { View, Dimensions, Image } from "react-native";
import Swiper from 'react-native-web-swiper'

const { width, height} = Dimensions.get("screen")

const Publicidades = [  {"id":1,"imagem":"https://image.freepik.com/fotos-gratis/mulher-alegre-e-satisfeita-com-cabelo-encaracolado-segura-o-celular-e-envia-mensagens-de-texto-com-amigos-nas-redes-sociais-usa-um-aplicativo-especial-assiste-a-um-video-interessante-isolado-na-parede-azul-pessoas-e-tecnologia_273609-39465.jpg"},
                        {"id":2,"imagem":"https://image.freepik.com/fotos-gratis/mulher-jovem-de-pele-escura-positiva-e-homem-batem-os-punhos-concordam-em-ser-uma-equipe-olham-felizes-um-para-o-outro-comemora-a-tarefa-concluida-usa-roupas-rosa-e-verdes-posa-em-ambientes-fechados-tem-um-negocio-bem-sucedido_273609-42756.jpg"},
                        {"id":3,"imagem":"https://image.freepik.com/vetores-gratis/modelo-de-folheto-plano-de-vacinacao-com-coronavirus_23-2148918696.jpg"},
                        {"id":4,"imagem":"https://image.freepik.com/fotos-gratis/sumo-delicioso-feito-de-laranjas_23-2148256169.jpg"}
                    ]

export default function SwiperPub({pub, margin}){

    return(
        <View style={{ borderRadius:5, width:width*0.9, height:height*0.26, alignSelf:"center", marginTop:!margin?height*0.02:height*0.05}}>
            <Swiper timeout={2} loop={true}>

                {!pub?(
                    Publicidades.map((item) => (
                        <Image key={item.id} style={{width:width*0.9, height:height*0.26,borderRadius:5,}} source={{uri:item.imagem}} />
                    ))
                ):(
                    pub.map((item) => (
                        <Image key={item.id} style={{width:width*0.9, height:height*0.26,borderRadius:5,}} source={{uri:item.imagem}} />
                    ))
                )}
                
            </Swiper>
            
        </View>
    )
}