import { Image, StyleSheet, Text, View } from "react-native";

import { Ionicons } from '@expo/vector-icons'; 
import { globalStyle } from "../styles/main";
import { TouchableOpacity } from "react-native";
import React from "react";

export default function VIPModal({ closeModal }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={closeModal} >
                <Text style={[globalStyle.textWhite]}>close</Text>
            </TouchableOpacity>
            {/* <Ionicons name="close" size={32} color="white" onPress={closeModal} /> */}

            <Image style={styles.vip} source={require('../assets/img/VIP.png')} />

            <View style={styles.whyvip}>
                <Text style={[globalStyle.textWhite, globalStyle.textMd, globalStyle.textBold, styles.viptext]}>Faster Connection</Text>
                <Text style={[globalStyle.textWhite, globalStyle.textMd, globalStyle.textBold, styles.viptext]}>Access to VIP coins</Text>
                <Text style={[globalStyle.textWhite, globalStyle.textMd, globalStyle.textBold, styles.viptext]}>Upload your own icons</Text>
                <Text style={[globalStyle.textWhite, globalStyle.textMd, globalStyle.textBold, styles.viptext]}>Colored chat alias</Text>
            </View>

            <Image style={styles.logo} source={require('../assets/img/video-box-logo.png')} />


            <TouchableOpacity style={[globalStyle.greenBtn, styles.submitBtn]}>
                <Text style={[globalStyle.textMd, globalStyle.textWhite]}>BUY</Text>
            </TouchableOpacity>
            <Text style={[globalStyle.textMd, globalStyle.textWhite, globalStyle.textBold]}>Price: <Text style={globalStyle.textGreen}>1337$</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    logo: {
        height: 150,
        width: 300,
        resizeMode: 'contain'
    },
    vip: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    viptext: {
        marginVertical: 5
    }, 
    whyvip: {
        backgroundColor: '#3b3b3b',
        padding: 20,
        borderRadius: 4
    },
    changeFormTxt: {
        margin: 5
    },
    submitBtn: {
        justifyContent: "center",
        textAlign: "center",
        paddingHorizontal: 80,
        paddingVertical: 10 
    }
})