import colosseo from '../../assets/Colosseo.png';
import { Navbar } from '../Navbar/Navbar';
import './header.css';

export const Header = () => {
    return(
        <>
            <header className='d-flex align-items-center'>
                <div className='d-flex align-items-center h-100'>
                    <img src={colosseo} alt="Logo del Colosseo" className='logo' />
                </div>
                <h1 className='ms-5'>Aggeggi d'Italiano</h1>
            </header>
            <Navbar />
        </>
    )
}