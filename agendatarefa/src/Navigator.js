/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Agenda de tarefas Pessoal e empresarial;
*/
import React from 'react'
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation'
import {
  createDrawerNavigator
} from 'react-navigation-drawer'

import TaskList from './screens/TaskList'
import Auth from './screens/Auth'
import Menu from './screens/Menu'
import AuthOrApp from './screens/AuthOrApp'
import CommonStyles from './utilitarios/commonStyles'
import Colors from './utilitarios/colors'

const menuConfig = {
  initialRouteName: 'Today',
  contentComponent: Menu,
  contentOptions: {
    labelStyle: {
      fontFamily: CommonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: 20,
    },
    activeLabelStyle: {
      color: Colors.button,
      fontWeight: 'bold',
    }
  }
}

const menuRoutes = {
  Today: {
      name: 'Today',
      screen: props => <TaskList title='Hoje' daysAhead={0} {...props} />,
      navigationOptions: {
          title: 'Hoje'
      }
  },
  Tomorrow: {
      name: 'Tomorrow',
      screen: props => <TaskList title='Amanhã' daysAhead={1} {...props} />,
      navigationOptions: {
          title: 'Amanhã'
      }
  },
  Week: {
      name: 'Week',
      screen: props => <TaskList title='Semana' daysAhead={7} {...props} />,
      navigationOptions: {
          title: 'Semana'
      }
  },
  Month: {
      name: 'Month',
      screen: props => <TaskList title='Mês' daysAhead={30} {...props} />,
      navigationOptions: {
          title: 'Mês'
      }
  },
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)


const mainRountes = {
  AuthOrApp: {
    name: 'AuthOrApp',
    screen: AuthOrApp,
  },
  Auth: {
    name: 'Auth',
    screen: Auth
  },
  Home: {
    name: 'Home',
    screen: menuNavigator
  }
}

const mainNavigator = createSwitchNavigator(mainRountes, {
  initialRouteName: 'AuthOrApp'
})

export default createAppContainer(mainNavigator)
