/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Agenda de tarefas Pessoal e empresarial;
*/
import React, { Component } from 'react'
import {
    Text,
    View,
    Alert,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
} from 'react-native'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

import Colors from '../utilitarios/colors'
import commonStyles from '../utilitarios/commonStyles'
import Task from '../components/Task'
import AddTask from './AddTak'
import { server, showError } from '../common'

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}

class TaskList extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)
        this.loadTasks()
    }

    loadTasks = async () => {
        try {
            const maxDate = moment().add({ days: this.props.daysAhead }).format('YYYY-MM-DD 23:59:59')
            const response = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: response.data }, this.filterTasks)
        } catch (e) {
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = (task) => {
                return task.doneAt === null
            }
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({ visibleTasks })
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))
    }

    toggleTask = async tasksId => {
        try {
            await axios.put(`${server}/tasks/${tasksId}/toggle`)
            await this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    addTasck = async newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informado!')
            return
        }
        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date,
            })

            this.setState({ showAddTask: false }, this.loadTasks)
        } catch (e) {
            showError(e)
        }
    }

    deleteTask = async tasksId => {
        try {
            await axios.delete(`${server}/tasks/${tasksId}`)
            this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    getImage = () => {
        switch (this.props.daysAhead) {
            case 0: 
                return todayImage
            case 1: 
                return tomorrowImage
            case 7: 
                return weekImage
            default:
                return monthImage
        }
    }

    getColor = () => {
        switch (this.props.daysAhead) {
            case 0: 
                return Colors.today
            case 1: 
                return Colors.tomorrow
            case 7: 
                return Colors.week
            default:
                return Colors.month
        }
    }

    render() {
        const today = moment().locale('pt-br').format('LL')
        return (
            <View style={styles.container} >
                <AddTask
                    isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTasck}
                />

                <ImageBackground
                    style={styles.background}
                    source={this.getImage()}
                >
                    <View style={styles.iconBar} >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon
                                name={'bars'}
                                size={25}
                                color={Colors.white}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.toggleFilter}
                        >
                            <Icon
                                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={30}
                                color={Colors.white}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar} >
                        <Text style={styles.title} >{this.props.title}</Text>
                        <Text style={styles.subTitle} >{today}</Text>
                    </View>
                </ImageBackground>

                <View style={styles.taskList} >
                    <FlatList
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                            <Task
                                {...item}
                                onToggleTask={this.toggleTask}
                                onDelete={this.deleteTask}
                            />
                        }
                    />
                </View>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[styles.addButton, { backgroundColor: this.getColor() }]}
                    onPress={() => this.setState({ showAddTask: true })}
                >
                    <Icon
                        name="plus-circle"
                        size={50}
                        color={Colors.secondary}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: `${Colors.white}`,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: Colors.white, //`${Colors.white}`
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 10,
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default TaskList