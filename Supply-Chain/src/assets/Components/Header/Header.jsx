import { useContext, useEffect } from 'react'
import './header.css'
import { UserContext } from '../../Contexts/UserContext/UserContext'

export const Header = () => {
    const {usuario,logOut} = useContext(UserContext);

    const logout = () => {
        logOut();
    }

    return (
        <header className='row'>
            <div className='col-2'>
            </div>
            <div className="d-flex col-8 align-items-center justify-content-center">
                <h1 className="text-center">Supply Chain</h1>
            </div>
            <div className='col-2 avatar'> 
                {usuario && 
                    <>
                        <img src="" alt="Avatar" className='avatar' />
                        <p>{usuario.apellido}, {usuario.nombre}</p>
                        <button className="btn btn-info" onClick={logout}>Logout</button>
                    </>}
            </div>
        </header>
    )
}