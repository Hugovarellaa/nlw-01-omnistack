import Icon from '@expo/vector-icons/Feather'
import { Image, ImageBackground, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { styles } from './styles'

import BackgroundPng from '../../assets/home-background.png'
import LogoPng from '../../assets/logo.png'

export function Home() {
  return (
    <ImageBackground
      style={styles.container}
      source={BackgroundPng}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={LogoPng} alt="Logo Ecoleta" />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" size={24} color="#fff" />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}
