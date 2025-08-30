import { useEffect, useState } from "react"
import { Table, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import './remito.css';


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
    },[])

    const onSubmit = (data) => {
        /**Tengo que agregar un campo, para que los remitos exportados queden deshabilitados. */
        for (const key in data) {
            if(data[key] == true){
                console.log(key);
            }
        }
    }

    return(
        <main>
            <Form  onSubmit={handleSubmit(onSubmit)}>
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
                        <tr key={item._id}>
                            <td className="text-center">{item.numero}</td>
                            <td>{item.clientData.razon_social}</td>
                            <td className="text-center m-auto">
                                <label className="checkbox-container">
                                    <input {...register(`${item._id}`)} type="checkbox" name={`${item._id}`} id="" />
                                    <span className="checkmark"></span>
                                </label>
                            </td>
                        </tr>
                        )
                    )}     
                </tbody>
            </Table>
                <Button type="submit">Exportar CSV</Button>
            </Form>
        </main>
    )
}