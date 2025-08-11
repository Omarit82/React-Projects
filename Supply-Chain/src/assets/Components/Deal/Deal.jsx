import { Button, Card } from "react-bootstrap";
import './deal.css';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export const Deal = ({deal}) => {
    const [dealInfo,setDealInfo] = useState(false);
    const [dealTask,setDealTask] = useState(false);
    const [hover,setHover] = useState(false);
    const [dia,setDia] = useState();
    const [mes,setMes] = useState();
    const [anio,setAnio] = useState();
    const [fix,setFix] = useState(false);
    const [task, setTask] = useState([]);
    const [lineItems,setLineItems] = useState([]);
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
                console.log(error);
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
            setLineItems(respuesta.Payload.results);            
        }
        getLineItems();
    },[])
    const showFix = () => {
        fix ? setFix(false):setFix(true)
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
        
    }
    
    return(
        <>
        {task.length != 0 &&
            <Card className={`ms-5 me-5 mb-2`} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
                <Card.Header className={`d-flex justify-content-between text-center ${JSON.parse(task[0].properties.hs_task_is_overdue) && "vencida"}`} >
                    <Card.Title>{deal.properties.dealname}</Card.Title>
                    <Button onClick={showFix} className="btn btn-info">Keep Open</Button>
                </Card.Header>
                { (hover|| fix) &&
                <>
                    <Card.Body >
                        <Button className="btn btn-success" onClick={showDealInfo}>Deal Info</Button>
                        <Button className="btn btn-success ms-2" onClick={showDealTask}>Task Info</Button>
                        
                        <form method="POST" handleSubmit={updateTask}  className="row">
                            {dealInfo && 
                                <div className="col-6 pt-2">
                                    <div className="d-flex justify-content-between campoCard">
                                        <p className="m-0 p-3">Observaciones para produccion: </p>
                                        <p className="m-0 p-3">{deal.properties.observaciones_para_produccion}</p>
                                    </div>
                                    <div className="d-flex justify-content-between campoCard">
                                        <p className="m-0 p-3">Numero de remito:</p>
                                        <input {...register("remito")}type="text" name="remito" defaultValue={deal.properties.numero_de_remito}/>
                                    </div>
                                    <div className="d-flex justify-content-between campoCard">
                                        <p className="m-0 p-3">Numero de guia del envio: </p>
                                        <p className="m-0 p-3">{deal.properties.nro_de_guia_del_envio}</p>
                                    </div>
                                </div>
                            }
                            {dealTask &&
                                <div className="col-6 pt-2">
                                    <div className="d-flex justify-content-between campoCard">
                                        <>
                                            <p>Vence: {dia} - {mes} - {anio}</p> 
                                            {JSON.parse(task[0].properties.hs_task_is_overdue) && <p>Tarea vencida</p>}
                                        </>
                                    </div>
                                    <div className="d-flex justify-content-between campoCard">
                                        <ul>
                                        {lineItems.map((item,index) => (
                                            <li key={index}>{item.properties.name} - <span className="quantity">{item.properties.quantity}</span></li>
                                        ))}
                                        </ul>
                                    </div>
                                </div>
                            }
                            <Button className="btn btn-success m-5"  type="submit">Actualizar</Button>
                        </form>
                    </Card.Body>
                    <Card.Footer>
                        <Button className="btn btn-danger" >Finalizar Tarea</Button>
                    </Card.Footer>
                </>
                }
            </Card>
        }
        </>
    )
}