import { useForm } from 'react-hook-form';

export const Editor = () => {
    const { handleSubmit, register,reset } = useForm();
    
    const envio = async(data) =>{
        console.log(data);
        const sendVerbi = await fetch('http://localhost:3000/api/editor',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response = await sendVerbi.json();
        console.log(response);
        reset();
    }
    
    return(
        <main>
            <h2 className="text-center">Editor:</h2>
            <div>
                <h3 className="text-center">Aggiungere Verbo</h3>
                <form action="" onSubmit={handleSubmit(envio)} className='d-flex flex-column login m-auto'>
                    <input {...register('Verbo_it',{required:true})} type="text" placeholder="Verbo italiano"className='m-2' />
                    <input {...register('Verbo_trd',{required:true})} type="text" placeholder="Verbo traduzione" className='m-2' />
                    <button type="submit" className='btn btn-danger m-auto'>Submit</button>
                </form>
            </div>

        </main>
    )
}