import { useForm } from "react-hook-form";
import './usuarios.css';

export const Login = () => {

    const { register, handleSubmit,reset} = useForm();

    const onSubmit = (async(data) =>{
        console.log(data);
        
        reset();
        const infoSend = await fetch('http://localhost:3000/api/users/login',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response = await infoSend.json();
        /**sweet alert 2  - login ok o login failed */
        console.log(response)
    })
    return (
        <main>
            <h2 className="text-center mb-5 pt-5">Login:</h2>
            <form onSubmit={handleSubmit(onSubmit)} action=""className="d-flex flex-column login m-auto">
                <label htmlFor="email" className="text-center">Utente Email</label>
                <input name="email"{...register("email",{required:true})} type="text" placeholder="Email" className="m-2" />
                <label htmlFor="pass" className="text-center">Parola d'Ordine</label>
                <input name="pass" {...register("pass",{required:true})} type="password" placeholder="Parola d'ordine" className="m-2" />
                <button type="submit" className="btn btn-info m-auto">Login</button>
            </form>
        </main>
    )
}