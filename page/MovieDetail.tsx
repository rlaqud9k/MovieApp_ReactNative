import { useEffect, useLayoutEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { Movie, Props } from '../type'
import { axios } from '../App'
import ImageVIew from '../component/movieDetail/ImageView'
import { Credit } from '../type'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { setDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../firebase'

const MovieDetail = ({ navigation, route }: Props) => {
  const isFocused = useIsFocused()
  const { movie } = route.params
  const [credits, setCredits] = useState<Array<Credit>>([])
  const [liked, setLiked] = useState(false)
  const user = auth.currentUser

  const saveFavoriteMovie = async () => {
    try {
      await setDoc(doc(db, String(user?.uid), String(movie.id)), {
        userId: user?.uid,
        movieId: movie.id,
        movieTitle: movie.title,
        moviePosterPath: movie.poster_path,
        overview: movie.overview,
      })
      console.log('Document written with ID: ')
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const deleteFavoriteMovie = async () => {
    try {
      await deleteDoc(doc(db, String(user?.uid), String(movie.id)))
      console.log('Document delete with ID: ')
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const handleFavorite = () => {
    if (liked) {
      deleteFavoriteMovie()
    } else {
      saveFavoriteMovie()
    }
  }

  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db, String(user?.uid), String(movie.id)), (doc) => {
      if (!doc.data()) {
        setLiked(false)
      } else {
        setLiked(true)
      }
    })
    if (isFocused) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=ja&api_key=adeb7231584e29872bef9934bfd3a813`,
        )
        .then((result) => {
          let credits: Array<Credit> = result.data.cast
          credits = credits.filter((credit) => {
            return !!credit.profile_path
          })
          setCredits(credits)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      unsub()
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={credits}
        keyExtractor={(item) => item.credit_id}
        numColumns={2}
        ListHeaderComponentStyle={{
          marginBottom: 20,
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <ImageVIew item={movie} />
              <Text style={[styles.textColor, styles.title]}>{'????????????'}</Text>
              <Text style={[styles.textColor, styles.contents]}>{movie.title}</Text>
              <Text style={[styles.textColor, styles.title]}>{'??????'}</Text>
              <Text style={[styles.textColor, styles.contents]}>
                {movie.overview ? movie.overview : '??????'}
              </Text>
              <Text style={[styles.textColor, styles.title]}>{'?????????'}</Text>
            </>
          )
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <ImageVIew item={item} />
              <Text style={[styles.textColor, styles.nameText]}>{item.original_name}</Text>
            </View>
          )
        }}
      />
      <TouchableOpacity
        style={[styles.button, styles.authButtonColor]}
        onPress={() => handleFavorite()}
      >
        <MaterialCommunityIcons
          name={liked ? 'heart' : 'heart-outline'}
          size={25}
          color={liked ? 'red' : 'green'}
          style={styles.favoriteIcon}
        />
        <Text style={styles.buttonText}>{'???????????????'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  contents: {
    fontSize: 20,
    paddingTop: 20,
  },
  textColor: {
    color: 'white',
  },
  nameText: {
    fontSize: 20,
    paddingVertical: 10,
  },
  button: {
    padding: 20,
    marginHorizontal: 12,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  authButtonColor: {
    backgroundColor: '#3cb371',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteIcon: { paddingRight: 10 },
})

export default MovieDetail
