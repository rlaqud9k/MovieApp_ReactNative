import { createContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import Favorites from './page/Favorites'

export const axios = Axios.create({})

axios.interceptors.request.use(
  (config) => {
    // console.log(config)
    return config
  },
  (error) => {
    console.log(error)
    return error
  },
)

axios.interceptors.response.use(
  (config) => {
    // console.log(config)
    return config
  },
  (error) => {
    console.log(error)
    return error
  },
)

const Stack = createNativeStackNavigator<RootStackParamList>()

export const UserInfoContext = createContext(
  {} as {
    setUser: React.Dispatch<React.SetStateAction<User | null>>
  },
)

export default function App() {
  const [user, setUser] = useState<User | null>(null)

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user == null, 'user is null')
        console.log(user)
        setUser(user)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <UserInfoContext.Provider value={{ setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user == null ? (
            <>
              <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
              <Stack.Screen name='SignUp' options={{ title: '' }} component={SignUp} />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{ title: '映画一覧' }}
                name='MovieList'
                component={MovieList}
              />
              <Stack.Screen
                options={{ title: 'お気に入り一覧' }}
                name='Favorites'
                component={Favorites}
              />
              <Stack.Screen
                options={{ title: '映画詳細' }}
                name='MovieDetail'
                component={MovieDetail}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserInfoContext.Provider>
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
