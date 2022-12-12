



import React, {useState,useEffect } from 'react'
import { View } from 'react-native';
import cafeapi from '../api/cafeApi';
import { CategoriesResponse, Categoria } from '../interfaces/appInterfaces';


export const useCategories = () => {


    const [isLoading, setisLoading] = useState(true);
    const [categoriesState, setCategoriesState] = useState<Categoria[]>([]);

    useEffect(() => {
        getCategories()
        
    }, [])
    
    const getCategories = async() => {
        const resp = await cafeapi.get<CategoriesResponse>('/categorias');
        setCategoriesState( resp.data.categorias );
        setisLoading( false );
    }


    return {
        isLoading,
        categoriesState,
    }
}
