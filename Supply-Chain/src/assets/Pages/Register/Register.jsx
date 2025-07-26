import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import avatar from '../../Images/user_avatar.png';

export const Register = () => {

    const  { register,handleSubmit,watch,formState:{errors} } = useForm();
    const navigate = useNavigate();
    
    const password = watch("password")
    
    const onSubmit = async(data) => {
        data.image = avatar
        const registro = await fetch('http://localhost:3000/register',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify(data)
        });
        if(registro.status == 201){
            const response = await registro.json()
            navigate('/login');
        }
        
    }
    
    return (
        <main>
            <div className="container">
                <h2 className="text-center">Registro:</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column w-50 m-auto">

                    <label  className="text-center campo mb-1 w-50 m-auto">Nombre</label>
                    <input type="text" name="nombre" placeholder="...Nombre " {...register('nombre',{required:true})} className="text-center mb-1 m-auto w-50"/>
                    {errors.user && <span className="text-center mb-1 ">Campo Requerido</span>}

                    <label className="text-center campo mb-1 w-50 m-auto">Apellido</label>
                    <input type="text" name="apellido" placeholder="...Apellido " {...register('apellido',{required:true})} className="text-center mb-1 m-auto w-50"/>
                    {errors.user && <span className="text-center mb-1 ">Campo Requerido</span>}

                    <label className="text-center campo mb-1 w-50 m-auto">Email</label>
                    <input type="email" name="email" placeholder="...Email " {...register('email',{required:true})} className="text-center mb-1 m-auto w-50"/>
                    {errors.user && <span className="text-center mb-1 ">Campo Requerido</span>}

                    <label className="text-center campo mb-1 w-50 m-auto">Password</label>
                    <input type="password" name="password" minLength="8" maxLength="20" {...register('password',{required:true})} className="text-center mb-1 w-50 m-auto"/>
                    {errors.password && <span className="text-center mb-1 ">Campo Requerido</span>}

                    <label className="text-center campo mb-1 w-50 m-auto">Repertir password</label>
                    <input type="password" name="passwordCheck" {...register('passwordCheck',{required:true,validate: (value) =>
                    value === password || "Las contraseñas no coinciden"})}  className="text-center mb-1 m-auto w-50"/>
                    {errors.passwordCheck && <span className="text-center mb-1 ">{errors.passwordCheck.message}</span>}

                    <button type="submit" className="btn btn-info w-25 m-auto mb-1 w-50" >Registrar</button>
                </form>
            </div>
        </main>
    )
}