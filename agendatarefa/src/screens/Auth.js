/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Agenda de tarefas Pessoal e empresarial;
*/
import React, { Component } from 'react'
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import backgroundImage from '../../assets/imgs/login.jpg'
import Colors from '../utilitarios/colors'
import CommonStyles from '../utilitarios/commonStyles'
import AuthInput from '../components/AuthInput'
import {
  server,
  showError,
  showSuccess,
} from '../common'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  stageNew: false,
}

export default class Auth extends Component {
  state = {
    ...initialState
  }

  signin = async () => {
    try {
      const response = await axios.post(`${server}/signin`, {
        email: this.state.email,
        password: this.state.password,
      })

      AsyncStorage.setItem('userData', JSON.stringify(response.data))
      axios.defaults.headers.common['Authorization'] = `bearer ${response.data.token}`
      this.props.navigation.navigate('Home', response.data)
      // this.props.navigation.navigate('Home')
    } catch (e) {
      showError(e)
    }
  }

  signup = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      })
      showSuccess('Usuário cadastrado com sucesso!')
      this.setState({ ...initialState })
    } catch (e) {
      showError(e)
    }
  }

  signinOrSignup = () => {
    if (this.state.stageNew) {
      this.signup()
    } else {
      this.signin()
    }
  }

  render() {
    const validations = []
    validations.push(this.state.email && this.state.email.includes('@'))
    validations.push(this.state.password && this.state.password.length >= 6)

    if (this.state.stageNew) {
      validations.push(this.state.name && this.state.name.trim().length >= 3)
      validations.push(this.state.password === this.state.confirmPassword)
    }

    const validForm = validations.reduce((t, a) => t && a)

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
        <ImageBackground
          style={styles.background}
          source={backgroundImage}
        >
          <Text style={styles.title} >Tarefas</Text>
          {/* <Text style={styles.title2} >de Tarefa</Text> */}

          <View style={styles.formContainer} >
            <Text style={styles.subTitle} >
              {this.state.stageNew ? 'Criar uma Conta' : 'Login'}
            </Text>

            {this.state.stageNew &&
              <AuthInput
                icon='user'
                style={styles.input}
                placeholder='Digite seu nome...'
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
            }

            <AuthInput
              icon='at'
              style={styles.input}
              placeholder='Digite seu e-mail...'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />

            <AuthInput
              icon='lock'
              style={styles.input}
              placeholder='Digite seu password...'
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />

            {this.state.stageNew &&
              <AuthInput
                icon='lock'
                style={styles.input}
                placeholder='Confirma o password...'
                value={this.state.confirmPassword}
                secureTextEntry={true}
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
              />
            }


            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.signinOrSignup}
              disabled={!validForm}
            >
              <View
                style={[styles.button, validForm ? {} : { backgroundColor: Colors.redDark }]}
              >
                <Text
                  style={styles.buttonText}
                >
                  {this.state.stageNew ? 'Registrar' : 'Entrar'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => this.setState({ stageNew: !this.state.stageNew })}
          >
            <Text
              style={styles.buttonTextConta}
            >
              {this.state.stageNew ? 'Já possui Conta ?' : 'Ainda não possui Conta ?'}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: CommonStyles.fontFamily,
    color: Colors.secondary,
    fontSize: 45,
    marginBottom: 10,
  },
  subTitle: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
    width: '90%',
    padding: 15,
  },
  input: {
    fontFamily: CommonStyles.fontFamily,
    backgroundColor: Colors.white,
    margin: 3,
  },
  button: {
    backgroundColor: Colors.button,
    borderRadius: 8,
    marginTop: 5,
    padding: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    fontFamily: CommonStyles.fontFamily,
    color: Colors.white,
    fontSize: 20,
  },
  buttonTextConta: {
    fontFamily: CommonStyles.fontFamily,
    color: Colors.white,
    fontSize: 17,
  }
})
