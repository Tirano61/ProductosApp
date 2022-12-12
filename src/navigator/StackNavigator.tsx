



import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterSreen } from '../screens/RegiterSreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Productsnavigator } from './Productsnavigator';

const Stack = createStackNavigator();

export const StackNavigation = () => {


    const { status } = useContext(AuthContext);

    if (status === 'checking') return <LoadingScreen />
    
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle:{
                backgroundColor: '#ffffff'
                }
            }}
        >
            {
                (status !== 'autthenticated')
                ?(
                    <>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="RegisterSreen" component={RegisterSreen} />
                    </>
                )
                : (
                    <>
                        <Stack.Screen name="Productsnavigator" component={ Productsnavigator } />
                        <Stack.Screen name="ProtectedScreen" component={ ProtectedScreen } />
                    </>
                )
            }
            

        </Stack.Navigator>
    );
}