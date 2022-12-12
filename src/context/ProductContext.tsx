import Rect, { createContext, createRef, useEffect } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import { useState } from 'react';
import cafeapi from '../api/cafeApi';



type ProductsContextProps = {
    products: Producto[],
    loadProducts:    () => Promise<void>,
    addProduct:      (categoryId: string, productName: string) => void,
    updateProduct:   (categoryId: string, productName: string, productId: string) => void,
    deleteProduct:   (id: string) => Promise<void>,
    loadProductById: (id: string) => Promise<Producto>,
    uploadImage:     ( data: any, id: string) => Promise<void>
}

export const ProductContext = createContext({} as ProductsContextProps);

export const ProductProvider = ({ children }: any ) => {

    const [productsSate, setProductsSate] = useState<Producto[]>([])

    useEffect(() => {
      loadProducts();
    }, [])


    const loadProducts = async() => {
        const resp = await cafeapi.get<ProductsResponse>('/productos?limite=50');
        setProductsSate([...productsSate, ...resp.data.productos]);
        
    };
    const addProduct = async(categoryId: string, productName: string) => {
        const resp = await cafeapi.post<Producto>('/productos', {
            nombre: productName, 
            categoria: categoryId,
        });
        setProductsSate([...productsSate, resp.data]);
       
    };
    const updateProduct = async(categoryId: string, productName: string, productId: string) => {
        const resp = await cafeapi.put<Producto>(`/productos/${ productId }`, {
            nombre: productName, 
            categoria: categoryId,
        });
        setProductsSate( productsSate.map( prod => {
            return (prod._id === productId )
                    ? resp.data
                    :prod;
        }));
    };
    const deleteProduct = async(id: string) => {};
    const loadProductById = async(id: string): Promise<Producto> => {
        const resp = await cafeapi.get<Producto>(`/productos/${ id }`);
        return resp.data;
    };
    const uploadImage = async( data: any, id: string) => {};

    return (
        <ProductContext.Provider value={{
            products: productsSate,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,
        }}>
            { children }
        </ ProductContext.Provider>
    )
}
