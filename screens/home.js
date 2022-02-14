import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyle } from '../styles/main';

export default function Home({ navigation }) {
    const chatPressHandler = () => {
        navigation.navigate('Chat')
    }
    const videoPressHandler = () => {
        navigation.navigate('Video')
    }
    return (
        <ImageBackground resizeMode="repeat" source={require('../assets/img/bg.png')} style={styles.container}>

        <Image style={styles.logo} source={require('../assets/img/video-box-logo.png')} />
        <Text style={[globalStyle.textMd, globalStyle.textWhite]}>U Bored?</Text>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={chatPressHandler} style={[globalStyle.greenBtn, styles.buttons]}>
          <Image style={styles.btnImage} source={require('../assets/img/chat.png')} />
            <Text style={[globalStyle.textWhite, globalStyle.textBold]}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={videoPressHandler} style={[globalStyle.greenBtn, styles.buttons]}>
          <Image style={styles.btnImage} source={require('../assets/img/video.png')} />
            <Text style={[globalStyle.textWhite, globalStyle.textBold]}>Video</Text>
          </TouchableOpacity>
        </View>
        
        
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      height: 200,
      width: 500,
      resizeMode: 'contain'
    },
    buttonsContainer: {
      flexDirection: 'row',
      marginVertical: 20
    },
    buttons: {
      margin: 10,
      padding: 10,
      height: 200,
      width: 200,
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius: 4
    },
    btnImage: {
      height: 100,
      width: 100,
      resizeMode: 'contain'

    }
  });
  