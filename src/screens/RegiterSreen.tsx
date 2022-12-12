

import React,{useEffect} from 'react'
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from '../components/WhiteLogo';
import { TextInput } from 'react-native-gesture-handler';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



interface Props extends StackScreenProps<any, any>{}

export const RegisterSreen = ({ navigation }: Props) => {

    const {singUp, token, errorMessage, removeError} = useContext(AuthContext);

    const { email, password, name, onChange } = useForm({
        email: '',
        password: '',
        name: '',
    });

    useEffect(() => {
        if(errorMessage.length === 0) return;
        Alert.alert(
            'Error registro', 
            errorMessage,
            [{
                text: 'ok',
                onPress: removeError
            }]
        
        );
    }, [errorMessage])
    

    const onRegister = () => {

        Keyboard.dismiss();
        singUp({correo: email, password: password, nombre: name});
    }

    return (
        <>
            <TouchableOpacity></TouchableOpacity>
                <KeyboardAvoidingView
                    style={{flex: 1, backgroundColor: '#722ce2'}}
                    behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
                >
                    {/* Keyboard avoid view */}
                    <View style={loginStyles.formContainer}>
                        <WhiteLogo />

                        <Text style={ loginStyles.title }>Registro</Text>
                        <Text style={ loginStyles.label }>Nombre :</Text>
                        <TextInput 
                            placeholder='Ingrese su nombre'
                            placeholderTextColor={'rgba(255,255,255, 0.4)'}
                            keyboardType='email-address'
                            underlineColorAndroid='white'
                            style={[
                                loginStyles.inputField,
                                (Platform.OS === 'ios') && loginStyles.inputFielIos
                            ]}
                            selectionColor='#ffffff56'
                            autoCapitalize='words'
                            autoCorrect={false}
                            onChangeText= { (value) => onChange(value, 'name') }
                            onSubmitEditing= { () => onRegister() }
                        />
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
                            onSubmitEditing= { () => onRegister() }
                        />
                        <Text style={ loginStyles.label }>Contraseña :</Text>
                        <TextInput 
                            placeholder='********'
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
                            onSubmitEditing= { () => onRegister() }
                        />
                        {/* Boton Login */}
                        <View style={loginStyles.bottonContainer}>
                            <TouchableOpacity 
                                activeOpacity={0.6}
                                style={loginStyles.button}
                                onPress={ () => onRegister() }
                            >
                                <Text style={loginStyles.buttonText}>Crear cuenta</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity 
                            style={ loginStyles.buttonReturn}
                            activeOpacity={0.6}
                            onPress={() => navigation.replace('LoginScreen')}
                        >
                            <Text style={loginStyles.buttonText}>Login </Text>
                        </TouchableOpacity>
                        
                    </View>
                </KeyboardAvoidingView>            
        </>
    )
}
