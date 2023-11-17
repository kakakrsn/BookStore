import { Dimensions, Modal, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, CardBook, Gap } from '../../components'
import Api from '../../Api'
import { IconClose, IconPlus } from '../../assets'
import { useIsFocused } from '@react-navigation/native'
import CardModal from '../../components/CardModal'
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'

const windowWidth = Dimensions.get('window').width;

const Home = ({navigation}) => {
    const isFocused = useIsFocused()
    const [data, setData] = useState([])
    const [dataUser, setdataUser] = useState([]);
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisibles, setModalVisibles] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [detail, setDetail] = useState(false)
    const [id, setId] = useState('')
    const [loading] = useState(false);

    const GetData = async () => {
        try {
            setIsLoading(true)
            const response = await Api.getBook()
            // console.log(response.data, 'data bukus')
            setData(response.data)
            // setIsLoading(false)
        } catch (error) {
            console.log(error, 'hoiu')
            setIsLoading(false)
        }
    }

    const searchFilter = (value) => {
        if (value) {
            const newData = data.filter((item) => {
                const itemData = item.judul_buku ? item.judul_buku.toUpperCase() : ''.toUpperCase();
                const textData = value.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(newData);
            setSearch(value);
        } else {
            GetData()
            setSearch(value);
        }    
    }

    const onAdd = () => {
        navigation.navigate('AddData')
    }

    const onEdit = () => {
        console.log(detail, 'cek')
        setModalVisibles(!modalVisibles)
        const params = {
            id : detail.id,
            penerbit: detail.penerbit,
            pengarang: detail.pengarang,
            judul: detail.judul,
            tahun: detail.tahun,
            kode: detail.kode
        }
        navigation.navigate('EditData', params)
    }

    const gotoModalDetail = (params) => {
        setDetail(params)
        setModalVisibles(!modalVisibles)
    }

    const openModal = () => {
        setModalVisible(!modalVisible)
        setModalVisibles(!modalVisibles)
        console.log(detail.id, 'hapus')
        setId(detail.id)
    }

    const success = () => {
        showMessage({
            message: "Success!",
            description: "Your data has been saved",
            type: "success",
            backgroundColor: '#FFF',
            textStyle: { fontFamily: 'Nunito-Medium', color: '#000000' },
            titleStyle: { fontFamily: 'Nunito-Bold', color: '#4CD964' }
        });
    }

    const onDelete = async  () => {
        try {
            const response = await Api.deleteBook(id)
            console.log(response.data, 'berhasil')
            success()
            GetData()
            setModalVisible(!modalVisible)
        } catch (error) {
            console.log(error, 'yah')
            setModalVisible(!modalVisible)
            showMessage({
                icon: 'warning',
                    message: error.toString(),
                    type: "default",
                    backgroundColor: '#E00101',
                    color: '#FFF',
                    animated: true,
                    duration: 3000,
            });
        }
    }


    const onRefresh = React.useCallback(() => {
        GetData();
      }, []);

    useEffect(() => {
        isFocused && GetData()
    }, [isFocused])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                    animated={true}
                    backgroundColor={'#F7F3F5'}
                    barStyle="dark-content"
                    translucent={false}
                />
            <Gap height={46} />
            <View style={{paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                    <Text style={styles.title}>Book Lists</Text>
                    <Text style={styles.desc}>{data.length} item</Text>
                </View>
                <TouchableOpacity onPress={onAdd}>
                    <IconPlus />
                </TouchableOpacity>
            </View>
            <Gap height={20} />
            <View style={{ paddingHorizontal: 24 }}>
                <TextInput placeholder="Search by title" placeholderTextColor='#343434' style={styles.teksInput} returnKeyType='search' onChangeText={(value) => searchFilter(value)}  />
            </View>
            <Gap height={20} />
            <ScrollView 
                showsVerticalScrollIndicator={false} style={{paddingHorizontal: 20}}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            >
                {
                    data.map(value => {
                        const params = {
                            id: value.id,
                            penerbit: value.nama_penerbit,
                            pengarang: value.nama_pengarang,
                            judul: value.judul_buku,
                            tahun: value.tahun_terbit,
                            kode: value.kode_buku
                        }
                        return(
                            <CardBook 
                                key={value.id}
                                penerbit={value.nama_penerbit}
                                judul={value.judul_buku}
                                tahun={value.tahun_terbit}
                                pengarang={value.nama_pengarang}
                                kode={value.kode_buku}
                                onPress={() => gotoModalDetail(params)}
                            />
                        )
                    })
                }
                {/* <CardBook onPress={openModal} /> */}
                <Gap height={20} />
            </ScrollView>

            {modalVisible &&
                <CardModal
                    image
                    type={'Delete'}
                    title={'Hapus Data Buku'}
                    description={'Apakah kamu yakin untuk menghapus ini? perintah ini tidak dapat dibatalkan'}
                    closeModal={() => setModalVisible(!modalVisible)}
                    onPress={onDelete}
                    teks={'Batal'}
                    textCountinue={'Ya, Hapus'}
                />
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibles}
                onRequestClose={() => {
                    setModalVisibles(!modalVisibles);
                }}
            >
                <View style={styles.mainModal}>
                    <View style={styles.subModal}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 16, color: '#0B0C13' }}>Detail Perilaku Kerja</Text>
                                <TouchableOpacity onPress={ () => setModalVisibles(!modalVisibles)}>
                                    <IconClose/>
                                </TouchableOpacity>
                            </View>
                            <Gap height={20}/>
                            <View style={{ paddingVertical: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.field1} >Kode Buku</Text>
                                    <Text style={styles.field2} numberOfLines={1}>:</Text>
                                    <Text style={styles.field3} >{detail.kode}</Text>
                                </View>
                                <Gap height={16}/>
                                <View style={{ borderWidth: 0.3, borderColor: '#3EDEDED' }}></View>
                                <Gap height={16}/>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.field1} >Judul Buku</Text>
                                    <Text style={styles.field2} numberOfLines={1}>:</Text>
                                    <Text style={styles.field3} >{!detail.judul ? 'Judul' : detail.judul}</Text>
                                </View>
                                <Gap height={16}/>
                                <View style={{ borderWidth: 0.3, borderColor: '#3EDEDED' }}></View>
                                <Gap height={16}/>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.field1} >Tahun Terbit</Text>
                                    <Text style={styles.field2} numberOfLines={1}>:</Text>
                                    <Text style={styles.field3} >{!detail.tahun ? 'Tahun' : moment(detail.tahun).format('YYYY')}</Text>
                                </View>
                                <Gap height={16}/>
                                <View style={{ borderWidth: 0.3, borderColor: '#3EDEDED' }}></View>
                                <Gap height={16}/>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.field1} >Nama Penerbit</Text>
                                    <Text style={styles.field2} numberOfLines={1}>:</Text>
                                    <Text style={styles.field3} >{!detail.penerbit ? 'Penerbit' : detail.penerbit}</Text>
                                </View>
                                <Gap height={16}/>
                                <View style={{ borderWidth: 0.3, borderColor: '#3EDEDED' }}></View>
                                <Gap height={16}/>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.field1} numberOfLines={1}>Nama Pengarang</Text>
                                    <Text style={styles.field2} numberOfLines={1}>:</Text>
                                    <Text style={styles.field3} >{!detail.pengarang ? 'Pengarang' : detail.pengarang}</Text>
                                </View>
                                <Gap height={16}/>
                                <View style={{ borderWidth: 0.3, borderColor: '#3EDEDED' }}></View>
                            </View>
                        </View>
                        <Gap height={20}/>
                        <Button backColor='#243142' textColor='#FFF' teks={'Edit Data'} onPress={() => onEdit(detail)}/>
                        <Gap height={10} />
                        <Button backColor='#FFF' textColor='#243142' teks={'Delete Data'} onPress={() => openModal(detail)}/>
                        {/* <Gap height={40}/> */}
                        
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3F5'
    },
    title : {
        fontSize: 24,
        fontFamily: 'Nunito-ExtraBold',
        color: '#0B0C13'
    },
    desc : {
        fontSize: 12,
        fontFamily: 'Nunito-Medium',
        color: '#0B0C13'
    },
    mainModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: "flex-end",
        flex: 1,
    },
    subModal: {
        backgroundColor: '#F7F3F5',
        height: 480,
        paddingHorizontal: 17,
        paddingVertical: 24,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
    field1: {
        width: windowWidth/2.3, 
        fontFamily: 'Nunito-SemiBold', 
        fontSize: 12, 
        color: '#737373'
    },
    field2: {
        width: windowWidth/20, 
        fontFamily: 'Nunito-SemiBold', 
        fontSize: 12, 
        color: '#737373'
    },
    field3: {
        width: windowWidth/2.4, 
        fontFamily: 'Nunito-SemiBold', 
        fontSize: 12, 
        color: '#737373',
    },
    teksInput: {
        borderRadius: 10,
        fontSize: 12,
        fontFamily: 'Nunito-Medium',
        borderWidth: 1,
        borderColor: '#343434',
        paddingHorizontal: 12,
        color: '#343434',
        height: 44,
    },
})