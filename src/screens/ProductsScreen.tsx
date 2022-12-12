


import  React, { useEffect } from 'react'
import  { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import  { FlatList } from 'react-native-gesture-handler'
import  { useContext } from 'react';
import  { ProductContext } from '../context/ProductContext';
import  { StackScreenProps } from '@react-navigation/stack';
import  { ProductsStackParams } from '../navigator/Productsnavigator';




interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'>{};

export const ProductsScreen = ({ navigation }: Props) => {
    
    const { products, loadProducts } = useContext( ProductContext );

    useEffect (() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    activeOpacity={ 0.6 }
                    style={{marginRight: 10}}
                    onPress={() => navigation.navigate('ProductScreen',{name: ''})}
                >
                    <Text>Agregar</Text>
                </TouchableOpacity>
            ) 
        })
    }, [])
    

    return (
        <View style={{flex: 1, marginHorizontal: 10}}>
            <FlatList 
                data={products}
                keyExtractor={ ( p ) => p._id }
                renderItem={({item}) => (
                    <TouchableOpacity 
                        activeOpacity={0.6}
                        onPress={()=>navigation.navigate('ProductScreen', { 
                            id: item._id, 
                            name: item.nombre,
                        })}
                    >
                        <Text style={styles.productName}>{item.nombre}</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={ () => (
                    <View style={styles.itemSeparator }/>
                )}

            />
        </View>
    )
}


const styles = StyleSheet.create({
    productName:{
        fontSize: 20,
    
    },
    itemSeparator:{
        borderBottomWidth: 2,
        borderBottomColor: '#cfcece',
        marginVertical: 5,
    },
})