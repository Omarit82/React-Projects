import { Button, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import './cliente.css';
import { useState } from "react";

export const Clientes = () => {
    const {register, handleSubmit } = useForm();
    const [nuevo,setNuevo] = useState(false);
    const [texto,setTexto] = useState("Cargar Nuevo Cliente");

    const submit = (data) => {
        console.log(data);
    }
    const showForm = () => {
        if(nuevo){
            setNuevo(false)
            setTexto("Cargar Nuevo Cliente")
        }else{
            setNuevo(true);
            setTexto("Ocultar Formulario")
        }
    }

    return (
        <main>
            <h4 className="text-center">Clientes</h4>
            <div className="d-flex justify-content-center">
                <Button onClick={showForm} className="btn-info" >{texto}</Button>
            </div>
            {nuevo && 
            <form className="d-flex flex-column w-50 m-auto mb-5 mt-5 clienteForm" onSubmit={handleSubmit(submit)} method="post">
                <label htmlFor="fantasia" className="text-center">Nombre de Fantasia</label>
                <input type="text" name="fantasia" {...register("fantasia")}/>
                <label htmlFor="clienteId" className="text-center">ID del Cliente en Bejerman</label>
                <input type="text" name="clienteId" {...register("clienteId")} />
                <label htmlFor="razon" className="text-center">Razon Social</label>
                <input type="text" name="razon" {...register("razon")} />
                <label htmlFor="direccion" className="text-center">Direccion</label>
                <input type="text" name="direccion" {...register("direccion")} />
                <label htmlFor="ciudad" className="text-center">Ciudad</label>
                <input type="text" name="ciudad" {...register("ciudad")} />
                <label htmlFor="provincia" className="text-center">Provincia</label>
                <input type="text" name="provincia" {...register("provincia")}/>
                <label htmlFor="cuit" className="text-center">CUIT</label>
                <input type="text" name="cuit" {...register("cuit")} />
                <Button className="w-25 mt-2 m-auto" type="submit">Cargar Cliente</Button>
            </form>
            /**listado de clientes**/}
            <Table striped bordered hover className="mt-5 tabla">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">CUIT</th>
                        <th className="text-center">Nombre de Fantasía</th>
                        <th className="text-center">Razón Social</th>
                        <th className="text-center">Dirección</th>
                        <th className="text-center">Ciudad</th>
                        <th className="text-center">Provincia</th>
                    </tr>
                </thead>
                {/** Aca tengo que incluir un componente con la info de cada cliente que traje del backend. */}
            </Table>
        </main>
    )
}