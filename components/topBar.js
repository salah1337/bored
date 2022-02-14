import React, { useState } from 'react';
import { Text, View, Image, ImageBackground, Button, Platform, Modal } from 'react-native';
import StyleSheet from 'react-native-media-query';
import VIPModal from './VIPModal';
import ShopModal from './ShopModal';
import LoginModal from './LoginModal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyle } from '../styles/main';
import { observer } from 'mobx-react';
import { userStore } from '../store/User';

export default topBar = observer(({ navigation }) => {
    const backHomePressHandler = () => {
        navigation.goBack()
    }
    const [LoginModalVisible, setLoginModalVisible] = useState(false)
    const [VIPModalVisible, setVIPModalVisible] = useState(false)
    const [ShopModalVisible, setShopModalVisible] = useState(false)
    return (
        <View style={styles.topBar}>

        <TouchableOpacity onPress={backHomePressHandler}>
            <Image style={styles.logo} source={require('../assets/img/video-box-logo.png')} />
        </TouchableOpacity>
        <View style={styles.topBarBtns}>

            <TouchableOpacity onPress={() => setVIPModalVisible(true)} style={[styles.topBarBtn, globalStyle.grayBtn]}>
                <Text>VIP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setLoginModalVisible(true)} style={[styles.topBarBtn, globalStyle.yellowBtn, styles.loginBtn]}>
                <Text>Login</Text>
                <Text>{userStore.currentUser.user != undefined ? userStore.currentUser.user.username : 'not logged in'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShopModalVisible(true)}  style={[styles.topBarBtn, globalStyle.grayBtn]}>
                <Text>Shop</Text>
            </TouchableOpacity>

        </View>
        <Text style={[globalStyle.textWhite, globalStyle.textMd, {width: 250, textAlign: 'right'}]} >Online: <Text style={globalStyle.textGreen}>{userStore.getUserCount}</Text></Text>

        <Modal style={styles.modal} visible={LoginModalVisible}>
            <ImageBackground resizeMode="repeat" source={require('../assets/img/bg.png')} style={styles.container}>
                <LoginModal closeModal={() => setLoginModalVisible(false)} />

            </ImageBackground>
        </Modal>

        <Modal style={styles.modal} visible={VIPModalVisible}>
            <ImageBackground resizeMode="repeat" source={require('../assets/img/bg.png')} style={styles.container}>
                <VIPModal closeModal={() => setVIPModalVisible(false)} />

            </ImageBackground>
        </Modal>

        <Modal style={styles.modal} visible={ShopModalVisible}>
            <ImageBackground resizeMode="repeat" source={require('../assets/img/bg.png')} style={styles.container}>
                <ShopModal closeModal={() => setShopModalVisible(false)} />

            </ImageBackground>
        </Modal>

        </View>
    )
})

const {ids, styles} = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    modal: {
        width: "100%",
        height: "100%",
        margin: 0
    },  
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        '@media (max-width: 500px)': {
            flexDirection: 'column'
        },
    },
    topBarBtns: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 250
    },
    topBarBtn: {
        marginHorizontal: 5,
        paddingHorizontal: 16,
        paddingVertical: 6
    },
    loginBtn: {
        paddingHorizontal: 48,
        paddingVertical: 12
    }, 
    logo: {
        height: 100,
        width: 250,
        resizeMode: 'contain'
    },
})