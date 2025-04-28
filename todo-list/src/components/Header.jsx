import './Header.css';
import { Navigate } from './Navigate';

export const Header = () => {
    return (
        <>
            <header className='d-flex align-items-center justify-content-center' >
                <h1>To Do</h1>
            </header>
            <Navigate />
        </>
    )
}