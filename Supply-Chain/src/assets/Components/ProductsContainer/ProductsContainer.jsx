import { useContext, useEffect, useState } from "react"
import { ProductContext } from "../../Contexts/ProductContext/ProductContext"
import { Product } from "../Product/Product";
import { Table } from "react-bootstrap";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import { Helix } from "ldrs/react";
import 'ldrs/react/Helix.css'



export const ProductsContainer = () => {
    const {products,getProducts} = useContext(ProductContext);
    const { getSession } = useContext(UserContext);
    const [loader,setLoader] = useState(true);
    
    useEffect(() => {
        const listado = async ()=>{
            try {
                const sesion = await getSession();
                if(!sesion){
                    window.location.href = 'http://localhost:3000/hubspot/install';
                    return;
                }
                await getProducts();
                setLoader(false);
            } catch (error) {
                console.log("Error en el container del producto");
            }
        }
        listado();
    }, []);

    
    return (
        <div className="d-flex flex-column">
        {loader ? (<div className="m-auto mt-5"><Helix className="m-auto" speed="0.7" size="180" color="#0046afff" /></div>
            ):(  
            <Table hover striped>
                <thead>
                    <tr className="">
                        <th className="col-1">Hubspot Id</th>
                        <th className="col-3">Nombre</th>
                        <th className="col-4">Descripcion</th>
                        <th className="col-2">Admin Id</th>
                    </tr>
                </thead>
                <tbody>
                {products.map((item)=>(
                    <Product item={item} key={item.id} />
                ))}
                </tbody>
            </Table>
        )}
        </div>
    )
}