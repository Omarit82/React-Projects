import { useEffect, useState } from "react";
import { TaskDone } from "../Body/Task/TaskDone";

export const Done = ()=>{
    const [doneTask,setDoneTask] = useState([]);
    useEffect(()=>{
        getDoneTasks();
    },[doneTask])

    const getDoneTasks = async() => {
        try {
            const info = await fetch('http://localhost:8080/api/tasks/');
            const tasks = await info.json();
            const terminated = tasks.tasks.filter(task => task.done == true)
            setDoneTask(terminated); 
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="principal">
                {
                    doneTask.map(tk =>{
                        return <TaskDone key={tk._id} id={tk._id} title={tk.title} description={tk.description} date={tk.date_gen} todo={tk.date_todo} done={tk.date_done} />
                    })
                }
            </div>
        </>
    );
}