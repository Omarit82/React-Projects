import { Button, Card, Form, Modal, Table } from "react-bootstrap";
import './deal.css';
import { useEffect, useRef, useState,useContext } from "react";
import down from '../../Images/down.png';
import upArrow from '../../Images/up.png';
import signo from '../../Images/admiracion.png';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ProductContext } from "../../Contexts/ProductContext/ProductContext"


const PriorityBadge = ({ color, label }) => (
    <div className="d-flex align-items-center prioridad">
        {label}
        <div className={`${color}Point ms-2`} />
    </div>
);
const LineItemList = ({ lineItems }) => (
    <ul className="p-0 ps-4">
        {lineItems.map((item, index) => (
            <li key={index}>
                {item.properties.name} -{" "}
                <span className="quantity">{item.properties.quantity}</span>
            </li>
        ))}
    </ul>
);

export const Deal = ({ deal, setFecha, dealSinTask}) => {
    
    const inRef = useRef(null);
    const [fix, setFix] = useState(false);
    const [task, setTask] = useState([]);
    const [lineItems, setLineItems] = useState([]);
    const [up, setUp] = useState(true);
    const {reset } = useForm();
    const [priority, setPriority] = useState(null);
    const [dataRemito,setDataRemito] = useState(null);
    const [day,setDay] = useState();
    const [month,setMonth] = useState();
    const [year, setYear] = useState();
    const [showModal,setShowModal] = useState(false);
    const { products, getProducts } = useContext(ProductContext);
    const {register,handleSubmit} = useForm();

    // Obtener tarea asociada
    useEffect(() => {
        const getTarea = async () => {
            try {
                const res = await fetch(`http://localhost:3000/hubspot/task/${deal.id}`, {
                    method: "GET",
                    credentials: "include",
                });
                if (res.status === 200) {
                        const resultado = await res.json();
                        if (resultado.Task.length !== 0) {
                            const t = resultado.Task[0];
                            setTask(resultado.Task);
                            setFecha(deal.id, t.properties.hs_timestamp, t.properties.hs_task_priority);
                            setPriority(t.properties.hs_task_priority || null);
                            const date = new Date(t.properties.hs_timestamp);
                            setDay(date.getDate());
                            setMonth(date.getMonth()+1);
                            setYear(date.getFullYear());                            
                        } else {
                            dealSinTask(deal.id); 
                        }
                }
            } catch (error) {
                console.error(error);
            }
        };
        getTarea();
    }, [fix]);
  // Obtener line items
    useEffect(() => {
        const getLineItems = async () => {
            try {
                const res = await fetch(`http://localhost:3000/hubspot/lineItem/${deal.id}`, {
                    method: "GET",
                    credentials: "include",
                });
                if (res.status === 200) {
                    const respuesta = await res.json();
                    if (respuesta.Payload.results) {
                        let resultado = respuesta.Payload.results.filter( it => ((it.properties.hs_product_id != 2050255227)&&(it.properties.hs_product_id != 2452159355))) 
                        setLineItems(resultado);
                    }
                }
            } catch (error) {
                    console.error(error);
            }
        };
        getLineItems();
    },[]);
    //Datos del cliente para el remito
    useEffect(()=>{
        const id = deal.properties.hs_primary_associated_company;
        const compania = async()=>{
            try {
                const data = await fetch(`http://localhost:3000/hubspot/clients/${id}`,{
                        method:"GET",
                        credentials:"include"
                    }
                );
                if(data.ok){
                    const respuesta = await data.json();
                    setDataRemito(respuesta);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(id != null){
            compania();
        }
    },[])

    const showFix = () => {
        inRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        setUp((prev) => !prev);
        setFix((prev) => !prev);
    };

    const priorityChange = async () => {
        if (!task.length) return;
        try {
            Swal.fire({
                title:"¿Listo a cerrar?",
                text:"Seleccione Prioridad: ",
                input:"radio",
                inputOptions:{
                    NONE: "NONE",
                    LOW: "LOW",
                    MEDIUM: "MEDIUM",
                    HIGH: "HIGH"
                },
                inputValidator:(value) => {
                    if(!value){
                        return "NONE"
                    }
                },
                confirmButtonText:'Confirmar',
                confirmButtonColor:'red',
                showCancelButton:true,
                cancelButtonColor:'black',
                icon:"success",
                draggable:true
            }).then(async (result) =>{
                if(!result.isConfirmed) return;
                if(result.isConfirmed){
                    Swal.fire({
                        toast:true,
                        title:"Prioridad Modificada!",
                        timer:1500,
                        showConfirmButton:false,
                        timerProgressBar:true,
                        background:"darkslategray",
                        color:"white"
                    })
                }
                const payload = { "priority": result.value};
                const respuesta = await fetch(`http://localhost:3000/hubspot/task/${task[0].id}/`, {
                    headers: { "Content-Type": "application/json" },
                    method: "PUT",
                    credentials: "include",
                    body: JSON.stringify(payload)
                });
                if (respuesta.ok){
                    setTask(prevTask => 
                        prevTask.map(t => 
                            t.id === task[0].id
                            ?{...t,properties:{...t.properties,hs_task_priority:result.value}}:t))
                    setPriority(result.value);
                    setFix(false);
                }else{
                    console.error("Error al actualizar prioridad");
                }
            })
        } catch (error) {
            console.error(error);
        }
    };

    const endTask = async () => {
        if (!task.length) return;
        try {
            Swal.fire({
                title:"¿Cerrar tarea?",
                icon:"question",
                confirmButtonText:'Confirmar',
                confirmButtonColor:'red',
                showCancelButton:true,
                cancelButtonColor:'black',
            }).then(async(result) =>{
                if (result.isConfirmed) {
                    const value = "COMPLETED";
                    const payload = { "status": value};
                    const res = await fetch(`http://localhost:3000/hubspot/task/${task[0].id}`, {
                        headers: { "Content-Type": "application/json" },
                        method: "PUT",
                        credentials: "include",
                        body: JSON.stringify(payload)
                    });
                    if (res.ok){
                        setFix(false);
                    }
                };
                
            })
        } catch (error) {
            console.error(error);
        }
    };

    // Resetear formulario si cambia el deal
    useEffect(() => {
        reset({
            observaciones: deal.properties.observaciones_para_produccion,
            remito: deal.properties.numero_de_remito,
            guia: deal.properties.nro_de_guia_del_envio,
        });
    }, [deal, reset]);

    const handleClose = () => setShowModal(false);
    
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

    const handleChange = (event,anteriorId)=>{
        let nuevoProducto = products.filter( it => it.properties.name == event.target.value);
        const lineItemsSinOld = lineItems.filter( it => it.properties.hs_product_id != parseInt(anteriorId));
        const nuevoLineItems = [...lineItemsSinOld,nuevoProducto[0]];
        setLineItems(nuevoLineItems);
    }

    const handleQuantity = (prod,e) => {
        const aux = lineItems;
        const item = aux.find(it => it.properties.hs_product_id == prod.properties.hs_product_id)
        const listaReducida = aux.filter(it => it.properties.hs_product_id != prod.properties.hs_product_id);
        item.properties.quantity = e.target.value;
        const res = [...listaReducida,item];
        setLineItems(res);
    }

    const onSubmit = async(data) => {
        for (const element of data.items) {
            const prod = products.find((it) => (it.id == element.elemento));
            element.info_uno_id = prod.properties.info_uno_id;    
        }
        const items = data.items;
        const clientData = dataRemito.Payload.properties;
        const payload={clientData,items};     

        /**Data trae la cantidad y el id de los productos del remito tengo que pasarle ademas el identificador de bejerman*/    
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
                position:"top-right"
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


    return (
        <>
            {/***MODAL REMITO***/
                <Modal show={showModal} onHide={handleClose}>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {lineItems.map((elemento, index) => (
                                        <tr key={elemento.id}>
                                            <td className="p-3">
                                            <Form.Select {...register(`items.${index}.elemento`)} defaultValue={elemento.properties.hs_product_id}>
                                                <option value={elemento.properties.hs_product_id}>
                                                    {elemento.properties.name}
                                                </option>
                                                {products.map((opcion) => (
                                                    <option key={opcion.id} value={opcion.properties.hs_product_id}>
                                                        {opcion.properties.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            </td>
                                            <td className="p-3"><input type="number" min="0" step="1" className="text-center campoCantidad" {...register(`items.${index}.quantity`)} defaultValue={elemento.properties.quantity ?? 0} /></td>
                                        </tr>
                                        ))}
                                </tbody>
                            </Table>                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit" >Registrar</Button>
                            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            }

            {task.length !== 0 && (
                <Card className="ms-5 me-5 mb-2 tarjeta">
                        <Card.Header className="cardHeader">
                            <Button id="buttonCard" ref={inRef} onClick={showFix} className="w-100 botonFlecha d-flex justify-content-between">
                                <Card.Title className="fs-6 colorFont">{deal.properties.dealname}</Card.Title>
                                <div className="d-flex align-items-start">
                                    <p className="me-5 colorFont">{day} - {month} - {year}</p>
                                    {priority === "HIGH" && <PriorityBadge color="red" label="Listo a Cerrar" />}
                                    {priority === "MEDIUM" && <PriorityBadge color="orange" label="Listo a Cerrar" />}
                                    {priority === "LOW" && <PriorityBadge color="green" label="Listo a Cerrar" />}
                                    {JSON.parse(task[0].properties.hs_task_is_overdue) ? (
                                        <img src={signo} className="vencida" />
                                        ) : up ? (
                                        <img src={down} alt="abajo" className="flecha" />
                                        ) : (
                                        <img src={upArrow} alt="arriba" className="flecha" />
                                    )}
                                </div>
                            </Button>
                        </Card.Header>
                    {fix && 
                    (
                    <>
                        <Card.Body>
                            <div className="row">
                                <div className="col-6 pt-2">
                                    <div className="d-flex justify-content-between campoCard">
                                        <p className="m-0 p-1">Id: </p>
                                        <p className="m-0 p-1">{deal.id}</p>
                                    </div>
                                    <div className="d-flex justify-content-between campoCard align-items-center">
                                        <p className="m-0 p-1">Numero de guia del envio: </p>
                                        <p className="m-0 p-1">{deal.properties.nro_de_guia_del_envio}</p>
                                    </div>
                                    <div className="d-flex justify-content-between campoCard align-items-center">
                                        <p className="m-0 p-1">Numero de remito: </p>
                                        <p className="m-0 p-1">{deal.properties.numero_de_remito}</p>
                                    </div>
                                    <div className="campoCard">
                                        <p className="m-0 p-1">Observaciones para produccion: </p>
                                        <p className="m-0 p-1">{deal.properties.observaciones_para_produccion}</p>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <Button className="btn btn-info ms-2" onClick={()=>setShowModal(true)} >Generar Remito</Button>
                                        <Button className="btn btn-info ms-2" onClick={priorityChange}>Listo para Cerrar</Button>
                                    </div>
                                </div>
                                <div className="col-6 pt-2">
                                    <div className="campoCard">
                                        <p className="p-1 m-0 text-center">{(task[0].properties.hs_task_subject).split("|")[0]} {(task[0].properties.hs_task_subject).split("|")[1]} {(task[0].properties.hs_task_subject).split("|")[2]} {(task[0].properties.hs_task_subject).split("|")[3]} {(task[0].properties.hs_task_subject).split("|")[4]}</p>
                                        <hr className="w-75 m-auto mb-1" />
                                        <div className="d-flex justify-content-between">
                                            <p className="m-0 ps-2">Vence: {day} - {month} - {year}</p>
                                            {JSON.parse(task[0].properties.hs_task_is_overdue) && (<p className="m-0 ps-2  fw-bold">Tarea vencida</p>)}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center campoCard p-1">
                                        <LineItemList lineItems={lineItems} />
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                            <Card.Footer>
                                <div className="d-flex justify-content-end">
                                    <Button className="btn btn-danger" onClick={endTask}>Finalizar</Button>
                                </div>
                            </Card.Footer>
                        </>
                    )}
                </Card>
            )}
        </>
    );
};
