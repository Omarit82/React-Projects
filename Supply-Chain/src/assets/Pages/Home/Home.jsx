import { useContext, useEffect } from "react"
import { UserContext } from "../../Contexts/UserContext/UserContext"
import { useNavigate } from "react-router-dom";
import { TaskContainer } from "../../Components/TaskContainer/TaskContainer";


export const Home = () => {
    const { usuario } = useContext(UserContext);
    const navegation = useNavigate();
    
    useEffect(()=>{
        if(!usuario){
            navegation('/login');        
        }
    })
    
    return(
        <main>
            <h1 className="text-center">Home</h1>
            <TaskContainer />
        </main>
    )
}