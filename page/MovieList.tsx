import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { Movie, Props } from '../type'
import { axios, UserInfoContext } from '../App'
import ImageVIew from '../component/movieList/ImageView'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

const MovieList = ({ navigation, route }: Props) => {
  const [movies, setMovies] = useState<Array<Movie>>([])
  const [page, setPage] = useState<number>(1)
  const isFocused = useIsFocused()
  const userInfoContext = useContext(UserInfoContext)

  useLayoutEffect(() => {
    if (isFocused) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?language=ja&api_key=adeb7231584e29872bef9934bfd3a813&page=${page}`,
        )
        .then((result) => {
          let oldmovies: Array<Movie> = movies
          let fetchMovies: Array<Movie> = result.data.results

          fetchMovies.map((movie) => oldmovies.push(movie))

          setMovies(oldmovies)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setMovies([])
      setPage(1)
    }
  }, [isFocused, page])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        userInfoContext.setUser(null)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Favorites')
          }}
        >
          <Text>お気に入り</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={handleSignOut}>
          <Text>ログアウト</Text>
        </TouchableOpacity>
      ),
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        numColumns={2}
        keyExtractor={(item, index) => String(item.id + index)}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.05}
        onEndReached={({ distanceFromEnd }) => {
          setPage(page + 1)
        }}
        ListEmptyComponent={() => {
          return <Text>{'少々お待ちください。'}</Text>
        }}
        renderItem={({ item }) => {
          return <ImageVIew movie={item} navigation={navigation} route={route} />
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default MovieList
