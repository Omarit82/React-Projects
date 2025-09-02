import { Button, Form, Modal, Table } from "react-bootstrap"
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Kit from '../Prod/Kit.js'

/***REMITO MODAL ***/
/**
 * El modal muestra el resumen del remito.
 * 
 *          Si la info traida por la data contiene Comunicadores o Citymesh se debe considerar un Producto compuesto.
 *       ---Debe contener Packaging, Tarugos y Carcasa
 *          ARG | CITY WIFI 2050255212
 *          FS  | CITY WIFI 2183953037
 *          ARG | CITY LAN  133361037
 *          FS  | CITY LAN  2049843507
 *          ARG | CITY 3G   1020036383
 *          FS  | CITY 3G   2045095501
 *          ARG | CITY 4G   1020036384
 *  
 *          Si ademas es comunicador:
 *      ---Debe incluir placa BusDatos.
 *          ARG | COM WIFI 1020036379  
 *          FS  | COM WIFI 2014786226  
 *          ARG | COM 3G   1020036382    
 *          FS  | COM 3G   2015561276   
 *          ARG | COM 4G   2050269082    
 *          FS  | COM 4G   2050255205   
 * 
 *          Si el item es un Kit:
 *       El equipo se trata como lo detallado arriba, y se agrega:
 *       ---
 *          Kit Panel 4G Lite   | 22423267887
 *          Kit Panel 4G        | 18086374667
 *          Kit Panel 3G        | 2452300649
 *          Kit Panel WIFI      | 2452159354
 *          
 */
export const RemitoModal = ({dataRemito,lineItems,setShowModal,products}) => {
    console.log(products);
    
    const {register,handleSubmit,control} = useForm({defaultValues:{items:lineItems}});
    const { fields, append,remove } = useFieldArray({control,name:"items"});
    
    /** Submit de la data al remito.**/
    const onSubmit = async(data) => {
        for (const element of data.items) {
            // busca dentro de la lista de productos de hubspot y a cada item pasado por la data le agrega la propiedad info_uno_id
            const prod = products.find((it) => (it.id == element.elemento));
            element.info_uno_id = prod.properties.info_uno_id;    
        }
        /**Data trae la cantidad y el id de los productos del remito tengo que pasarle ademas el identificador de bejerman*/    
        const items = data.items;
        const clientData = dataRemito.Payload.properties;
        const payload={clientData,items,products};     
        /** switch para manerjar las opciones de id **/
        items.forEach(item => {
            switch (parseInt(item.elemento)) {
                case 22423267887:
                case 18086374667:
                case 2452300649:
                case 2452159354:
                    console.log("Es un kit",item);
                    const kit = new Kit(item.id,item.info_uno_id,`kit_${item.properties.name}`,item.quantity);
                    for(let i = 0; i< kit.complemento.length; i++){
                        /** Si el elemento a agregar ya esta en la lista sumo las cantidades. **/
                    }
                    break;
                case 2050255212:
                case 2183953037: 
                case 133361037:
                case 2049843507: 
                case 1020036379:
                case 2045095501:
                case 1020036384:
                case 2014786226:
                case 1020036382:
                case 2015561276:
                case 2050269082:
                case 2050255205:
                    console.log("Es un equipo",item);
                    break;
                default:
                    console.log("Es otro item",item);
                    break;
            }  
        });
        
       
        
        /*
        const res = await fetch('http://localhost:3000/remitos/save',{
            headers:{
                'Content-type': 'application/json'
            },
            method:"POST",
            credentials:'include',
            body: JSON.stringify(payload)
        });
        if(res.ok){
            Swal.fire({
                toast:true,
                icon:"success",
                title:"Remito generado",
                timer:1500,
                showConfirmButton: false,
                background:"darkslategray",
                color:"white",
                position:"top-right",
                customClass:{
                    title:'confirmacion'
                }
            }).then(async ()=>{
                setShowModal(false);
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                window.open(url,"_blank");
            })
        }else{
            Swal.fire({
                title:"Error",
                text:"Error al generar el pdf",
                icon:"error"
            });
        }*/
    }

    const eliminarItem =  (index) => {
        remove(index);        
    }
    const addItem = () => {
        const item = products[0];
        item.properties.quantity = 0;
        append(item)
    }

    return(
        <Modal show={()=>setShowModal(true)} onHide={()=>setShowModal(false)}>
            <Form onSubmit={handleSubmit(onSubmit)} >
                <Modal.Header closeButton>
                    <Modal.Title>Resumen Remito:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th> Item</th>
                                <th> Cantidad</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field,index)=>(
                                <tr key={field.id}>
                                    <td className="p-3">
                                    <Form.Select {...register(`items.${index}.elemento`)} defaultValue={field.properties.hs_product_id}>
                                        {products.map((opcion) => (
                                            <option key={opcion.id} value={opcion.id}>
                                                {opcion.properties.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    </td>
                                    <td className="p-3"><input type="number" min="0" step="1" className="text-center campoCantidad" {...register(`items.${index}.quantity`)} defaultValue={field.properties.quantity ?? 0} /></td>
                                    <td key={`erase_${field.id}`} className="p-3 text-center">
                                        <Button id={`erase_${field.id}`} onClick={()=>eliminarItem(index)} className="btn-danger">Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td className="text-center">
                                    <Button className="btn-success" onClick={addItem}>Agregar</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>                            
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" >Registrar</Button>
                    <Button variant="secondary" onClick={()=>setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}