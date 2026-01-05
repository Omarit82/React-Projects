import { useContext } from 'react'
import './header.css'
import { UserContext } from '../../Contexts/UserContext/UserContext'

export const Header = () => {
    const {usuario,logOut} = useContext(UserContext);
 
    const logout = () => {
        logOut();
    }

    return (
        <header className='row m-0'>
            <div className='col-2 m-0'>
            </div>
            <div className="d-flex col-8 align-items-center justify-content-center m-0">
                <h1 className="text-center titulo">Supply Chain</h1>
            </div>
            <div className='col-2 avatar m-0 mt-2'> 
                { usuario && 
                <div className="d-flex mt-3 flex-column align-items-center justify-content-around">
                    <div>
                        <p>{usuario.apellido}, {usuario.nombre}</p>
                    </div>
                    <button className="btn btn-info button-logout" onClick={logout}>Logout</button>
                </div>}
            </div>
        </header>
    )
}