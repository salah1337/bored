import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RTCView } from "react-native-webrtc-web-shim";


export const VideoContainer = React.memo(({ stream, mirror, keyy }) => {
    return (
        <RTCView
        style={{flex: 1}}
        stream={stream}
        mirror={mirror}
        key={keyy}
        objectFit='contain'
      />
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