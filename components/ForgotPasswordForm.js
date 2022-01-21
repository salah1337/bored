import { Formik } from "formik";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { globalStyle } from "../styles/main";



export default function ForgotPasswordForm() {
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{Email: '', Password: ''}}
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