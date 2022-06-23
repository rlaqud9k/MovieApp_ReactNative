import { FC, useState } from 'react'
import { TouchableOpacity, StyleSheet, Image, Text, ActivityIndicator } from 'react-native'
import { DetailImageViewProps } from '../../type'

const ImageVIew = ({ item }: DetailImageViewProps) => {
  const [loading, setLoading] = useState<boolean | null | undefined>(true)

  return (
    <>
      <Image
        style={item?.poster_path ? { width: '100%', height: 400 } : { width: '100%', height: 200 }}
        resizeMode='stretch'
        onLoadEnd={() => setLoading(false)}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item?.poster_path ?? item.profile_path}`,
        }}
      />
      <ActivityIndicator
        style={[styles.activityIndicator, { display: loading ? 'flex' : 'none' }]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    color: 'white',
  },
})

export default ImageVIew
