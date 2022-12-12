import { StyleSheet } from "react-native";


export const loginStyles = StyleSheet.create({
    formContainer:{
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50
    },
    title:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',

    },
    label:{
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold',
    },
    inputField:{
        color: 'white',
        fontSize: 20,
    },
    inputFielIos:{
        borderBottomColor: 'white',
        paddingBottom: 4,
    },
    bottonContainer:{
        alignItems: 'center',
        marginTop: 50,
    },
    button:{
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
    },
    buttonText:{
        color: 'white',
        fontSize: 18,
    },
    newUserContainer:{
        alignItems: 'flex-end',
        marginTop: 50,
    },
    buttonReturn:{
        position: 'absolute',
        top: 40,
        left: 20,
        borderColor: 'white',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100,
    }
});