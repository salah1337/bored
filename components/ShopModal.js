import { StyleSheet, View } from "react-native";



export default function ShopModal() {
    return (
        <View>

            <Image style={styles.logo} source={require('../assets/img/video-box-logo.png')} />

        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: 180,
        width: 170,
        resizeMode: 'contain'
    }
})