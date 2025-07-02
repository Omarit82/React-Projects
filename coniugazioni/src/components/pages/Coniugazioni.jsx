import { useState } from 'react';
import './main.css'
import { Slide, toast, ToastContainer } from 'react-toastify';
import { Planilla } from './Planilla';

export const Coniugazioni = () => {
   
    const [verbo, setVerbo] = useState('Verbo');
    const [con, setCon] = useState([]);

    const handleClick = async() =>{
        const verbos = await fetch('http://localhost:3000/api/editor/',{
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await verbos.json();
        //Selector random de verbo
        const verboRandom = parseInt(Math.random()*response.payload.length);
        setVerbo(`${response.payload[verboRandom].verbo_it} - ${response.payload[verboRandom].verbo_trd}`)
        const data = {
            "verbo": response.payload[verboRandom].verbo_it
        }
        const coniugazione = await fetch('http://localhost:3000/api/editor/verbo',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });        
        if(coniugazione.status == 400){
            toast.error("Non trovato!",{
                position:"top-center",
                autoClose: 2500,
                hideProgressBar:false,
                pauseOnHover:true,
                transition:Slide,
                theme:"dark"
            })
        }else if( coniugazione.status == 200){
            const resp = await coniugazione.json();
            console.log(resp.payload);
            toast.success(resp.payload.verbo_it,{
                position:"top-center",
                autoClose: 2500,
                hideProgressBar:false,
                pauseOnHover:true,
                transition:Slide,
                theme:"dark"
            })
            setCon(resp.payload);
        }else{
            toast.error("Errore",{
                position:"top-center",
                autoClose: 2500,
                hideProgressBar:false,
                pauseOnHover:true,
                transition:Slide,
                theme:"dark"
            })
        }
        
    }

    return(
        <main>
            <hr />
            <div className='p-2 sessione'>
                <button className='btn btn-info'>Nuova Sessione</button>
            </div>
            <div className='d-flex align-items-center justify-content-between w-75 m-auto pt-5'>
                <button onClick={handleClick} className="btn btn-info session">Nuovo Verbo</button>
                <h2 className='text-center'>Verbo Scelto</h2>
                <div>
                    <input type="text" name="" id="" className='me-2 scelto' placeholder={verbo} disabled/>
                </div>
            </div>
            <h3 className='text-center'>Indicativo</h3>
            <div className="containerTable">
                <Planilla tiempo={"Presente"} payload={Object.keys(con).length ? (con.indicativo[0]).presente : ""} />
                <Planilla tiempo={"Imperfetto"} payload={Object.keys(con).length ? (con.indicativo[0]).imperfetto : ""} />
                <Planilla tiempo={"Passato Remoto"} payload={Object.keys(con).length ? (con.indicativo[0]).passato_remoto : ""} />
                <Planilla tiempo={"Futuro Semplice"} payload={Object.keys(con).length ? (con.indicativo[0]).futuro_semplice : ""} />
                <Planilla tiempo={"Passato Prossimo"} payload={Object.keys(con).length ? (con.indicativo[0]).passato_prossimo : ""}  />
                <Planilla tiempo={"Trapassato Prossimo"}payload={Object.keys(con).length ? (con.indicativo[0]).trapassato_prossimo : ""} />
                <Planilla tiempo={"Trapassato Remoto"}payload={Object.keys(con).length ? (con.indicativo[0]).trapassato_remoto : ""}  />
                <Planilla tiempo={"Futuro Anteriore"}payload={Object.keys(con).length ? (con.indicativo[0]).futuro_anteriore : ""} />
            </div>
            <h3 className='text-center'>Congiuntivo</h3>
            <div className="containerTable">
                <Planilla tiempo={"Presente"} payload={Object.keys(con).length ? (con.congiuntivo[0]).presente : ""}/>
                <Planilla tiempo={"Passato"} payload={Object.keys(con).length ? (con.congiuntivo[0]).passato : ""}/>
                <Planilla tiempo={"Imperfetto"} payload={Object.keys(con).length ? (con.congiuntivo[0]).imperfetto : ""} />
                <Planilla tiempo={"Trapassato"} payload={Object.keys(con).length ? (con.congiuntivo[0]).trapassato : ""} />
            </div>
            <h3 className='text-center'>Condizionale</h3>
            <div className="containerTable">
                <Planilla tiempo={"Presente"} payload={Object.keys(con).length ? (con.condizionale[0]).presente : ""} />
                <Planilla tiempo={"Passato"} payload={Object.keys(con).length ? (con.condizionale[0]).passato : ""}/>
            </div>
            <h3 className='text-center'>Imperativo</h3>
            <div className="containerTable">
                <Planilla tiempo={"Imperativo Presente"}payload={Object.keys(con).length ? (con.imperativo[0]).presente : ""}/>
            </div> 
            <ToastContainer />
        </main>
    )
}