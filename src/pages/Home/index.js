import { Dimensions, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, CardBook, Gap } from '../../components'
import Api from '../../Api'
import { IconClose, IconPlus } from '../../assets'
import { useIsFocused } from '@react-navigation/native'
import CardModal from '../../components/CardModal'

const windowWidth = Dimensions.get('window').width;

const Home = ({navigation}) => {
    const isFocused = useIsFocused()
    const [data, setData] = useState([])
    const [dataUser, setdataUser] = useState([]);
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisibles, setModalVisibles] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const GetData = async () => {
        try {
            setIsLoading(true)
            const response = await Api.getBook()
            console.log(response.data, 'data bukus')
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
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = value.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(newData);
            setSearch(value);
        } else {
            setData(dataUserFiltered);
            setSearch(value);
        }    
    }

    const onAdd = () => {
        navigation.navigate('AddData')
    }

    const onEdit = () => {
        setModalVisibles(!modalVisibles)
        navigation.navigate('EditData')
    }

    const gotoModalDetail = () => {
        setModalVisibles(!modalVisibles)
    }

    const openModal = () => {
        setModalVisible(!modalVisible)
        // setIdLeave(params.id)
    }

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
            <ScrollView style={{paddingHorizontal: 20}}>
                {/* {
                    data.map(value => {
                        return(
                            <CardBook 
                                key={value.id}
                                penerbit={value.nama_penerbit}
                                img={value.image}
                                judul={value.judul_buku}
                            />
                        )
                    })
                } */}
                <CardBook onPress={openModal} />
                <Gap height={20} />
            </ScrollView>

            {modalVisible &&
                <CardModal
                    image
                    type={'Delete'}
                    title={'Hapus Data Buku'}
                    description={'Apakah kamu yakin untuk menghapus ini? perintah ini tidak dapat dibatalkan'}
                    closeModal={() => setModalVisible(!modalVisible)}
                    // action={onDelete}
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
                                    <Text style={styles.field3} >{!data.kode_buku ? 'Kode' : data.kode_buku}</Text>
                                </View>
                                <Gap height={16}/>
                                <View style={{ borderWidth: 0.3, borderColor: '#3EDEDED' }}></View>
                                <Gap height={16}/>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.field1} >Judul Buku</Text>
                                    <Text style={styles.field2} numberOfLines={1}>:</Text>
                                    <Text style={styles.field3} >{!data.judul_buku ? 'Judul' : data.judul_buku}</Text>
                                </View>
                                <Gap height={16}/>
                                <View style={{ borderWidth: 0.3, borderColor: '#3EDEDED' }}></View>
                                <Gap height={16}/>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.field1} >Tahun Terbit</Text>
                                    <Text style={styles.field2} numberOfLines={1}>:</Text>
                                    <Text style={styles.field3} >{!data.tahun_terbit ? 'Tahun' : data.tahun_terbit}</Text>
                                </View>
                                <Gap height={16}/>
                                <View style={{ borderWidth: 0.3, borderColor: '#3EDEDED' }}></View>
                                <Gap height={16}/>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.field1} >Nama Penerbir</Text>
                                    <Text style={styles.field2} numberOfLines={1}>:</Text>
                                    <Text style={styles.field3} >{!data.nama_penerbit ? 'Penerbit' : data.nama_penerbit}</Text>
                                </View>
                                <Gap height={16}/>
                                <View style={{ borderWidth: 0.3, borderColor: '#3EDEDED' }}></View>
                                <Gap height={16}/>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.field1} numberOfLines={1}>Nama Pengarang</Text>
                                    <Text style={styles.field2} numberOfLines={1}>:</Text>
                                    <Text style={styles.field3} >{!data.nama_pengarang ? 'Pengarang' : data.nama_pengarang}</Text>
                                </View>
                                <Gap height={16}/>
                            </View>
                        </View>
                        <Gap height={20}/>
                        <Button backColor='#243142' textColor='#FFF' teks={'Edit Data'} onPress={onEdit}/>
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
        backgroundColor: '#fff',
        height: 450,
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
    }
})