/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Agenda de tarefas Pessoal e empresarial;
*/
import { 
  Alert, 
  Platform, 
} from 'react-native'

const server = Platform.OS === 'ios'? 
  'http://localhost:3000' : 'http://192.168.1.15:3000'

function showError(err) {
  if (err.response && err.response.data) {
    Alert.alert('Ops! Ocorreu algum Problema!', `Mensagem: ${err.response.data}`)
  } else {
    Alert.alert('Ops! Ocorreu algum Problema!', `Mensagem: ${err}`)
  }
}

function showSuccess(msg) {
  Alert.alert('Sucesso', msg)
}

export {
  server,
  showError,
  showSuccess,
}
