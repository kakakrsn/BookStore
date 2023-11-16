import React, { useState } from 'react'
import { Text, StyleSheet, View, Modal } from 'react-native'
import { IconDeleteModal, IconLogoutModal, IconSucces } from '../../../assets'
import { colors } from '../../../utils'
import { Button, Gap } from '../../atoms'


const CardModal = ({modalVisible, action, closeModal, type, image, title, description, textCountinue, textCancel, buttonHeight, buttonWidth, buttonColor, textColor, buttonColors, textColors}) => {
    
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
                                {type === 'LogOut' ? <IconLogoutModal /> : ''}
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
                        <View style={styles.button}>
                            <Button
                                onPress={closeModal}
                                height={!buttonHeight ? 60 : buttonHeight}
                                width={!buttonWidth ? 132 : buttonWidth}
                                backgroundColor={!buttonColors ? colors.dark5 : buttonColors}
                                textColor={colors.white}
                                text={!textCancel ? 'Cancel' : textCancel}
                            />
                            <Gap width={10} />
                            <Button
                                onPress={action}
                                height={!buttonHeight ? 60 : buttonHeight}
                                width={!buttonWidth ? 132 : buttonWidth}
                                backgroundColor={!buttonColor ? colors.merah1 : buttonColor}
                                textColor={colors.white}
                                text={!textCountinue ? 'Yes' : textCountinue}
                            />
                        </View>
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
        fontFamily: 'BeVietnamPro-Bold',
        color: colors.biru1,
        fontSize: 16,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'BeVietnamPro-Regular',
        color: colors.dark5,
        fontSize: 13,
        textAlign: 'center'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CardModal