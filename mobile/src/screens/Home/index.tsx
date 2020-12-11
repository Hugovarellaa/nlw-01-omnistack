import Icon from '@expo/vector-icons/Feather'
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './styles'

import { useNavigation } from '@react-navigation/native'
import BackgroundPng from '../../assets/home-background.png'
import LogoPng from '../../assets/logo.png'

export function Home() {
  const { navigate } = useNavigation()

  function handleNextPage() {
    navigate('detail')
  }

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
        <TouchableOpacity
          style={styles.button}
          onPress={handleNextPage}
          activeOpacity={0.7}
        >
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" size={24} color="#fff" />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}
