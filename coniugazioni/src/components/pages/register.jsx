import { useForm } from "react-hook-form";
import './main.css';

export const Register = () => {
    const {reset, handleSubmit, register} = useForm();
    
    const registro = async(data) => {
        console.log(data);
        const sendData = await fetch('http://localhost:3000/api/users/register',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const response = await sendData.json();
        reset();
    }

    return (
        <main>
            <form action="" onSubmit={handleSubmit(registro)} encType="multipart/form-data" className="d-flex flex-column login m-auto">
                <label htmlFor="user_name" className="text-center m-2">Nome utente</label>
                <input {...register("user_name",{required:true})} type="text" name="user_name" placeholder="Nome utente"/>
                <label htmlFor="user_lastname" className="text-center m-2">Cognome utente</label>
                <input {...register("user_lastname",{required:true})} type="text" name="user_lastname" placeholder="Cognome utente" />
                <label htmlFor="user_email" className="text-center m-2">Utente email</label>
                <input {...register("user_email",{required:true})}type="email" name="user_email"  placeholder="Email"/>
                <label htmlFor="user_pass" className="text-center m-2">Utente password</label>
                <input {...register("user_pass",{required:true})}type="password" name="user_pass" placeholder="Password" />
                <label htmlFor="confirm_pass"className="text-center m-2">Confirmazione di password</label>
                <input {...register("confirm_pass",{required:true})}type="password" name="confirm_pass" placeholder="Confirmazione di Password" />
                <label htmlFor="avater"className="text-center m-2">Avatar</label>
                <input {...register("file")}type="file" name="avatar" className="text-center"/>
                <button type="submit" className="btn btn-danger mt-2 m-auto">Registrarse</button>
            </form>
        </main>
    )
}