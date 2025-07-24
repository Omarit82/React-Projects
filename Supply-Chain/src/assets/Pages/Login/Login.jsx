import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export const Login = () => {
    const {register,handleSubmit,formState:{ errors }} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <main>
            <div className="container">
                <h2 className="text-center">Login:</h2>
                <form action="" method="POST" onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column w-50 m-auto">
                    <label htmlFor="user" className="text-center mb-1">USUARIO:</label>
                    <input {...register("user",{required:true})} type="text" className="text-center campo mb-1 w-50 m-auto" name="user" placeholder="...user" />
                    {errors.user && <span className="text-center mb-1 ">Campo Requerido</span>}
                    <label htmlFor="user" className="text-center mb-1 ">PASSWORD:</label>
                    <input {...register("password",{required:true})} type="password" className="text-center campo mb-1 w-50 m-auto" name="password" placeholder="...password" />
                    {errors.password && <span className="text-center mb-1">Campo Requerido</span>}
                    <button className="btn btn-success w-25 m-auto mb-1 w-50" type="submit">Login</button>
                    <Link to="/register" className="text-center mb-1">No posee usuario? Registrese aquí...</Link>
                </form>
            </div>
        </main>
    )
}