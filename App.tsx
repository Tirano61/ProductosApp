
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StackNavigation } from './src/navigator/StackNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/ProductContext';


const AppState = ({ children }: any ) => {
  return(
    <AuthProvider>
      <ProductProvider>
        { children }
      </ProductProvider>
    </AuthProvider>
  )

  
}

export const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigation />
      </AppState>
    </NavigationContainer>
    
  )
}


export default App;
