import { StyleSheet, Text, View } from 'react-native'

export function History() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>History</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
