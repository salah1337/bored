import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button } from 'react-native';
import Navigator from './routes/homeStack'

export default observer(function App() {
  
  return (
    <Navigator  style={styles.container}/>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
