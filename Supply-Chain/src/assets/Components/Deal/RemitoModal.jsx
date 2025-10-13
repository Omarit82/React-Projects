import { Button, Form, Modal, Table } from "react-bootstrap"
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";

/***REMITO MODAL ***/
export const RemitoModal = ({dataRemito,lineItems,setShowModal,products}) => {
    const {register,handleSubmit,control} = useForm({defaultValues:{items:lineItems}});
    const { fields, append,remove } = useFieldArray({control,name:"items"});

    const complementos = (q) => {
        const array = [
            {id:11,properties:{info_uno_id:"CARCASA",name:"Carcasa Plástica Citymesh"},quantity:q,visible:false},
            {id:12,properties:{info_uno_id:"TORNILLOSYTARUGOS",name:"Juego de Tornillos y Tarugos Citymesh"},quantity:q,visible:false},
            {id:13,properties:{info_uno_id:"PACKAGING",name:"Packaging Citymesh"},quantity:q,visible:false}
        ]
        return array;
    }

    const complementosKit = (q) => {
        const array =[//2 movimiento ,magnetico, sirena,control,bateria,fuente, packaging kit, packaging fuente
            {id:2477838256,properties:{info_uno_id:"SP02-ZB",name:"Sensor de Movimiento Meian Citymesh"},quantity:q*2},
            {id:2724802647,properties:{info_uno_id:"DW02-ZB",name:"Sensor Magnético Meian Citymesh"},quantity:q},
            {id:139934834,properties:{info_uno_id:"HS2WD-EFR1",name:"Sirena Heiman"},quantity:q},
            {id:2477838258,properties:{info_uno_id:"PB02-ZB",name:"Control Remoto Meian Citymesh"},quantity:q},
            {id:140962813,properties:{info_uno_id:"2P703060",name:"Batería 3,7V"},quantity:q},
            {id:2444485988,properties:{info_uno_id:"FGML",name:"Fuente 12 V 2 A"},quantity:q},
            {id:14,properties:{info_uno_id:"KITPACKAGING",name:"Packaging KIT - Cityymesh"},quantity:q,visible:false},
            {id:15,properties:{info_uno_id:"FUENTEPACKAGING",name:"Packaging para fuente en KIT - Citymesh"},quantity:q,visible:false},
        ]
        return array;
    }
    /** Submit de la data al remito.**/
    const onSubmit = async(data) => {
        const aux = [];
        data.items.forEach(element => {
            let reemplazo = products.find(it => it.id == element.elemento);
            reemplazo.quantity = parseInt(element.quantity);
            aux.push(reemplazo);
        });
        let cantidadEquipos=0;
        let cantidadKits=0;    
        const remitar=[];      
        aux.forEach(elemento => {
            //CII lan:133361037,2049843507 -CII wifi:2050255212,2183953037 - CII 3g: 1020036383,2045095501 - CII 4g:1020036384,2452159355
            //Com wifi: 1020036379,2014786226- Com 3g:1020036382,2015561276 -Com 4g: 2050269082,2050255205
            let i = elemento.id;
            if(i=='133361037'||i=='2049843507'||i=='2050255212'||i=='2183953037'||i=='1020036383'||i=='2045095501'||i=='1020036384'||i=='2452159355'||i=='1020036379'||i=='2014786226'||i=='1020036382'||i=='2015561276'||i=='2050269082'||i=='2050255205'){
                const equipo = products.find((it)=>it.id == i);
                cantidadEquipos+=parseInt(elemento.quantity);
                remitar.push({producto:equipo,cantidad:parseInt(elemento.quantity)});
            }else if(i=='22423267887'||i=='18086374667'||i=='2452300649'||i=='2452159354'){
                let equipo;
                switch (i) {
                    case '22423267887':
                        equipo = products.find((it)=>it.id == '1020036384');
                        remitar.push({producto:equipo,cantidad:parseInt(elemento.quantity)});
                        break;
                    case '18086374667':
                        equipo = products.find((it)=>it.id == '1020036384');
                        remitar.push({producto:equipo,cantidad:parseInt(elemento.quantity)});
                        break;
                    case '2452300649':
                        equipo = products.find((it)=>it.id == '1020036383');
                        remitar.push({producto:equipo,cantidad:parseInt(elemento.quantity)});
                        break;
                    case '2452159354':
                        equipo = products.find((it)=>it.id == '2050255212');
                        remitar.push({producto:equipo,cantidad:parseInt(elemento.quantity)});
                        break;
                }  
                cantidadEquipos+=parseInt(elemento.quantity);     
                cantidadKits+=parseInt(elemento.quantity);       
            }else{
                remitar.push({producto:elemento,cantidad:parseInt(elemento.quantity)});
            }
        }); 
        if(cantidadEquipos>0){
            const aux = complementos(cantidadEquipos);
            aux.forEach(element => {
                remitar.push({producto:element,cantidad:cantidadEquipos});
            });
        }
        if(cantidadKits>0){
            const aux = complementosKit(cantidadKits);
            aux.forEach(element => {
                if(element.id == 2477838256){
                    remitar.push({producto:element,cantidad:cantidadKits*2});;
                }else{
                    remitar.push({producto:element,cantidad:cantidadKits});
                }
            });
        }
        //ANALIZO EL ARREGLO remitar POR ELEMENTOS DUPLICADOS, SI ESTAN DUPLICADOS ELIMINO UNO Y SUMO LAS CANTIDADES.
        console.log(remitar);
        for (let i=0; i<(remitar.length-1);i++){
            let elemento = remitar[i];
            for (let j=i+1;j<remitar.length;j++){
                if(parseInt(elemento.producto.id) === remitar[j].producto.id){
                    /**Encontro un elemento duplicado en el arreglo.**/
                    const eliminado = remitar.splice(j,1);
                    remitar[i].cantidad = parseInt(remitar[i].cantidad)+ parseInt(eliminado[0].cantidad);
                }
            }
        }         
        const clientData = dataRemito.Payload.properties;
        const payload={clientData,remitar,products};  
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
        }
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
                                    <td className="p-3"> 
                                        <input type="number" min="0" step="1" className="text-center campoCantidad" {...register(`items.${index}.quantity`)} defaultValue={field.properties.quantity ?? 0} />
                                    </td>
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