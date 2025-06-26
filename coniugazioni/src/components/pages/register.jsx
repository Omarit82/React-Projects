import { useForm } from "react-hook-form";

export const Register = () => {
    const {reset, handleSubmit, register} = useForm();
    
    const registro = (data) => {
        console.log(data);
        reset();
    }

    return (
        <main>
            <form action="" onSubmit={handleSubmit(registro)} encType="multipart/form-data" className="d-flex flex-column login">
                <input {...register("utente_nome",{required:true})} type="text" name="utente_nome" placeholder="Nome utente"/>
                <input {...register("utente_cognome",{required:true})} type="text" name="utente_cognome" placeholder="Cognome utente" />
                <input {...register("utente_email",{required:true})}type="email" name="utente_email"  placeholder="Email"/>
                <input {...register("utente_pass",{required:true})}type="password" name="utente_pass" placeholder="Password" />
                <input {...register("confirmazione_nome",{required:true})}type="password" name="confirmazione_pass" placeholder="Confirmazione di Password" />
                <input {...register("file")}type="file" name="avatar"/>
                <button type="submit">Registrarse</button>
            </form>
        </main>
    )
}