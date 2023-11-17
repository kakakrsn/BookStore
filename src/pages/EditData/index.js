import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { IconBack, Profile } from '../../assets'
import { Button, Gap, Input } from '../../components'
import { launchImageLibrary } from 'react-native-image-picker'
import Api from '../../Api'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'

const EditData = ({navigation, route}) => {
  const {id, penerbit, pengarang, judul, kode, tahun} = route.params
  console.log(id, penerbit, pengarang, 'cssnkcs')
  const [juduls, setJudul] = useState(judul)
  const [tahuns, setTahun] = useState(tahun)
  const [penerbits, setPenerbit] = useState(penerbit)
  const [pengarangs, setPengarang] = useState(pengarang)
  const [kodes, setKode] = useState(kode)
  const [photo, setPhoto] = useState("");
  const [modalVisibles, setmodalVisibles] = useState(false)
  const [photoDB, setPhotoDB] = useState("");
  

  const getImageFromGalery = () => {
    launchImageLibrary({ quality: 1, maxWidth: 1000, maxHeight: 1000, includeBase64: true }, (response) => {
        if (response.didCancel || response.error) {
            showMessage({
                message: "Not uploading photos?",
                type: "default",
                backgroundColor: colors._red,
                color: colors._white,
                icon: 'warning',
            });
            setmodalVisibles(!modalVisibles)
        } else {
            setPhoto(response.assets[0].uri);
            setPhotoDB(`data:${response.assets[0].type};base64,${response.assets[0].base64}`);
            // setmodalVisibles(!modalVisibles)
        }
    });
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

  const onAdd = async () => {
    try {
      const data = {
        judul_buku : juduls,
        tahun_terbit : tahuns,
        nama_penerbit : penerbits,
        nama_pengarang : pengarangs,
        kode_buku : kodes,
      }
      const response = await Api.editBook(data, id)
      success()
      setTimeout(() => {
        navigation.goBack()
    }, 1500);
    } catch (error) {
      console.log(error, 'haha eror')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'#F7F3F5'}
        barStyle="dark-content"
        translucent={false}
      />
      <View style={styles.header}>
          <TouchableOpacity style={{ width: 24, height: 24 }} onPress={() => navigation.goBack()}>
              <IconBack />
          </TouchableOpacity>
          <Gap width={28} />
          <Text style={styles.text}>Edit Data</Text>
          <View style={{ width: 24, height: 24 }} />
      </View>
      <Gap height={20} />
      <ScrollView style={{paddingHorizontal: 20}}>
        <Input title={'Kode Buku'} value={kodes} onChangeText={(value) => setKode(value)} />
        <Input title={'Judul Buku'} value={juduls} onChangeText={(value) => setJudul(value)} />
        <Input title={'Nama Penerbit'} value={penerbits} onChangeText={(value) => setPenerbit(value)} />
        <Input title={'Nama Pengarang'} value={pengarangs} onChangeText={(value) => setPengarang(value)} />
        <Input title={'Tahun Terbit'} keyboardType='numeric' value={moment(tahun).format('YYYY')} onChangeText={(value) => setTahun(value)} />
        {/* <Gap height={8} />
        <View>
          <Text style={styles.teks}>Photo</Text>
          <Gap height={4} />
          <TouchableOpacity onPress={getImageFromGalery}>
              <Image style={{ width: 100, height: 100, borderRadius: 20 }} source={photo == "" ? Profile : { uri: photo }} />
          </TouchableOpacity>
        </View> */}
        <Gap height={40} />
        <Button teks={'Save'} backColor='#243142' textColor='#FFF' onPress={onAdd} />
        <Gap height={10} />
        <Button teks={'Cancel'} backColor='#FFF' textColor='#243142' onPress={() => navigation.goBack()} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditData

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3F5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  title : {
      fontSize: 24,
      fontFamily: 'Nunito-ExtraBold',
      color: '#0B0C13'
  },
  text: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'Nunito-Bold'
  },
  teks: {
    color: '#000000',
    marginBottom: 4,
    fontSize : 14,
    fontFamily: 'Nunito-Medium',
},
})