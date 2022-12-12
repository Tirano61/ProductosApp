


import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

  const { user,token, logOut } = useContext(AuthContext)

  return (
    <View style={ styles.container }>
        <Text style={ styles.title }>Protected Screen</Text>
        <Button 
          title='logout'
          color='#722ce2'
          onPress={() => logOut()}
        />
        <Text>
          { JSON.stringify( user, null, 5 ) }
        </Text>
        <Text>
          { JSON.stringify( token, null, 5 ) }
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20
    },
    title:{
      fontSize: 20,
      marginBottom: 20,

    }
});