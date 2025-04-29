import { useState } from "react";
import './Tests.css';

const Counter = () => {
    
    const [number,setNumber] = useState(0);

    const sumar = ()=>{
        setNumber(number+1);
    };
    const restar = ()=>{
        setNumber(number-1);
    };
    
    return(
        <>
            <h2 className="text-center">{number}</h2>
            <div className="d-flex justify-content-center">
                <button onClick={sumar} className="m-1 btn btn-primary">Add</button>
                <button onClick={restar} className="m-1 btn btn-primary">Subtract</button>
            </div>
            
        </>
    )
};

export default Counter;