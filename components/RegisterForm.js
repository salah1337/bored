import { Formik } from "formik";
import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { globalStyle } from "../styles/main";
import {API_URL, DEV} from "@env"
import axios from "axios";


export default function RegisterForm() {
    const initialValues = {Email: '', Username: '', Password: '', ConfirmPassword: ''}
    let api = API_URL
    if ( DEV && Platform.OS == 'android') api = 'http://10.0.2.2:5000'
    console.log(DEV)
    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    axios.post(`${api}/users/register`, {
                        email: values.Email, 
                        username: values.Username,
                        password: values.Password,
                        password2: values.ConfirmPassword,
                    }).then(function (response) {
                        console.log(response);
                        resetForm({values: initialValues})
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
                            placeholder='Username'
                            onChangeText={props.handleChange('Username')}
                            value={props.values.Username}
                            style={styles.input}
                        />

                        <TextInput 
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={props.handleChange('Password')}
                            value={props.values.Password}
                            style={styles.input}
                        />
                        
                        <TextInput 
                            secureTextEntry={true}
                            placeholder='ConfirmPassword'
                            onChangeText={props.handleChange('ConfirmPassword')}
                            value={props.values.ConfirmPassword}
                            style={styles.input}
                        />

                        <TouchableOpacity onPress={props.handleSubmit} style={[globalStyle.greenBtn, styles.submitBtn]}>
                        <Text style={[globalStyle.textMd, globalStyle.textWhite]}>Register</Text>
                        </TouchableOpacity>

                    </View>
                    

                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300 
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