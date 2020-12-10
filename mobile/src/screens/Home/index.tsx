import { ImageBackground, Text } from 'react-native'
import { styles } from './styles'

import BackgroundPng from '../../assets/home-background.png'

export function Home() {
  return (
    <ImageBackground
      style={styles.container}
      source={BackgroundPng}
      imageStyle={{ width: 274, height: 368 }}
    >
      <Text>Home</Text>
    </ImageBackground>
  )
}
