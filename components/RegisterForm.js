import { Formik } from "formik";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { globalStyle } from "../styles/main";



export default function RegisterForm() {
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{Email: '', Username: '', Password: '', ConfirmPassword: ''}}
                onSubmit={(values) => {

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

                        <TouchableOpacity style={[globalStyle.greenBtn, styles.submitBtn]}>
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