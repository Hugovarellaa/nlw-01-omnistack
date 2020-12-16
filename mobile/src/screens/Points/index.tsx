import { SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
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

interface Point {
  id: number
  name: string
  image: string
  latitude: number
  longitude: number
}

export function Points() {
  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [points, setPoints] = useState<Point[]>([])

  const [location, setLocation] = useState<[number, number]>([0, 0])

  const navigate = useNavigation()

  // Move to the back Page
  function goBack() {
    navigate.goBack()
  }

  // Move to the next Page
  function handleNavigateToDetail(id: number) {
    navigate.navigate('detail', {
      point_id: id,
    })
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

  // Load Position in Maps
  async function LoadPosition() {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert('Ops...', 'Permission to access location was denied')
      return
    }

    const location = await Location.getCurrentPositionAsync()
    const { latitude, longitude } = location.coords
    console.log({ latitude, longitude })

    setLocation([latitude, longitude])
  }

  async function getApiPoints() {
    const response = await api.get('/points', {
      params: {
        city: 'planaltina',
        uf: 'Goias',
        items: [4],
      },
    })

    setPoints(response.data)
  }

  // Get API Items
  useEffect(() => {
    getItemsAPI()
  }, [])

  // Load Position in Maps
  useEffect(() => {
    LoadPosition()
  }, [])

  useEffect(() => {
    getApiPoints()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Map */}
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <SimpleLineIcons name="logout" size={24} color="#34CB79" />
        </TouchableOpacity>
        <Text style={styles.title}>😄 Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          {location[0] !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location[0],
                longitude: location[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <Marker
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  key={point.id}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: point.image,
                      }}
                      alt={point.name}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>

      {/* Botoes Images */}
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
