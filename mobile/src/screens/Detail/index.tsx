import { Feather, FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import { useEffect, useState } from 'react'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Loading } from '../../components/Loading'
import { api } from '../../libs/axios'
import { styles } from './styles'

interface Params {
  point_id: string
}

interface Data {
  point: {
    name: string
    image: string
    image_url: string
    email: string
    whatsapp: string
    city: string
    uf: string
  }
  items: {
    name: string
  }[]
}

export function Detail() {
  const [data, setData] = useState<Data>({} as Data)

  const navigate = useNavigation()
  const router = useRoute()

  const { point_id } = router.params as Params

  // Move to the back Page
  function goBack() {
    navigate.goBack()
  }
  // Get API Points/${ID}
  async function getApi() {
    const response = await api.get(`/points/${point_id}`)
    setData(response.data)
  }

  // Send mail
  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta',
      recipients: [data.point.email],
    })
  }

  // Send Whatsapp application
  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse na coleta`,
    )
  }

  useEffect(() => {
    getApi()
  }, [])

  if (!data.point) {
    return <Loading />
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
            uri: data.point.image_url,
          }}
          alt={data.point.name}
        />
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map((item) => item.name).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.point.city}, {data.point.uf}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleComposeMail}>
          <Feather name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
