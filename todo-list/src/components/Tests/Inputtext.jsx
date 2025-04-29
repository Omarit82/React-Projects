import { useEffect, useState } from "react"
import './Tests.css';

export const Inputtext = () => {

    const [ text, setText] = useState("");

    //SIN ARRAY -cuando se monta el componente y cuando se actualiza - , 
    //CON UN ARRAY VACIO SE EJECUTA CADA VEZ QUE SE MONTA
    useEffect (()=>{
        console.log('componente montado');
        //Si retornamos algo se ejecuta al desmontar el componenete
        return () => {
            console.log('componente desmontado');
        }
    },[]) 

    useEffect (()=>{
        console.log('componente actualizado');
    },[text]) 

    function handleText(e) {
        setText(e.target.value);
    }
    
    return(
        <div className="d-flex justify-content-center align-items-center flex-column">
            <h2 className="m-1">{text}</h2>
            <input type="text" onChange={handleText} className="field m-1"/>
        </div>
    )
}