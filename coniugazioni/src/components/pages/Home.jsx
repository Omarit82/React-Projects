import { Link } from "react-router"

export const Home = () => {
    return(
        <main className="pb-5">
            <h2 className="text-center mb-5 pt-5">Benvenuti!</h2>
            <h3 className="text-center">Aquí encontrarán herramientas para mejorar la lengua italiana</h3>
            <div className="login text-center m-auto">
                <p>Tiene un usuario?</p>
                <Link to='/login' className="btn btn-info m-auto">Login</Link>
                <p>No tiene un usuario?</p>
                <Link to='/register' className="btn btn-info">Registro</Link>
            </div>
        </main>
    )
}