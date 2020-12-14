import { Feather, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

export function Detail() {
  const navigate = useNavigation()

  function goBack() {
    navigate.goBack()
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" size={24} color="#34CB79" />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri: 'https://plus.unsplash.com/premium_photo-1679728130451-ebba4dc5307d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
          }}
          alt=""
        />
        <Text style={styles.pointName}>Colectoria</Text>
        <Text style={styles.pointItems}>
          Resíduos Eletrônicos, Lâmpadas, Pilhas e Baterias
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            Rio do Sul, Santa Catarina Guilherme Gemballa, Jardim América Nº 260
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Feather name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
