import React, { createContext, useReducer, useEffect } from "react";
import { Usuario, LoginResponse, Logindata, RegisterData } from '../interfaces/appInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer, AuthState } from './authReducer';
import cafeapi from '../api/cafeApi';


type AuthContextProps={
    token: string | null,
    errorMessage: string,
    user: Usuario | null,
    status: 'checking' | 'autthenticated' | 'not-authenticated',
    singUp: (registerData: RegisterData) => void,
    singIn: (loginData: Logindata) => void,
    logOut: () => void,
    removeError: () => void,
    
}


export const AuthContext = createContext({} as AuthContextProps);

const authInitState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
}

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitState);

    useEffect(() => {
        validaToken();
    }, []);

    const validaToken = async() => {
        const token = await AsyncStorage.getItem('token')
        
        if (!token) return dispatch({type: 'notAuthenticated'});

        const resp = await cafeapi.get( '/auth' );
        if (resp.status !== 200) {
            return dispatch({ type: 'notAuthenticated' });
        }
        // renobar el token
        await AsyncStorage.setItem('token', resp.data.token);
        //Enviar los datos del singUp
        dispatch({ type:'singUp',
            payload:{
                token: resp.data.token,
                user: resp.data.usuario,
            }
        });
 
    }
    

    const singUp = async( {correo, nombre, password}: RegisterData ) => {
        try {
            const resp = await cafeapi.post<LoginResponse>('/usuarios', { nombre, correo , password });
            dispatch( { type:'singUp',
                payload:{
                    token: resp.data.token,
                    user: resp.data.usuario,
                }
            }); 
            console.log(resp.data.usuario);
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error: any) {
            dispatch({type: 'addError',
                payload: error.response.data.errors[0].msg || 'Información incorrecta',
            })
        }
    }

    const singIn = async( {correo,password}: Logindata ) => {
        try {
            const resp = await cafeapi.post<LoginResponse>('/auth/login', { correo , password });
            dispatch( { type: 'singUp',
                payload:{
                    token: resp.data.token,
                    user: resp.data.usuario,
                }
            }); 
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error: any){
            console.log(error.response.data.msg)
            dispatch({type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta',
            })
        }
    }
    const logOut = async() => {
        await AsyncStorage.removeItem( 'token' );
        dispatch({ type: 'logOut' });
    }
    const removeError = () => {
        dispatch({type: 'removeError'});
    }

    return(
        <AuthContext.Provider value={{
            ...state,
            singUp,
            singIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )
} 