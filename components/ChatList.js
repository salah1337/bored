import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";


export const ChatList = React.memo(({ msgs, msg, newMsg, onChange }) => {
    return (
        <View>
            <FlatList
                data={msgs}
                style={{padding: 10}}
                renderItem={({ item }) => (
                    <Text>
                        {item.fromStranger ? 
                        <Text style={{color: '#ff0000', fontWeight: 'bold'}}>Stranger: </Text> 
                        : item.fromServer ? <Text style={{color: '#000', fontWeight: 'bold'}}>Server: </Text> 
                        : <Text style={{color: '#0000ff', fontWeight: 'bold'}}>You: </Text>}
                        {item.text}
                        
                    </Text>
                )}
            />
            {/* <TextInput 
                onChangeText={(text) => onChange(text)}
                value={msg}
                style={{flex: 1}}
                onKeyPress={(e) => {if(e.nativeEvent.key == 'Enter') newMsg(msg)}}
            />       */}
        </View>
    )
})

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        backgroundColor: 'rgb(5, 233, 5)',
        justifyContent: "center",
        height: '100%'
    },

})