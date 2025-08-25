import { useContext, useEffect } from "react"
import { ProductContext } from "../../Contexts/ProductContext/ProductContext"


export const Remito = () => {
    const { products, getProducts } = useContext(ProductContext);

    useEffect(()=>{
        try {
            const listado = async() => {
                await getProducts();
            }
            listado();
        } catch (error) {
            console.log(error);
        }
    },[])
    const createRemito = async(data) => {
        /**GESTION DEL REMITO */
        try {
            const payload={numero:3370,dataRemito,lineItems};     
            
            // const res = await fetch('http://localhost:3000/remitos/pdf',{
            //     headers:{
            //         'Content-type': 'application/json'
            //     },
            //     method:"POST",
            //     credentials:'include',
            //     body: JSON.stringify(payload)
            // });      
            // if(res.ok){
            //     const blob = await res.blob();
            //     const url = window.URL.createObjectURL(blob);
            //     window.open(url,"_blank");
            // }else{
            //     Swal.fire({
            //         title:"Error",
            //         text:"Error al generar el pdf",
            //         icon:"error"
            //     });
            // }  
        } catch (error) {
            console.log(error);
        }
    };
    return(
        <main>
            
        </main>
    )
}