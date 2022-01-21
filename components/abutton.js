import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function abutton({ text, onPress, color }) {
    return (
        <TouchableOpacity style={styles.button, {backgroundColor: color}} onPress={onPress}>
            <Text style={{color: '#fff'}}>{ text }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        backgroundColor: 'rgb(5, 233, 5)',
        justifyContent: "center",
        height: '100%'
    },

})