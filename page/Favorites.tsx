import { useLayoutEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { Movie, Props } from '../type'
import { collection, query, getDocs } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import FavoriteCell from '../component/favorites/FavoriteCell'

const Favorites = ({ navigation, route }: Props) => {
  const [movies, setMovies] = useState<Array<Movie>>([])
  const isFocused = useIsFocused()
  const user = auth.currentUser

  useLayoutEffect(() => {
    const q = query(collection(db, String(user?.uid)))
    getDocs(q)
      .then((querySnapshot) => {
        let fetchMovies: Array<Movie> = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          fetchMovies.push({
            id: data?.movieId,
            poster_path: data?.moviePosterPath,
            overview: data?.overview,
            title: data.movieTitle,
          })
        })
        setMovies(fetchMovies)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => String(item.id + index)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={()=>(
            <View  style={styles.separatorcomponent}/>
        )}
        ListFooterComponent={()=>(
            <View  style={styles.separatorcomponent}/>
        )}
        ListEmptyComponent={() => {
          return <Text>{'少々お待ちください。'}</Text>
        }}
        renderItem={({ item }) => {
          return (
           <FavoriteCell movie={item} route={route} navigation={navigation}/>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  separatorcomponent:{
      height:0.5,
      width:"100%",
      backgroundColor:"white"
  }
})

export default Favorites
