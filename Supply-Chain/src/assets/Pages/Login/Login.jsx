import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

    const logWithGoogle = async() => {
        window.location.href = 'http://localhost:3000/auth/google';
    }


    return (
        <main>
            <div className="d-flex justify-content-center mt-5">
                <button className="btn btn-info btn-google" onClick={logWithGoogle}><img src={google} alt="Log with google" className="logoGoogle"/> <p className="m-2">Ingresar con Google</p></button>
            </div>
        </main>
    )
}