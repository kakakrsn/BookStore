import React, { useState } from 'react'
import { Text, StyleSheet, View, Modal, TouchableOpacity } from 'react-native'
import { IconDeleteModal, IconSucces } from '../../assets'
import Gap from '../Gap'
import Button from '../Button'


const CardModal = ({modalVisible, action, closeModal, type, image, title, description, textCountinue, teks, onPress, disabled,}) => {
    
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.mainModal}>
                    <View style={styles.subModal}>
                        <Gap height={10} />
                        { image &&
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {type === 'Delete' ? <IconDeleteModal /> : ''}
                                {/* {type === 'LogOut' ? <IconLogoutModal /> : ''} */}
                                {type === 'Sukses' ? <IconSucces /> : ''}
                                <Gap height={20}/>
                            </View>
                        }
                        <View>
                            <Text style={styles.title}>{!title ? 'Title' : title}</Text>
                            <Gap height={10} />
                            <Text style={styles.description}>{!description ? 'Description' : description}</Text>
                        </View>
                        <Gap height={40}/>
                        <View >
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'center',}}>
                            <TouchableOpacity style={styles.button1} teks={teks} onPress={closeModal} disabled={disabled}>
                                <Text style={styles.teks}>{teks}</Text>
                            </TouchableOpacity>
                            <Gap width={20} />
                            <TouchableOpacity style={styles.button2} teks={textCountinue} onPress={onPress} disabled={disabled}>
                                <Text style={styles.teks}>{textCountinue}</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <Gap height={10} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    mainModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: "center",
        flex: 1,
        padding: 24
    },
    subModal: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 24,
    },
    title: {
        fontFamily: 'Nunito-Bold',
        color: '#0B0C13',
        fontSize: 16,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'Nunito-Regular',
        color: '#737373',
        fontSize: 13,
        textAlign: 'center'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    button1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#737373',
        borderRadius: 6,
        height: 46,
        paddingHorizontal: 10
    },
    button2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B70000',
        borderRadius: 6,
        height: 46,
        paddingHorizontal: 10
    },
    teks: {
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'Nunito-Bold',
    }
})

export default CardModal