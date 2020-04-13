import React from 'react'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native'

import CommonStyles from '../utilitarios/commonStyles'
import Colors from '../utilitarios/colors'

export default props => {
  const optionsGravatar = {
    email: props.navigation.getParam('email'),
    secure: true,
  }

  const logout = () => {
    delete axios.defaults.headers.common['Authorization']
    AsyncStorage.removeItem('userData')
    props.navigation.navigate('AuthOrApp')
  }


  return (
    <ScrollView>
      <View style={styles.header} >
        <Text style={styles.title} >Tarefas</Text>
        <Gravatar
          style={styles.gravatar}
          options={optionsGravatar}
        />
        <View style={styles.userInfo} >
          <Text style={styles.nameText} >{props.navigation.getParam('name')}</Text>
          <Text style={styles.emailText} >{props.navigation.getParam('email')}</Text>
        </View>

      </View>
      <DrawerItems
        {...props}
      />
      <TouchableOpacity
        style={styles.buttonLogoutContainer}
        onPress={logout}
      >
        <View style={styles.buttonLogout} >
          <Icon
            name='close-box'
            size={45}
            color={Colors.red}
          />
        </View>
        <Text style={styles.LogoutContainerText} >Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: Colors.menuHeader,
  },
  gravatar: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    marginLeft: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  title: {
    fontFamily: CommonStyles.fontFamily,
    color: Colors.black,
    fontSize: 30,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    marginLeft: 10,
    textAlign: 'center',
  },
  nameText: {
    fontFamily: CommonStyles.fontFamily,
    fontWeight: 'bold',
    fontSize: 20,
  },
  emailText: {
    fontFamily: CommonStyles.fontFamily,
    marginBottom: 5,
    fontSize: 14,
  },
  buttonLogoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LogoutContainerText: {
    fontFamily: CommonStyles.fontFamily,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonLogout: {
    marginLeft: 10,
  }
})
