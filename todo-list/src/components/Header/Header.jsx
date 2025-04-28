import './Header.css';
import { Navigate } from '../Navbar/Navigate';

export const Header = () => {
    return (
        <>
            <header className='d-flex align-items-center justify-content-center' >
                <h1>To Do</h1>
            </header>
            <Navigate user={"Omarit"} />
        </>
    )
}