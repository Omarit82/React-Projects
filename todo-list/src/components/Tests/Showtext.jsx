import { useState } from "react";
import './Tests.css';
import { Inputtext } from "./Inputtext";

export const Showtext = ( )=>{
    const [show,setShow] = useState(true);

    function handleShow() {
        setShow(!show);
    }
    
    return(
        <>
            <div className="d-flex justify-content-center align-items-center flex-column">
                {
                    show &&  <Inputtext />
                }
                <button onClick={handleShow} className="btn btn-primary">{show?"Ocultar":"Mostrar"}</button>
               
            </div>
        </>
    )
}