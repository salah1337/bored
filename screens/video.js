import React from 'react';
import { Text, View, Image, ImageBackground, Button } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TopBar from '../components/topBar'
import { globalStyle } from '../styles/main';


export default function Video({ navigation }) {
    const backHomePressHandler = () => {
        navigation.goBack()
    }
    return (
      <ImageBackground resizeMode="repeat" source={require('../assets/img/bg.png')} style={styles.container}>
        <View style={styles.wrapper}>

          <TopBar navigation={navigation}/>

          <View style={styles.videoBox}>
            <View style={styles.video}></View>
            <View style={styles.videosDevider}></View>
            <View style={[styles.video, styles.video1]}></View>
          </View>

          <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.bottomBarBtn, globalStyle.greenBtn]}>
            <Text style={[globalStyle.textMd, globalStyle.textWhite]}>Start</Text>
          </TouchableOpacity>

          <View style={styles.chatInput}>

          </View>
          <TouchableOpacity style={[styles.chatSend, globalStyle.grayBtn]}>
              <Text>Send</Text>
          </TouchableOpacity>

          </View>

        </View>
      </ImageBackground>
    )
}

const {ids, styles} = StyleSheet.create({
    wrapper: {
        width: '90%',
        height: '100%',
        paddingBottom: 15
    }, 
    container: {
        alignItems: 'center',
        flex: 1,
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
    buttons: {
      margin: 10,
      padding: 10 
    },
    videoBox: {
        flex: 1,
        marginBottom: 10,
        flexDirection: 'row',
        position: 'relative',
        '@media (max-width: 500px)': {
          
        },
    },
    video: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 4,
    },
    video1: {
      '@media (max-width: 500px)': {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: '30%', 
        width: '30%',
        backgroundColor: '#232323'
      },
    },
    videosDevider: {
      paddingHorizontal: 10,
      '@media (max-width: 500px)': {
        display: 'none'
      },
    },
    bottomBar: {
        width: '100%',
        flexDirection: 'row',
        height: '15%'
    },
    chatInput: {
      height: '100%',
      flex: 1,
      backgroundColor: '#fff',
      marginLeft: 10,
      borderRadius: 2,
  },
  chatSend: {
      height: '100%',
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      '@media (max-width: 500px)': {
          width: 50,
      },
  },
    bottomBarBtn: {
      height: '100%',
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      '@media (max-width: 500px)': {
          width: 100,
      },
  },

  });
  