import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Login: undefined
  SignUp: undefined
  MovieList: undefined
  Movie: undefined
}

export type Props = NativeStackScreenProps<RootStackParamList, 'Login'>
