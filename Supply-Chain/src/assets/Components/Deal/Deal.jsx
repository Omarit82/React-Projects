import { Button, Card } from "react-bootstrap";
import './deal.css';
import { useEffect, useRef, useState,useContext } from "react";
import down from '../../Images/down.png';
import upArrow from '../../Images/up.png';
import signo from '../../Images/admiracion.png';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ProductContext } from "../../Contexts/ProductContext/ProductContext"
import { PriorityBadge } from "./PriorityBadge";
import { LineItemList } from "./LineItemList";
import { RemitoModal } from "./RemitoModal";


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
                    NONE: "En Produccion",
                    LOW: "A cerrar - Retiro Andreani",
                    MEDIUM: "A cerrar - Retiro local",
                    HIGH: "Prioridad Alta."
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

   
    return (
        <>
            {showModal && <RemitoModal dataRemito={dataRemito} lineItems={lineItems} products={products} setShowModal={setShowModal}/>}
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
            {fix && (
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
