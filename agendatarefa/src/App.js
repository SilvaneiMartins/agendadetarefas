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
    StyleSheet,
} from 'react-native'

export default class App extends Component {
    render() {
        return (
            <>
                <View style={styles.container} >
                    <Text style={styles.titulo1} > Agenda de Tarefas </Text>
                    <Text style={styles.titulo2} > Organizado de tarefas </Text>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo1: {
        fontSize: 25
    },
    titulo2: {
        fontSize: 15,
    }
})
