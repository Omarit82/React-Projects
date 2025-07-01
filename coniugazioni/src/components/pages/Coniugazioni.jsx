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
        console.log(response.payload[verboRandom].verbo_it);
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
        console.log(coniugazione);
        
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
                <Planilla />
                <Planilla />
                <Planilla />
                <Planilla />
                <Planilla />
                <Planilla />
            </div>
            
            <ToastContainer />
        </main>
    )
}