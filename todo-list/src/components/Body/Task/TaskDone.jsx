import { useState } from "react";
import add from '../../../assets/img/add.png';


export const TaskDone = ({title, description, date,todo,done}) => {

       
    const [ show, setShow ] = useState(false);
    
    return (
        <div className='task'>
            <div className='container'>
                <div className="row main">
                    <h2 className='title col-7 d-flex align-items-center p-0 m-0'>{title}</h2>
                    <div className='col-5 d-flex justify-content-end'>
                        <img src={add} className='btn p-0' onClick={()=>setShow(!show)} />
                    </div>
                </div>
                
                {show && 
                <div className="row">
                    <hr className='m-auto' />
                    <div className="row">
                        <p className='text-center m-2'>{description}</p>
                    </div>  
                    <div className="col-4 ">
                        <h5 className='text-center'>Created:</h5>
                        <p className='text-center'>Date: {date.slice(0, 10)}</p>
                        <p className='text-center'>Hour: {date.slice(11, 19)}</p>
                    </div>
                    <div className="col-4">
                        <h5 className="text-center">To do on:</h5>
                        <p className='text-center'>Date: {todo.slice(0, 10)}</p>
                        <p className='text-center'>Hour: {todo.slice(11, 19)}</p>
                    </div>
                    <div className="col-4">
                        <h5 className="text-center">Done:</h5>
                        <p className='text-center'>Date: {done.slice(0, 10)}</p>
                        <p className='text-center'>Hour: {done.slice(11, 19)}</p>
                    </div>
                </div>}                            
            </div>
        </div>
    )
}