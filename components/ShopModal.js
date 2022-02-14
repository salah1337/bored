import { Image, StyleSheet, Text, View } from "react-native";

import { Ionicons } from '@expo/vector-icons'; 
import { globalStyle } from "../styles/main";
import { FlatList } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function ShopModal({ closeModal }) {
    const shopItems = [
        { name: 'item', image: 'video-box-logo', id: 1},
        { name: 'item', image: 'video-box-logo', id: 2},
        { name: 'item', image: 'video-box-logo', id: 3},
        { name: 'item', image: 'video-box-logo', id: 4},
        { name: 'item', image: 'video-box-logo', id: 5},
        { name: 'item', image: 'video-box-logo', id: 6},
    ]
    return (
        <View style={styles.container}>
                        <TouchableOpacity onPress={closeModal} >
                <Text style={[globalStyle.textWhite]}>close</Text>
            </TouchableOpacity>
            {/* <Ionicons name="close" size={32} color="white" onPress={closeModal} /> */}
            <Image style={styles.logo} source={require('../assets/img/video-box-logo.png')} />


            <View style={{backgroundColor:'#969696', borderRadius: 4}}>

            <View style={{flexDirection: "row", width: 300, borderBottomColor: '#232323', borderBottomWidth: 2, padding: 10}}>
                <Text style={[globalStyle.textWhite, globalStyle.textMd, globalStyle.textBold, {flex: 3}]}>Name</Text>
                <Text style={[globalStyle.textWhite, globalStyle.textMd, globalStyle.textBold, {flex: 1}]}>Price</Text>
            </View>

            <View style={styles.shopList}>

            <FlatList 
                keyExtractor={item => item.id}
                data={shopItems}
                renderItem={({item}) => (
                    <View style={[styles.listItem, {flexDirection: "row", width: 300, padding: 10, borderBottomColor: '#232323', borderBottomWidth: 1}]}>
                    <Text style={[globalStyle.textWhite, globalStyle.textMd, globalStyle.textBold, {flex: 3}]}>{item.name}
                    <View style={{width: 69, height: 30}}><Image style={styles.listImage} source={require('../assets/img/video-box-logo.png')} /></View>
                    </Text>
                    <Text style={[globalStyle.textWhite, globalStyle.textMd, globalStyle.textBold, {flex: 1}]}>Price</Text>

                </View>
                )}
            />

            </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    shopList: {
        height: 300
    },
    listItem: {
        alignItems: "center",
        justifyContent: "center"
    },
    listImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
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
    changeFormTxt: {
    }
})