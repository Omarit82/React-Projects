import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Contexts/UserContext/UserContext";



export const TaskContainer = () => {
    const [loading,setLoading] = useState(true);
    const [tasks,setTasks] = useState([]);
    const {getSession} = useContext(UserContext);
   
    /** SOLICITUD DE TAREAS A HUBSPOT */
    useEffect(()=>{
        const getTasks = async()=>{
            try {
                const sess =await getSession();
                if(!sess){
                    window.location.href = 'http://localhost:3000/hubspot/install'
                }else{
                    const tareas = await fetch('http://localhost:3000/hubspot/tasks',{
                        method:'GET',
                        credentials:'include'
                    });
                    console.log(tareas);
                    if(tareas.status == 200){
                        const resultado = await tareas.json();
                        setTasks(resultado);
                        console.log(resultado);
                        setLoading(false);
                    }
                }
            } catch (error) {
                /** Cargo un componente de error. */
                console.log("Error al cargar los datos");
                setLoading(false)
                
            }
        }
        getTasks();
    },[])

    return(
        <>
            {loading ? <p>Cargando tareas...</p>:<h3>Task Container</h3>}
        </>
    )
}