import { useState } from 'react';
import './Task.css';
import add from '../../../assets/img/add.png';
import ok from '../../../assets/img/ok.png';
import not from '../../../assets/img/not.png';


export const Task = ({title, description, date, todo, id, onDelete}) => {
    
    const [ show, setShow ] = useState(false);

    const handleOk = async() => {
        try {
            const info = {
                done:true,
                date_done: Date.now()
            }
            console.log(info)
            const response = await fetch(`http://localhost:8080/api/tasks/${id}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleErase = async() => {
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
                    <h2 className='title col-7 d-flex align-items-center p-0 m-0'>{title}</h2>
                    <div className='col-5 d-flex justify-content-end'>
                        <img src={add} className='btn p-0' onClick={()=>setShow(!show)} />
                        <img src={ok} alt="ok logo " className='btn p-0' onClick = {handleOk} />
                        <img src={not} alt="erase logo" className='btn p-0' onClick={handleErase} />
                    </div>
                    
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