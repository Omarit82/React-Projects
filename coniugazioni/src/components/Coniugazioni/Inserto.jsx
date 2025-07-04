import { useEffect, useState } from "react";


export const Inserto = ({data}) => {
    const [valor, setValor]=useState('')
    const [clase,setClase] = useState('')
    useEffect(()=>{
        if(valor!=="" && (valor === data[0]||valor === data[1])){
            console.log(true);
            setClase("verde");
        }else if(valor!==""){
            setClase('rojo');
        }else{
            setClase('');
        }
    },[valor])


   
    return(
        <input type="text" className={clase} onChange={(e)=>{
            setValor(e.target.value.toLowerCase())
        }}/>
    )
}