import Icon from '@expo/vector-icons/Feather'
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './styles'

import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import BackgroundPng from '../../assets/home-background.png'
import LogoPng from '../../assets/logo.png'

export function Home() {
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const { navigate } = useNavigation()

  function handleNextPage() {
    navigate('points', {
      city,
      uf,
    })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        style={styles.container}
        source={BackgroundPng}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={LogoPng} alt="Logo Ecoleta" />

          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos.
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o Estado"
            value={uf}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
            onChangeText={setUf}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite a Cidade"
            value={city}
            autoCorrect={false}
            autoCapitalize="sentences"
            onChangeText={setCity}
          />

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
    </KeyboardAvoidingView>
  )
}
