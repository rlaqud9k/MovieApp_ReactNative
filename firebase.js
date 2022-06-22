import { initializeApp } from 'firebase/app'
import { getAuth, initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDtWrvwdRhHjDnhU1VonJfOM5a5cKV05b4',
  authDomain: 'movieappreactnative.firebaseapp.com',
  projectId: 'movieappreactnative',
  storageBucket: 'movieappreactnative.appspot.com',
  messagingSenderId: '395992016620',
  appId: '1:395992016620:web:dae0ee5643a92f5edae7c9',
}

const app = initializeApp(firebaseConfig)

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const auth = getAuth(app)
