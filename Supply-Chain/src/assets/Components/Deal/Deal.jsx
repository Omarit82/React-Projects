import { Button, Card } from "react-bootstrap";
import './deal.css';
import { useEffect, useRef, useState } from "react";
import down from '../../Images/down.png';
import upArrow from '../../Images/up.png';
import signo from '../../Images/admiracion.png';
import { useForm } from "react-hook-form";

export const Deal = ({deal,setFecha,dealSinTask}) => {
    
    const inRef = useRef(null);
    // const [dealInfo,setDealInfo] = useState(false);
    // const [dealTask,setDealTask] = useState(false);
    const [ready,setReady] = useState(false);
    const [fix,setFix] = useState(false);
    const [task, setTask] = useState([]);
    const [lineItems,setLineItems] = useState([]);
    const [up,setUp] = useState(true);
    const {register,handleSubmit} = useForm();
  
    
    /**OBTENCION DE LAS TAREAS A PARTIR DEL DEAL.ID */
    useEffect(() => {
        const getTarea = async()=>{
            try {
                const tarea = await fetch(`http://localhost:3000/hubspot/task/${deal.id}`,{ 
                    method:'GET',
                    credentials:'include'
                });
                if(tarea.status == 200){ 
                    const resultado = await tarea.json();   
                    if(resultado.Task.length != 0){    //incluye una tarea de produccion                    
                        setTask(resultado.Task);
                        setFecha(deal.id,resultado.Task[0].properties.hs_timestamp,resultado.Task[0].properties.hs_task_priority);   
                    }else{
                        dealSinTask(deal.id); //no incluye tarea para produccion.
                    }                                         
                }    
            } catch (error) {
                console.log(error);
            }
        };
        getTarea();  
    },[]);

    useEffect(()=>{
        /**OBTENCION DE LOS LINE ITEMS DEL DEAL */
        const getLineItems = async () => {
            const items = await fetch(`http://localhost:3000/hubspot/lineItem/${deal.id}`,{
                method:"GET",
                credentials: "include"
                }
            )
            if(items.status == 200){
                const respuesta = await items.json();
                if(respuesta.Payload.results){
                    setLineItems(respuesta.Payload.results);   
                }
            }
        }
        getLineItems();
    },[])
    
    const showFix = () => {
        inRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
        up ? setUp(false):setUp(true);
        fix ? setFix(false):setFix(true);
    }
    // const showDealInfo =() => {
    //     dealInfo ? setDealInfo(false): setDealInfo(true);
    // }
    // const showDealTask = () => {
    //     dealTask ? setDealTask(false):setDealTask(true);
    // }
    const updateTask = async(data) => {
        const payload = {
            "dealId":deal.id,
            "remito":data.remito,
            "guia":data.guia,
            "observaciones":data.observaciones
        };
        try {
            const sendData = await fetch('http://localhost:3000/hubspot/deals',{
                headers:{ 
                    'Content-Type': 'application/json'
                },
                credentials:"include",
                method:"PUT",
                body: JSON.stringify(payload)
            });
            console.log(sendData.status);
            setReady(true);
        } catch (error) {
            console.log("Error al post");
        }
    }
    const lowPriority = async() => {
        try {
            console.log("Id Tarea : "+task[0].id); 
            const finalizar = await fetch(`http://localhost:3000/hubspot/task/${task[0].id}`,{
                headers:{
                    'Content-Type':'application/json'
                },
                method:"PUT",
                credentials: "include",
                }
            )
            console.log(finalizar);
        } catch (error) {
            console.log(error);
        }
    }
    const endTask = async() => {
        try {
            console.log("Id Tarea : "+task[0].id);
            
            const finalizar = await fetch(`http://localhost:3000/hubspot/task/end/${task[0].id}`,{
                headers:{
                    'Content-Type':'application/json'
                },
                method:"PUT",
                credentials: "include",
                }
            )
            console.log(finalizar.status);
        } catch (error) {
            console.log(error);
        }
    }
    const createRemito = () => {
        /**GESTION DEL REMITO. */
    }
   
    return(
        <>
        {task.length != 0 &&
            <Card className={`ms-5 me-5 mb-2 tarjeta`} >
                <Card.Header className="cardHeader"> 
                    <Button id="buttonCard" ref={inRef} onClick={showFix} className="w-100 botonFlecha d-flex justify-content-between" >
                        <Card.Title className="fs-6">{deal.properties.dealname}</Card.Title>
                        {JSON.parse(task[0].properties.hs_task_is_overdue)? <img src={signo} className="vencida"/> : up?<img src={down} alt="abajo" className="flecha" />:<img src={upArrow} alt="arriba" className="flecha" />}
                    </Button>
                </Card.Header>
                { fix &&
                <>
                    <Card.Body >
                        <form method="POST" onSubmit={handleSubmit(updateTask)}  className="row">
                            <div className="col-6 pt-2">
                                <div className="row d-flex justify-content-between campoCard">
                                    <p className="m-0 p-3 col-5">id: </p>
                                    <input className="col-6" type="text" name="observaciones" defaultValue={deal.id} disabled />
                                </div>
                                <div className="row d-flex justify-content-between campoCard">
                                    <p className="m-0 p-3 col-5">Observaciones para produccion: </p>
                                    <input className="col-6" type="text" {...register("observaciones")} name="observaciones" defaultValue={deal.properties.observaciones_para_produccion}/>
                                </div>
                                <div className="row d-flex justify-content-between campoCard">
                                    <p className="col-5 m-0 p-3">Numero de remito:</p>
                                    <input className="col-6" type="text"{...register("remito")} name="remito" defaultValue={deal.properties.numero_de_remito}/>
                                </div>
                                <div className="row d-flex justify-content-between campoCard">
                                    <p className="col-5 m-0 ps-3 pt-3 pb-3">Numero de guia del envio: </p>
                                        <input className="col-6" type="text" {...register("guia")}name="guia" defaultValue={deal.properties.nro_de_guia_del_envio}/>
                                </div>
                                <div className="d-flex ">
                                    <Button className="btn btn-info ms-2 w-25"  type="submit">Actualizar</Button>
                                    <Button className="btn btn-info ms-2" onClick={createRemito}>Generar Remito</Button>
                                </div>
                            </div>
                            <div className="col-6 pt-2">
                                <div className="campoCard">
                                    <p>{task[0].properties.hs_task_subject}</p>
                                    <div className="d-flex">  
                                        <p className="m-0">Vence: {task[0].properties.hs_timestamp}</p> 
                                        {JSON.parse(task[0].properties.hs_task_is_overdue) && <p className="m-0">Tarea vencida</p>}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center campoCard">
                                    <ul>
                                    {lineItems.map((item,index) => (
                                        <li key={index}>{item.properties.name} - <span className="quantity">{item.properties.quantity}</span></li>
                                    ))}
                                    </ul>
                                </div>
                            </div>  
                        </form>
                    </Card.Body>
                    <Card.Footer>
                        {ready && 
                            <div className="d-flex justify-content-between">
                                <Button className="btn btn-info" onClick={lowPriority} >Listo para Cerrar</Button>
                                <Button className="btn btn-danger" onClick={endTask} >Finalizar</Button>
                            </div>
                        }
                    </Card.Footer>
                </>
                }
            </Card>
        }
        </>
    )
}