import { Button, Image, ImageBackground, StyleSheet, View, Text } from "react-native";

import { Ionicons } from '@expo/vector-icons'; 
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { globalStyle } from "../styles/main";

export default function LoginModal({ closeModal }) {
    const [form,  setForm] = useState('login')


    return (
        <ImageBackground resizeMode="repeat" source={require('../assets/img/bg.png')} style={styles.container}>
            <Ionicons name="close" size={32} color="white" onPress={closeModal} />
            <Image style={styles.logo} source={require('../assets/img/video-box-logo.png')} />
            
            { form == 'login' && 
            <LoginForm/> }
            { form == 'register' && 
            <RegisterForm/> }
            { form == 'forgotPassword' && 
            <ForgotPasswordForm/> }

            { form == 'login' && 
            <View>
                <TouchableOpacity onPress={() => setForm('register')}><Text style={[styles.changeFormTxt, globalStyle.textGreen]}>Don't have an account?</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setForm('forgotPassword')}><Text style={[styles.changeFormTxt, globalStyle.textGreen]}>Password Forgotten?</Text></TouchableOpacity>
            </View>
            }
            { form == 'register' && 
            <TouchableOpacity onPress={() => setForm('login')}><Text style={[styles.changeFormTxt, globalStyle.textGreen]}>Already have an account?</Text></TouchableOpacity>}
            { form == 'forgotPassword' && 
            <View>
                <TouchableOpacity onPress={() => setForm('register')}><Text style={[styles.changeFormTxt, globalStyle.textGreen]}>Don't have an account?</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setForm('login')}><Text style={[styles.changeFormTxt, globalStyle.textGreen]}>Back to login</Text></TouchableOpacity>
            </View> }
            
 
        </ImageBackground>
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
    changeFormTxt: {
        margin: 5
    }
})