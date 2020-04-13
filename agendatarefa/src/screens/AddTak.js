/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Agenda de tarefas Pessoal e empresarial;
*/
import React, { Component } from 'react'
import {
    Platform,
    Text,
    View,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
} from 'react-native'

import Colors from '../utilitarios/colors'
import CommonStyles from '../utilitarios/commonStyles'
import DateTimerPicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import 'moment/locale/pt-br'


const initialState = {
    desc: '',
    date: new Date(),
    showDatePicker: false,
}

class AddTak extends Component {
    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date,
        }

        this.props.onSave && this.props.onSave(newTask)
        this.setState({ ...initialState })
    }

    getDatePicker = () => {
        let datePicker = <DateTimerPicker
            value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: true })}
            mode='date'
        />

        const dateString = moment(this.state.date).format('LL')  //format('LL')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => this.setState({ showDatePicker: true })}
                    >
                        <Text style={styles.date} >{dateString}</Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'
            >
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}
                >
                    <View style={styles.background} >

                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.container} >

                    <Text style={styles.header}  >Nova Tarefa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="  Informe a Descrição da Tarefa..."
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc}
                    ></TextInput>

                    {this.getDatePicker()}

                    <View style={styles.buttons} >
                        <TouchableOpacity
                            style={styles.buttonView}
                            onPress={this.props.onCancel}
                        >
                            <Text style={styles.button}  >Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonView}
                            onPress={this.save}
                        >
                            <Text style={styles.button} >Salvar</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}
                >
                    <View style={styles.background} >
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    container: {
        backgroundColor: Colors.white,
    },
    header: {
        fontFamily: CommonStyles.fontFamily,
        backgroundColor: Colors.today,
        color: `${Colors.white}`,
        textAlign: 'center',
        padding: 10,
        fontSize: 18,
    },
    input: {
        fontFamily: CommonStyles.fontFamily,
        height: 50,
        margin: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: Colors.black,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    buttonView: {
        borderWidth: 0.5,
        paddingHorizontal: 10,
        marginLeft: 1,
        borderColor: Colors.black,
        borderRadius: 6,
        marginHorizontal: 12,
    },
    button: {
        margin: 13,
        marginRight: 20,
        color: Colors.today,
        fontSize: 15,
    },
    dateButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        margin: 10,
        marginTop: 1,
        backgroundColor: Colors.secondary,
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: Colors.black,
    },
    date: {
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
    }
})

export default AddTak
