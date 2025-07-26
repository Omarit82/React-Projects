import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import google from '../../Images/google.png';
import './login.css'
import { useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext/UserContext";

export const Login = () => {
    const {register,handleSubmit,formState:{ errors }} = useForm();
    const navigate = useNavigate();
    const  { setLogin } = useContext(UserContext);

    useEffect(()=>{
        /**Chequeo la existencia de un usuario logueado.*/
        const getUser = async() =>{
            try {
                const user = await fetch('http://localhost:3000/api/user',{
                    method:'GET',
                    credentials:'include'
                });
                if(user.status == 200){
                    const respuesta = await user.json();
                    setLogin(respuesta.User);
                    navigate('/');
                }else{
                    console.log("Usuario no autenticado aun");
                }
            } catch (error) {
                console.log("Usuario no autenticado aun");
            }
            
        }
        getUser();
    },[])

    const onSubmit = async(data) => {
        const info = {
            "email":data.email,
            "password":data.password
        };
        const login = await fetch('http://localhost:3000/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify(info)
        });
        const res = await login.json();
        setLogin(res.Session);
        navigate('/home');
    }

    const logWithGoogle = async() => {
        window.location.href = 'http://localhost:3000/auth/google';
    }


    return (
        <main>
            <div className="container">
                <h2 className="text-center">Login:</h2>
                <form action="" method="POST" onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column w-50 m-auto">
                    <label className="text-center mb-1">USUARIO:</label>
                    <input {...register("email",{required:true})} type="email" className="text-center campo mb-1 w-50 m-auto" name="email" placeholder="...user" />
                    {errors.user && <span className="text-center mb-1 ">Campo Requerido</span>}
                    <label className="text-center mb-1 ">PASSWORD:</label>
                    <input {...register("password",{required:true})} type="password" className="text-center campo mb-1 w-50 m-auto" name="password" placeholder="...password" />
                    {errors.password && <span className="text-center mb-1">Campo Requerido</span>}
                    <button className="btn btn-info w-25 m-auto mb-1 w-50" type="submit">Login</button>
                    <Link to="/register" className="text-center mb-1">No posee usuario? Registrese aquí...</Link>
                </form>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <button className="btn btn-info btn-google" onClick={logWithGoogle}><img src={google} alt="Log with google" className="logoGoogle"/> <p className="m-2">Ingresar con Google</p></button>
            </div>
        </main>
    )
}