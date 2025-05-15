import { useEffect, useState } from 'react';
import { Task } from './Task/Task';
import './Body.css';


export const Body = ()=>{
    const [tasks,setTasks] = useState([]);

    useEffect(()=>{
        getTasks();
    },[tasks])

    const handleDelete = (id) => {
        setTasks(tasks.filter(task=>task._id !== id));
    }

    const getTasks = async() =>{ 
        try {
            const response = await fetch('http://localhost:8080/api/tasks');
            const data = await response.json()
            const filterData = data.tasks.filter( task => task.done == false);
            setTasks(filterData);
        } catch (error) {
            console.log("Could not get tasks");
        }
    }


    return (
        <div className="principal">
            {
                tasks.map(tk =>{
                   return <Task key={tk._id} onDelete={handleDelete} id={tk._id} title={tk.title} description={tk.description} date={tk.date_gen} todo={tk.date_todo} />
                })
            }
        </div>
    )
}