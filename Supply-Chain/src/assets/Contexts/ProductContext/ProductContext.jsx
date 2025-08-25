import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products ,setProducts] = useState([]);

     const ordenarProducts = (arr, asc = true) => {
        const aux = arr.filter(item => item.properties.info_uno_id != null) 
        return [...aux].sort((a, b) => {
            const pa = a.properties.info_uno_id ?? 'zz';
            const pb = b.properties.info_uno_id ?? 'zz';
            return asc ? pa.localeCompare(pb) : pb.localeCompare(pa);
        })
        
    };

    const getProducts = async() => {
        try {
            const productos = await fetch('http://localhost:3000/hubspot/products',{
                method:'GET',
                credentials:'include'
            });
            if(productos.status == 200){
                const respuesta = await productos.json();
                setProducts(ordenarProducts(respuesta.Payload,true));
            }
        } catch (error) {
            console.log("Error al obtener los productos.",error)
        }
    }

    const values = {products,getProducts};

    return(
        <ProductContext.Provider value = {values}>
            {children}
        </ProductContext.Provider>
    )
}