import { Button, Card } from "react-bootstrap";
import './deal.css';
import { useEffect, useState } from "react";
import down from '../../Images/down.png';
import upArrow from '../../Images/up.png';
import { useForm } from "react-hook-form";

export const Deal = ({deal}) => {
    const [dealInfo,setDealInfo] = useState(false);
    const [dealTask,setDealTask] = useState(false);
    const [hover,setHover] = useState(false);
    const [ready,setReady] = useState(false);
    const [dia,setDia] = useState();
    const [mes,setMes] = useState();
    const [anio,setAnio] = useState();
    const [fix,setFix] = useState(false);
    const [task, setTask] = useState([]);
    const [lineItems,setLineItems] = useState([]);
    const [up,setUp] = useState(true);
    const {register,handleSubmit} = useForm();

    useEffect(() => {
        const getTarea = async()=>{
            try {
                const tarea = await fetch(`http://localhost:3000/hubspot/task/${deal.id}`,{ 
                    method:'GET',
                    credentials:'include'
                });
                if(tarea.status == 200){ 
                    const resultado = await tarea.json();
                    setTask(resultado.Task);                                        
                }    
            } catch (error) {
                //console.log(error);
            }
        };
        getTarea();
    },[])

    useEffect(() => {
        if(task.length != 0){
            const fecha = task[0].properties.hs_timestamp.split("T")[0].split("-")      
            setDia(fecha[2]);
            setMes(fecha[1]);
            setAnio(fecha[0]);        
        }
    },[task])

    useEffect(()=>{
        const getLineItems = async () => {
            const items = await fetch(`http://localhost:3000/hubspot/lineItem/${deal.id}`,{
                method:"GET",
                credentials: "include"
                }
            )
            const respuesta = await items.json();
            if(respuesta.Payload.results){
                setLineItems(respuesta.Payload.results);   
            }
        }
        getLineItems();
    },[])
    const showFix = () => {
        up ? setUp(false):setUp(true);
        fix ? setFix(false):setFix(true);
    }
    const onHoverIn = () => {
        !hover && setHover(true)
    }
    const onHoverOut = () => {
        hover && setHover(false)
    }
    const showDealInfo =() => {
        dealInfo ? setDealInfo(false): setDealInfo(true);
    }
    const showDealTask = () => {
        dealTask ? setDealTask(false):setDealTask(true);
    }
    const updateTask = async(data) => {
        console.log(data);
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

    const endTask = async() => {
        try {
            const finalizar = await fetch(`http://localhost:3000/hubspot/task/${task.id}`,{
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

    }
   
    return(
        <>
        {task.length != 0 &&
            <Card className={`ms-5 me-5 mb-2`} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
                <Card.Header className={`d-flex justify-content-between align-items-center text-center ${JSON.parse(task[0].properties.hs_task_is_overdue) && "vencida"}`} >
                    <Card.Title className="fs-6">{deal.properties.dealname}</Card.Title>
                    <Button onClick={showFix} className="botonFlecha">{up?<img src={down} alt="abajo" className="flecha" />:<img src={upArrow} alt="arriba" className="flecha" />}</Button>
                </Card.Header>
                { (hover|| fix) &&
                <>
                    <Card.Body >
                        <div className="d-flex">
                            <Button className="btn btn-info" onClick={showDealInfo}>Deal Info</Button>
                            <Button className="btn btn-info ms-2" onClick={showDealTask}>Task Info</Button>
                            <Button className="btn btn-info ms-2" onClick={createRemito}>Generar Remito</Button>
                        </div> 
                        <form method="POST" onSubmit={handleSubmit(updateTask)}  className="row">
                            {dealInfo && 
                                <div className="col-6 pt-2">
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
                                    <Button className="btn btn-success ms-2 w-25"  type="submit">Actualizar</Button>
                                </div>
                            }
                            {dealTask &&
                                <div className="col-6 pt-2">
                                    <div className="d-flex justify-content-between align-items-center campoCard">
                                        <>
                                            <p className="m-0">Vence: {dia} - {mes} - {anio}</p> 
                                            {JSON.parse(task[0].properties.hs_task_is_overdue) && <p className="m-0">Tarea vencida</p>}
                                        </>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center campoCard">
                                        <ul>
                                        {lineItems.map((item,index) => (
                                            <li key={index}>{item.properties.name} - <span className="quantity">{item.properties.quantity}</span></li>
                                        ))}
                                        </ul>
                                    </div>
                                </div>  
                            }  
                        </form>
                    </Card.Body>
                    <Card.Footer>
                        {ready && <Button className="btn btn-danger" onClick={endTask} >Finalizar Tarea</Button>}
                    </Card.Footer>
                </>
                }
            </Card>
        }
        </>
    )
}