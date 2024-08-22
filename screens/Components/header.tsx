import React from 'react'
import { Text ,View,StyleSheet} from 'react-native'

type Props = {}

const Header = (props: Props) => {
  return (
    <View style={styles.header}>
    <Text style={styles.headerText}>VerseLink</Text>
  </View>
  )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 15,
        backgroundColor: '#f8f8f8',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
      },
      headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
      },
})
export default Header