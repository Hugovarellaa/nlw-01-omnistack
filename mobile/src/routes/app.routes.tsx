import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Detail } from '../screens/Detail'
import { Home } from '../screens/Home'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="detail" component={Detail} />
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
