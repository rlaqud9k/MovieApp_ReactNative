
import {  useState } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native'
import { Movie } from '../../type'

const SignOut = (item:Movie) => {
    const [loading, setLoading] = useState<boolean | null | undefined>(true)
    return (
      <TouchableOpacity style={[styles.button, { backgroundColor: 'grey' }]} disabled={loading}>
        <Image
          style={styles.imageStyle}
          onLoadEnd={() => setLoading(false)}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
        />
        <ActivityIndicator
          style={[styles.activityIndicator, { display: loading ? 'flex' : 'none' }]}
        />
      </TouchableOpacity>
    )
  }

  const styles = StyleSheet.create({
    imageStyle: { width: '100%', height: '100%' },
    button: { width: '50%', height: 200 },
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      color: 'white',
    },
  })
  

  export default SignOut