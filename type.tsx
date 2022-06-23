import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Login: undefined
  SignUp: undefined
  MovieList: undefined
  MovieDetail: { movie: Movie }
  Favorites: undefined
}

export type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>

export type Movie = {
  id: number
  poster_path: string
  overview: string
  title: string
  profile_path?: string
}

type NavigationProps = Props['navigation']

type RouteProps = Props['route']

export interface ListImageViewProps {
  movie: Movie
  navigation: NavigationProps
  route: RouteProps
}

export interface DetailImageViewProps {
  item: Movie | Credit
}

export type Credit = {
  original_name: string
  profile_path: string
  credit_id: string
  poster_path?: string
}
