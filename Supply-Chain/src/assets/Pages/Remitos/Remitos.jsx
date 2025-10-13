import { useEffect, useState } from "react"
import { Table, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import './remito.css';
import Swal from "sweetalert2";


export const Remitos = () => {
    const [remitos,setRemitos] = useState([]);
    const {register,handleSubmit} = useForm();
    /**Ordena los remitos por numero de mayor a menor. */
    const ordenarRemitos = (arr) => {
        return [...arr].sort((a,b)=>{ 
            return b.numero-a.numero;
        })
    }

    useEffect(()=>{
        const getRemitos = async () => {
            try {
                const resultado = await fetch('http://localhost:3000/remitos',{
                    method:"GET",
                    credentials:"include"
                })
                const res =  await resultado.json();
                setRemitos(ordenarRemitos(res.Payload)); 
                console.log(res);
            } catch (error) {
                console.log(error)
            }      
        }
        getRemitos()        
    },[remitos])

    const onSubmit = async(data) => {
        /**Tengo que agregar un campo, para que los remitos exportados queden deshabilitados. */
        for (const key in data) {            
            if(data[key] == true){
                //update los remitos - exported -> true
                const payload = { "exported": true};
                const update = await fetch(`http://localhost:3000/remitos/${key}`,{
                    headers: { "Content-Type": "application/json" },
                    method:'PUT',
                    credentials:'include',
                    body: JSON.stringify(payload)
                })
                if(update.ok){
                    Swal.fire({
                        toast:true,
                        icon:"success",
                        title:"Remitos Exportados",
                        timer:1500,
                        showConfirmButton: false,
                        background:"darkslategray",
                        color:"white",
                        position:"top-right",
                        customClass:{
                            title:'confirmacion'
                        }
                    })
                }
                //exporar la info a un csv
            }
        }
    }

    return(
        <main>
            <Form  onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3">
                <Button type="submit">Exportar CSV</Button>
            </div>
                <Table hover striped bordered>
                    <thead>
                        <tr>
                            <th className="col-numero text-center"> Numero</th>
                            <th className="col-razon text-center"> Razon Social</th>
                            <th className="col-sel text-center"> Seleccion</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {remitos.map((item) => (
                        !item.exported &&
                            <tr key={item._id}>
                                <td className="text-center">{item.numero}</td>
                                <td>{item.clientData.razon_social}</td>
                                <td className="text-center m-auto">
                                    <label className="checkbox-container">
                                        <input {...register(`${item._id}`)} type="checkbox" name={`${item._id}`} />
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                            </tr>
                            )
                        )}     
                    </tbody>
                </Table>
            </Form>
        </main>
    )
}