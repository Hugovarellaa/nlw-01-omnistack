import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { History } from '../screens/History'
import { Home } from '../screens/Home'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home} />
      <Screen name="history" component={History} />
    </Navigator>
  )
}
