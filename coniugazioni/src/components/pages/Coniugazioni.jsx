import { useState } from 'react';
import './main.css'
import { Tabella } from './Tabella';

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
        const resp = await coniugazione.json();
        console.log(resp.payload);
        setCon(resp.payload);
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
            <div>
                <h3 className='text-center'>Indicativo</h3>
                <div className='tabla p-2'>
                    <Tabella tempo={"Presente"} respuesta={con.length && con[0]} />
                    <Tabella tempo={"Imperfetto"} respuesta={con.length && con[1]} />
                    <Tabella tempo={"Passato Remoto"} respuesta={con.length && con[2]}  />
                </div>
                <div className='tabla p-2'>
                    <Tabella tempo={"Futuro Semplice"} respuesta={con.length && con[3]} />
                    <Tabella tempo={"Passato prossimo"}  respuesta={con.length && con[4]} />
                    <Tabella tempo={"Trapassato prossimo"}  respuesta={con.length && con[5]} />
                </div>
                <div className='tabla p-2'>
                    <Tabella tempo={"Trapassato remoto"} respuesta={con.length && con[6]} />
                    <Tabella tempo={"Futuro anteriore"} respuesta={con.length && con[7]} />
                </div>
            </div>
            <div>
                <h3 className='text-center'>Congiuntivo</h3>
                <div className='tabla p-2'>
                    <Tabella tempo={"Presente"}/>
                    <Tabella tempo={"Imperfetto"}/>
                    <Tabella tempo={"Passato"}/>
                </div>
                <div className='tabla p-2'>
                    <Tabella tempo={"Trapassato"}/>
                </div>
            </div>
            <div>
                <h3 className='text-center'>Condizionale</h3>
                <div className='tabla p-2'>
                    <Tabella tempo={"Presente"}  respuesta={con.length && con[8]} />
                    <Tabella tempo={"Passato"}  respuesta={con.length && con[9]} />
                </div>
            </div>
        </main>
    )
}