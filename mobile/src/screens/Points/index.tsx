import { SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'
import MapView from 'react-native-maps'
import { styles } from './styles'

export function Points() {
  const navigate = useNavigation()

  function goBack() {
    navigate.goBack()
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <SimpleLineIcons name="logout" size={24} color="#34CB79" />
        </TouchableOpacity>

        <Text style={styles.title}>😄 Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          <MapView style={styles.map} />
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <TouchableOpacity style={styles.item}></TouchableOpacity>
      </View>
    </>
  )
}
