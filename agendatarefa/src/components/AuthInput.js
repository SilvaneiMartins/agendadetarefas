import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../utilitarios/colors'

export default props => {
  return (
    <View
      style={[styles.container, props.style]}
    >
      <Icon
        name={props.icon}
        size={25}
        style={styles.icon}
      />

      <TextInput
        {...props}
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cont,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    width: '100%',
    height: 45,
  },
  icon: {
    color: Colors.borderRight,
    marginLeft: 12,
  },
  input: {
    marginLeft: 3,
    width: '70%',
  }
})
