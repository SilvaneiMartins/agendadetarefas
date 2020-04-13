/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Agenda de tarefas Pessoal e empresarial;
*/
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Colors from '../utilitarios/colors'
import commonStyles from '../utilitarios/commonStyles'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import moment from 'moment'
import 'moment/locale/pt-br'

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done} >
                <Icon
                    name='check'
                    size={20}
                    color={Colors.white}
                />
            </View>
        )
    } else {
        return (
            <View style={styles.pending} >
                <Text></Text>
            </View>
        )
    }
}

export default props => {
    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}
    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatedDate = moment(date)
        .locale('pt-br')
        .format('LLLL')//format('MMMM D [de] YYYY')

    const getRightContent =() => {
        return (
            <TouchableOpacity
                style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}
            >
                <Icon 
                    name="trash"
                    size={30}
                    color={Colors.secondary}
                />
            </TouchableOpacity>
        )
    }    

    const getLeftContent =() => {
        return (
            <View
                style={styles.left}
            >
                <Icon 
                    name="trash"
                    size={25}
                    color={Colors.secondary}
                    style={styles.excludeIcon}
                />
                <Text style={styles.excludeText} >Excluir</Text>
            </View>
        )
    }  

    return (
        <Swipeable
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
        >
            <View style={styles.container} >
                <TouchableWithoutFeedback
                    onPress={() => props.onToggleTask(props.id)}
                >
                    <View
                        style={styles.checkContainer}
                    >
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>

                <View>
                    <Text style={[styles.desc, doneOrNotStyle]} > {props.desc} </Text>
                    <Text style={styles.date} > {formatedDate} </Text>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: Colors.borderColor,
        borderBottomWidth: 0.4,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: Colors.white,
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pending: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: Colors.borderColorPending,
    },
    done: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.borderColorDone,
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: Colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: Colors.subText,
        fontSize: 12,
    },
    right: {
        backgroundColor: Colors.today,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left: {
        flex: 1,
        backgroundColor: Colors.today,
        flexDirection: 'row',
        alignItems: 'center',
    },
    excludeIcon: {
        marginLeft: 10,
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: Colors.white,
        fontSize: 18,
        margin: 10,
    }
})
