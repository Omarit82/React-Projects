import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Contexts/UserContext/UserContext";
import { Task } from "../Task/Task";



export const TaskContainer = () => {
    const [loading,setLoading] = useState(true);
    const [tasks,setTasks] = useState([]);
    const {getSession} = useContext(UserContext);
    const [deals,setDeals] = useState([]);
   
    /** SOLICITUD DE TAREAS A HUBSPOT */
    // useEffect (() => {
    //     const getTasks = async()=>{
    //         try {
    //             const sesion =await getSession();
    //             if(!sesion){
    //                 window.location.href = 'http://localhost:3000/hubspot/install'
    //             }else{
    //                 const tareas = await fetch('http://localhost:3000/hubspot/tasks',{
    //                     method:'GET',
    //                     credentials:'include'
    //                 });
    //                 console.log(tareas);
    //                 if(tareas.status == 200){
    //                     const resultado = await tareas.json();
    //                     setTasks(resultado);
    //                     console.log(resultado);
    //                     setLoading(false);
    //                 }
    //             }
    //         } catch (error) {
    //             /** Cargo un componente de error. */
    //             console.log("Error al cargar los datos");
    //             setLoading(false)
    //         }
    //     }
    //     getTasks();
    // },[])

    useEffect(() => {
        const getDeals = async() => {
            try {
                const sesion =await getSession();
                if(!sesion){
                    window.location.href = 'http://localhost:3000/hubspot/install'
                }else{
                    const deals = await fetch('http://localhost:3000/hubspot/deals',{
                        method:'GET',
                        credentials:'include'
                    });
                    console.log(deals);
                    if(deals.status == 200){
                        const resultado = await deals.json();
                        setDeals(resultado.Deals.results);
                        console.log(resultado);
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        getDeals();
    },[])

    return(
        <div className="d-flex flex-column">
            {
            loading ? <p>Cargando tareas...</p>: deals.map((deal)=>{
                return <Task deal={deal} />
            })
            }
        </div>
    )
}