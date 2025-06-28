import { useForm } from 'react-hook-form';
import { Slide, ToastContainer, toast } from 'react-toastify';

export const Editor = () => {
    const { handleSubmit, register,reset } = useForm();
   
    
    const envio = async(data) =>{
        data.verbo_it = data.verbo_it.toString().toLowerCase();
        data.verbo_trd = data.verbo_trd.toString().toLowerCase();
        console.log(data);
        
        const sendVerbi = await fetch('http://localhost:3000/api/editor',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(sendVerbi);
        const response = await sendVerbi.json();        
        if(sendVerbi.status == 201){
            toast.success("Verbo caricato!",{
                position:"top-center",
                autoClose: 2500,
                hideProgressBar:false,
                pauseOnHover:true,
                transition:Slide,
                theme:"dark"
            })
        }else{
            toast.error("Il verbo già essiste!",{
                position:"top-center",
                autoClose: 2500,
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
            <div>
                <h3 className="text-center">Aggiungere Verbo</h3>
                <form action="" onSubmit={handleSubmit(envio)} className='d-flex flex-column login m-auto'>
                    <input {...register('verbo_it',{required:true})} type="text" placeholder="Verbo italiano"className='m-2' />
                    <input {...register('verbo_trd',{required:true})} type="text" placeholder="Verbo traduzione" className='m-2' />
                    <h4 className='text-center'>Indicativo Presente:</h4>
                    
                    <input {...register('',{required:true})} type="text" className='m-2' />
                    <button type="submit" className='btn btn-danger m-auto'>Submit</button>
                </form>
                <ToastContainer />
            </div>

        </main>
    )
}