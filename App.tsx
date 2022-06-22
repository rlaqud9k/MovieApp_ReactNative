import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './type'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './firebase'
import Login from './page/Login'
import SignUp from './page/SignUp'
import MovieList from './page/MovieList'

const Stack = createNativeStackNavigator<RootStackParamList>()

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>sadfsadfsadfsadf</Text>
    </View>
  )
}
export default function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setUser(user)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <>
            <Stack.Screen options={{ headerShown: false }} name='MovieList' component={MovieList} />
          </>
        ) : (
          <>
            <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
            <Stack.Screen name='SignUp' options={{ title: '' }} component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
