

import React,{useEffect,useState} from 'react'
import { Text, View, StyleSheet, Button, ScrollView, TextInput, Image } from 'react-native';


import { ProductsStackParams } from '../navigator/Productsnavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen' >{};

export const ProductScreen = ({ navigation, route }:Props) => {

    const { id = '', name = '' } = route.params;

    const { loadProductById, addProduct, updateProduct } = useContext(ProductContext);


    const { categoriesState, isLoading } = useCategories();
    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } =  useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: '', 
    });

    useEffect(() => {
        
        navigation.setOptions({
            title: (nombre) ? nombre : 'Sin nombre'
        })  
        
        
    }, [nombre])

    useEffect(() => {
      loadProduct();
      
    }, [])
    

    const loadProduct = async() => {
        if (id.length === 0) return;

        const prod = await loadProductById( id );
        setFormValue({
            _id: id,
            categoriaId: prod.categoria._id, 
            img: prod.img || '',
            nombre: nombre,    
        })
    }

    const saveOrUpdate = () => {
        if (id.length > 0) {
            updateProduct(categoriaId, nombre, id);
        }else{
            
            const tempCategoriaId = categoriaId || categoriesState[0]._id; 
            addProduct(  tempCategoriaId, nombre );
        }
        
    }
    

    return (
        <View style={styles.constainer}>
            <ScrollView>
                <Text style={styles.label}>Nombre del producto :</Text>
                <TextInput 
                    placeholder='producto'
                    value={nombre}
                    onChangeText={(value) => onChange(value, 'nombre')}
                    style={styles.textInput}
                />
                {/* /Picker / Selector / Combobox */}
                <Text>Categoría:</Text>
                <Picker
                    selectedValue={categoriaId}
                    onValueChange={( itemValue ) =>
                        onChange(itemValue, 'categoriaId') 
                    }
                >
                    {
                        categoriesState.map( c  => (
                            <Picker.Item label={c.nombre} value={c._id} key={c._id} />

                        ))
                    }
                    
                </Picker>
                <Button 
                    title='Guardar'
                    color='#722ce2'
                    onPress={() => saveOrUpdate()}
                />
                {
                    (id.length > 0) && (
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                            <Button 
                                title='Cámara'
                                onPress={() => {}}
                                color='#722ce2'
                            />
                            <View style={{width:10}}/>
                            <Button 
                                title='Galería'
                                onPress={() => {}}
                                color='#722ce2'
                            />
                        </View>
                    )
                }
                
                {
                    (img.length > 0) && (
                        <Image 
                            source={{uri: img}}
                            style={{width: '100%', height: 300, marginTop: 40}}
                        />
                    )
                }    
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    constainer:{
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20,
    },
    label:{
        fontSize: 18,
        paddingLeft: 10,
        
    },
    textInput:{
        borderWidth: 2,
        paddingHorizontal: 10,
        borderColor: '#e2e2e2',
        borderRadius: 20,
        height: 50,
        marginTop: 5,
        marginBottom: 10
    }
});