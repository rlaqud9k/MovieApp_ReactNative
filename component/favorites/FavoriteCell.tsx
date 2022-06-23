import { useLayoutEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ListImageViewProps } from '../../type'

const FavoriteCell = ({ movie, navigation, route }: ListImageViewProps) => {

  return (
    <TouchableOpacity
    onPress={() => {
      navigation.navigate('MovieDetail', {
        movie: movie,
      })
    }}
  >
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode='stretch'
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
        }}
      />
      <Text style={styles.text}>
        {movie.title}
      </Text>
      <MaterialCommunityIcons name={'chevron-right'} size={25} color={'white'} />
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  image: { width: '20%', height: 100 },
  text: { width: '70%', color: 'white', fontSize: 20, paddingLeft: 10 },
})

export default FavoriteCell
