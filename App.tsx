import { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './type'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './firebase'
import Login from './page/Login'
import SignUp from './page/SignUp'
import MovieList from './page/MovieList'
import Axios from 'axios'
import MovieDetail from './page/MovieDetail'

export const axios = Axios.create({})

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

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user == null, "user is null")
        setUser(user)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <>
            <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
            <Stack.Screen name='SignUp' options={{ title: '' }} component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen options={{ title: '映画一覧' }} name='MovieList' component={MovieList} />
            <Stack.Screen options={{ title: '映画詳細' }} name='MovieDetail' component={MovieDetail} />
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
