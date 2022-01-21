import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button } from 'react-native';

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
        <Text>U Bored?</Text>
        
        <View style={styles.buttonsContainer}>
          <Button title="chat" onPress={chatPressHandler} style={styles.buttons} />
          <Button title="video" onPress={videoPressHandler} style={styles.buttons} />
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
      height: 500,
      width: 500,
      resizeMode: 'contain'
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
    buttons: {
      margin: 10,
      padding: 10 
    }
  });
  