

import React, {useContext,useEffect} from 'react'
import { View, Text, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

export const LoginScreen = ({ navigation }: Props) => {

    const {singIn, errorMessage, removeError} = useContext(AuthContext);


    const { email, password, onChange } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;
        Alert.alert(
            'Login incorrecto', 
            errorMessage,
            [
                {
                    text: 'ok',
                    onPress: () => removeError(),
                }
            ]
        );

    }, [ errorMessage ])
    

    const onLogin = () => {
        console.log(email +  password);
        Keyboard.dismiss();
        singIn({ correo: email, password: password });
    }

  return (
    <>
        {/* background */}
        <Background />
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
        >
            {/* Keyboard avoid view */}
            <View style={loginStyles.formContainer}>
                <WhiteLogo />

                <Text style={ loginStyles.title }>Login</Text>
                
                <Text style={ loginStyles.label }>Email :</Text>
                <TextInput 
                    placeholder='Ingrese su email'
                    placeholderTextColor={'rgba(255,255,255, 0.4)'}
                    keyboardType='email-address'
                    underlineColorAndroid='white'
                    style={[
                        loginStyles.inputField,
                        (Platform.OS === 'ios') && loginStyles.inputFielIos
                    ]}
                    selectionColor='#ffffff56'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText= { (value) => onChange(value, 'email') }
                    onSubmitEditing= { () => onLogin() }
                />
                <Text style={ loginStyles.label }>Contraseña :</Text>
                <TextInput 
                    placeholder='******'
                    placeholderTextColor={'rgba(255,255,255, 0.4)'}
                    underlineColorAndroid='white'
                    style={[
                        loginStyles.inputField,
                        (Platform.OS === 'ios') && loginStyles.inputFielIos
                    ]}
                    selectionColor='#ffffff56'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry= { true }
                    onChangeText= { (value) => onChange(value, 'password') }
                    onSubmitEditing= { () => onLogin() }
                />
                {/* Boton Login */}
                <View style={loginStyles.bottonContainer}>
                    <TouchableOpacity 
                        activeOpacity={0.6}
                        style={loginStyles.button}
                        onPress={ () => onLogin() }
                    >
                        <Text style={loginStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                {/* Crear nueva cuenta */}
                <View style={loginStyles.newUserContainer}>
                    <TouchableOpacity 
                        activeOpacity={0.6}
                        onPress={() => navigation.replace('RegisterSreen')}
                    >
                        <Text style={loginStyles.buttonText}>Nueva Cuenta </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>            
    </>
  )
}
