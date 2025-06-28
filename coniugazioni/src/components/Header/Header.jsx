import { Link } from 'react-router';
import colosseo from '../../assets/Colosseo.png';
import './header.css';

export const Header = () => {
    return(
        <>
            <header className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center h-100'>
                    <img src={colosseo} alt="Logo del Colosseo" className='logo' />
                </div>
                <h1 className='ms-5'>Aggeggi d'Italiano</h1>
                <div className='d-flex flex-column'>
                    {/* <img src="" alt="avatar" />                    */}
                    <Link to='/login' className="btn btn-info">Login</Link>
                    <button className='btn btn-info'>Logout</button>
                </div>
            </header>
        </>
    )
}