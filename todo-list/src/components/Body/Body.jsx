import './Body.css';
import { Task } from './Task/Task';
export const Body = ()=>{
    return (
        <div className="principal">
            <Task title={"Tarea 1"} description={"description 1"} date={"28-4-2025"}/>
        </div>
    )
}