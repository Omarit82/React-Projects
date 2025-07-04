import { useForm } from 'react-hook-form';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { Tabella } from './Tabella';
import "./editor.css";


export const Editor = () => {
    const {handleSubmit,register,reset} = useForm();

    const handleClick = async(data) => {
        console.log(data);
        const verbo = await fetch('http://localhost:3000/api/editor',{
            method: "POST",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(verbo.status==201){
            toast.success("Verbo caricato!",{
                position:"top-center",
                autoClose: 2500,
                hideProgressBar:false,
                pauseOnHover:true,
                transition:Slide,
                theme:"dark"
            })
        }else if(verbo.status==409){
            toast.info("Verbo già caricato!",{
                position:"top-center",
                autoClose: 4000,
                hideProgressBar:false,
                pauseOnHover:true,
                transition:Slide,
                theme:"dark"
            })
        }else{
            toast.error("Errore al caricare!",{
                position:"top-center",
                autoClose: 3000,
                hideProgressBar:false,
                pauseOnHover:true,
                transition:Slide,
                theme:"dark"
            })
        }
        reset();
    }
    
    return(
        <main>
            <h2 className="text-center">Editor:</h2>
            <h3 className="text-center">Aggiungere Verbo</h3>
            <div> 
                <form onSubmit={handleSubmit(handleClick)} className="tabla">
                    <div className='d-flex m-3 justify-content-around w-100'>
                        <div>
                             <h4>Verbo in italiano:</h4>
                            <input type="text" {...register("verbo_it")} />
                        </div>
                        <div>
                            <h4>Verbo traduzione: </h4>
                            <input type="text" {...register("verbo_trd")} />
                        </div>                       
                    </div>
                    <h4 className="w-100 text-center">Indicativo</h4>
                    <div className='containerTable'>
                        <Tabella grupo={"indicativo"} nome={"Presente"} tempo={"presente"} register={register} />
                        <Tabella grupo={"indicativo"} nome={"Imperfetto"} tempo={"imperfetto"}  register={register} />
                        <Tabella grupo={"indicativo"} nome={"Passato Remoto"} tempo={"passato_remoto"} register={register} />
                        <Tabella grupo={"indicativo"} nome={"Futuro Semplice"} tempo={"futuro_semplice"}  register={register} />
                        <Tabella grupo={"indicativo"} nome={"Passato Prossimo"} tempo={"passato_prossimo"}  register={register} />
                        <Tabella grupo={"indicativo"} nome={"Trapassato Prossimo"} tempo={"trapassato_prossimo"}  register={register} />
                        <Tabella grupo={"indicativo"} nome={"Trapassato Remoto"} tempo={"trapassato_remoto"}  register={register} />
                        <Tabella grupo={"indicativo"} nome={"Futuro Anteriore"} tempo={"futuro_anteriore"}  register={register} />
                    </div>
                    <h4 className="w-100 text-center">Congiuntivo</h4>
                    <div className='containerTable'>
                        <Tabella grupo={"congiuntivo"}nome={"Presente"}  tempo={"presente"} register={register} />
                        <Tabella grupo={"congiuntivo"}nome={"Passato"}  tempo={"passato"} register={register}  />
                        <Tabella grupo={"congiuntivo"}nome={"Imperfetto"} tempo={"imperfetto"} register={register} />
                        <Tabella grupo={"congiuntivo"}nome={"Trapassato"} tempo={"trapassato"} register={register} />
                    </div>
                    <h4 className="w-100 text-center">Condizionale</h4>
                    <div className='containerTable'>
                        <Tabella grupo={"condizionale"}nome={"Presente"} tempo={"presente"} register={register} />
                        <Tabella grupo={"condizionale"}nome={"Passato"} tempo={"passato"} register={register} />
                    </div>
                    <h4 className="w-100 text-center">Imperativo</h4>
                    <div className='containerTable'>
                        <Tabella grupo={"imperativo"}nome={"Presente"} tempo={"presente"}  register={register} />
                    </div>
                    <button type="submit"className='btn btn-info m-auto'>Caricare</button>
                </form>
                <ToastContainer />
            </div>
        </main>
    )
}