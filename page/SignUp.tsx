import { useEffect, useState } from 'react'
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
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useIsFocused } from '@react-navigation/native'
import { Props } from '../type'
import { firebaseAuthError } from '../Error'

const SignUp = ({ navigation, route }: Props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const isFocused = useIsFocused()

  const handleRegister = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      navigation.goBack()
    } catch (error: any) {
      setError(firebaseAuthError(error.code))
    }
  }

  useEffect(() => {
    if (!isFocused) {
      setEmail('')
      setPassword('')
      setError('')
    }
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={[styles.keyboardAvoidingVeiw]}
        enabled
        behavior={Platform.OS == 'ios' ? 'position' : 'height'}
      >
        <ScrollView>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{'SignUp'}</Text>
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
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>{'新規登録'}</Text>
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
  keyboardAvoidingVeiw: { flex: 1, flexDirection: 'column', justifyContent: 'center' },
  itemContainer: {
    flex: 1,
    paddingHorizontal: '10%',
    alignItems: 'center',
  },
  title: { paddingVertical: '10%', fontSize: 50, marginTop: '10%' },
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

export default SignUp
