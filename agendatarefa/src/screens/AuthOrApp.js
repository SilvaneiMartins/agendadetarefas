import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import Colors from '../utilitarios/colors'

export default class AuthOrApp extends Component {
  componentDidMount = async () => {
    const userDataJson = await AsyncStorage.getItem('userData')
    let userData = null
    try {
      userData = JSON.parse(userDataJson)
    } catch (e) {
      //userData está invalido;
    }
    if (userData && userData.token) {
      axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
      this.props.navigation.navigate('Home', userData)
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
        <ActivityIndicator
          color={Colors.white}
          size={60}
          style={{
            position:'absolute', 
            left:0, 
            right:0, 
            bottom:0, 
            top:0, 
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  }
})
