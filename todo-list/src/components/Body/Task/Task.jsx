import { useState } from 'react';
import './Task.css';
import add from '../../../assets/img/add.png';
import ok from '../../../assets/img/ok.png';
import not from '../../../assets/img/not.png';

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
        <div className=''>
            <div className='container'>
                <div className="row main">
                    <h2 className='title col-9'>{title}</h2>
                    <div>
                        <img src={add} className='boton' onClick={()=>setShow(!show)} />
                        <img src={ok} alt="ok logo" className='boton' />
                        <img src={not} alt="ok logo" className='boton' onClick={handleErase} />
                    </div>
                    
                </div>
                
                {show && 
                <div className="row">
                    <hr className='m-auto' />
                    <div className="row">
                        <p className='text-center m-2'>{description}</p>
                    </div>  
                    <div className="col-6 ">
                        <h3 className='text-center'>Created:</h3>
                        <h4 className=' col'>Date: {date.slice(0, 10)}</h4>
                        <h4 className=' col'>Hour: {date.slice(11, 19)}</h4>
                    </div>
                    <div className="col-6">
                        <h3 className="text-center">To do on:</h3>
                        <h4 className=''>Date: {todo.slice(0, 10)}</h4>
                        <h4 className=''>Hour: {todo.slice(11, 19)}</h4>
                    </div>
                </div>}                            
            </div>
        </div>
    )
}