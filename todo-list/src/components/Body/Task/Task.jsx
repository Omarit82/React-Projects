import { useState } from 'react';
import './Task.css';

export const Task = ({title, description, date, todo, id, onDelete}) => {
    
    const [ show, setShow ] = useState(false);

    const handleErase = async() =>{
        try {
            const response = await fetch(`http://localhost:8080/api/tasks/${id}`,{
                    method: 'DELETE',
                }
            )
            console.log(response.status);
            if (response.ok){
                onDelete(id);
            } else {
                console.log("ERROR")
            }
            
        } catch (error) {
            console.error(error)
        }
       
    }
    return (
        <div className='task'>
            <div className='container'>
                <div className="row main">
                    <h2 className='title col-7'>{title}</h2>
                    <button className='btn btn-success col-1 m-1 round' onClick={()=>setShow(!show)}>{show ? '-':'+'}</button>
                    <button className='btn btn-primary col-1 m-1 round'>Done</button>
                    <button className='btn btn-danger col-1 m-1 round' onClick={handleErase}>Erase</button>
                </div>
                
                {show && 
                <div className="row">
                    <hr className='m-auto' />
                    <div className="row">
                        <p className='text-center m-2'>{description}</p>
                    </div>  
                    <div className="col-6 ">
                        <h5 className='text-center'>Created:</h5>
                        <p className='text-center'>Date: {date.slice(0, 10)}</p>
                        <p className='text-center'>Hour: {date.slice(11, 19)}</p>
                    </div>
                    <div className="col-6">
                        <h5 className="text-center">To do on:</h5>
                        <p className='text-center'>Date: {todo.slice(0, 10)}</p>
                        <p className='text-center'>Hour: {todo.slice(11, 19)}</p>
                    </div>
                </div>}                            
            </div>
        </div>
    )
}