import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';


const width = Dimensions.get('window').width;

const Input = ({ title, keyboardType, maxLength, secureTextEntry, underlineColorAndroid, value, onChangeText, autoCapitalize, multiline, theme }) => {
    return (
        <View style={{marginBottom: !title ? 8 : 4}}>
            <Text style={styles.teks}>{title}</Text>
            <TextInput style={styles.input} secureTextEntry={secureTextEntry} autoCapitalize={autoCapitalize} keyboardType={keyboardType} maxLength={maxLength} underlineColorAndroid={underlineColorAndroid} value={value} onChangeText={onChangeText} multiline={multiline} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 42,
        fontSize: 13,
        fontFamily: 'Nunito-Medium',
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        color:'#000000',
        borderWidth: 1,
        borderColor: '#E9E9E9',
        paddingLeft: 14
    },
    teks: {
        color: '#000000',
        marginBottom: 4,
        fontSize : 14,
        fontFamily: 'Nunito-Medium',
    },
})


export default Input;