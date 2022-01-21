import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const globalStyle = StyleSheet.create({
    textMd: {
        fontSize: RFValue(10, 580)
    },
    textWhite: {
        color: '#fff'
    },  
    textGreen: {
        color: 'rgb(5, 233, 5)'
    },
    greenBtn: {
        backgroundColor: 'rgb(5, 233, 5)',
        shadowColor: "rgb(6, 167, 25)",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        borderRadius: 2, 
    },
    redBtn: {
        backgroundColor: 'rgb(177, 27, 27)',
        shadowColor: "rgb(6, 167, 25)",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        borderRadius: 2, 
    },
    blueBtn: {
        backgroundColor: 'rgb(65, 129, 225)',
        shadowColor: "rgb(6, 167, 25)",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        borderRadius: 2, 
    }, 
    yellowBtn: {
        backgroundColor: 'rgb(255, 255, 0)',
        shadowColor: "rgb(147, 169, 2)",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        borderRadius: 2, 
    },
    grayBtn: {
        backgroundColor: 'rgb(182, 182, 182)',
        shadowColor: "rgb(138, 138, 138)",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        borderRadius: 2, 
    }

})