import { Image, View } from 'react-native'
import { styles } from './styles'

import LogoPng from '../../assets/logo.png'

export function Home() {
  return (
    <>
      <View style={styles.container}>
        <Image source={LogoPng} alt="Logo Ecoleta" />
      </View>
    </>
  )
}
