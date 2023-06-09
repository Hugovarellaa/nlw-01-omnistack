import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Detail } from '../screens/Detail'
import { Home } from '../screens/Home'
import { Points } from '../screens/Points'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="detail" component={Detail} />
      <Screen name="points" component={Points} />
    </Navigator>
  )
}
