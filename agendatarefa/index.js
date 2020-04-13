/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Agenda de tarefas Pessoal e empresarial;
*/
import {AppRegistry} from 'react-native';
import Navigator from './src/Navigator';
// import Auth from './src/screens/Auth';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);
