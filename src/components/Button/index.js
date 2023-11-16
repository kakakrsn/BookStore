import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';


const width = Dimensions.get('window').width;

const Button = ({ teks, onPress, backColor,borderColor, textColor, disabled, icon }) => {
    return (
        <TouchableOpacity style={styles.container(backColor, borderColor)} teks={teks} onPress={onPress} disabled={disabled}>
            <Text style={styles.teks(textColor)}>{teks}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: (backColor, borderColor) => ({
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backColor,
        borderRadius: 6,
        width: "100%",
        borderWidth: (!borderColor ? 0 : 1),
        borderColor:(borderColor),
        height: 46
    }),
    teks: textColor => ({
        fontSize: 16,
        color: textColor,
        fontFamily: 'Nunito-Bold',
    })
})

export default Button
