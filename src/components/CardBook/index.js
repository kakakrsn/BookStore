import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Gap from '../Gap';
import moment from 'moment'

const width = Dimensions.get('window').width;

const CardBook = ({judul, penerbit, tahun, img, onPress, pengarang, kode}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View>
                <Text style={styles.bookTitle}>{!judul ? 'Judul' : judul}</Text>
                <Gap height={4} />
                <Text style={styles.year}>{!penerbit ? 'penerbit' : penerbit}</Text>
                <Gap height={4} />
                <Text style={styles.penulis}>{!pengarang ? 'pengarang' : pengarang}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.bookTitle}>{!kode ? 'kode' : kode}</Text>
                <Gap height={4} />
                <Text style={styles.year}>{!tahun ? '2023' : moment(tahun).format('YYYY')}</Text>
                {/* <Image source={!img ? {uri: 'https://i.pinimg.com/564x/fe/47/d1/fe47d15a6349c937f02151b6cb760a5f.jpg'} : {uri: img}} style={styles.img} resizeMode='contain' /> */}
            </View>
        </TouchableOpacity>
    )
}

export default CardBook

const styles = StyleSheet.create({
    card: {
        width: width/1-42,
        borderRadius: 12, 
        position: 'relative', 
        overflow: 'hidden', 
        padding: 20,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    bookTitle: {
        fontSize: 16,
        fontFamily: 'Nunito-SemiBold',
        color: '#0B0C13'
    },
    penulis: {
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
        color: '#0B0C13'
    },
    year: {
        fontSize: 12,
        fontFamily: 'Nunito-Medium',
        color: '#3E3437'
    },
    img: {
        width: 60,
        height: 65,
        borderRadius: 10
    }
})