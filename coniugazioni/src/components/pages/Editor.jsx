import { useForm } from 'react-hook-form';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { Tabella } from './Tabella';

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
        }else{
            toast.error("Error al caricare!",{
                position:"top-center",
                autoClose: 2500,
                hideProgressBar:false,
                pauseOnHover:true,
                transition:Slide,
                theme:"dark"
            })
        }
       // reset();
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
                    <div className='containerTable'>
                        <Tabella tempo={"presente"} register={register} />
                        <Tabella tempo={"imperfetto"}  register={register} />
                        <Tabella tempo={"Passato Remoto"} register={register} />
                        {/* <Tabella tempo={"Futuro Semplice"}  register={register} />
                        <Tabella tempo={"Passato Prossimo"}  register={register} />
                        <Tabella tempo={"Trapassato Prossimo"}  register={register} />
                        <Tabella tempo={"Trapassato Remoto"}  register={register} />
                        <Tabella tempo={"Futuro Anteriore"}  register={register} /> */}
                    </div>
                    {/* <h4 className="w-100 text-center">Congiuntivo</h4>
                    <div className='containerTable'>
                        <Tabella tempo={"Presente"} register={register} />
                        <Tabella tempo={"Passato"} register={register}  />
                        <Tabella tempo={"imperfetto"} register={register} />
                        <Tabella tempo={"Trapassato"} register={register} />
                    </div>
                    <h4 className="w-100 text-center">Condizionale</h4>
                    <div className='containerTable'>
                        <Tabella tempo={"Presente"} register={register} />
                        <Tabella tempo={"Passato"} register={register} />
                    </div>
                    <h4 className="w-100 text-center">Imperativo</h4>
                    <div className='containerTable'>
                        <Tabella tempo={"Presente"}  register={register} />
                    </div> */}
                    <button type="submit"className='btn btn-info m-auto'>Caricare</button>
                </form>
                <ToastContainer />
            </div>
        </main>
    )
}