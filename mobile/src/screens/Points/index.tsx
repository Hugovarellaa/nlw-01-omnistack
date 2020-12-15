import { SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgUri } from 'react-native-svg'
import { api } from '../../libs/axios'
import { styles } from './styles'

interface Item {
  id: number
  name: string
  image_url: string
}

export function Points() {
  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const navigate = useNavigation()

  // Move to the back Page
  function goBack() {
    navigate.goBack()
  }

  // Move to the next Page
  function handleNavigateToDetail() {
    navigate.navigate('detail')
  }
  // Get API Items
  async function getItemsAPI() {
    const response = await api.get('/items')

    setItems(response.data)
  }

  function handleSelectedItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id)
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id)
      setSelectedItems(filteredItems)
    } else {
      setSelectedItems((oldItem) => [...oldItem, id])
    }
  }

  // Get API Items
  useEffect(() => {
    getItemsAPI()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <SimpleLineIcons name="logout" size={24} color="#34CB79" />
        </TouchableOpacity>
        <Text style={styles.title}>😄 Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -15.462304,
              longitude: -47.6109705,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            <Marker
              style={styles.mapMarker}
              onPress={handleNavigateToDetail}
              coordinate={{
                latitude: -15.462304,
                longitude: -47.6109705,
              }}
            >
              <View style={styles.mapMarkerContainer}>
                <Image
                  style={styles.mapMarkerImage}
                  source={{
                    uri: 'https://plus.unsplash.com/premium_photo-1679728130451-ebba4dc5307d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
                  }}
                  alt=""
                />
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </View>

      {/* ,,13z */}

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {items.map((item) => (
            <TouchableOpacity
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {},
              ]}
              onPress={() => handleSelectedItem(item.id)}
              key={String(item.id)}
              activeOpacity={0.65}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
