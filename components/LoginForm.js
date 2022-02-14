import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { globalStyle } from "../styles/main";
import {API_URL, DEV} from "@env"
import {userStore} from '../store/User'

export default function LoginForm({onFinish}) {
    const initialValues = {Email: '', Password: ''}
    let api = 'https://b446-196-70-69-208.ngrok.io'
    if ( DEV && Platform.OS == 'android') api = 'http://10.0.2.2:5000'
    console.log(DEV)
    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    axios.post(`${api}/users/login`, {
                        email: values.Email, 
                        password: values.Password,
                    }).then(function (response) {
                        userStore.setUser({user: response.data.user, tocken: response.data.tocken})
                        console.log(userStore.currentUser.user.username);
                        resetForm({values: initialValues})
                        onFinish()
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                }}
            >
                {(props) => (

                    <View>
                        <TextInput 
                            placeholder='Email'
                            onChangeText={props.handleChange('Email')}
                            value={props.values.Email}
                            style={styles.input}
                        />

                        <TextInput 
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={props.handleChange('Password')}
                            value={props.values.Password}
                            style={styles.input}
                        />

                        <TouchableOpacity onPress={props.handleSubmit} style={[globalStyle.greenBtn, styles.submitBtn]}>
                        <Text style={[globalStyle.textMd, globalStyle.textWhite]}>Login</Text>
                        </TouchableOpacity>

                    </View>
                    

                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginVertical: 15,
        backgroundColor: '#fff',
    },
    submitBtn: {
        justifyContent: "center",
        textAlign: "center",
        padding: 10
    }
})