import { useEffect, useMemo, useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Props } from '../type'
import { firebaseAuthError } from '../Error'
const Login = ({ navigation, route }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keyboardStatus, setKeyboardStatus] = useState(false)
  const [error, setError] = useState('')
  const isFocused = useIsFocused()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      setError(firebaseAuthError(error.code))
    }
  }

  useEffect(() => {
    setEmail('')
    setPassword('')
    setError('')
  }, [isFocused])

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={[
          styles.keyboardAvoidingVeiw,
          { justifyContent: keyboardStatus ? 'flex-end' : 'center' },
        ]}
        enabled
        behavior={Platform.OS == 'ios' ? 'position' : 'height'}
      >
        <ScrollView>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{'Login'}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder='メールを入力してください。'
                style={styles.input}
                onChangeText={setEmail}
                value={email}
              />
              <TextInput
                placeholder='パスワードを入力してください。'
                secureTextEntry
                style={styles.input}
                onChangeText={setPassword}
                value={password}
              />
              <Text style={styles.error}>{error}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.authButtonColor]}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>{'ログイン'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={[styles.button, styles.signUpButtonColor]}
              >
                <Text style={styles.buttonText}>{'会員登録はこちら'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingVeiw: { flex: 1, flexDirection: 'column' },
  itemContainer: {
    flex: 1,
    paddingHorizontal: '10%',
    alignItems: 'center',
  },
  title: { paddingVertical: '10%', fontSize: 50, marginTop: '20%' },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    marginHorizontal: 12,
    padding: 10,
    color: 'red',
  },
  inputContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: '20%',
  },
  button: {
    padding: 20,
    marginHorizontal: 12,
    marginVertical: 5,
    borderRadius: 5,
  },
  authButtonColor: {
    backgroundColor: '#3cb371',
  },
  signUpButtonColor: {
    backgroundColor: '#66cdaa',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Login
